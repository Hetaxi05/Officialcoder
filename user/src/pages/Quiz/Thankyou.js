import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Quiz.css"; // Reuse your Quiz styles for consistency
import "./Thankyou.css";

function ThankYou() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve score and total from the navigation state
    const { score, total } = location.state || { score: 0, total: 0 };

    const handleViewResults = () => {
        // Forward the state to the Result page
        navigate(`/quiz-result/${courseId}`, { state: { score, total } });
    };

    return (
        <div className="text-dark-container">
            <div
                className="container d-flex align-items-center justify-content-center"
               
            >
                <div className="thankyou-inner">
                    <div className="check">
                        <img src="/assets/image/checkmark.png"/>
                    </div>
                    <h1 className="thankyou-text">Thank You For Survey!</h1>
                    <span className="msg">Your submission has been received.Click the button below to view your quiz results. </span>
                    
                    
                    <button className="btn result-btn" onClick={handleViewResults} style={{ width: "200px", marginLeft: "35%" ,marginTop:"10px"}}>
                        View Results
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ThankYou;
