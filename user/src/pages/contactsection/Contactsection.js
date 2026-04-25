import React, { useState } from "react";
import { Target } from "react-feather";
import { FaUser, FaEnvelope, FaComment, FaChevronDown, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import './ContactSection.css'
const ContactSection = () => {

    const [hoveredItem, setHoveredItem] = useState(null);
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const iconBoxStyle = (item) => ({
        width: "50px",
        height: "50px",
        border: hoveredItem === item ? "none" : "1px solid #ddd",
        borderRadius: "10px",
        background: hoveredItem === item ? "#009688" : "#fff",
        color: hoveredItem === item ? "#fff" : "#009688",
        marginRight: "15px",
        transition: "all 0.3s ease",
        cursor: "pointer",
    });

    function AddContact(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "subject": subject,
                "message": message,
            })
        })
        .then((res) => res.json())  
        .then((data) => {
            alert(data);  
        })
        .catch((err) => {
            alert(err);
        });
    }
    
    function onchangeUsername(e){
        setUserName(e.target.value)
    }
    function onchangeEmail(e){
        setEmail(e.target.value)
    }
    function onchangesubject(e){
        setSubject(e.target.value)
    }
    function onchangeMessage(e){
        setMessage(e.target.value)
    }
    
    return (
        <div className="contact-container container mt-5 mb-5 " style={{ maxWidth: "100%" ,padding:"10px 150px" }}>
            <div className="row">
                <div className="col-lg-7">
                    <div className="mobile-contact contact-form" style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px", 
                        padding: "40px",
                        // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        background: "#fff"
                    }}>
                        <h1 style={{ color: "black", fontSize: "27px", fontFamily: "30px outfit, serif", fontWeight: "700" }}>Leave A Reply</h1>
                        <p class="" style={{ color: "#333", marginTop: "13px", fontFamily: "30px outfit, serif", color: "#605d5d" }}>Fill-up The Form and Message us of your amazing question</p>
                        <div className="request-form">
                            <form>
                                <div className="form-group row mt-4">
                                    <div className="col-md-6">
                                        <div className="position-relative">

                                            <input
                                                type="text"
                                                className="form-control ps-4 "
                                                placeholder="Your Name"
                                                style={{ padding: "11px", fontFamily: "30px outfit, serif", fontSize: "15px" }} 
                                                onChange={onchangeUsername}// Adjust padding to avoid overlap
                                            />
                                            <FaUser
                                                className="position-absolute"
                                                style={{
                                                    right: "12px",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    color: "#999",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="position-relative">

                                            <input
                                                type="text"
                                                className="form-control ps-4"
                                                placeholder="Your Email"
                                                style={{ padding: "11px", fontFamily: "30px outfit, serif", fontSize: "15px" }} // Adjust padding to avoid overlap
                                                onChange={onchangeEmail}
                                            />
                                            <FaEnvelope
                                                className="position-absolute"
                                                style={{
                                                    right: "12px",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    color: "#999",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row mt-4" >
                                    <div className="col-md-12">
                                        <div className="position-relative">
                                            {/* Selection Dropdown */}
                                            <select className="form-control ps-4" style={{ padding: "11px", color: "#605d5d", fontFamily: "30px outfit, serif", fontSize: "15px" }} onChange={onchangesubject}>
                                                <option value="" disabled selected  >
                                                    Select Subject
                                                </option>
                                                <option value="general">General Inquiry</option>
                                                <option value="support">Support Request</option>
                                                <option value="feedback">Feedback</option>
                                            </select>
                                            <FaChevronDown className="position-absolute"
                                                style={{
                                                    right: "12px",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    color: "#999",
                                                }} />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row mt-4">
                                    <div className="col-md-12">
                                        <div className="position-relative">
                                            <textarea
                                                className="form-control p-4"
                                                rows="4"
                                                placeholder="Message"
                                                style={{ fontFamily: "30px outfit, serif", fontSize: "15px" }}
                                                onChange={onchangeMessage}
                                            ></textarea>
                                            <FaComment className="position-absolute"
                                                style={{
                                                    right: "12px",
                                                    top: "15%",
                                                    transform: "translateY(-50%)",
                                                    color: "#999",
                                                }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row mt-4">
                                    <div className="col-md-12">
                                        <button className="btn w-100 " style={{ background: "#07A698", color: "white", padding: "11px", fontFamily: "30px outfit, serif", fontSize: "15px" }} onClick={AddContact}><b>Submit Message</b></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactSection