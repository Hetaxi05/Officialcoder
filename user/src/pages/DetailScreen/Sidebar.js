import React, { useState, useEffect } from "react";
import { MdOutlineNavigateNext, MdCheckCircle } from "react-icons/md";
import { GoLock } from "react-icons/go";
import * as PIcon from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Progress } from "antd";
import "./Detail.css";

const Sidebar = ({
  sidebarStatus,
  toggleSidebar,
  currentStep, // current topic id
  currentChapterId,
  chapters = [],
  completedTopics,
}) => {
  const [openIndex, setOpenIndex] = React.useState(null);
  const [openTopicIndex, setOpenTopicIndex] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedChapter, setSelectedChapter] = React.useState(null);
  const [isPremium, setIsPremium] = React.useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsPremium(userData.isPremium || false);
    }
  }, []);

  // Automatically open the chapter and topic based on currentChapterId and currentStep
  useEffect(() => {
    if (currentChapterId && chapters.length > 0) {
      const chapterIndex = chapters.findIndex((ch) => ch._id === currentChapterId);
      if (chapterIndex !== -1) {
        setOpenIndex(chapterIndex);
        if (chapters[chapterIndex].topics) {
          const topicIndex = chapters[chapterIndex].topics.findIndex((t) => t._id === currentStep);
          if (topicIndex !== -1) {
            setOpenTopicIndex(topicIndex);
          }
        }
      }
    }
  }, [currentChapterId, currentStep, chapters]);

  useEffect(() => {
    // Calculate progress percentage
    let totalTopics = 0;
    let completedCount = completedTopics.length;

    chapters.forEach((chapter) => {
      totalTopics += chapter.topics?.length || 0;
    });

    const percentage = totalTopics > 0 ? Math.min((completedCount / totalTopics) * 100, 100) : 0;
    setProgress(Math.round(percentage));
  }, [completedTopics, chapters]);

  const toggleChapter = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setOpenTopicIndex(null);
  };

  const handleLockedChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const handleGoToPricing = () => {
    setIsModalOpen(false);
    navigate("/pricing");
  };

  return (
    <>
      <div
        className={`col-3 sidebar ${sidebarStatus ? "open" : "closed"}`}
        style={{
          position: "sticky",
          top: 0,
          height: "92vh",
          overflowY: "auto",
          backgroundColor: "#f8f9fa",
          borderRight: "1px solid #ddd",
        }}
      >
        <div className="d-flex justify-content-between align-items-center px-2 pb-2" style={{ marginTop: "15px" }}>
          <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "0", fontSize: "18px" }}>
            Course Content
          </p>
          <div className="d-flex flex-column align-items-end">
            <p style={{ fontSize: "12px", fontWeight: "450", margin: 0 }}>
              {progress}% Completed
            </p>
            <Progress
              percent={progress}
              showInfo={false}
              strokeColor="#11aaa5"
              trailColor="#e0e0e0"
              style={{ width: "100px", marginTop: "2px" }}
              strokeWidth={6} // Adjust the height here

            />
          </div>
        </div>

        {/* Progress Bar */}

        {chapters.map((chapter, i) => {
          const isPaid =
            chapter.paid === true ||
            chapter.paid === "true" ||
            chapter.paid === "paid";
          return (
            <div key={chapter._id}>
              <div
                className="d-flex justify-content-between sidebar-item"
                onClick={() => {
                  if (!isPremium && isPaid) {
                    handleLockedChapterClick(chapter);
                  } else {
                    toggleChapter(i);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="accordion-body gap-5 ps-0">
                  <span
                    className="pe-3"
                    style={{ color: !isPremium && isPaid ? "gray" : "#06857a" }}
                  >
                    Chapter {i + 1}.{" "}
                  </span>
                  <span style={{ color: !isPremium && isPaid ? "gray" : "#06857a" }}>
                    {chapter.chaptertitle || ""}
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <span
                    className="px-1"
                    style={{ color: !isPremium && isPaid ? "gray" : "#06857a" }}
                  >
                    Topics: {chapter.topics ? chapter.topics.length : 0}
                  </span>
                  <span
                    className={`px-1 transition-icon ${openIndex === i ? "rotate-90" : ""
                      }`}
                    style={{ color: !isPremium && isPaid ? "gray" : "#06857a" }}
                  >
                    <MdOutlineNavigateNext />
                  </span>
                  {!isPremium && isPaid && <GoLock className="ms-2" style={{ color: "gray" }} />}
                </div>
              </div>
              <div className={`collapse bg-white ${openIndex === i ? "show" : ""}`}>
                {(chapter.topics || []).map((topic, j) => (
                  <div key={topic._id}>
                    <Link
                      to={`/topic-details/${topic.courseid || chapter.courseid}/${chapter._id}/${topic._id}`}
                      className={`d-flex justify-content-between px-2 py-2 title ${openIndex === i && openTopicIndex === j ? "active" : ""
                        }`}
                      style={{ textDecoration: "none" }}
                      onClick={(e) => {
                        if (!isPremium && isPaid) {
                          e.preventDefault();
                          handleLockedChapterClick(chapter);
                        } else {
                          setOpenIndex(i);
                          setOpenTopicIndex(j);
                          if (window.innerWidth < 768) {
                            toggleSidebar && toggleSidebar(false);
                          }
                        }
                      }}
                    >
                      <div className="topic-title d-flex align-items-center gap-2">
                        {completedTopics && completedTopics.includes(topic._id) && (
                          <span className="tick-icon">
                            <MdCheckCircle color="#11aaa5" size={20} />
                          </span>
                        )}
                        {j + 1} {topic.title}
                      </div>

                    </Link>
                  </div>
                ))}
              </div>
              <div className="divider" />
            </div>
          );
        })}
      </div>
      <Modal
        title="Paid Chapter"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="pricing" type="primary" onClick={handleGoToPricing}>
            Go to Pricing
          </Button>,
        ]}
      >
        <p>This chapter is paid. Purchase the course to access this content.</p>
      </Modal>
    </>
  );
};

export default Sidebar;
