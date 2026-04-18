import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimesCircle } from "react-icons/fa";
import "./PaymentSuccess.css"; // We'll create this next

const PaymentFailed = () => {
  const handleBackToWebsite = () => {
    window.location.href = "/";
  };

  return (
    <div
      className="payment-failure d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}
    >
      <div className="payment-box text-center">
        <div className="falsemark-circle">
          <FaTimesCircle className="false-icon" size={64} style={{ color: "red" }} />
        </div>

        <h2 className="mt-4 fw-bold">Payment Failed</h2>
        <p className="mt-3 text-muted px-3">
          There was an error processing your payment. Please try again or contact support if the issue persists.
        </p>

        <button
          className="btn btn-primary mt-4 px-4 py-2"
          onClick={handleBackToWebsite}
        >
          Back to Website
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
