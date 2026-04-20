import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import "./Aboutus.css"

function AboutUs() {
  const navigate = useNavigate();

  const handleFree = () => {
    navigate("/mobilecategory");
  };

  const getmoreabout = () => {
    navigate("/aboutus");
  };

  return (
    <>
      <div className="course-banner">
        <div className="container">
          <div className="shape-1">
            <img src="/page-header-shape-1.png" alt="Shape" />
          </div>

          <div className="text-content" style={{ padding: "50px" }}>
            <h2>About Us</h2>
            <p>
              <span style={{ fontWeight: "500" }}>Home</span> /{" "}
              <span style={{ color: "#07a698", fontWeight: "500" }}>
                AboutUs Page
              </span>
            </p>
          </div>
        </div>
      </div>

      <section className="experience-section py-5 ps-5 ms-5 me-5 pe-0">
        <div className="row align-items-center gap-3">
          {/* Left Column */}
          <div className="col-lg-6">
            <div className="about-img-wrap position-relative mb-4 mb-lg-0">
              <div className="about-img-1 position-relative">
                <img
                  src="./assets/image/about-img-1.jpg"
                  alt="Experience"
                  className="img-fluid rounded"
                />
              </div>

              <div
                className="about-img-2 position-absolute"
                style={{ top: "58%", left: "45%" }}
              >
                <img
                  src="./assets/image/about-img-2.jpg"
                  alt="Experience"
                  className="img-fluid rounded"
                />
              </div>

              {/* Helpline box */}
              <div className="about-contact d-flex align-items-center">
                <div className="icon">
                  <LiaPhoneVolumeSolid size={30} style={{ color: "#07a698" }} />
                </div>
                <div className="content">
                  <span className="d-block fw-bold text-white">
                    ONLINE SUPPORT
                  </span>
                  <h5 className="fw-bold mb-0 text-white">+258 152 3659</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-5 me-0">
            <div className="d-flex">
              <div className="getmoreabout pt-1 ps-1 pe-3 mb-3 pb-1 text-center">
                <span className="pe-2" onClick={getmoreabout}>
                  <img
                    className="img"
                    src="/assets/image/category-1.png"
                    alt="courses category"
                    width="27px"
                    height="27px"
                    style={{
                      backgroundColor: "#f0f0f0",
                      padding: "5px",
                    }}
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

            {/* Feature cards */}
            <div className="feature-boxes">
              <div className="feature-item">
                <div className="feature-icon">📚</div>
                <div className="feature-content">
                  <h6>Structured Courses</h6>
                  <p>Learn easily with organized chapters and topics.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📝</div>
                <div className="feature-content">
                  <h6>Interactive Quizzes</h6>
                  <p>Test your knowledge with smart quiz modules.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🎓</div>
                <div className="feature-content">
                  <h6>Certificates</h6>
                  <p>Get recognition after completing learning modules.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">💬</div>
                <div className="feature-content">
                  <h6>Inquiry Support</h6>
                  <p>Contact admin anytime using inquiry support.</p>
                </div>
              </div>
            </div>

            <div className="d-flex gap-4 stats-group mb-4 mt-4 flex-wrap">
              <div className="d-flex align-items-center gap-3">
                <div className="icons">
                  <img src="./assets/image/about-1.png" alt="Learners" />
                </div>

                <div>
                  <h2 className="fw-bold mb-0" style={{ color: "#07a698" }}>
                    2.5k+
                  </h2>
                  <small className="text-muted">
                    Total active learners using our platform
                  </small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="icons">
                  <img src="./assets/image/about-2.png" alt="Courses" />
                </div>

                <div>
                  <h2 className="fw-bold mb-0" style={{ color: "#07a698" }}>
                    2.7k+
                  </h2>
                  <small className="text-muted">
                    Total active courses available
                  </small>
                </div>
              </div>
            </div>

            <button className="btn start-btn btn-lg" onClick={handleFree}>
              Start Learning
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;