import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "../UserRegister/UserReg.css"

function UserReg() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({}); // Store validation errors
  const [passwordVisible, setPasswordVisible] = useState(false);
  const statusBar = 1; // Default Active



  const validateEmail = (email) => {
    return /^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(email);
  };

  const nameRegex = /^[A-Za-z\s]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };

    if (name === "name" && !nameRegex.test(value)) newErrors.name = "Name can only contain letters and spaces.";
    else delete newErrors.name;

    if (name === "email" && !validateEmail(value)) newErrors.email = "Please enter a valid email";
    else delete newErrors.email;

    if (name === "password" && !passwordRegex.test(value))
      newErrors.password = "Password must be at least 6 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    else delete newErrors.password;

    // if (name === "location" && value.trim() === "") newErrors.location = "Location is required.";
    // else delete newErrors.location;

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      message.error("Please fix all errors before submitting.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`,
        {
          ...formData,
          statusBar: statusBar, // 👈 ADD THIS LINE
        });

      message.success(res.data.message);

      // Store user details and token in localStorage
      // localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email, location: formData.location }));
      // localStorage.setItem("token", res.data.token);

      navigate(`/verify-otp/${formData.email}`); // Redirect to dashboard after successful registration
    } catch (err) {
      message.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className=" user-container container mt-5" style={{ width: "50%", padding: "80px" }}>
      <div className=" user-form-box p-4 border rounded shadow-sm bg-white">
        <h4 className=" user-title fw-bold text-center">User Registration</h4>
        <Form onSubmit={handleSubmit}>
          
          <Row className="mb-3 ">
            <InputGroup className="user-input-group">
              <Form.Control className="user-input"
                type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required isInvalid={!!errors.name} />
              <InputGroup.Text className="user-icon"><FaUser /></InputGroup.Text>
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </InputGroup>
          </Row>

          <Row className="mb-3">
            <InputGroup className="user-input-group">
              <Form.Control type="email" className="user-input"
                name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required isInvalid={!!errors.email} />
              <InputGroup.Text className="user-icon"><FaEnvelope /></InputGroup.Text>
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </InputGroup>
          </Row>

          <Row className="mb-3">
            <InputGroup className="user-input-group">
              <Form.Control className="user-input"
                type={passwordVisible ? "text" : "password"} name="password" placeholder="Your Password" value={formData.password} onChange={handleChange} required isInvalid={!!errors.password} />
              <InputGroup.Text className="user-icon">
                {passwordVisible ? (
                  <AiFillEye onClick={() => setPasswordVisible(false)} style={{ cursor: "pointer" }} />
                ) : (
                  <AiFillEyeInvisible onClick={() => setPasswordVisible(true)} style={{ cursor: "pointer" }} />
                )}
              </InputGroup.Text>
              <Form.Control.Feedback  className="pwd-error"  type="invalid">{errors.password}</Form.Control.Feedback>
              
            </InputGroup>
          </Row>

          {/* <Row className="mb-3">
            <InputGroup>
              <Form.Control type="text" name="location" placeholder="Your Location" value={formData.location} onChange={handleChange} required isInvalid={!!errors.location} />
              <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
              <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
            </InputGroup>
          </Row> */}

          <Button type="submit" className="w-100 user-btn" style={{ backgroundColor: "#08A88A", border: "none" }} disabled={Object.keys(errors).length > 0}>
            Register
          </Button>

        </Form>
        <p className="user-login-text text-center mt-3">
          Already have an account? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/userlogin")}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default UserReg;
