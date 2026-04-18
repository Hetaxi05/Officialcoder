import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaList, FaBook, FaCode } from "react-icons/fa";
import "./Mobilenav.css"
const MobileNav = () => {
  return (
    <nav className="mobile-nav">
      <Link to="/" className="nav-item">
        <FaHome /> <span>Home</span>
      </Link>
      <Link to="/mobilecategory" className="nav-item">
        <FaList /> <span>Category</span>
      </Link>
      <Link to="/mobilecourse" className="nav-item">
        <FaBook /> <span>Courses</span>
      </Link>
      <Link to="/language-compiler" className="nav-item">
        <FaCode /> <span>Compiler</span>
      </Link>
    </nav>
  );
};

export default MobileNav;
