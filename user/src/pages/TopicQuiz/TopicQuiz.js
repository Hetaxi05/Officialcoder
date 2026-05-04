import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import './TopicQuiz.css';

function TopicQuiz() {
  const location = useLocation();
  const { courseId, chapterId, topicId, nextTopicId, nextChapterId } = location.state || {};
  const navigate = useNavigate();

  const [questionsData, setQuestionsData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [animationStatus, setAnimationStatus] = useState("");

  // Labels for my quiz options
  const optionLabels = ["A", "B", "C", "D", "E", "F"];

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsPremium(userData.isPremium || false);
    }
  }, []);

  useEffect(() => {
    if (!topicId) {
      console.error("Topic ID is undefined!");
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/quiz/topic/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length === 0) {
          if (nextTopicId) {
            const targetChapterId = (nextChapterId && nextChapterId !== chapterId) ? nextChapterId : chapterId;
            navigate(`/topic-details/${courseId}/${targetChapterId}/${nextTopicId}`, { state: { initialSubtopicIndex: 0 } });
          } else {
            console.info("No quiz data and no next topic.");
          }
          return;
        }
        setQuestionsData(data);
        setSelectedOptions(Array(data.length).fill(''));
        setProgress(0);
      })
      .catch((err) => console.error("Error fetching quiz:", err));
  }, [topicId, chapterId, courseId, navigate, nextChapterId, nextTopicId]);

  if (questionsData.length === 0) {
    return <div className="loading">Loading Quiz...</div>;
  }

  const currentQuestion = questionsData[currentQuestionIndex] || {};
  const selectedOption = selectedOptions[currentQuestionIndex] || "";

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Handle user option selection
  const handleOptionChange = (selectedLabel) => {
    const updatedSelected = [...selectedOptions];
    updatedSelected[currentQuestionIndex] = selectedLabel;
    setSelectedOptions(updatedSelected);

    const optionIndex = optionLabels.indexOf(selectedLabel);
    if (currentQuestion.option && currentQuestion.option[optionIndex]) {
      const chosenText = currentQuestion.option[optionIndex].text.trim();
      const correctAnswer = currentQuestion.answer.trim();

      if (chosenText === correctAnswer) {
        setAnimationStatus("correct");
        fireConfetti();
      } else {
        setAnimationStatus("incorrect");
      }
      setTimeout(() => {
        setAnimationStatus("");
      }, 1000);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setProgress(((newIndex) / questionsData.length) * 100);
    } else {

      if (nextTopicId) {
        const targetChapterId =
          nextChapterId && nextChapterId !== chapterId ? nextChapterId : chapterId;
        if (targetChapterId !== chapterId) {
          fetch(`${process.env.REACT_APP_API_URL}/chap/${targetChapterId}`)
            .then((res) => res.json())
            .then((latestChapterData) => {
              if (
                latestChapterData.paid === true ||
                latestChapterData.paid === "true" ||
                latestChapterData.paid === "paid"
              ) {
                if (isPremium) {
                  navigate(
                    `/topic-details/${courseId}/${targetChapterId}/${nextTopicId}`,
                    { state: { initialSubtopicIndex: 0, hideContent: false } }
                  );
                } else {
                  setShowPaidModal(true);
                }
              } else {
                navigate(
                  `/topic-details/${courseId}/${targetChapterId}/${nextTopicId}`,
                  { state: { initialSubtopicIndex: 0, hideContent: false } }
                );
              }
            })
            .catch((error) => {
              console.error("Error fetching next chapter data:", error);
              setShowPaidModal(true);
            });
        } else {
          navigate(
            `/topic-details/${courseId}/${targetChapterId}/${nextTopicId}`,
            { state: { initialSubtopicIndex: 0, hideContent: false } }
          );
        }
      } else {
        fetch(`${process.env.REACT_APP_API_URL}/chap/course/${courseId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.length > 0) {
              const firstChapter = data[0];
              if (firstChapter.topics && firstChapter.topics.length > 0) {
                const firstTopic = firstChapter.topics[0];
                navigate(
                  `/topic-details/${courseId}/${firstChapter._id}/${firstTopic._id}`,
                  { state: { initialSubtopicIndex: 0 } }
                );
              } else {
                console.error("First chapter has no topics.");
              }
            } else {
              console.error("No chapters found for this course.");
            }
          })
          .catch((err) => console.error("Error fetching course chapters:", err));
      }
    }
  };


  const handleContinue = () => {
    if (!selectedOptions[currentQuestionIndex]) {
      setShowModal(true);
      return;
    }
    goToNext();
  };

  const handleSkip = () => {
    goToNext();
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setProgress((newIndex / questionsData.length) * 100);
    }
  };

  const handlePaidOk = () => {
    setShowPaidModal(false);
    navigate(`/topic-details/${courseId}/${nextChapterId}/${nextTopicId}`, { state: { initialSubtopicIndex: -1, hideContent: true } });
  };

  const handlePaidPricing = () => {
    setShowPaidModal(false);
    navigate("/pricing");
  };

  return (
    <div className="topicquiz-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <button className="topicquiz-number-btn">
              Question {currentQuestionIndex + 1}/{questionsData.length}
            </button>
            <div className="skip-text" onClick={handleSkip} style={{ marginLeft: "64%", cursor: 'pointer' }}>
              Skip
            </div>
            <h2
              className="topicquiz-title"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />
            <div className="borderc">
              <div className="options-list">
                {currentQuestion.option.map((option, index) => {
                  const label = optionLabels[index];
                  const optionValue = option.text || "";
                  const isSelected = selectedOption === label;


                  let animationClass = "";
                  if (isSelected && animationStatus === "correct") {
                    animationClass = "correct-animation";
                  } else if (isSelected && animationStatus === "incorrect") {
                    animationClass = "incorrect-animation";
                  }

                  return (
                    <label
                      key={index}
                      className={`option-item ${isSelected ? "selected" : ""} ${animationClass}`}
                      data-option={label}
                    >
                      <input
                        type="radio"
                        name={`question${currentQuestionIndex}`}
                        value={label}
                        checked={isSelected}
                        onChange={() => handleOptionChange(label)}
                      />
                      <span className="option-letter">{label}</span>
                      <span
                        className="option-text"
                        dangerouslySetInnerHTML={{ __html: optionValue }}
                      />
                      <span className="option-check">&#10003;</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="topicquiz-footer">
              <div className="footer-left">
                {currentQuestionIndex > 0 && (
                  <button className="btnn back-btn ms-2 ps-4 pe-4" onClick={handleBack}>
                    Back
                  </button>
                )}
              </div>
              <div className="footer-right">
                <button className="btnn topic-continue-btn" onClick={handleContinue}>
                  Continue
                </button>
              </div>
              <div className="small-progressbar-container">
                <div className="progress-label">{Math.round(progress)}%</div>
                <div className="small-progressbar">
                  <div
                    className="small-progressbar-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
            <div className="modal-icon">⚠️</div>
            <h3>Oops! You missed something...</h3>
            <p>Please select an answer before proceeding to the next question.</p>
            <button className="custom-modal-button" onClick={() => setShowModal(false)}>
              Got it!
            </button>
          </div>
        </div>
      )}

      {showPaidModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <span className="close-btn" onClick={() => setShowPaidModal(false)}>&times;</span>
            <div className="modal-icon">💰</div>
            <h3>Next Chapter Paid</h3>
            <p>The next chapter is paid. You need to complete the payment to access it.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button className="custom-modal-button" onClick={handlePaidOk}>OK</button>
              <button className="custom-modal-button" onClick={handlePaidPricing}>Pricing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicQuiz;
