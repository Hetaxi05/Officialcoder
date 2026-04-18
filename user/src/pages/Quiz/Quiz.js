import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import './Quiz.css';

// function ToggleSwitchIcon({ isOn = false, width = 60, height = 30 }) {
//   const circleCX = isOn ? width * 0.75 : width * 0.25;
//   const circleRadius = (height / 2) - 2;
//   const trackColor = isOn ? "#333" : "#ccc";
//   const circleColor = "#fff";

//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         x="0"
//         y="0"
//         width={width}
//         height={height}
//         rx={height / 2}
//         ry={height / 2}
//         fill={trackColor}
//       />
//       <circle
//         cx={circleCX}
//         cy={height / 2}
//         r={circleRadius}
//         fill={circleColor}
//       />
//     </svg>
//   );
// }

const stripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store selected answers as full text (not just labels)
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fetch quiz data when courseId is available
  useEffect(() => {
    if (courseId) {
      fetchQuizByCourse();
    }
  }, [courseId]);

  function fetchQuizByCourse() {
    fetch(`${process.env.REACT_APP_API_URL}/quiz?courseid=${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched quizzes: ", data);
        setQuizData(data);
        setProgress(0);
      })
      .catch((err) => {
        alert("Error fetching quiz: " + err);
      });
  }

  // Destructure current question data
  const { question, option = [], answer: correctAnswer } = quizData[currentQuestionIndex] || {};
  const optionLabels = ["A", "B", "C", "D","E","F"];

  // Handle user selection by storing the full option text
  const handleOptionChange = (optionText) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionText,
    }));
  };

  // Calculate progress for progress bar (each question contributes equally)
  // const progressPerQuestion = quizData.length ? 100 / quizData.length : 0;
  // const progress = progressPerQuestion * currentQuestionIndex;

  const handleNext = () => {
    // If no answer selected for the current question, show modal
    if (!selectedOptions[currentQuestionIndex]) {
      setShowModal(true);
      return;
    }

    if (currentQuestionIndex < quizData.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      // [Changed] Update progress based on new question index
      setProgress((newIndex / quizData.length) * 100);
    } else {
      // Calculate final score by comparing each answer using stripHtml
      let finalScore = 0;
      quizData.forEach((q, index) => {
        const cleanCorrect = stripHtml(q.answer).trim();
        const cleanSelected = selectedOptions[index]
          ? stripHtml(selectedOptions[index]).trim()
          : "";
        if (cleanSelected === cleanCorrect) {
          finalScore++;
        }
      });
      // Navigate to the thank you page with the final score
      navigate(`/quiz-thankyou/${courseId}`, {
        state: { score: finalScore, total: quizData.length }
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      // [Changed] Update progress when going back
      setProgress((newIndex / quizData.length) * 100);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`topicquiz-container ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className="container py-4">
        {/* Header with theme toggle */}
        <div className="d-flex justify-content-end">
          <button 
            onClick={handleThemeToggle} 
            style={{ border: "none", background: "transparent", cursor: "pointer" }}
          >
            {/* <ToggleSwitchIcon isOn={isDarkMode} width={54} height={24} /> */}
          </button>
        </div>

        {/* Show loading if quiz data is not ready */}
        {quizData.length === 0 ? (
          <div className="text-center">Loading Quiz...</div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <button className="quiz-number-btn mb-3">
                Question {currentQuestionIndex + 1} / {quizData.length}
              </button>
              <h2 
                className="topicquiz-title" 
                dangerouslySetInnerHTML={{ __html: stripHtml(question) }}
              ></h2>

              <div className="borderc">
                <div className="options-list">
                  {option.map((optionObj, index) => {
                    const label = optionLabels[index];
                    const optionText = stripHtml(optionObj.text);
                    return (
                      <label 
                        key={index} 
                        className={`option-item ${selectedOptions[currentQuestionIndex] === optionText ? "selected" : ""}`}
                        data-option={label}
                        onClick={() => handleOptionChange(optionText)}
                      >
                        <span className="option-letter">{label}</span>
                        <span className="option-text" dangerouslySetInnerHTML={{ __html: optionText }}></span>
                        {selectedOptions[currentQuestionIndex] === optionText && (
                          <span className="option-check">&#10003;</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="topicquiz-footer">
                <div className="footer-left">
                  {currentQuestionIndex > 0 && (
                    <button className="btn continue-btn" onClick={handlePrevious}>
                      Back
                    </button>
                  )}
                </div>
                <div className="footer-right">
                  <button className="btn continue-btn" onClick={handleNext}>
                    {currentQuestionIndex === quizData.length - 1 ? "Finish" : "Continue"}
                  </button>
                </div>
                <div className="small-progressbar-container">
                  <div className="progress-label">{Math.round(progress)}%</div>
                  <div className="small-progressbar">
                    <div className="small-progressbar-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for missing answer */}
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
    </div>
  );
}

export default Quiz;
