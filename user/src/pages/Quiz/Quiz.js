import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import './Quiz.css';

const stripHtml = (html) => {
  if (!html) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);

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
        console.log("First quiz options: ", data[0]?.option);
        console.log("First quiz answer: ", data[0]?.answer);

        setQuizData(data);
        setProgress(0);
      })
      .catch((err) => {
        alert("Error fetching quiz: " + err);
      });
  }

  const { question, option = [] } = quizData[currentQuestionIndex] || {};
  const optionLabels = ["A", "B", "C", "D", "E", "F"];

  const handleOptionChange = (optionText, label) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        text: optionText,
        label: label,
      },
    }));
  };

  const handleNext = () => {
    if (!selectedOptions[currentQuestionIndex]) {
      setShowModal(true);
      return;
    }

    if (currentQuestionIndex < quizData.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setProgress((newIndex / quizData.length) * 100);
    } else {
      let finalScore = 0;

      quizData.forEach((q, index) => {
        const selected = selectedOptions[index];

        const cleanCorrect = stripHtml(q.answer).trim().toLowerCase();

        const selectedText = selected?.text
          ? stripHtml(selected.text).trim().toLowerCase()
          : "";

        const selectedLabel = selected?.label
          ? selected.label.trim().toLowerCase()
          : "";

        if (selectedText === cleanCorrect || selectedLabel === cleanCorrect) {
          finalScore++;
        }
      });

      navigate(`/quiz-thankyou/${courseId}`, {
        state: { score: finalScore, total: quizData.length },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setProgress((newIndex / quizData.length) * 100);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`topicquiz-container ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className="container py-4">
        <div className="d-flex justify-content-end">
          <button
            onClick={handleThemeToggle}
            style={{ border: "none", background: "transparent", cursor: "pointer" }}
          >
          </button>
        </div>

        {quizData.length === 0 ? (
          <div className="text-center">Loading Quiz...</div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <button className="quiz-number-btn mb-3">
                Question {currentQuestionIndex + 1} / {quizData.length}
              </button>

              <h2 className="topicquiz-title">
                {stripHtml(question)}
              </h2>

              <div className="borderc">
                <div className="options-list">
                  {option.map((optionObj, index) => {
                    const label = optionLabels[index];

                    const optionText = stripHtml(
                      typeof optionObj === "string"
                        ? optionObj
                        : optionObj?.text || ""
                    );

                    return (
                      <label
                        key={index}
                        className={`option-item ${
                          selectedOptions[currentQuestionIndex]?.text === optionText ? "selected" : ""
                        }`}
                        data-option={label}
                        onClick={() => handleOptionChange(optionText, label)}
                      >
                        <span className="option-letter">{label}</span>
                        <span className="option-text">{optionText}</span>

                        {selectedOptions[currentQuestionIndex]?.text === optionText && (
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
                    <div
                      className="small-progressbar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
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