import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Quiz.css";
import Swal from "sweetalert2";

function Result() {
    const { courseId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { score, total } = location.state || { score: 0, total: 0 };

    const percentage = total > 0 ? score / total : 0;

    const handleGoHome = () => {
        if (percentage < 0.6) {
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
            navigate(`/certificate/${courseId}`);
        }
    };

    return (
        <div className="bg-light text-dark-container" style={{ minHeight: "100vh" }}>
            <div
                className="container d-flex align-items-center justify-content-center"
                style={{ minHeight: "80vh" }}
            >
                <div className="thankyou-inner">
                    <h2 className="mb-3" style={{ marginTop: "1px" }}>
                        Quiz Results
                    </h2>

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