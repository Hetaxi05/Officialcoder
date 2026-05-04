import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "../ChangePassword/ChangePassword.css"

function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });


  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email) {
          setUserEmail(parsedUser.email);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    let newErrors = { ...errors };

    if (name === "password" && !passwordRegex.test(value))
      newErrors.password = "Password must be at least 6 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    else delete newErrors.password;

    setErrors(newErrors);

  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required.";
      valid = false;
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required.";
      valid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters.";
      valid = false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!userEmail) {
      message.error("User email not found. Please login again.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/change-password`,
        {
          email: userEmail,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        }
      );
      message.success(res.data.message);
      navigate("/"); 
    } catch (err) {
      message.error(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="container mt-5 change-password-container" style={{ width: "50%", padding: "80px" }}>
      <div className=" change-password-box p-4 border rounded shadow-sm bg-white">
        <h4 className="fw-bold text-center">Change Password</h4>
        <Form onSubmit={handleSubmit}>
          {/* Old Password Input */}
          <Row className="mb-3">
            <InputGroup className="user-pwd-input-group">
              <Form.Control
                type={passwordVisibility.oldPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Old Password"
                value={formData.oldPassword}
                onChange={handleChange}
                required
                isInvalid={!!errors.oldPassword}
              />

              <InputGroup.Text className="pwd-icon">
                {passwordVisibility.oldPassword ? (
                  <AiFillEye onClick={() => setPasswordVisibility(prev => ({ ...prev, oldPassword: false }))} style={{ cursor: "pointer" }} />
                ) : (
                  <AiFillEyeInvisible onClick={() => setPasswordVisibility(prev => ({ ...prev, oldPassword: true }))} style={{ cursor: "pointer" }} />
                )}
              </InputGroup.Text>

              <Form.Control.Feedback type="invalid" className="pwd-error">
                {errors.oldPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Row>
          {/* New Password Input */}
          <Row className="mb-3">
            <InputGroup className="user-pwd-input-group">
              <Form.Control
                type={passwordVisibility.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                isInvalid={!!errors.newPassword}
              />

              <InputGroup.Text className="pwd-icon">
                {passwordVisibility.newPassword ? (
                  <AiFillEye onClick={() => setPasswordVisibility(prev => ({ ...prev, newPassword: false }))} style={{ cursor: "pointer" }} />
                ) : (
                  <AiFillEyeInvisible onClick={() => setPasswordVisibility(prev => ({ ...prev, newPassword: true }))} style={{ cursor: "pointer" }} />
                )}
              </InputGroup.Text>

              <Form.Control.Feedback className="pwd-error" type="invalid">{errors.newPassword}</Form.Control.Feedback>
            </InputGroup>
          </Row>
          {/* Confirm New Password Input */}
          <Row className="mb-3">
            <InputGroup className="user-pwd-input-group">
              <Form.Control
                type={passwordVisibility.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                isInvalid={!!errors.confirmPassword}
              />

              <InputGroup.Text className="pwd-icon">
                {passwordVisibility.confirmPassword ? (
                  <AiFillEye onClick={() => setPasswordVisibility(prev => ({ ...prev, confirmPassword: false }))} style={{ cursor: "pointer" }} />
                ) : (
                  <AiFillEyeInvisible onClick={() => setPasswordVisibility(prev => ({ ...prev, confirmPassword: true }))} style={{ cursor: "pointer" }} />
                )}
              </InputGroup.Text>

              <Form.Control.Feedback type="invalid" className="pwd-error">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Row>

          <Button type="submit" className="w-100" style={{ backgroundColor: "#08A88A", border: "none" }}>
            Change Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
