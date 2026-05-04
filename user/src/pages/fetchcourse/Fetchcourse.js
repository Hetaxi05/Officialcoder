// FetchCoursecard.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoEyeOutline, IoDocumentOutline } from "react-icons/io5";
import Course from "../course/course";
import "../fetchcourse/FetchCourse.css";
function FetchCoursecard() {
    // Get the categoryId from the URL parameters
    const { categoryId } = useParams();
    const [course, setCourse] = useState([]);

    useEffect(() => {
        getAllCourse();
    }, [categoryId]);

    function getAllCourse() {
        fetch(`${process.env.REACT_APP_API_URL}/cour/category/${categoryId}`)
            .then((response) => response.json())
            .then((data) => {
                setCourse(data);
            })
            .catch((err) => {
                alert("Error fetching: " + err);
            });
    }

    return (
        <>
            <Course />

            {/* Top Bar */}
            <div className="container-fluid pt-5 p-5" style={{ backgroundColor: "#f5f5f5" }}>

                <div className="text-center">
                    <div className="heading-btn btn ps-1 pe-3 mb-4 pb-1 text-center">
                        <span className="pe-2">
                            <img
                                className="img"
                                src="/assets/image/category-1.png"
                                alt="courses category"
                                width="30px"
                                height="30px"
                                style={{ backgroundColor: "#f0f0f0", padding: "5px" }}
                            />
                        </span>
                        Our Course Categories
                    </div>

                    <h2 className=" mb-4 text-center" style={{ fontfamily: " serif" }}><b>Explore Featured Courses</b></h2>
                </div>
                <div className=" flex-grow-10 mt-5 ">
                    <div className="row row-cols-3">
                        {course.map((item, index) => (
                            <div className="col-4" key={index}>
                                <div className="course-container border mb-5 p-4">
                                    <div className="course-image">
                                        <img
                                            src={item.image}
                                            alt="Course Image"
                                            style={{ width: "100%", height: "180px", objectFit: "cover", borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
                                        />
                                    </div>

                                    <div className="course-content p-0 pt-4">
                                        <div className="tags">
                                            <span className="skill">{item.tag}</span>
                                        </div>
                                        <h1 className="course-title mb-4 ps-1 pt-2">{item.coursename}</h1>

                                        <div className="course-meta">
                                            <p style={{ fontWeight: "500", color: "#9e9d9d", fontSize: "15px" }}>
                                                <IoDocumentOutline />  Lesson 0
                                            </p>
                                            <p style={{ fontWeight: "500", color: "#9e9d9d", fontSize: "15px" }}>
                                                <FaRegUser /> Students  50
                                            </p>
                                            <p style={{ fontWeight: "500", color: "#9e9d9d", fontSize: "15px" }}>
                                                <IoEyeOutline /> View  12K
                                            </p>
                                        </div>

                                        <div className="course-meta1  pt-3 mb-3 ">
                                            <p className="coursesimg  mb-0"><img src="/assets/image/category-1.png" alt="courses categori" width="30px" height="30px" style={{ backgroundColor: "#f0f0f0", padding: "5px", borderRadius: "90%", marginBottom: "none" }}></img>
                                            </p>
                                            <p className="Instructor pt-0 mb-0">CourseCode:<span style={{ color: "black" }}>{item.coursecode} </span></p>
                                            <p className="course-rating align-items-center pt-0">
                                                <p className="Instructor pt-2">Duration: <span style={{ color: "black" }}>{item.duration}</span></p>

                                            </p>
                                        </div>

                                        <hr className="my-1 pt-4" />
                                        <div className="d-flex justify-content-end">
                                            <Link
                                                to={`/course-details/${item._id}`}
                                                className="border ps-3 pe-3 ms-5 p-2"
                                                style={{
                                                    borderRadius: "220px",
                                                    textDecoration: "none",
                                                    color: "black",
                                                    padding: "10px 20px",
                                                    border: "2px solid transparent",
                                                    transition: "all 0.3s ease-in-out",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = "#009688"; // Teal color
                                                    e.target.style.color = "white";
                                                    e.target.style.borderRadius = "50px";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = "transparent";
                                                    e.target.style.color = "black";
                                                    e.target.style.borderRadius = "220px";
                                                }}
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FetchCoursecard;
