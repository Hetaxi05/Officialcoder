import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { Link } from "react-router-dom";


import './pythonBasic.css';


function PythonBasic() {

    const handleOpenQuiz = () => {
        window.open("/quiz", "_blank");
    };
    return (
        <>
            <div className="container-fluid " style={{ backgroundColor: "#fff5e7" }}>
                <div className="container" >
                    <div className="row gap-5  ">
                        <div className="col-sm-2 mt-5">
                            <img src="./assets/image/python-basics.png" alt="pythone course image"></img>
                        </div>
                        <div className="col-sm-8 pt-4  mt-5 " style={{ paddingBottom: "5.5rem" }}>
                            <span style={{ color: "#ff8b6c", fontsize: "25px", lineheight: "24px" }}><b>COURSE</b></span>
                            <h1 style={{ color: "#25265e" }}>Learn Python Basics</h1>
                            <p className="mb-4" style={{ fontSize: "17px", color: "rgba(37, 38, 94, .87)", lineheight: "24px", marginTop: "15px", fontStyle: "inherit", fontWeight: "500" }}>Step into the world of programming with this beginner-friendly Python<br /> course and build a strong programming foundation.</p>

                            <div className="row  row-cols-3 gy-3">
                                <div className="col">
                                    <div className="d-flex justify-content-center align-items-center gap-3 border border-warning" style={{ height: '48px', width: '100%', background: '#ffecd7', borderRadius: "5px" }}>
                                        <img src="./assets/image/book.png" style={{ width: '30px', height: '30px' }}></img>

                                        <span style={{ fontSize: "15px", fontWeight: "500", color: "rgb(37 38 94 / 75%)" }}>Level: Beginner</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex justify-content-center align-items-center gap-3 border border-warning" style={{ height: '48px', width: '100%', background: '#ffecd7', borderRadius: "5px" }}>
                                        <img src="./assets/image/history1.png" style={{ width: '30px', height: '30px' }}></img>

                                        <span style={{ fontSize: "15px", fontWeight: "500", color: "rgb(37 38 94 / 75%)" }}>Duration: 3 weeks</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex justify-content-center align-items-center gap-3 border border-warning" style={{ height: '48px', width: '100%', background: '#ffecd7', borderRadius: "5px" }}>
                                        <img src="./assets/image/history1.png" style={{ width: '30px', height: '30px' }}></img>

                                        <span style={{ fontSize: "15px", fontWeight: "500", color: "rgb(37 38 94 / 75%)" }}>Type: Interactive</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex justify-content-center align-items-center gap-3 border border-warning" style={{ height: '48px', width: '100%', background: '#ffecd7', borderRadius: "5px" }}>
                                        <img src="./assets/image/comment.png" style={{ width: '45px', height: '40px' }}></img>

                                        <span style={{ fontSize: "15px", fontWeight: "500", color: "rgb(37 38 94 / 75%)" }}>Language: English</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex justify-content-center align-items-center gap-3 border border-warning" style={{ height: '48px', width: '100%', background: '#ffecd7', borderRadius: "5px" }}>
                                        <img src="./assets/image/webprogramming.png" style={{ width: '30px', height: '30px' }}></img>

                                        <span style={{ fontSize: "15px", fontWeight: "500", color: "rgb(37 38 94 / 75%)" }}>Practice Problems: 55+</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex justify-content-center align-items-center gap-3 border border-warning" style={{ height: '48px', width: '100%', background: '#ffecd7', borderRadius: "5px" }}>
                                        <img src="./assets/image/quizzes.png" style={{ width: '40px', height: '40px' }}></img>

                                        <span style={{ fontSize: "15px", fontWeight: "500", color: "rgb(37 38 94 / 75%)" }}>Quizzes: 65+</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row pt-5">
                        <div className="col ps-5">
                            <h3 style={{ color: "#25265e" }}><b>Course Content</b></h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="container  ">

                    <div className="row mt-4">
                        <div className="col-2">
                        </div>
                        <div className="col-8 align-iten-center ">
                            <div className="accordion accordion-flush border border-2" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header " id="flush-headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            <div className="accordion-body gap-5 ps-0">
                                                <span className="pe-3">chapter 1</span>
                                                <span>introduction</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body gap-5">
                                            <span className="pe-3">1.1</span>
                                            <Link to="python-editor">Get Started</Link>
                                        </div>
                                        <div className="accordion-body">
                                            <span className="pe-3">1.2</span>
                                            <span>Number and string</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">1.3</span>
                                            <span>comments</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">1.4</span>
                                            <span>variable</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">1.5</span>
                                            <span>output</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">


                                            <div className="accordion-body gap-5 ps-0">
                                                <span className="pe-3">Chapter 2:</span>
                                                <span> Decision Making & Loops</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body gap-5">
                                            <span className="pe-3">2.1</span>
                                            <span>Get Started</span>
                                        </div>
                                        <div className="accordion-body">
                                            <span className="pe-3">2.2</span>
                                            <span>Number and string</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">2.3</span>
                                            <span>comments</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">2.4</span>
                                            <span>variable</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">2.5</span>
                                            <span>output</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            <div className="accordion-body gap-5 ps-0">
                                                <span className="pe-3">Chapter 3:</span>
                                                <span> Function</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body gap-5">
                                            <span className="pe-3">3.1</span>
                                            <span>Get Started</span>
                                        </div>
                                        <div className="accordion-body">
                                            <span className="pe-3">3.2</span>
                                            <span>Number and string</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">3.3</span>
                                            <span>comments</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">3.4</span>
                                            <span>variable</span>
                                        </div><div className="accordion-body">
                                            <span className="pe-3">3.5</span>
                                            <span>output</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                            <div className="accordion-body gap-5 ps-0">
                                                <span className="pe-3">Chapter 4:</span>
                                                <span> datatype</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body gap-5">
                                            <span className="pe-3">4.1</span>
                                            <span>Get Started</span>
                                        </div>
                                        <div className="accordion-body">
                                            <span className="pe-3">4.2</span>
                                            <span>Number and string</span>
                                        </div>
                                        <div className="accordion-body">
                                            <span className="pe-3">4.3</span>
                                            <span>comments</span>
                                        </div>
                                        <div className="accordion-body">
                                            <span className="pe-3">4.4</span>
                                            <span>variable</span>
                                        </div>
                                        <div className="accordion-body">
                                            <span className="pe-3">4.5</span>
                                            <span>output</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>



                    <div className="row gy-3 mt-2">
                        <div className="col-4"></div>
                        <div className="col-3">
                            <div className="d-flex justify-content-center align-items-center gap-3 border border-warning" style={{ height: '48px', width: '100%', background: "#6501e5", borderRadius: "5px" }}>
                                <span style={{ fontSize: "15px", fontWeight: "600", color: "white" }}> Start this Course</span>
                                <img src="./assets/image/playbutton.png" style={{ width: '30px', height: '30px' }}></img>
                            </div>
                        </div>
                    </div>

                    <div className="container-fliud ">
                        <div className="container">
                            <div className="row mb-5">
                                <div className="col ps-5 pt-5 mt-5">
                                    <h4 style={{ color: "#25265e" }}><b>
                                        Don't just learn Python<br />
                                        Apply it to create real-world projects</b></h4>
                                    <div className="mt-4">
                                        <span style={{ color: "rgba(37, 38, 94, .87)", fontSize: "20px", fontWeight: "500" }}>Projects you will create:</span>

                                    </div>
                                </div>
                            </div>

                            <div className="row  mt-3">
                                <div className="col-9 border border-2 " style={{ borderRadius: "5px" }}>
                                    <div className="d-flex gap-5 mt-2 align-items-center">
                                        <img src="./assets/image/studentsgradecalculator.png" alt="students grade calculator" style={{ height: "83px", width: "70px", position: "absolute" }}></img>

                                        <h4 style={{ marginLeft: "100px" }}> student's Grade calculator</h4>
                                    </div>
                                    <p className="text-break mt-0" style={{ marginLeft: "100px" }}>
                                        Learn More
                                        <img src="./assets/image/next.png" alt="next arrow" style={{ height: "18px", width: "18px", marginLeft: "7px" }}></img>
                                    </p>


                                </div>
                            </div>


                            <div className="row  mt-5">
                                <div className="col-9 border border-2 " style={{ borderRadius: "5px" }}>
                                    <div className="d-flex gap-5 mt-2 align-items-center">
                                        <img src="./assets/image/rockpaperscissor.svg" alt="students grade calculator" style={{ height: "83px", width: "70px", position: "absolute" }}></img>

                                        <h4 style={{ marginLeft: "100px" }}> Rock, Paper & Scissors</h4>
                                    </div>
                                    <p className="text-break mt-0 " style={{ marginLeft: "100px" }}>
                                        Learn More
                                        <img src="./assets/image/next.png" alt="next arrow" style={{ height: "18px", width: "18px", marginLeft: "7px" }}></img>
                                    </p>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>



            <div className="mt-4" >
                <img src="./assets/image/more.png" style={{ width: "60px", height: "60px", marginLeft: "50%" }}></img>
            </div>


            <div className="container-fliud mt-5 pt-5 pb-5" style={{ backgroundColor: "#f7edce38" }}>
                <div className="container">
                    <div className="row ">
                        <div className="col-2 pt-5">
                            <img src="./assets/image/rockpaperscissor.svg" style={{ width: "140px", height: "170px" }}></img>
                        </div>


                        <div className="col-6">
                            <p style={{ color: "#25265e", fontSize: "25px", fontWeight: "700" }}>Gain a competitive edge with our <br />professional certifications</p>
                            <p style={{ color: "rgba(37, 38, 94, .87)", fontSize: "18px", fontWeight: "600", marginTop: "20px" }}> Showcase your expertise on LinkedIn and <br />stand out from the crowd. Impress your<br /> potential employers.</p>
                            <div className="d-flex  mt-4 justify-content-center align-items-center gap-3 border border-warning" style={{ height: '48px', width: '40%', background: "#6501e5", borderRadius: "5px" }}>
                                <span style={{ fontSize: "15px", fontWeight: "600", color: "white" }} onClick={handleOpenQuiz}> Claim Certificate</span>

                                <img src="./assets/image/rightarrow.png" style={{ width: '25px', height: '30px' }}></img>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="container-fluid mt-5 pt-4 me-5">
                <div className="container">
                    <p style={{ color: "#25265e", fontSize: "25px", fontWeight: "700" }}>Feedback from our students</p>

                    <div className="row border">
                        <div className="col-2 ms-0 ps-0">
                            <img src="./assets/image/Aaron.png" style={{ width: "140px" }}></img>
                        </div>
                        <div className="col-7 mt-3 pe-3 ps-3">
                            <p style={{ color: "rgba(37, 38, 94, .87)", fontStyle: "revert", fontSize: "19px", fontWeight: "500" }}>“The platform is wonderful and will continue to be a step above the rest of what's out there right now.”</p>
                            <p></p>
                            <p style={{ color: "rgba(37, 38, 94, .87)", fontStyle: "revert", fontSize: "17px", fontWeight: "400", marginTop: "50px" }}>Aaron Sang| USA</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-fluid pb-5" style={{ backgroundColor: "#fff5e7", marginTop: "80px" }}>
                <div className="container mt-5 pt-5 pb-5">
                    <h4 style={{ marginTop: "30px", fontWeight: "700", color: "#25265e" }}> Courses similar to this</h4>
                    <div className="row mt-4 gap-4">
                        <div className="col-sm-3" >
                            <div className="card " style={{ width: "222px" }}>
                                <div className="card-body"  >
                                    <h5 className="card-title pt-2" style={{ color: "#25265e", fontWeight: "700" }}>DSA with Python</h5>
                                    <img className="card-img pt-1" src="./assets/image/dsawithpython.png" alt="dsa with python"></img><br />
                                    <p className="mt-3" style={{ color: "#25265e" }}>Chapters and Questions</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card" style={{ width: "222px" }}>
                                <div className="card-body" >
                                    <h5 className="card-title" style={{ color: "#25265e", fontWeight: "700" }}>Python interview Questions</h5>
                                    <img className="card-img" src="./assets/image/pythoninterviewquestions.png" alt="dsa with python"></img><br />
                                    <p className="mt-1" style={{ color: "#25265e" }}>Chapters and Questions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );


}
export default PythonBasic;