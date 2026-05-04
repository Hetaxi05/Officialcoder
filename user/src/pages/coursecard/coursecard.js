import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./coursecard.css";
import { FaRegUser } from "react-icons/fa";
import { IoEyeOutline, IoDocumentOutline } from "react-icons/io5";

function Coursecard({ selectedCategory }) {
  const [courses, setCourses] = useState([]);
  const [lessonCounts, setLessonCounts] = useState({});

  useEffect(() => {
    let url =   `${process.env.REACT_APP_API_URL}/cour`;
    console.log(selectedCategory)
    if (selectedCategory) {
      url += `?category=${selectedCategory}`;
    }
    console.log("Fetching URL:", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Courses:", data);
        setCourses(data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, [selectedCategory]);

  useEffect(() => {
    courses.forEach((course) => {
      fetch(`${process.env.REACT_APP_API_URL}/cour/lession/count/${course._id}`)
        .then((response) => response.json())
        .then((data) => {
          setLessonCounts((prevCounts) => ({
            ...prevCounts,
            [course._id]: data.totalTopics,
          }));
        })
        .catch((error) => {
          console.error(`Error fetching lesson count for course ${course._id}:`, error);
        });
    });
  }, [courses]);

  return (
    <div className="container-fluid pt-5 p-5" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="row row-cols-3">
        {courses.length > 0 ? (
          courses.map((item) => (
            <div className="col-4" key={item._id}>
              <div className="course-container border mb-5 p-4" style={{ width: "90%" }}>
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
                  <h1 className="course-title mb-4 ps-1">{item.coursename}</h1>
                  
                  <div className="course-meta" >
                    <p style={{ fontWeight: "500", color: "#9e9d9d", fontSize: "15px" }}>
                      <IoDocumentOutline />  Lesson {lessonCounts[item._id] || "0"}
                    </p>
                    <p style={{ fontWeight: "500", color: "#9e9d9d", fontSize: "15px" }}>
                      <FaRegUser /> Students 50
                    </p>
                    <p style={{ fontWeight: "500", color: "#9e9d9d", fontSize: "15px" }}>
                      <IoEyeOutline /> View: 12K
                    </p>
                  </div>


                  <div className="course-meta1  pt-3 mb-3 ">
                    <p className="coursesimg  mb-0"><img src="./assets/image/category-1.png" alt="courses categori" width="30px" height="30px" style={{ backgroundColor: "#f0f0f0", padding: "5px", borderRadius: "90%" ,marginBottom:"none"}}></img>
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
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
}

export default Coursecard;
