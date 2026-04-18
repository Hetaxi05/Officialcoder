import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
  FaHome,
  FaDollarSign,
  FaPhoneAlt,
  FaInfoCircle,
  FaEnvelopeOpenText
} from "react-icons/fa";
import { FiSearch, FiArrowUpRight } from "react-icons/fi";
import { UserOutlined } from "@ant-design/icons";
import { GoBell } from "react-icons/go";
import { Dropdown, Space } from "antd";

const Header = ({ onToggleSidebar }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLearnonOpen, setLearnonOpen] = useState(false);
  const [isPracticeOpen, setPracticeOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [categories, setCategories] = useState([]);
  const [courses, setcourse] = useState([]);
  const [isUpdateDropdownOpen, setUpdateDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <FaHome />, to: "/" },
    { name: "Pricing", icon: <FaDollarSign />, to: "/pricing" },
    { name: "Contact Us", icon: <FaPhoneAlt />, to: "/contactus" },
    { name: "About Us", icon: <FaInfoCircle />, to: "/aboutus" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    getCategories();
    getCourse();
  }, []);

  function getCategories() {
    fetch(`${process.env.REACT_APP_API_URL}/category`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch(() => {});
  }

  function getCourse() {
    fetch(`${process.env.REACT_APP_API_URL}/cour`)
      .then((res) => res.json())
      .then((data) => {
        setcourse(data);
      })
      .catch(() => {});
  }

  const toggleUpdateDropdown = () => setUpdateDropdownOpen(!isUpdateDropdownOpen);

  const isTopicDetailsPage = location.pathname.includes("/topic-details");

  const closeAllDropdowns = () => {
    setLearnonOpen(false);
    setPracticeOpen(false);
  };

  const toggleLearnon = (e) => {
    e.preventDefault();
    setLearnonOpen((prev) => {
      if (!prev) setPracticeOpen(false);
      return !prev;
    });
  };

  const togglePractice = (e) => {
    e.preventDefault();
    setPracticeOpen((prev) => {
      if (!prev) setLearnonOpen(false);
      return !prev;
    });
  };

  const closeLearnon = () => {
    setLearnonOpen(false);
  };

  const closePractice = () => {
    setPracticeOpen(false);
  };

  const handleSearchClick = () => {
    navigate("/search-component");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name);
      setIsLoggedIn(!!user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const items = [
    {
      label: "Profile",
      key: "1",
      onClick: () => navigate("/userprofile"),
      icon: <UserOutlined />,
    },
    {
      label: "Inquiry Replies",
      key: "2",
      onClick: () => navigate("/inquirySection"),
      icon: <FaEnvelopeOpenText />,
    },
    {
      label: "Change Password",
      key: "3",
      icon: <UserOutlined />,
      onClick: () => navigate("/changepassword"),
    },
    {
      label: "Logout",
      key: "4",
      icon: <UserOutlined />,
      onClick: () => handleLogout(),
      danger: true,
    },
  ];

  const handleButtonClick = (e) => {
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  if (isTopicDetailsPage) {
    return (
      <nav className="details-page_header">
        <div>
          <Link to="/">
            <img
              src="/assets/header/new whitebg.png"
              alt="Programis Logo"
              className="d-none d-md-block"
              style={{ height: "30px" }}
            />
            <img
              src="/assets/header/WhatsApp Image 2025-04-06 at 18.18.36_4c23e06d.jpg"
              alt="Programis Logo"
              className="d-block d-md-none"
              style={{ height: "30px" }}
            />
          </Link>
        </div>

        <div
          className="d-flex justify-content-md-center flex-grow-1"
          style={{ height: "30px" }}
        >
          <button
            className="btn-header btn-outline-primary d-none d-md-inline-flex align-items-center"
            style={{
              backgroundColor: "#07a698",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "0.5rem 1rem",
              boxShadow: "0 0 0 3px rgb(42, 160, 152)",
            }}
            onClick={onToggleSidebar}
          >
            <span className="me-2">☰</span> Course Outline
          </button>

          <button
            className="btn d-inline-flex d-md-none align-items-center"
            style={{ marginLeft: "-130px", alignItems: "center", all: "unset" }}
            onClick={onToggleSidebar}
          >
            <img
              src="/assets/lesson/sidebarmobile.jpg"
              alt="Toggle Icon"
              style={{ width: "38px", height: "35px", marginLeft: "15px" }}
            />

            <img
              src="/assets/lesson/Getting Started _ Programiz PRO_files/sidebarmobileheader.png"
              alt="Toggle Icon"
              style={{ width: "30px", height: "22px", marginLeft: "-11px" }}
            />
          </button>
        </div>

        <div className="d-flex align-items-center">
          <button
            className="btn btn-primary me-4 d-flex align-items-center"
            style={{
              background: "linear-gradient(180deg, #9327fe 17.05%, #6501e5)",
              border: "none",
              height: "25px",
            }}
          >
            Go PRO <span className="ms-1"><FiArrowUpRight /></span>
          </button>

          <i className="bi bi-bell" style={{ minwidth: "744px" }}>
            <GoBell />
          </i>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top d-none d-lg-flex">
        <div className="container-fluid">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center p-0" href="#">
              <Link to="/">
                <img
                  src="/assets/header/new.png"
                  alt="Logo"
                  className="me-2"
                  style={{ width: "70%", height: "45px", color: "rgb(7, 166, 152)" }}
                />
              </Link>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"> </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={closeAllDropdowns}>
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={toggleLearnon}>
                    Category
                    {isLearnonOpen ? (
                      <FaChevronUp size={12} style={{ marginLeft: "5px" }} />
                    ) : (
                      <FaChevronDown size={12} style={{ marginLeft: "5px" }} />
                    )}
                  </a>
                </li>

                <li className="nav-item">
                  <Link to="/pricing" className="nav-link" onClick={closeAllDropdowns}>
                    Pricing
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/contactus"
                    className="nav-link"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={closeAllDropdowns}
                  >
                    Contact Us
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link me-3" href="#">
                    <Link
                      to="/aboutus"
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={closeAllDropdowns}
                    >
                      AboutUs
                    </Link>
                  </a>
                </li>
              </ul>

              <div
                style={{ marginRight: "30px", cursor: "pointer" }}
                onClick={handleSearchClick}
              >
                <FiSearch />
              </div>

              <div className="d-flex align-items-center">
                {isLoggedIn ? (
                  <Space wrap>
                    <Dropdown.Button
                      menu={menuProps}
                      placement="bottom"
                      onClick={handleButtonClick}
                      icon={<UserOutlined />}
                    >
                      {userName ? userName : "Menu"}
                    </Dropdown.Button>
                  </Space>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/userlogin")}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isLearnonOpen && (
        <div className={`dropdown-container open`} onClick={toggleLearnon}>
          <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
            <div className="container my-5">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {categories?.map((category) => {
                  const categoryCourses = courses.filter(
                    (course) => course.category === category._id
                  );

                  return (
                    <div className="col" key={category._id}>
                      <h6 className="pb-2" style={{ fontWeight: "600" }}>
                        {category.categoryname}
                      </h6>
                      <ul className="list-unstyled">
                        {categoryCourses.length > 0 ? (
                          categoryCourses.map((course) => (
                            <li key={course._id}>
                              <Link
                                to={`/course-details/${course._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  display: "block",
                                  padding: "5px 0",
                                }}
                                onClick={closeLearnon}
                              >
                                {course.coursename}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li style={{ color: "#c2c1c1" }}>No courses available</li>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {isPracticeOpen && (
        <div className={`dropdown-container open`} onClick={togglePractice}>
          <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
            <div className="container my-5">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
                <div className="col">
                  <h5 className="fw-bold">JavaScript</h5>
                  <ul className="list-unstyled">
                    <li to="/javascript-basics" onClick={closePractice}>JavaScript Basics</li>
                    <li>JS in Browser</li>
                    <li>JS Intermediate</li>
                    <li>JS Recursion</li>
                  </ul>
                  <a href="#" className="text-primary text-decoration-none">
                    JavaScript Certification
                  </a>
                </div>

                <div className="col">
                  <h5 className="fw-bold">SQL</h5>
                  <ul className="list-unstyled">
                    <li>SQL Basics</li>
                    <li>Interview Questions</li>
                  </ul>
                  <a href="#" className="text-primary text-decoration-none">
                    SQL Certification
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav
        className="mobile-header d-lg-none d-flex gap-3 align-items-center px-3 py-2 pt-3 pb-3"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <FaBars
          size={24}
          onClick={toggleMobileMenu}
          style={{ cursor: "pointer", color: "#4e73df" }}
        />
        <Link to="/">
          <img src="/assets/header/new.png" alt="Logo" height="40" />
        </Link>
      </nav>

      <div className={`mobile-sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <FaTimes size={24} onClick={toggleMobileMenu} className="close-btn" />
            {isLoggedIn && (
              <div className="user-info">
                <UserOutlined className="user-avatar" />
                <span className="user-name">Hello, {userName}</span>
              </div>
            )}
          </div>

          <div className="sidebar-menu">
            <ul className="nav flex-column">
              {menuItems.map((item, index) => (
                <li className="mobilenav-item" key={index}>
                  <Link to={item.to} className="nav-link" onClick={toggleMobileMenu}>
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-text">{item.name}</span>
                  </Link>
                  <hr className="menu-separator" />
                </li>
              ))}

              <li className="mobilenav-item">
                <button className="nav-link dropdown-toggle" onClick={toggleUpdateDropdown}>
                  Update
                </button>

                {isUpdateDropdownOpen && (
                  <ul className="dropdown-menu show">
                    <li>
                      <Link
                        to="/userprofile"
                        className="dropdown-item"
                        onClick={toggleMobileMenu}
                      >
                        Update Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inquiry-replies"
                        className="dropdown-item"
                        onClick={toggleMobileMenu}
                      >
                        Inquiry Replies
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/changepassword"
                        className="dropdown-item"
                        onClick={toggleMobileMenu}
                      >
                        Change Password
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <button className="btn btn-danger logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/userlogin")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;