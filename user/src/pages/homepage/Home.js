import Footer from "../../components/common/layout/footer/footer";
import Course from "../course/course.js";
import Coursecard from "../coursecard/coursecard.js";
import Courses from "../coursecategories/courses.js";
import Programize from "../programize/compiler";
import { color, motion } from "framer-motion";
import './Home.css';
import { IoPlayCircleOutline } from "react-icons/io5";
import ExperienceSection from "../AboutUs/ExperienceSection.js";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    const handleGetStarted = () => {
        navigate("/mobilecourse");
    };

    return (
        <>
            <section className="hero-section container-fluid">
                <div className="row align-items-center">

                    <div className="col-lg-7 text-section">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="badge-text  ps-1 pe-3 mb-4 pb-1 text-center"
                        >
                            {/* <div className="heading-btn btn ps-1 pe-3 mb-4 pb-1 text-center"> */}
                            <span className="pe-2 ">
                                <img
                                    className="img"
                                    src="/assets/image/category-1.png"
                                    alt="courses category"
                                    width="30px"
                                    height="30px"
                                    style={{ backgroundColor: "#f0f0f0", padding: "5px" }}
                                />
                            </span>
                            Welcome to Official Coders
                            {/* </div> */}
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            Start learning from <br />the world’s <span style={{ color: "#07a698" }}>best institutions</span>
                        </motion.h1>

                        <div className="d-flex gap-3 mt-5">
                            <motion.button
                                className="btn ps-4 pe-4 "
                                whileHover={{ scale: 1.1 }}
                                onClick={handleGetStarted}
                            >
                                Get Started
                            </motion.button>
                            <motion.button className="btn watchvideo" whileHover={{ scale: 1.1 }}
                                onClick={handleGetStarted}
                            >
                                <IoPlayCircleOutline size={30} /> Watch the Content
                            </motion.button>

                        </div>
                        <p className="mt-5 explore">Explore <span style={{ color: "#07a698" }}>850+</span> Courses within Subject</p>


                        <motion.div
                            className="shapes1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{
                                opacity: [1, 0.7, 1],
                                x: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                            }}
                        >
                            <img src="./assets/image/hero-shape-2.png" alt="hero-shape-1" height="75px" ></img>
                        </motion.div>

                        <motion.div
                            className="shapes2"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: [1, 0.7, 1],
                                y: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                            }}
                        >
                            <img src="./assets/image/hero-shape-1.png" alt="hero-shape-1" height="200px" width="220px"></img>
                        </motion.div>


                    </div>

                    <div className="col-lg-5 image-section">

                        <motion.img
                            src="./assets/image/heroimg1.png"
                            alt="Student"
                            className="hero-image img-fluid"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                        />

                        <motion.div
                            className="course-badge"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{
                                opacity: [1, 0.7, 1],
                                x: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                            }}
                        >
                            <strong style={{ color: "#07a698", fontSize: "30px", fontWeight: "700" }}>256+</strong><br /> CRASHED COURSES
                        </motion.div>
                    </div>

                </div>
            </section>

            <ExperienceSection />
            <Courses />
            <Coursecard />
            <Programize />


        </>
    )
}
export default Home;
