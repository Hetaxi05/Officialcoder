import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Modal, Button } from "antd";
import Header from "../../components/common/layout/footer/sidebar/header/header";
import Sidebar from "./Sidebar";
import "./Detail.css";
import 'react-quill/dist/quill.snow.css';

function Details({ isSidebarVisible, onToggleSidebar }) {
  const { courseId, chapterId, topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve any passed state – including our custom flags.
  // const locationState = location.state || {};
  // If hideContent is set and the chapter has NOT been freed, then we block content.
  // const hideContent = locationState.hideContent && !locationState.nextChapterFreed;

  const [chapters, setChapters] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
  const [lockModalVisible, setLockModalVisible] = useState(false);
  // NEW: State for the paid next-chapter modal
  const [paidModalVisible, setPaidModalVisible] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  // Retrieve any passed state – including our custom flags.
  const locationState = location.state || {};
  // If hideContent is set and the chapter has NOT been freed, then we block content.
  const hideContent = locationState.hideContent && !locationState.nextChapterFreed;
  const [completedTopics, setCompletedTopics] = useState(() => {
    const stored = localStorage.getItem("completedTopics");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsPremium(userData.isPremium || false);
    }
  }, []);


  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Replace with your actual payment status logic.
  // const userHasPaid = false;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/chap/course/${courseId}`)
      .then((res) => res.json())
      .then((data) => setChapters(data))
      .catch((err) => console.error("Error fetching chapters:", err));
  }, [courseId]);

  useEffect(() => {
    setCurrentSubtopicIndex(0);
  }, [topicId]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/quiz/topicquiz/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        console.log("Fetched quiz data:", data);
      })
      .catch((err) => console.error("Error fetching quiz:", err));
  }, [topicId]);

  // Wait until chapters are loaded.
  if (chapters.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  // Determine current chapter and topic
  const selectedChapter = chapters.find((ch) => ch._id === chapterId);
  const selectedTopic = selectedChapter
    ? selectedChapter.topics.find((t) => t._id === topicId)
    : null;
  const currentTopicIndex =
    selectedChapter && selectedChapter.topics
      ? selectedChapter.topics.findIndex((t) => t._id === topicId)
      : -1;
  const totalSubtopics = selectedTopic?.subtopics?.length || 0;
  const currentSubtopic =
    selectedTopic && totalSubtopics > 0
      ? selectedTopic.subtopics[currentSubtopicIndex]
      : null;
  const currentChapterIndex = chapters.findIndex((ch) => ch._id === chapterId);

  // Check if the current chapter is paid
  const isChapterPaid =
    selectedChapter &&
    (selectedChapter.paid === true ||
      selectedChapter.paid === "true" ||
      selectedChapter.paid === "paid");

  // // Lock the content if the current chapter is paid but the user hasn't paid.
  // const isLocked = isChapterPaid && !userHasPaid;
  // If chapter is paid but user is not premium, then lock the content.
  // const isLocked = isChapterPaid && !userHasPaid;
  const isLocked = isChapterPaid && !isPremium;


  const openLockModal = () => {
    setLockModalVisible(true);
  };

  // Handler for the paid modal's OK button.
  const handlePaidOk = async () => {
    setPaidModalVisible(false);
    // After successful payment, you can update userHasPaid accordingly.
    // For now, proceed to quiz navigation.
    // navigate('/topicquiz', {
    //   state: {
    //     courseId,
    //     chapterId,
    //     topicId,
    //     nextTopicId: nextTopicIdForQuiz,
    //     nextChapterId: nextChapterIdForQuiz,
    //   }
    // });
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chap/${locationState.nextChapterId}`);
      const latestChapterData = await response.json();
      const stillPaid =
        latestChapterData.paid === true ||
        latestChapterData.paid === "true" ||
        latestChapterData.paid === "paid";
      navigate(`/topic-details/${courseId}/${locationState.nextChapterId}/${locationState.nextTopicId}`, {
        state: {
          initialSubtopicIndex: 0,
          hideContent: stillPaid, // block content if still paid
          nextChapterFreed: !stillPaid
        }
      });
    } catch (error) {
      console.error("Error fetching latest chapter data:", error);
      // Fallback: assume it's still paid.
      navigate(`/topic-details/${courseId}/${locationState.nextChapterId}/${locationState.nextTopicId}`, {
        state: { initialSubtopicIndex: 0, hideContent: true, nextChapterFreed: false }
      });
    }
  };

  // Handler for Pricing button in modal.
  const handlePricing = () => {
    setPaidModalVisible(false);
    navigate("/pricing");
  };

  let nextTopicIdForQuiz = null;
  let nextChapterIdForQuiz = null;
  const handleNext = async () => {
    if (isLocked) {
      openLockModal();
      return;
    }
    if (!selectedTopic) return;

    // If subtopics remain, simply show next subtopic.
    if (currentSubtopicIndex < totalSubtopics - 1) {
      setCurrentSubtopicIndex(currentSubtopicIndex + 1);
      return;
    }
    if (!completedTopics.includes(topicId)) {
      const updatedCompleted = [...completedTopics, topicId];
      setCompletedTopics(updatedCompleted);
      localStorage.setItem("completedTopics", JSON.stringify(updatedCompleted));
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const isPremium = user?.isPremium;

    // When subtopics are complete...
    if (quiz.length === 0) {

      // No quiz available.
      if (selectedChapter && selectedChapter.topics && currentTopicIndex < selectedChapter.topics.length - 1) {
        const nextTopic = selectedChapter.topics[currentTopicIndex + 1];
        navigate(`/topic-details/${courseId}/${chapterId}/${nextTopic._id}`, { state: { initialSubtopicIndex: 0 } });
      } else if (currentChapterIndex < chapters.length - 1) {
        const nextChapter = chapters[currentChapterIndex + 1];
        if (nextChapter.topics && nextChapter.topics.length > 0) {
          const nextTopic = nextChapter.topics[0];
          try {
            // Fetch latest data for next chapter.
            const response = await fetch(`${process.env.REACT_APP_API_URL}/chap/${nextChapter._id}`);
            const latestChapterData = await response.json();
            // if (latestChapterData.paid === true || latestChapterData.paid === "true" || latestChapterData.paid === "paid") {

            if (!isPremium && (latestChapterData.paid === true || latestChapterData.paid === "true" || latestChapterData.paid === "paid")) {
              // Still paid: update state for modal and then show modal.
              // Save next chapter/topic IDs in locationState so that handlePaidOk can use them.
              navigate(`/topic-details/${courseId}/${nextChapter._id}/${nextTopic._id}`, {
                state: { initialSubtopicIndex: 0, hideContent: true, nextChapterFreed: false }
              });
              setPaidModalVisible(true);
              return;
            } else {
              // Now free: navigate directly with content visible.
              navigate(`/topic-details/${courseId}/${nextChapter._id}/${nextTopic._id}`, {
                state: { initialSubtopicIndex: 0, hideContent: false, nextChapterFreed: true }
              });
              return;
            }
          }
          catch (error) {
            console.error("Error fetching next chapter data:", error);
            // Fallback: assume paid.
            navigate(`/topic-details/${courseId}/${nextChapter._id}/${nextTopic._id}`, {
              state: { initialSubtopicIndex: 0, hideContent: true, nextChapterFreed: false }
            });
            setPaidModalVisible(true);
            return;
          }
        }
      }
    } else {
      // If a quiz exists, determine next topic/chapter for quiz navigation.
      if (selectedChapter.topics[currentTopicIndex + 1]) {
        nextTopicIdForQuiz = selectedChapter.topics[currentTopicIndex + 1]._id;
        nextChapterIdForQuiz = chapterId;
      } else if (currentChapterIndex < chapters.length - 1) {
        const nextChapter = chapters[currentChapterIndex + 1];
        if (nextChapter.topics && nextChapter.topics.length > 0) {
          nextTopicIdForQuiz = nextChapter.topics[0]._id;
          nextChapterIdForQuiz = nextChapter._id;
        }
      }
      navigate("/topicquiz", {
        state: {
          courseId,
          chapterId,
          topicId,
          nextTopicId: nextTopicIdForQuiz,
          nextChapterId: nextChapterIdForQuiz
        }
      });
      return;
    }
  };

  const handlePrevious = () => {
    if (!selectedTopic) return;
    if (currentSubtopicIndex > 0) {
      setCurrentSubtopicIndex(currentSubtopicIndex - 1);
    } else {
      if (selectedChapter && selectedChapter.topics && currentTopicIndex > 0) {
        const previousTopic = selectedChapter.topics[currentTopicIndex - 1];
        const previousSubtopicsLength = previousTopic.subtopics?.length || 0;
        navigate(`/topic-details/${courseId}/${chapterId}/${previousTopic._id}`, {
          state: { initialSubtopicIndex: previousSubtopicsLength > 0 ? previousSubtopicsLength - 1 : 0 }
        });
      } else if (currentChapterIndex > 0) {
        const previousChapter = chapters[currentChapterIndex - 1];
        if (previousChapter.topics && previousChapter.topics.length > 0) {
          const lastTopicIndex = previousChapter.topics.length - 1;
          const previousTopic = previousChapter.topics[lastTopicIndex];
          const previousSubtopicsLength = previousTopic.subtopics?.length || 0;
          navigate(`/topic-details/${courseId}/${previousChapter._id}/${previousTopic._id}`, {
            state: { initialSubtopicIndex: previousSubtopicsLength > 0 ? previousSubtopicsLength - 1 : 0 }
          });
        }
      }
    }
  };

  const disablePrevious =
    currentChapterIndex === 0 &&
    currentTopicIndex === 0 &&
    currentSubtopicIndex === 0;
  const disableNext =
  isLocked ||
  (
    currentChapterIndex === chapters.length - 1 &&
    selectedChapter &&
    currentTopicIndex === selectedChapter.topics.length - 1 &&
    currentSubtopicIndex === totalSubtopics - 1 &&
    quiz.length === 0  // Only disable if there's no quiz
  );



  let contentToDisplay = null;
  if (hideContent) {
    contentToDisplay = (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Content is locked. Please complete the payment to access this chapter.
      </p>
    );
  } else if (!selectedTopic) {
    contentToDisplay = (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Please select a topic from the sidebar.
      </p>
    );
  } else if (!currentSubtopic) {
    contentToDisplay = (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        No subtopic available for the selected topic.
      </p>
    );
  }
  else {
    contentToDisplay = (
      <motion.div
        key={currentSubtopic._id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <h4>{currentSubtopic.subtopictitle}</h4>
        <div dangerouslySetInnerHTML={{ __html: currentSubtopic.content }} />
      </motion.div>
    );
  }

  if (location.pathname.includes("/topicquiz/")) {
    return null;
  }

  return (
    <div className="page-container" style={{ height: "92vh" }}>
      <Header onToggleSidebar={onToggleSidebar} />
      <div style={{ display: "flex", height: "92vh" }}>
        <Sidebar
          sidebarStatus={isSidebarVisible}
          currentStep={topicId}
          currentChapterId={chapterId}
          chapters={chapters}
         completedTopics={completedTopics}
          toggleSidebar={onToggleSidebar}
          className={`
            sidebar
            ${isSidebarVisible ? "open" : "closed"}
            ${isMobile && !isSidebarVisible ? "mobile-hide" : ""}
          `}
        />
        <div
          className={`
            details-container
            ${!isSidebarVisible ? "details-full-width" : ""}
            ${isMobile && isSidebarVisible ? "mobile-hide" : ""}
          `}
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "94vh",
          }}
        >
          <div className="bg-light flex-grow-1 p-3 content-wrapper" style={{ overflowY: "auto" }}>
            {contentToDisplay}
          </div>


          {/* <div
            className="progress-wrapper shadow p-3"
            style={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "#ffffff",
              borderTop: "1px solid #ccc",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button className="btn btn-secondary" onClick={handlePrevious} disabled={disablePrevious}>
              &larr; Previous
            </button>
            <div
              className="progress-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              {selectedTopic &&
                selectedTopic.subtopics.map((step, idx) => (
                  <div
                    key={step._id}
                    style={{
                      width: "40px",
                      height: "10px",
                      borderRadius: "4px",
                      backgroundColor: idx === currentSubtopicIndex ? "#2f77ff" : "#d0d8ff",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                ))}
            </div>
            <button className="btn btn-primary" onClick={handleNext} disabled={disableNext}>
              Next &rarr;
            </button>
          </div> */}

          <div className="progress-wrapper shadow p-3 pt-4" >
            <div className="progress-container ">
              {selectedTopic &&
                selectedTopic.subtopics.map((step, idx) => (
                  <div
                    key={step._id}
                    style={{
                      width: "40px",
                      height: "10px",
                      borderRadius: "4px",
                      backgroundColor:
                        idx === currentSubtopicIndex ? "#2f77ff" : "#d0d8ff",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                ))}
            </div>

            <div className="button-container">
              <button
                className="btn btn-secondary"
                onClick={handlePrevious}
                disabled={disablePrevious}
              >
                &larr; Previous
              </button>
              <button className="btn ps-4 pe-4" style={{ borderRadius: "4px" }} onClick={handleNext} disabled={disableNext}>
                Next &rarr;
              </button>
            </div>
          </div>



        </div>
      </div>
      <Modal
        title="Content Locked"
        open={lockModalVisible}
        onCancel={() => setLockModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setLockModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="pricing"
            type="primary"
            onClick={() => {
              setLockModalVisible(false);
              navigate("/pricing");
            }}
          >
            Go to Pricing
          </Button>,
        ]}
      >
        <p>This content is locked. Please complete the payment to access it.</p>
      </Modal>

      {/* Paid Modal for next chapter locking */}
      <Modal
        title="Chapter Locked"
        open={paidModalVisible}
        onCancel={() => setPaidModalVisible(false)}
        footer={[
          <Button key="ok" onClick={handlePaidOk}>OK</Button>,
          <Button key="pricing" type="primary" onClick={handlePricing}>Pricing</Button>,
        ]}
      >
        <p>This content is locked. Please complete the payment to access it.</p>
      </Modal>
    </div>
  );
}

export default Details;
