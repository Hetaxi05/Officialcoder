import React, { useState,useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; 
import "./course_information.css";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";


const Courseinformation = ({ courseId }) => {
    const [showModal, setShowModal] = useState(false);
    const [courseDetails, setCourseDetails] = useState(null);
    const [lessionCount, setLessionCount] = useState(0);
    const courseUrl = window.location.href;

    useEffect(() => {
       
        fetch(`${process.env.REACT_APP_API_URL}/cour/lession/count/${courseId}`) 
        
            .then((response) => response.json()) 
            
            .then((data) => {
                console.log("Fetched Course Data:", data);
                setCourseDetails(data.course);
                setLessionCount(data.totalTopics); 
            })
            .catch((error) => {
                console.error("Error fetching course details:", error);
            });
    }, [courseId]); 

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(courseUrl)
            .then(() => handleClose()) 
            .catch(err => console.error("Copy failed: ", err));
    };

    return (
        <>
            <div className="cols ms-5" style={{ width: "28%" }}>
                <div className="card " style={{ padding: "25px" }}>
                    <p className="fw-bold" style={{ fontSize: "23px" }}>Course Information</p>
                    <ul className="list-unstyled ">
                        <hr className="dotted-line" />

                        <li className="d-flex align-items-center mb-2 pb-3 gap-1" style={{ padding: "10px" }}>
                            <BsFillPersonFill style={{ color: "#07a698" }} className="me-2" />
                            <b>Instructor:</b>
                            <p className="align-items-center mb-0" style={{ color: "#6c706f", fontWeight: "500" }}>Coding House</p>
                        </li>
                        <li className="d-flex align-items-center pb-3  mb-2 gap-1" style={{ padding: "10px" }}>
                            <AiOutlineFileText style={{ color: "#07a698" }} className="me-2" />
                            <b>Lessons:</b>
                            <p className="align-items-center mb-0" style={{ color: "#6c706f", fontWeight: "500" }}>{lessionCount||"0"}</p>
                        </li>
                        <li className="d-flex align-items-center pb-3 mb-2 gap-1" style={{ padding: "10px" }}>
                            <IoMdTime style={{ color: "#07a698" }} className="me-2" />
                            <b>Duration:</b>
                            <p className="align-items-center mb-0" style={{ color: "#6c706f", fontWeight: "500" }}>
                                {courseDetails ? courseDetails.duration : "Loading..."}
                            </p>
                        </li>
                        <li className="d-flex align-items-center pb-3  mb-2 " style={{ padding: "10px", gap: "3px" }}>
                            <FaGraduationCap style={{ color: "#07a698" }} className="me-2" />
                            <b>Course level:</b>
                            <p className="align-items-center mb-0" style={{ color: "#6c706f", fontWeight: "500" }}>Beginners</p>
                        </li>
                        <li className="d-flex align-items-center pb-3  mb-2 gap-1" style={{ padding: "10px" }}>
                            <GiEarthAmerica style={{ color: "#07a698" }} className="me-2" />
                            <b>Language:</b>
                            <p className="align-items-center mb-0" style={{ color: "#6c706f", fontWeight: "500" }}>English</p>
                        </li>
                        <li className="d-flex align-items-center pb-3  mb-2 gap-1" style={{ padding: "10px" }}>
                            <BsQuestionCircle style={{ color: "#07a698" }} className="me-2" />
                            <b>Quizzes:</b>
                            <p className="align-items-center mb-0" style={{ color: "#6c706f", fontWeight: "500" }}>04</p>
                        </li>
                    </ul>

                    <div className="col">

                        <button className="button p-3 ps-1  pe-1 d-flex " onClick={handleShow}> <p className="mb-0"><img style={{ marginRight: "10px" }} src="/assets/image/category-1.png" width="25px" height="25px" ></img></p><p className="mb-0 ">Share This Course</p></button>
                    </div>

                </div>
            </div>

          
            <Modal show={showModal} onHide={handleClose} centered>
                
                <Modal.Body>
                    <p>Copy this course link:</p>
                    <p style={{ wordBreak: "break-word", color: "#007bff" }}>{courseUrl}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCopy}>
                        Copy
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Courseinformation;
