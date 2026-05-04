import React from "react";
import { FaFacebookF, FaInstagram, FaBehance, FaPinterestP, FaYoutube, FaArrowRight} from 'react-icons/fa';
import { FaRegCalendar } from 'react-icons/fa';

import './footer.css';

function Footer() {
    return (
        <div className="container-fluid bg-dark text-light p-4 pt-2" style={{background: "linear-gradient(to right, rgb(0 38 24), rgb(1 30 25))"}}>
            <div className="container py-5 pb-0 pt-2 ">

                <div className="row mb-5 d-flex justify-content-between align-items-center  p-5 mt-5"  style={{border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius:"10px"}}>
                    <div className="col-md-5">
                        <h3 className="fw-bold">Subscribe Our Newsletter For Latest Updates</h3>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <div className="input-group ">
                            <input type="email" className="form-control" placeholder="Enter Your E-mail" style={{width:"90px",borderRadius:"250px"}} />
                            <button className="btn btn-teal ps-3" type="button"  style={{backgroundColor:"rgb(49 181 169)",borderRadius:"250px",marginLeft:"30px"}}>Subscribe Now <FaArrowRight className="ms-2" /></button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold mb-3">GET IN TOUCH!</h5>

                        <div className="mb-4" style={{width:"60px", backgroundColor:"white",height:"1.4px"}}>
                        </div>

                        <p>305,CODDING HOUSE,Exiito Hub,Jahangirpura,Edingburgh,uk </p>
                        <p className="fw-bold">+44 77236 78848</p>
                        <p>contact@codinghouse.in</p>
                        <div className="d-flex gap-3 fs-5">
                            <FaFacebookF />
                            <FaInstagram />
                            <FaBehance />
                            <FaPinterestP />
                            <FaYoutube />
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold mb-3">COMPANY INFO</h5>
                        <div className="mb-4" style={{width:"60px", backgroundColor:"white",height:"1.4px"}}>
                        </div>
                        <ul className=" ulli list-unstyled ">
                            <li style={{fontSize:"16px"}}><FaArrowRight className="me-2" /> About Us</li>
                            <li><FaArrowRight className="me-2" /> Contect Us</li>
                            <li><FaArrowRight className="me-2" /> FAQs</li>
                            <li><FaArrowRight className="me-2" /> Help Center</li>
                            <li><FaArrowRight className="me-2" /> Become A Role</li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold mb-3">USEFUL LINKS</h5>
                        <div className="mb-4" style={{width:"60px", backgroundColor:"white",height:"1.4px"}}>
                        </div>
                        <ul className="ulli  list-unstyled ">
                            <li><FaArrowRight className="me-2" /> All Courses</li>
                            <li><FaArrowRight className="me-2" /> Digital Marketing</li>
                            <li><FaArrowRight className="me-2" /> Design & Branding</li>
                            <li><FaArrowRight className="me-2" /> Storytelling & Voice Over</li>
                            <li><FaArrowRight className="me-2" /> News & Blogs</li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold mb-3">RECENT POST</h5>
                        <div className="mb-4" style={{width:"60px", backgroundColor:"white",height:"1.4px"}}>
                        </div>
                        
                        <div className="d-flex align-items-center mb-4 ">
                            <img src="./assets/image/footerpost1.png" alt="Post 1" className="me-2 rounded " style={{ width: '90px', height: '80px' }} />
                            <div className="ps-3">
                                <p className="mb-1 fw-bold">Where Dreams Find A Home</p>
                                <small > <FaRegCalendar style={{ marginRight: '10px',color:"#07a698"  }} />02 March, 2026                                </small>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <img src="./assets/image/footerpost2.png" alt="Post 2" className="me-2 rounded" style={{ width: '90px', height: '80px' }} />
                            <div className="ps-3">
                                <p className="mb-1 fw-bold">Where Dreams Find A Home</p>
                                <small > <FaRegCalendar style={{ marginRight: '10px',color:"#07a698" }} />02 March, 2026</small>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mb-4 " style={{width:"100%", backgroundColor:"rgba(255, 255, 255, 0.1)",height:"0.1px"}}>
            </div>
            <p style={{ display: "flex",justifyContent: "center"}}>Copyright © 2025 codinghouse. All Rights Reserved.</p>
        </div>
    );
}

export default Footer;
