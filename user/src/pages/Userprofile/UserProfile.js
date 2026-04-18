import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, InputGroup, Card } from "react-bootstrap";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import "../Userprofile/Userprofile.css";

function UserProfile() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [oldEmail, setOldEmail] = useState("");
  const [userInquiries, setUserInquiries] = useState([]);

  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s]+$/;

  const validateEmail = (email) => {
    return /^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(email);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setFormData({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
        });

        setOldEmail(parsedUser.email || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (formData.email) {
      fetchUserInquiries(formData.email);
    }
  }, [formData.email]);

  const fetchUserInquiries = async (userEmail) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/contact`);
      const allInquiries = Array.isArray(res.data) ? res.data : [];

      const filteredInquiries = allInquiries.filter(
        (item) => item.email?.toLowerCase() === userEmail.toLowerCase()
      );

      setUserInquiries(filteredInquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setUserInquiries([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    let newErrors = { ...errors };

    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "Name is required";
      } else if (!nameRegex.test(value)) {
        newErrors.name = "Name can only contain letters and spaces.";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email";
      } else {
        delete newErrors.email;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      message.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      message.error("Please enter your email");
      return;
    }

    if (Object.keys(errors).length > 0) {
      message.error("Please fix all errors before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/update-profile`,
        {
          oldEmail,
          name: formData.name,
          email: formData.email,
        }
      );

      const updatedUser = {
        name: formData.name,
        email: formData.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setOldEmail(formData.email);

      message.success(res.data.message || "Profile updated successfully!");
      fetchUserInquiries(formData.email);
      navigate("/");
    } catch (err) {
      message.error(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div
      className="userProfile-container container mt-5"
      style={{ width: "70%", padding: "40px" }}
    >
      <div className="profile-container p-4 border rounded shadow-sm bg-white mb-4">
        <h4 className="fw-bold text-center mb-4">Update Profile</h4>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <InputGroup className="userprofile-input-group">
              <Form.Control
                className="userprofile-input"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                isInvalid={!!errors.name}
              />
              <InputGroup.Text className="userprofile-icon">
                <FaUser />
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </InputGroup>
          </Row>

          <Row className="mb-3">
            <InputGroup className="userprofile-input-group">
              <Form.Control
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={!!errors.email}
                className="userprofile-input"
              />
              <InputGroup.Text className="userprofile-icon">
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Row>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#08A88A", border: "none" }}
          >
            Update Profile
          </Button>
        </Form>
      </div>

      <div className="profile-container p-4 border rounded shadow-sm bg-white">
        <h4 className="fw-bold mb-4" style={{ color: "#08A88A" }}>
          Inquiry Replies
        </h4>

        {userInquiries.length > 0 ? (
          userInquiries.map((item) => (
            <Card key={item._id} className="mb-3 border-0 shadow-sm">
              <Card.Body>
                <p className="mb-2">
                  <strong>Subject:</strong> {item.subject}
                </p>

                <p className="mb-2">
                  <strong>Your Inquiry:</strong> {item.message}
                </p>

                <p className="mb-0">
                  <strong>Admin Reply:</strong>{" "}
                  {item.isMessageSent && item.adminReply
                    ? item.adminReply
                    : "No reply yet"}
                </p>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div
            style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              color: "#666",
            }}
          >
            No inquiries found.
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;