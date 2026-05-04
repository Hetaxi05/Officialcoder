import React from "react";

const LessonCompleted = () => {
    return (
        <div className="container-fluid">
            {/* header section */}
            <div className="d-flex " >
            <h1 className=" fw-bold" style={{ marginLeft: "140px", marginBottom: "40px", paddingLeft: "110px", fontSize: "25px", marginTop: "30px" }}>Lesson Completed!</h1>
            <h1 className=" fw-bold" style={{ marginLeft: "140px", marginBottom: "40px", paddingLeft: "110px", fontSize: "25px", marginTop: "30px" ,paddingLeft:"16%"}}>sensAI Feedback</h1>

            </div>
            <div className=" container d-flex ">

                <div className="row row-cols-1"  style={{ paddingLeft: "120px" }}>
                    {/* <div className="row  mt-3" > */}
                        <div className="col-10 border border-2 mt-4 mb-4 p-3" style={{ borderRadius: "5px" }}>
                            <div className="d-flex gap-5 mt-2 align-items-center">
                                <img src="/assets/lesson/trophy.jpeg" alt="students grade calculator" style={{ height: "90px", width: "90px", position: "absolute", top: "195px" }}></img>
                                <div>
                                    <p className="mb-1" style={{ marginLeft: "100px" }}>You just completed:</p>
                                    <h2 className="fw-bold" style={{ marginLeft: "100px", fontSize: "25px" }}>Getting Started</h2>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}

                    {/* next lesson */}
                    {/* <div className="row  mt-3"> */}
                        <div className="col-10 border border-2 mt-5 p-3" style={{ borderRadius: "5px" }}>
                            <div className="d-flex gap-5 mt-2 align-items-center">
                                <img src="/assets/lesson/nextlesson.jpeg" alt="next" style={{ height: "83px", width: "70px", position: "absolute", top: "390px" }}></img>

                                <div>
                                    <p className="mb-1" style={{ marginLeft: "100px" }}>Next Lesson:</p>
                                    <h2 className="fw-bold text-primary" style={{ marginLeft: "100px", fontSize: "25px" }}>Numbers and Strings</h2>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                </div>

                <div
                    className="border-end position-absolute"
                    style={{
                        height: "calc(80.5% - 60px)", // Adjust height dynamically
                        width: "2px",
                        backgroundColor: "#e0e0e0",
                        top: "60px", // Align with header
                        left: "54%", // Position between sections
                        transform: "translateX(-50%)" // Center the line
                    }}
                ></div>
                {/* feedback section */}
                <div className="col-5 mt-3 ps-3" >
                    
                    <div className="border rounded-3 p-4  shadow-sm text-center " >
                    <img src="/assets/lesson/nextlesson.jpeg" alt="next"  style={{ height: "90px", width: "90px", position: "absolute", top: "170px",right:"370px" }}></img>

                        <p className="text-muted pt-5 "  style={{textAlign:"left"}}>
                            Get <span className="fw-bold">personalized</span> lesson feedback—catered to complement your learning.
                        </p>
                        <button className="btn btn-primary ms-0"   >
                            Get feedback ⚡
                        </button>
                    </div>
                </div>

            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-light">&lt; Go Back</button>
                <div className="progress w-50">
                    <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "50%" }}
                    ></div>
                </div>
                <button className="btn btn-primary">Start Next Lesson &gt;</button>
            </div>

        </div >
    )
}

export default LessonCompleted;