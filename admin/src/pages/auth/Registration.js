import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { FaUser, FaLock,FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Registration() {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("Form submitted:", formData);

    axios.post(`${process.env.REACT_APP_API_URL}/user/api/admin/login/`, formData).then((res) => {
      alert(res.data.message);
      console.log(res.data.user)
      navigate("/dashbaord")
    }).catch((err) => {
      alert(err);
    })
  };


  return (
    <>
      <div className="container mt-5" style={{ width: "50%", padding: "80px" }}>
        <div className="p-4 border rounded shadow-sm bg-white">
          <h4 className="fw-bold" style={{ textAlign: "center" }}>Registration Here</h4>
          <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
              <InputGroup>
                <Form.Control type="text" name="name" placeholder=" Your Name" onChange={handleChange} />
                <InputGroup.Text><FaUser /></InputGroup.Text>
              </InputGroup>
            </Row>
            <Row className="mb-3">
              <InputGroup>
                <Form.Control type="email" name="email" placeholder=" Your Email" onChange={handleChange} />
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
              </InputGroup>
            </Row>
            <Row className="mb-3">
              <InputGroup>
                <Form.Control type="password" name="password" placeholder="Your Password" onChange={handleChange} />
                <InputGroup.Text><FaLock /></InputGroup.Text>
              </InputGroup>
            </Row>
            <Button type="submit" className="w-100" style={{ backgroundColor: "#08A88A", border: "none" }}>Registered</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Registration;


