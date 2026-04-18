import React from "react";
import './overview.css';


import { FaStar, FaRegStar } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { FiGlobe } from "react-icons/fi";

const Overview = () => {
    return (
        <div className="course-container border p-4 mt-5 mb-5">
            <div className="course-image">
                <img src="./assets/image/course-details-img.png" alt="Course Preview" />
            </div>
            <div className="course-content">
                <div className="tags">
                    <span className="best-seller">Best Seller</span>
                    <span className="latest">Latest</span>
                </div>
                <h1 className="course-title mb-4">
                    User Experience Design Essentials - Adobe XD UI UX Design Course For Limited Time
                </h1>
                <div className="course-meta  align-items-center">
                    <p><img src="./assets/image/category-1.png" alt="courses categori" width="30px" height="30px" style={{ backgroundColor: "#f0f0f0", padding: "5px", borderRadius: "90%" }}></img>
                    </p>
                    <p className="Instructor">Instructor: <span style={{ color: "black" }}>Kevin Perry</span></p><div class="vr"></div>
                    <p><FiGlobe /> Web Development</p><div class="vr"></div>
                    <p><BiTimeFive /> 04 April, 2022</p><div class="vr"></div>
                    <p className="course-rating align-items-center pt-0">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar /> <span>(4.88)</span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Overview;
