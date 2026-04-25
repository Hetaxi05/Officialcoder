import React,{useEffect,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PaymentSuccess.css"; // We'll create this next
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate=useNavigate();
  const [isUpdated, setIsUpdated] = useState(false); // Track update status

  const handleBackToWebsite = () => {
    navigate("/")
    // window.location.href = "/";
  };

  useEffect(() => {
    // Function to update user payment status in the database
    const handlePaymentSuccess = async () => {
      if (isUpdated) return; // Prevent multiple API calls

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        console.error("User ID not found!");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/${user._id}/payment-status`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isPremium: true }),
          }
        );

        const data = await response.json();

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user)); // Update localStorage
          setIsUpdated(true); // Mark update as completed
        }
      } catch (err) {
        console.error("Error updating payment status:", err);
      }
    };

    handlePaymentSuccess(); // Call function on page load
  }, [isUpdated]);
  
  return (
    <div className="payment-success d-flex align-items-center justify-content-center">
      <div className="payment-box text-center ">
      
        <div className="checkmark-circle">
          <FaCheckCircle className="check-icon" />

        </div>

        <h2 className="mt-4 fw-bold">Your payment successfully processed</h2>
        <p className="mt-3 text-muted px-3">
          We will review your ad and get back to you. On workdays, it usually
          happens within 24 hours. At that time, you’ll be notified via email.
          <br />
          <span className="fw-semibold">You reserved:</span> Main Ad Placement on April 14th.
          <br />
          <a href="#contact" className="text-decoration-none">
            Contact us
          </a>{" "}
          if something’s wrong.
        </p>

        <button
          className="btn btn-primary mt-4 px-4 py-2"
          onClick={handleBackToWebsite}
        >
          Back to Application
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
