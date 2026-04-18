import React, { useState, useRef, useEffect } from "react";
import '../sidebar/sidebar.css';
import { Link, useNavigate } from "react-router-dom";
import { PiLightbulbFilament } from "react-icons/pi";
import { PiUsersThreeDuotone } from "react-icons/pi";
// import { useNavigate } from "react-router-dom";



const Sidebar = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState({
        dashboards: false,
        user: false,
        course: false,
        subject: false,
        chapter: false,
        category: false,
        subtopic: false,
        topic: false,
        // widgets: false,
        pageLayout: false,
        project: false,
        quiz: false,
        role: false,
        payment: false,
        inquiry: false
    });

    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const navigate = useNavigate()

    const sidebarRef = useRef(null);
    const submenuRefs = {
        dashboards: useRef(null),
        category: useRef(null),
        user: useRef(null),
        course: useRef(null),
        chapter: useRef(null),
        subject: useRef(null),
        topic: useRef(null),
        subtopic: useRef(null),
        quiz: useRef(null),
        role: useRef(null),
        payment: useRef(null),
        inquiry: useRef(null)
    };

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    // const toggleMenu = (menu) => {
    //     setOpenMenus((prev) => {
    //         const isOpening = !prev[menu];

    //         if (submenuRefs[menu].current) {
    //             submenuRefs[menu].current.style.height = isOpening
    //                 ? submenuRefs[menu].current.scrollHeight + "px"
    //                 : "0px";
    //         }

    //         return { ...prev, [menu]: isOpening };
    //     });

    //     setActiveMenu(menu);
    // };

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => {
            const isOpening = !prev[menu];
            // Create new state: close all menus
            const newState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});
            // Set the clicked menu to toggled value
            newState[menu] = isOpening;

            // Update each submenu's height based on its open/closed state
            Object.keys(submenuRefs).forEach((key) => {
                if (submenuRefs[key].current) {
                    submenuRefs[key].current.style.height = newState[key]
                        ? submenuRefs[key].current.scrollHeight + "px"
                        : "0px";
                }
            });

            return newState;
        });
        setActiveMenu(menu);
    };


    const handleSubmenuClick = (submenu) => {
        setActiveSubmenu(submenu);
        if (isCollapsed) {
            setIsCollapsed(true); // Collapse the sidebar again on submenu click
        }
    };

    const [admin, setAdmin] = useState();
    useEffect(() => {
        const data = localStorage.getItem("admin");
        setAdmin(JSON.parse(data));

    }, [])

    function checkPermission(permission) {
        if (admin.permission.includes(permission)) {
            return true;
        } else {
            return false
        }
    }



    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/");
    };

    return (
        <>
            <div
                ref={sidebarRef}
                className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
                style={{ overflowY: "auto", height: "100vh" }}

            >
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    {!isCollapsed && <h3 className="sidebar-logo">Official Coders</h3>}
                    <i className="bi bi-grid-3x3-gap sidebar-icon" onClick={toggleSidebar}></i>
                </div>

                {/* Sidebar Menu */}
                <ul className="nav flex-column">
                    {/* General Section */}
                    {!isCollapsed && (
                        <li className="sidebar-section">
                            <span className="section-label">MAIN MENU</span>
                        </li>
                    )}

                    {/* Dashboards */}
                    <Link to="/dashboard" style={{ textDecoration: "none" }}
                        className={`nav-item ${activeMenu === "dashboards" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ dashboards: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ dashboards: false })}
                    >
                        <button className="nav-link" onClick={() => toggleMenu("dashboards")}>
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i className="bi bi-house-door" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Dashboard</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.dashboards ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>

                    </Link>
                    {/* user */}
                    <Link to="/user" style={{ textDecoration: "none" }}
                        className={`nav-item ${activeMenu === "user" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ user: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ user: false })}
                    >
                        <button className="nav-link" onClick={() => toggleMenu("user")}>
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i class="bi bi-people" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Users</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.user ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>


                    </Link>


                    {/* Category */}

                    <li
                        className={`nav-item ${activeMenu === "category" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ category: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ category: false })}
                    >
                        <button className="nav-link"

                            onClick={() => {
                                if (checkPermission("category")) {
                                    toggleMenu("category")
                                }

                            }}
                        >

                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i class="bi bi-ui-checks-grid" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Category</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.user ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>
                    </li>
                    <ul ref={submenuRefs.category} className={`submenu ${openMenus.category ? "open" : ""}`}>

                        <Link to='/all-category' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "All Category" ? "active" : ""}`}
                            onClick={() => handleSubmenuClick("All Category")}>
                            <span className="line"></span> {!isCollapsed && "All Category"}
                        </Link>
                        <Link to='/category' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "Add Category" ? "active" : ""}`}
                            onClick={() => handleSubmenuClick("Add Category")}>
                            <span className="line"></span> {!isCollapsed && "Add Category"}
                        </Link>

                    </ul>



                    {/* Courses */}

                    <li
                        className={`nav-item ${activeMenu === "course" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ course: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ course: false })}
                    >
                        <button className="nav-link"

                            // onClick={() => toggleMenu("course")}
                            onClick={() => {
                                if (checkPermission("course")) {
                                    toggleMenu("course")
                                }
                            }}
                        >
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i class="bi bi-mortarboard" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Courses</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.course ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>
                        <ul ref={submenuRefs.course} className={`submenu ${openMenus.course ? "open" : ""}`}>

                            <Link to='/all-course' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "All Courses" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("All Courses")}>
                                <span className="line"></span> {!isCollapsed && "All Courses"}
                            </Link>
                            <Link to='/add-course' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "Add Courses" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("Add Courses")}>
                                <span className="line"></span> {!isCollapsed && "Add Courses"}
                            </Link>

                        </ul>
                    </li>


                    {/* Chapters */}

                    <li
                        className={`nav-item ${activeMenu === "chapter" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ chapter: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ chapter: false })}
                    >
                        <button className="nav-link"
                            onClick={() => {
                                if (checkPermission("chapter")) {
                                    toggleMenu("chapter")
                                }

                            }} >
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i class="bi bi-journals" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Chapters</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.subject ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>

                        <ul ref={submenuRefs.chapter} className={`submenu ${openMenus.chapter ? "open" : ""}`}>

                            <Link to='/all-chapter' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "All Chapters" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("All Chapters")}>
                                <span className="line"></span> {!isCollapsed && "All Chapters"}
                            </Link>
                            <Link to='/add-chapter' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "Add Chapters" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("Add Chapters")}>
                                <span className="line"></span> {!isCollapsed && "Add Chapters"}
                            </Link>
                        </ul>
                    </li>

                    {/* Topics */}

                    <li
                        className={`nav-item ${activeMenu === "chapter" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ topic: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ topic: false })}
                    >
                        <button className="nav-link" onClick={() => {
                            if (checkPermission("topic")) {
                                toggleMenu("topic")
                            }

                        }}>
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i class="bi bi-journal-text" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Topics</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.subject ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>


                        <ul ref={submenuRefs.topic} className={`submenu ${openMenus.chapter ? "open" : ""}`}>

                            <Link to="/all-topic" style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "All Topics" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("All Topics")}>
                                <span className="line"></span> {!isCollapsed && "All Topics"}
                            </Link>
                            <Link to='/add-topic' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "Add Topics" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("Add Topics")}>
                                <span className="line"></span> {!isCollapsed && "Add Topics"}
                            </Link>
                        </ul>
                    </li>

                    {/* SubTopics */}

                    <li
                        className={`nav-item ${activeMenu === "subtopic" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ subtopic: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ subtopic: false })}
                    >
                        <button className="nav-link" onClick={() => {
                            if (checkPermission("subtopic")) {
                                toggleMenu("subtopic")
                            }

                        }}>
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i class="bi bi-bookmarks" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Subtopic</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.subtopic ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>
                        <ul ref={submenuRefs.subtopic} className={`submenu ${openMenus.subtopic ? "open" : ""}`}>

                            <Link to="/all-subtopic" style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "All Subtopics" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("All Subtopics")}>
                                <span className="line"></span> {!isCollapsed && "All Subtopics"}
                            </Link>
                            <Link to='/add-subtopic' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "Add Subtopics" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("Add Subtopics")}>
                                <span className="line"></span> {!isCollapsed && "Add Subtopics"}
                            </Link>

                        </ul>

                    </li>
                    {/* quiz with link */}
                    <li
                        className={`nav-item ${activeMenu === "quiz" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ quiz: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ quiz: false })}
                    >
                        <button className="nav-link" onClick={() => {
                            if (checkPermission("quiz")) {
                                toggleMenu("quiz")
                            }

                        }}>
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <PiLightbulbFilament style={{ fontSize: "25px", color: "white", marginLeft: "-0.5px" }} />

                                    {!isCollapsed && <span className="menu-text" style={{ margin: "8px" }}>Quiz</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.quiz ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>
                        <ul ref={submenuRefs.quiz} className={`submenu ${openMenus.subtopic ? "open" : ""}`}>
                            <Link to="/all-quiz" style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "All quiz" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("All quiz")}>
                                <span className="line"></span> {!isCollapsed && "All quiz"}
                            </Link>
                            <Link to='/quiz' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "quiz" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("quiz")}>
                                <span className="line"></span> {!isCollapsed && "quiz"}
                            </Link>
                        </ul>
                    </li>

                    {/* role */}
                    <li
                        className={`nav-item ${activeMenu === "role" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ role: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ role: false })}
                    >
                        {/* <button className="nav-link" onClick={() => toggleMenu("role")}> */}

                        <button className="nav-link"
                            onClick={() => {
                                if (checkPermission("role")) {
                                    toggleMenu("role")
                                }

                            }} >
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <PiUsersThreeDuotone
                                        style={{ fontSize: "25px", color: "white", marginLeft: "-0.5px" }} />

                                    {!isCollapsed && <span className="menu-text" style={{ margin: "8px" }}>Role</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.role ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>
                        <ul ref={submenuRefs.role} className={`submenu ${openMenus.subtopic ? "open" : ""}`}>
                            <Link to="/all-role" style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "role" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("All Role")}>
                                <span className="line"></span> {!isCollapsed && "All Role"}
                            </Link>
                            <Link to='/role' style={{ textDecoration: "none" }} className={`submenu-item ${activeSubmenu === "quiz" ? "active" : ""}`}
                                onClick={() => handleSubmenuClick("Role")}>
                                <span className="line"></span> {!isCollapsed && "Role"}
                            </Link>
                        </ul>
                    </li>

                    {/* payment */}

                    <Link to="/payment" style={{ textDecoration: "none" }}
                        className={`nav-item ${activeMenu === "payment" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ payment: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ payment: false })}
                        onClick={(e) => {
                            if (!checkPermission("payment")) {
                                e.preventDefault(); // Stop navigation if no permission
                                return;
                            }
                            toggleMenu("payment");
                        }}
                    >
                        {/* <button className="nav-link" onClick={() => toggleMenu("payment")}> */}
                        <button className="nav-link" >

                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i class="bi bi-credit-card" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Payment</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.payment ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>


                    </Link>
                    {/* contact */}
                    <Link to="/inquiry" style={{ textDecoration: "none" }}
                        className={`nav-item ${activeMenu === "inquiry" ? "active" : ""}`}
                        onMouseEnter={() => isCollapsed && setOpenMenus({ inquiry: true })}
                        onMouseLeave={() => isCollapsed && setOpenMenus({ inquiry: false })}
                        onClick={(e) => {
                            if (!checkPermission("inquiry")) {
                                e.preventDefault(); // Stop navigation if no permission
                                return;
                            }
                            toggleMenu("inquiry");
                        }}
                    >
                        {/* <button className="nav-link" onClick={() => toggleMenu("Inquiry")}> */}
                        <button className="nav-link" >

                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i class="bi bi-info-circle" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Inquiry</span>}
                                </div>
                                {!isCollapsed && (
                                    <div className="menu-right">
                                        <i className={`bi bi-chevron-${openMenus.inquiry ? "down" : "right"} dropdown-icon`}></i>
                                    </div>
                                )}
                            </div>
                        </button>


                    </Link>

                    {/* logout */}
                    <li className="nav-item">
                        <button className="nav-link logout" onClick={handleLogout}>
                            <div className="d-flex w-100 nav-item-padding">
                                <div className="menu-left">
                                    <i className="bi bi-box-arrow-right" style={{ fontSize: "24px" }}></i>
                                    {!isCollapsed && <span className="menu-text">Logout</span>}
                                </div>
                            </div>
                        </button>
                    </li>






                </ul>

            </div>


        </>

    );
};

export default Sidebar;
