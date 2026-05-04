import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons

import { useNavigate } from "react-router-dom";
import { message } from "antd"; // Import Ant Design

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("Form submitted:", formData);

    axios
      .post(`${process.env.REACT_APP_API_URL}/admin/login/`, formData)
      .then((res) => {
        if (res.data.admin) {
          localStorage.setItem("admin", JSON.stringify(res.data.admin))
          navigate("/dashboard");
        }
        message.success(res.data.message); // Success message

      })
      .catch((err) => {
        message.error("Invalid email or password"); // Error message
      });
  };

  return (
    <>
      <div className="container mt-5" style={{ width: "50%", padding: "80px" }}>
        <div className="p-4 border rounded shadow-sm bg-white">
          <h4 className="fw-bold" style={{ textAlign: "center" }}>Admin Login</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <InputGroup>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                />
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
              </InputGroup>
            </Row>

            <Row className="mb-3">
              <InputGroup>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Your Password"
                  onChange={handleChange}
                />
                <InputGroup.Text>
                  {passwordVisible ? (
                    <AiFillEye onClick={() => setPasswordVisible(false)} style={{ cursor: "pointer" }} />
                  ) : (
                    <AiFillEyeInvisible onClick={() => setPasswordVisible(true)} style={{ cursor: "pointer" }} />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Row>

            <Button
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#08A88A", border: "none" }}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
