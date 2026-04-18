import React from "react";
// import '../Aboutus/Aboutus.css';
import { Link, useNavigate } from "react-router-dom";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import ExperienceSection from "../../../../pages/AboutUs/ExperienceSection";
function AboutUs() {

    const navigate=useNavigate()


    const handleFree= () => {
        navigate("/mobilecategory"); // Aa route ne tamara project pramane update karo
      };
      const getmoreabout= () => {
        navigate("/aboutus"); // Aa route ne tamara project pramane update karo
      };
    return (
        <>

            <div className="course-banner">

                <div className="container">
                    {/* Floating Shape */}
                    <div className="shape-1">
                        <img src="/page-header-shape-1.png" alt="Shape" />
                    </div>

                    {/* Text Content */}
                    <div className="text-content" style={{ padding: "50px" }}>
                        <h2 style={{ color: "" }}>About Us</h2>
                        <p>
                            <span style={{ fontWeight: "500" }}>Home</span> / <span className="" style={{ color: "#07a698", fontWeight: "500" }}>AboutUs Page</span>
                        </p>
                    </div>
                </div>


            </div>
            {/* <ExperienceSection/> */}


            <section className="experience-section  py-5 ps-5 ms-5 me-5 pe-0">
                <div className="row align-items-center gap-3">
                    {/* Left Column */}
                    <div className="col-lg-6">

                        <div className=" about-img-wrap col-lg-6 mb-4 mb-lg-0">
                            <div className=" about-img-1 position-relative" >
                                {/* Example Image */}
                                <img
                                    src="./assets/image/about-img-1.jpg"
                                    alt="Experience"
                                    className="img-fluid rounded"
                                />

                            </div>
                            <div className=" about-img-2 position-relative" style={{ top: "94.2%", left: "28%" }} >
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
                                    <h5 className="fw-bold" style={{ color: "white" }}>+258 152 3659</h5>
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
                            {/* Over 10 Years in Distant learning  for <span className="" style={{ color: "#07a698" }}>Skill Development</span> */}
                                                    A fresh start, powered by a decade of <span className=""  style={{color:"#07a698"}}> learning experience</span>
                            
                        </p>
                        <p className="text-muted my-4">
                            Complementary mission-critical pathways with integrated portals.
                            Achieve massive ROI and best-practice improvements. Low-risk/high-yield
                            metrics and plug-and-play potentialities.
                        </p>
                        <div className="d-flex gap-4 stats-group mb-4">
                            <div className="icons">
                                <img src="./assets/image/about-1.png"></img>
                            </div>

                            <div>
                                <h2 className="fw-bold mb-0 " style={{ color: "#07a698" }}>9.5k+</h2>
                                <small className="text-muted">
                                    Total active teachers taking grad courses
                                </small>
                            </div>

                            <div className="icons">
                                <img src="./assets/image/about-2.png"></img>
                            </div>
                            <div>
                                <h2 className="fw-bold mb-0 " style={{ color: "#07a698" }}>6.7k+</h2>
                                <small className="text-muted">Total active courses available</small>
                            </div>
                        </div>
                        <button className="btn btn-lg" onClick={handleFree}>Start Category</button>
                    </div>
                </div>
            </section>

        </>
    )
}
export default AboutUs;