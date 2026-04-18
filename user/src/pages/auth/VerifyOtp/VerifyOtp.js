import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import "../UserLogin/UserLogin.css";

function VerifyOtp() {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");


  const {email}=useParams();

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      message.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/verify-otp`, { email, otp }, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json'
        }
      });

      message.success(res.data.message);
      // Clear the stored email after verification
      // localStorage.removeItem("userEmail");

      // Navigate after successful verification
      navigate("/userlogin"); // or navigate("/reset-password") if using password reset flow
    } catch (err) {                                                         
      const errorMessage = err.response?.data?.message || "OTP verification failed";
      message.error(errorMessage);
    }
  };

  return (
    <div className="userlogin-container container mt-5" style={{ width: "50%", padding: "80px" }}>
      <div className="userlogin-form-box p-4 border rounded shadow-sm bg-white">
        <h4 className="fw-bold text-center">Verify OTP</h4>
        <div className="alert alert-success text-center" role="alert">
      OTP has been sent to <strong>{email}</strong>
    </div>
        <Form onSubmit={handleSubmit}>
          {/* Email Input */}
          {/* <Row className="mb-3">
            <InputGroup className="userlogin-input-group1">
              <Form.Control
                className="userlogin-input"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <InputGroup.Text className="userlogin-icon"><FaEnvelope /></InputGroup.Text>
            </InputGroup>
          </Row> */}

          {/* OTP Input */}
          <Row className="mb-3">
            <InputGroup className="userlogin-input-group">
              <Form.Control
                className="userlogin-input"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <InputGroup.Text className="userlogin-icon"><FaKey /></InputGroup.Text>
            </InputGroup>
          </Row>

          {/* Verify Button */}
          <Button type="submit" className="w-100 user-btn" style={{ backgroundColor: "#08A88A", border: "none" }}>
            Verify OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default VerifyOtp;
