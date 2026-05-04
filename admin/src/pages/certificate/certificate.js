import React from 'react';
import './certificate.css';
const Certificate = () => {

    return (
        <div className="container-fluid" style={{ height: "80vh" }}>
            <div className="row align-items-center">
                <div className="col-3 position-relative certificate-left-column">
                    <img style={{ position: "absolute", top: "0px", left: "60px" }} src='/assets/certificate/leftcolumn.png'
                        width="180px" height="520px" />
                    <img style={{ position: "absolute", bottom: "50px", left: "72px" }} src='/assets/certificate/HASTI SBL.png'
                        width="180px" height="180px" />
                </div>

                {/* Right Column - Text */}
                <div className="col-9 certificate-right-column">
                    hello
                    <div className="mb-4 mt-10" >
                        <h1 className='mb-3' style={{ fontSize: "60px" }}>
                            <strong style={{ color: "#000000", fontFamily: "Roboto", margin: "25px" }}>CERTIFICATE</strong> <br />
                            <span style={{ fontWeight: "normal", color: "#4A4A4A", fontFamily: "Roboto", margin: "25px" }}>OF APPRECIATION</span>
                        </h1>
                        <p className="fw-bold text-uppercase ps-2 mt-4" style={{ margin: "24px", fontSize: "22px", fontFamily: "Roboto" }} >
                            This certificate is presented to</p>

                        <h2 className=" mt-4" style={{ fontFamily: "'Great Vibes', cursive", fontSize: "9rem", color: "deepskyblue" }}>Seadem Deo</h2>
                        <p className="ps-5 text-muted ">
                            Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry’s standard dummy text ever since the 1500s.Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry’s standard dummy text ever since the 1500s.Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry’s standard dummy text ever since the 1500s.
                        </p>
                        <div className='d-flex justify-content-between ps-5  pe-5  m-5 ' style={{ marginTop: "1000px" }}>
                            <div className='text-center' style={{ width: "200px" }}>
                                <hr className="mx-auto" style={{ width: "130px", borderTop: "2px solid deepskyblue", margin: "5px auto" }} />
                                <p className="fw-bold m-0">JOHN SMITH</p>
                                <p className=" m-0" style={{ color: "#00bfff" }}>Director</p>
                            </div>
                            <div className="text-center" style={{ width: "200px" }}>
                                <hr className="mx-auto" style={{ width: "140px", borderTop: "2px solid deepskyblue", margin: "5px auto" }} />
                                <p className="fw-bold m-0">ASHLEY SMITH</p>
                                <p className=" m-0" style={{ color: "#00bfff" }}>Manager</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Certificate;
