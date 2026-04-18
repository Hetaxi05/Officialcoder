import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Quiz.css"; // Reuse your Quiz styles for consistency
import Swal from "sweetalert2";

function Result() {
    const { courseId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total } = location.state || { score: 0, total: 0 };

    // const handleGoHome = () => {
    //     navigate("/certificate"); // Change this route if you want a different action
    // };
    const handleGoHome = () => {
        // Check if score is at least 60% of total
        if (score / total < 0.5) {
            // Show popup if the user hasn't reached 60%
            Swal.fire({
                title: "Certificate Unavailable",
                text: "You did not score enough to get a certificate. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-danger",
                },
                buttonsStyling: false,
            });
        } else {
            // Navigate to certificate page if 60% or higher
            navigate(`/certificate/${courseId}`); // Change this route if you want a different action

            // navigate("/certificate");
        }
    };

    return (
        <div className="bg-light text-dark-container" style={{ minHeight: "100vh" }}>
            <div
                className="container d-flex align-items-center justify-content-center"
                style={{ minHeight: "80vh" }}
            >
                <div
                    className="thankyou-inner"
                    
                >
                    {/* Replace the image source with your result image if available */}
                    {/* <img 
                        src="./assets/image/result.png" 
                        width="80px" 
                        height="80px" 
                        style={{ left:"100px", marginLeft:"470px", marginTop:"50px" }}
                        alt="Quiz Result" 
                    /> */}
                    <h2 className="mb-3" style={{ marginTop: "1px" }}>Quiz Results</h2>
                    {/* <p className="mb-4">
                        You scored {score} out of {total}!
                    </p> */}
                    <p style={{ fontSize: "18px", marginBottom: "30px", color: "#495057" }}>
                        You scored{" "}
                        <strong style={{ fontSize: "22px", color: "#07a698" }}>
                            {score}
                        </strong>{" "}
                        out of{" "}
                        <strong style={{ fontSize: "22px", color: "#07a698" }}>
                            {total}
                        </strong>{" "}
                        !
                    </p>

                    <button
                        className="btn btn-continue"
                        onClick={handleGoHome}
                        style={{ width: "200px", marginLeft: "10px" }}
                    >
                        Get Certificate
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Result;
