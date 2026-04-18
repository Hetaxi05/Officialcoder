import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "../UserLogin/UserLogin.css";

function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  

    const validateEmail = (email) => {
      return /^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(email);
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    let newErrors = { ...errors };
    if (name === "email" && !validateEmail(value)) newErrors.email = "Please enter a valid email";
    else delete newErrors.email;

    if (name === "password" && !passwordRegex.test(value))
      newErrors.password = "Password must be at least 6 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    else delete newErrors.password;

    setErrors(newErrors);


  };

  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run frontend validation before sending API request
    // if (!validateForm()) return;

    if (Object.keys(errors).length > 0) {
          message.error("Please fix all errors before submitting.");
          return;
        }
    

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, formData);
      message.success(res.data.message);


      // ✅ Store JWT token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));


      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid email or password";

    if (errorMessage === "Your account is deactivated. Please contact admin.") {
      message.error("Your account is deactivated. Please contact admin.");
    } else {
      message.error(errorMessage);
    }
    }
  };

  return (
    <div className="userlogin-container container mt-5" style={{ width: "50%", padding: "80px" }}>
      <div className="userlogin-form-box p-4 border rounded shadow-sm bg-white">
        <h4 className="fw-bold text-center">User Login</h4>
        <Form onSubmit={handleSubmit}>
          {/* Email Input */}
          <Row className="mb-3">
            <InputGroup className="userlogin-input-group1">
              <Form.Control
              className="userlogin-input"
                type="email"
                name="email"
                placeholder="Your Email" value={formData.email}
                onChange={handleChange}
                required
                isInvalid={!!errors.email}
              />
              <InputGroup.Text className="userlogin-icon"><FaEnvelope /></InputGroup.Text>
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </InputGroup>
          </Row>

          {/* Password Input */}
          <Row className="mb-3">
            <InputGroup className="userlogin-input-group">
              <Form.Control 
                            className="userlogin-input"

              type={passwordVisible ? "text" : "password"} name="password" placeholder="Your Password" value={formData.password} onChange={handleChange} required isInvalid={!!errors.password} />
              <InputGroup.Text className="userlogin-icon">
                {passwordVisible ? (
                  <AiFillEye onClick={() => setPasswordVisible(false)} style={{ cursor: "pointer" }} />
                  ) : (
                  <AiFillEyeInvisible onClick={() => setPasswordVisible(true)} style={{ cursor: "pointer" }} />
                  )}
              </InputGroup.Text>
              <Form.Control.Feedback  className="pwd-error"  type="invalid">{errors.password}</Form.Control.Feedback>
            </InputGroup>
          </Row>

          {/* Submit Button */}
          <Button type="submit" className="w-100 user-btn" style={{ backgroundColor: "#08A88A", border: "none" }}>
            Login
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
