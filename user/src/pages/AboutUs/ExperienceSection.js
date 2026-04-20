import React from "react";
import { IoPlayCircleOutline } from "react-icons/io5"; // Example icon
import "./ExperienceSection.css"; 
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { color } from "framer-motion";
import { BiFontSize } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ExperienceSection() {
    const navigate=useNavigate()
    const handleFree= () => {
        navigate("/mobilecategory"); // Aa route ne tamara project pramane update karo
      };
      const getmoreabout= () => {
        navigate("/aboutus"); // Aa route ne tamara project pramane update karo
      };
    return (
        <section className="experience-section  py-5 ps-5 ms-5 me-5 pe-0">
            <div className="row align-items-center gap-3">
                {/* Left Column */}
                <div className="col-lg-6 ">

                    <div className=" about-img-wrap col-lg-6 mb-4 mb-lg-0">
                        <div className=" about-img-1 position-relative" >
                            {/* Example Image */}
                            <img
                                src="./assets/image/about-img-1.jpg"
                                alt="Experience"
                                className="img-fluid rounded"
                            />

                        </div>
                        <div className=" about-img-2 position-relative" >
                            {/* Example Image */}
                            <img
                                src="./assets/image/about-img-2.jpg"
                                alt="Experience"
                                className="img-fluid rounded"
                            />

                        </div>

                        <div className="about-contact mt-3">
                            <div className="icon">
                                <LiaPhoneVolumeSolid size={30} style={{ color: "#07a698" }} />
                            </div>
                            <div className="content">
                                <span className="d-block fw-bold" style={{ color: "white" }}>ONLINE SUPPORT</span>
                                <h5 className="fw-bold" style={{ color: "white" }}>+91 98152 32659</h5>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-lg-5 me-0">

                    <div className=" d-flex">
                       <div className="getmoreabout pt-1 ps-1 pe-3 mb-3 pb-1 text-center">
                       <span className="pe-2 " onClick={getmoreabout}>
                                <img
                                    className="img"
                                    src="/assets/image/category-1.png"
                                    alt="courses category"
                                    width="27px"
                                    height="27px"
                                    style={{ backgroundColor: "#f0f0f0", padding: "5px" }}
                                />
                            </span>
                           Get More About Us
                            </div>
                      
                    </div>



                    <p className="fw-bold" style={{ fontSize: "32px" }}>
                        Learn smarter with{" "} <span className=""  style={{color:"#07a698"}}>Official Coder</span>
                    </p>
                    
            <p className="text-muted my-4">
              Official Coder is an interactive e-learning platform designed
              to help students and learners build their knowledge through
              structured courses, organized chapters, and step-by-step topic
              based learning.
            </p>

            <p className="text-muted my-4">
              Our platform makes learning simple, engaging, and accessible.
              Users can explore courses, test their understanding through
              quizzes, gain valuable skills, and enjoy a smooth digital
              learning experience with secure access and inquiry support.
            </p>
                    <div className="d-flex gap-4 stats-group mb-4">
                        <div className="icons">
                            <img src="./assets/image/about-1.png"></img>
                        </div>

                        <div>
                            <h2 className="fw-bold mb-0 "  style={{color:"#07a698"}}>2.5k+</h2>
                            <small className="text-muted">
                                Total active staff taking grad courses
                            </small>
                        </div>

                        <div className="icons">
                            <img src="./assets/image/about-2.png"></img>
                        </div>
                        <div>
                            <h2 className="fw-bold mb-0 " style={{color:"#07a698"}}>2.7k+</h2>
                            <small className="text-muted">Total active courses available</small>
                        </div>
                    </div>
                    <button className="btn btn-lg" onClick={handleFree}>Start category</button>
                </div>
            </div>
        </section>
    );
}

export default ExperienceSection;
