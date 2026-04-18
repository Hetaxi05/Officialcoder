import React, { useEffect, useState } from "react";
import Courseinformation from "../../components/common/course_information/course_information";
import { Button, Modal, message } from "antd";
import { Link, data, useNavigate, useParams } from "react-router-dom";
import { GoLock } from "react-icons/go";
import "../python basic/pythonBasic.css";
import Courses from "../coursecategories/courses";
import "./course-details.css"

function CourseDetail() {
    const { courseId } = useParams();

    const [chapters, setChapters] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseDetails, setCourseDetails] = useState("");
    const [courseDuration, setCourseDuration] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    // NEW STATES for Hover & Popup
    const [isHoveringCertificate, setIsHoveringCertificate] = useState(false);
    const [showCertificatePopup, setShowCertificatePopup] = useState(false);
    const navigate = useNavigate();
    const [course, setcourse] = useState([]);

    useEffect(() => {
        getAllChapter();
        // Check login status from localStorage
        const user = localStorage.getItem("user");
        if (user) {
            const userData = JSON.parse(user);
            setIsLoggedIn(true);
            setIsPremium(userData.isPremium || false);
        }
    }, [courseId]);

    useEffect(() => {
        getAllCourse()
    }, [courseId])

    function getAllCourse() {
        fetch(`${process.env.REACT_APP_API_URL}/cour/`)
            .then((res) => res.json())
            .then((data) => {
                const filteredCourses = data.filter(course => course._id !== courseId);
                setcourse(filteredCourses.slice(0, 2));
                // setcourse(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // corsename base on particular course

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cour/${courseId}`)
            .then(response => response.json())
            .then(data => {
                setCourseName(data.coursename);
                setCourseDetails(data.coursedetails);
                setCourseDuration(data.duration);
            }) // Set course name in state
            .catch(error => console.error("Error fetching course:", error));
    }, [courseId]);

    // Fetch all chapters for the course
    function getAllChapter() {
        fetch(`${process.env.REACT_APP_API_URL}/chap/course/${courseId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Received non-JSON response");
                }
                return response.json();
            })
            .then((data) => {
                setChapters(data);
            })
            .catch((err) => {
                console.error("Error fetching:", err);
                alert("Error fetching data. Check console for details.");
            });
    }

    const handleLockedChapterClick = (chapter) => {
        setSelectedChapter(chapter);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleGoToPricing = () => {
        navigate("/pricing");
    };

    // Handle topic click: if not logged in, redirect to login
    const handleTopicClick = (e, callback) => {
        if (!isLoggedIn) {
            e.preventDefault();
            navigate("/userlogin");
        } else if (callback) {
            callback(); // Call only if callback is defined
        }
        // if (!isLoggedIn) {
        //     e.preventDefault();
        //     navigate("/userlogin");
        // } else {
        //     callback(); // handleOpenQuiz function call thase
        // }
    };

    // Updated handleStartCourse using the isLoggedIn state (not a function)
    const handleStartCourse = () => {
        if (!isLoggedIn) {
            message.info("You must be logged in to start the course. Redirecting to login page...");
            navigate("/userlogin");
            return;
        }

        if (chapters.length > 0 && chapters[0].topics && chapters[0].topics.length > 0) {
            const firstChapterId = chapters[0]._id;
            const firstTopicId = chapters[0].topics[0]._id;
            message.success("Redirecting to the course content...");
            navigate(`/topic-details/${courseId}/${firstChapterId}/${firstTopicId}`);
        } else {
            message.error("No topics available for this course.");
        }
    };

    // Existing function to open quiz
    const handleOpenQuiz = () => {
        if (!isLoggedIn) {
            message.info("You must be logged in to claim certificate. Redirecting to login page...");
            navigate("/userlogin");
            return;
        }
        if (!isPremium) {
            message.warning("This feature is available for premium users only. Redirecting to pricing page...");
            navigate("/pricing");
            return;
        }
        window.open(`/quiz/${courseId}`);
    };

    // NEW: Open/Close the Certificate Popup
    const handleCertificateClick = () => {
        setShowCertificatePopup(true);
    };
    const handleCloseCertificatePopup = () => {
        setShowCertificatePopup(false);
    };

    // useEffect(() => {
    //     getAllChapter();
    //     // Check login status from localStorage
    //     const user = localStorage.getItem("user");
    //     if (user) {
    //         setIsLoggedIn(true);
    //     }
    // }, [courseId]);

    // const handleStartCourse = () => {
    //     if (chapters.length > 0 && chapters[0].topics && chapters[0].topics.length > 0) {
    //         const firstChapterId = chapters[0]._id;
    //         const firstTopicId = chapters[0].topics[0]._id;
    //         message.success("Redirecting to the course content...");
    //         navigate(`/topic-details/${courseId}/${firstChapterId}/${firstTopicId}`);
    //     } else {
    //         message.error("No topics available for this course.");
    //     }
    // };



    return (
        <>
            {/* ------------------- Top Section ------------------- */}
            <div className="above-of-course-container-fluid" style={{ backgroundColor: "#fff5e7" }}>
                <div className="container" >
                    <div className="coursebgimage">
                        <img style={{ color: "transparent" }} alt="transparent" src="/assets/image/pricing-bg-pattern.9320702e.svg" ></img>
                    </div>
                    <div className="row gap-5">
                        <div className="col-sm-2 mt-5 course-img" style={{ position: "relative" }}>
                            <img src="/assets/image/python-basics.png" alt="python course" />
                        </div>
                        <div className="col-sm-8 pt-4 mt-5 course-description" style={{ paddingBottom: "5.5rem" }}>
                            <span style={{ color: "#ff8b6c", fontSize: "25px", lineHeight: "24px" }}>
                                <b>COURSE</b>
                            </span>
                            <h1 style={{ color: "#25265e" }}>Learn {courseName || "Loading..."}</h1>
                            <p
                                className="mb-4"
                                style={{
                                    fontSize: "17px",
                                    color: "rgba(37, 38, 94, .87)",
                                    lineHeight: "24px",
                                    marginTop: "15px",
                                    fontStyle: "inherit",
                                    fontWeight: "500",
                                }}
                                dangerouslySetInnerHTML={{ __html: courseDetails || "Loading..." }}
                            >
                                {/* Step into the world of programming with this beginner-friendly Python
                                <br />
                                course and build a strong programming foundation. */}

                            </p>
                            <div className="desktop-only">
                                 <div className="row row-cols-3 gy-3">
                                <div className="col">
                                    <div
                                        className="d-flex justify-content-center align-items-center gap-3 border border-warning"
                                        style={{
                                            height: "48px",
                                            width: "100%",
                                            background: "#ffecd7",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <img
                                            src="/assets/image/book.png"
                                            style={{ width: "30px", height: "30px" }}
                                            alt="book"
                                        />
                                        <span
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                color: "rgb(37 38 94 / 75%)",
                                            }}
                                        >
                                            Level: Beginner
                                        </span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className="d-flex justify-content-center align-items-center gap-3 border border-warning"
                                        style={{
                                            height: "48px",
                                            width: "100%",
                                            background: "#ffecd7",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <img
                                            src="/assets/image/history1.png"
                                            style={{ width: "30px", height: "30px" }}
                                            alt="history"
                                        />
                                        <span
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                color: "rgb(37 38 94 / 75%)",
                                            }}
                                        >
                                            Duration:  {courseDuration || "Loading..."}
                                        </span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className="d-flex justify-content-center align-items-center gap-3 border border-warning"
                                        style={{
                                            height: "48px",
                                            width: "100%",
                                            background: "#ffecd7",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <img
                                            src="/assets/image/history1.png"
                                            style={{ width: "30px", height: "30px" }}
                                            alt="interactive"
                                        />
                                        <span
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                color: "rgb(37 38 94 / 75%)",
                                            }}
                                        >
                                            Type: Interactive
                                        </span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className="d-flex justify-content-center align-items-center gap-3 border border-warning"
                                        style={{
                                            height: "48px",
                                            width: "100%",
                                            background: "#ffecd7",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <img
                                            src="/assets/image/comment.png"
                                            style={{ width: "45px", height: "40px" }}
                                            alt="comment"
                                        />
                                        <span
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                color: "rgb(37 38 94 / 75%)",
                                            }}
                                        >
                                            Language: English
                                        </span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className="d-flex justify-content-center align-items-center gap-3 border border-warning"
                                        style={{
                                            height: "48px",
                                            width: "100%",
                                            background: "#ffecd7",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <img
                                            src="/assets/image/webprogramming.png"
                                            style={{ width: "30px", height: "30px" }}
                                            alt="practice"
                                        />
                                        <span
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                color: "rgb(37 38 94 / 75%)",
                                            }}
                                        >
                                            Practice Problems: 55+
                                        </span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className="d-flex justify-content-center align-items-center gap-3 border border-warning"
                                        style={{
                                            height: "48px",
                                            width: "100%",
                                            background: "#ffecd7",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <img
                                            src="/assets/image/quizzes.png"
                                            style={{ width: "40px", height: "40px" }}
                                            alt="quizzes"
                                        />
                                        <span
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                color: "rgb(37 38 94 / 75%)",
                                            }}
                                        >
                                            Quizzes: 65+
                                        </span>
                                    </div>
                                </div>
                                 </div>
                            </div>
                         
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------- Course Content Section ------------------- */}
            <div className="container-fluid" style={{background:"white"}}>
                <div className="container">
                    <div className="row pt-5">
                        <div className="col ps-5">
                            <h3 style={{ color: "#25265e" }}>
                                <b>Course Content</b>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" accordion-container-fluid "  style={{background:"white"}}>
                <div className="container d-flex gap-3">
                    <div
                        className="accordion accordion-flush border border-2"
                        id="accordionFlushExample"
                        style={{ width: "70%", height: "50%" }}
                    >
                        {chapters.map((chapter, index) => {
                            const isPaid =
                                chapter.paid === true ||
                                chapter.paid === "true" ||
                                chapter.paid === "paid";
                            return (
                                <div className="accordion-item" key={chapter._id}>
                                    <h2
                                        className="accordion-header"
                                        id={`flush-heading-${index}`}
                                    >
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#flush-collapse-${index}`}
                                            aria-expanded="false"
                                            aria-controls={`flush-collapse-${index}`}
                                            // onClick={() => {
                                            //     if (isPaid) {
                                            //         handleLockedChapterClick(chapter);
                                            //     }
                                            // }}
                                            // style={{ color: isPaid ? "gray" : "blue" }}
                                            onClick={() => {
                                                if (!isPremium && isPaid) {
                                                    handleLockedChapterClick(chapter);
                                                }
                                            }}
                                            style={{ color: !isPremium && isPaid ? "gray" : "#6501e5" ,fontWeight:"600"}}

                                        >
                                            <div className="accordion-body gap-5 ps-0">
                                                <span className="pe-3" >Chapter {index + 1}</span>
                                                <span style={{ color: "black " }}>{chapter.chaptertitle}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                {!isPremium && isPaid && <GoLock className="ms-2" style={{ color: "gray" }} />}

                                                {/* {isPaid && <GoLock className="ms-2" style={{ color: "gray" }} />} */}
                                            </div>
                                        </button>
                                    </h2>
                                    <div id={`flush-collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading-${index}`} data-bs-parent="#accordionFlushExample">
                                        {chapter.topics && chapter.topics.map((topic, topicIndex) => (
                                            <div className="accordion-body gap-5 " key={topic._id}>
                                                <span className="pe-3">{index + 1}.{topicIndex + 1} </span>

                                                <Link
                                                    to={`/topic-details/${courseId}/${chapter._id}/${topic._id}`}
                                                    onClick={handleTopicClick}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {topic.title}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                    <Courseinformation courseId={courseId} />

                    <Modal
                        title=" Paid Chapter"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="pricing" type="primary" onClick={handleGoToPricing}>
                                Go to Pricing
                            </Button>,
                        ]}
                    >
                        <p>This chapter is paid. Purchase the course to access this content.</p>
                    </Modal>

                    <div className="row gy-3 mt-2"></div>
                </div>

                <div className="col-3 mt-5  start-course-container" style={{ marginLeft: "37%" }}>
                    <div
                        className="d-flex justify-content-center align-items-center gap-3 border border-warning"
                        style={{
                            height: "48px",
                            width: "100%",
                            background: "#6501e5",
                            borderRadius: "5px",
                        }}
                        onClick={handleStartCourse}
                    >
                        <span
                            style={{ fontSize: "15px", fontWeight: "600", color: "white",cursor:"pointer" }}
                        >
                            Start this Course
                        </span>
                        <img
                            src="/assets/image/playbutton.png"
                            style={{ width: "30px", height: "30px" }}
                            alt="play button"
                        />
                    </div>
                </div>
            </div>

            {/* new */}

            <div className="mt-4" style={{ position: "relative" }} >
                <img
                    src="/assets/image/more.png"
                    style={{ width: "60px", height: "60px", marginLeft: "47%" }}
                    alt="more"
                />
                <div className="certifictebgimage">
                    <img style={{ color: "transparent" }} alt="transparent" src="/assets/image/course-bg-pattern.svg" ></img>
                </div>
            </div>

            {/* ------------------- REPLACED SECTION WITH HOVER & POPUP ------------------- */}
            <div
                className="container-fliud mt-5 pt-5 pb-5"
                style={{ backgroundColor: "#f7edce38" }}
            >
                <div className="container ps-0" style={{ position: "relative" }}>
                    <div className="coursebgimage">
                        <img style={{ color: "transparent", top: "370px", left: "90px" }} alt="transparent" src="/assets/image/pricing-bg-pattern.9320702e.svg" ></img>
                    </div>
                    <div className="row">
                        {/* Hover Image (Eye Icon) */}
                        <div className="col-3 pt-4 m">
                            <div
                                style={{
                                    position: "relative",
                                    width: "250px",
                                    height: "180px",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={() => setIsHoveringCertificate(true)}
                                onMouseLeave={() => setIsHoveringCertificate(false)}
                                onClick={handleCertificateClick}
                            >
                                <img
                                    src="/assets/image/certificate.png"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        // objectFit: "cover",
                                        objectFit: "fill",


                                    }}
                                    alt="certificate"
                                />
                                {isHoveringCertificate && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <i
                                            className="fa fa-eye"
                                            style={{
                                                color: "#fff",
                                                fontSize: "25px",
                                            }}
                                        ></i>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Text & "Claim Certificate" Button */}
                        <div className="col-6">
                            <p
                                style={{
                                    color: "#25265e",
                                    fontSize: "25px",
                                    fontWeight: "700",
                                }}
                            >
                                Gain a competitive edge with our <br />
                                professional certifications
                            </p>
                            <p
                                style={{
                                    color: "rgba(37, 38, 94, .87)",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    marginTop: "20px",
                                }}
                            >
                                Showcase your expertise on LinkedIn and <br />
                                stand out from the crowd. Impress your
                                <br /> potential employers.
                            </p>
                            <div
                                className="d-flex mt-4 justify-content-center align-items-center gap-3 border border-warning"
                                style={{
                                    height: "48px",
                                    width: "40%",
                                    background: "#6501e5",
                                    borderRadius: "5px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "white",
                                        cursor:"pointer"
                                    }}
                                    // onClick={handleOpenQuiz}
                                    onClick={(e) => handleTopicClick(e, handleOpenQuiz)}

                                >
                                    Claim Certificate
                                </span>
                                <img
                                    src="/assets/image/rightarrow.png"
                                    style={{ width: "25px", height: "30px" }}
                                    alt="arrow"
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* ------------------- MODAL (Certificate Popup) ------------------- */}
            <Modal
                open={showCertificatePopup}
                onCancel={handleCloseCertificatePopup}
                footer={null}
                // Keep the default mask to blur background
                mask={true}
                // Blur the background behind the modal
                mas={{
                    backdropFilter: "blur(1px)", // Adjust the blur strength
                    backgroundColor: "rgba(0, 0, 0, 0.2)", // Slight dark tint
                }}
                // Remove white background inside the modal
                style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    border: "none",
                }}
                bodyStyle={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: 0,
                    margin: 0,
                }}
                // Force .ant-modal-content transparent
                modalRender={(modalNode) =>
                    React.cloneElement(modalNode, {
                        style: {
                            ...modalNode.props.style,
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            border: "none",
                        },
                        bodyStyle: {
                            ...modalNode.props.bodyStyle,
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                            margin: 0,
                        },
                    })
                }
            >
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/assets/image/certificate.png"
                        alt="Certificate"
                        style={{ width: "600px", maxHeight: "900px", height: "330px", maxHeight: "180vh", marginBottom: "2px", textAlign: "center" }}
                    />
                </div>
            </Modal>

            <div className="container-fluid pb-5" style={{ backgroundColor: "#fff5e7", marginTop: "80px" }}>
                <div className="container mt-5 pt-5 pb-5">
                    <h4 style={{ marginTop: "30px", fontWeight: "700", color: "#25265e", position: "relative" }}> Courses similar to this</h4>
                    <div className="row mt-4 gap-4">
                        {

                            course.map((Courses) => (
                                <div className="col-sm-3" key={Courses._id}>
                                    <Link to={`/course-details/${Courses._id}`}className="course-card" style={{textDecoration:"none"}} >

                                        <div className="card" style={{ width: "222px", height: "300px", display: "flex" }}>
                                            <div className="card-body d-flex flex-column" style={{ flex: 1 }}>
                                                <h5 className="card-title title-fixed " style={{ color: "#25265e", fontWeight: "700" }}>
                                                    {Courses.coursename}
                                                </h5>
                                                <img className="card-img pt-1" src={Courses.image} alt={Courses.coursename} width="40px" height="130px" />

                                                {/* This wrapper ensures that P and Link stay at the bottom */}
                                                <div className="mt-auto ">
                                                    <p className="mt-3 " style={{ color: "#25265e" }}>Chapters and Topics</p>
                                                    {/* <Link to={`/course-details/${Courses._id}`} className="coursebtn border ps-2 pe-2 pt-1 pb-1">
                                                View Detail
                                            </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseDetail;  