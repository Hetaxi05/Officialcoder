import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function AllCourse() {
  const navigate = useNavigate();
  const [getcourse, setgetCourse] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;

  useEffect(() => {
    getCourse();
  }, []);

  function getCourse() {
    fetch(`${process.env.REACT_APP_API_URL}/cour/`)
      .then((response) => response.json())
      .then((data) => {
        setgetCourse(data);
      })
      .catch((err) => {
        alert("Error fetching courses: " + err);
      });
  }

  function editCourse(id) {
    messageApi.open({
      key: "edit",
      type: "loading",
      content: "Redirecting to edit course...",
    });

    setTimeout(() => {
      messageApi.open({
        key: "edit",
        type: "success",
        content: "Redirected successfully! You will be redirected now.",
        duration: 2,
      });

      setTimeout(() => {
        navigate(`/edit-course/${id}`);
      }, 500);
    }, 1000);
  }

  function showDeleteConfirm(id) {
    confirm({
      title: "Are you sure you want to delete this course?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deleteCourse(id);
      },
    });
  }

  function deleteCourse(id) {
    message.loading({ content: "Deleting...", key: "deleteCourse" });

    setTimeout(() => {
      fetch(`${process.env.REACT_APP_API_URL}/cour/del/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the course");
          }
          setgetCourse(getcourse.filter((course) => course._id !== id));
          message.success({
            content: "Course deleted successfully",
            key: "deleteCourse",
          });
        })
        .catch((err) => {
          message.error({
            content: "Course not deleted: " + err.message,
            key: "deleteCourse",
          });
        });
    }, 1000);
  }

  return (
    <>
      {contextHolder}

      <div
        className="container-fluid py-3"
        style={{ backgroundColor: "#f5f7fb", minHeight: "100vh" }}
      >
        {/* Top Bar */}
        <div
          className="d-flex justify-content-between align-items-center px-3 py-3 mb-4"
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              color: "#07a698",
              fontFamily: "sans-serif",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            All Courses
          </div>

          <ol
            className="breadcrumb mb-0"
            style={{ fontFamily: "sans-serif", background: "transparent" }}
          >
            <li className="breadcrumb-item">
              <Link
                to="/all-course"
                style={{ color: "#07a698", textDecoration: "none" }}
              >
                Course
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link
                to="/add-course"
                style={{ color: "#07a698", textDecoration: "none" }}
              >
                Add Course
              </Link>
            </li>
          </ol>
        </div>

        {/* Course Cards */}
        <div className="row g-4">
          {getcourse.map((course) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={course._id}>
              <div
                className="card h-100 border-0"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
                  transition: "0.3s ease",
                }}
              >
                <img
                  src={course.image}
                  alt="Course"
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column p-4">
                  <div style={{ flexGrow: 1 }}>
                    <p
                      style={{
                        fontSize: "16px",
                        marginBottom: "14px",
                        color: "#2c2c2c",
                      }}
                    >
                      <strong style={{ fontWeight: "700" }}>Name:</strong>{" "}
                      {course.coursename}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                        marginBottom: "14px",
                        color: "#2c2c2c",
                      }}
                    >
                      <strong style={{ fontWeight: "700" }}>Code:</strong>{" "}
                      {course.coursecode}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                        marginBottom: "14px",
                        color: "#2c2c2c",
                      }}
                    >
                      <strong style={{ fontWeight: "700" }}>Duration:</strong>{" "}
                      {course.duration}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                        marginBottom: "20px",
                        color: "#2c2c2c",
                        wordBreak: "break-word",
                      }}
                    >
                      <strong style={{ fontWeight: "700" }}>Tag:</strong>{" "}
                      {course.tag}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="d-grid gap-2 mt-auto">
                    <div className="row g-2">
                      <div className="col-4">
                        <button
                          type="button"
                          className="btn btn-outline-primary w-100"
                          onClick={() => editCourse(course._id)}
                          style={{
                            borderRadius: "10px",
                            fontWeight: "500",
                            padding: "10px 0",
                          }}
                        >
                          Update
                        </button>
                      </div>

                      <div className="col-4">
                        <button
                          type="button"
                          className="btn btn-outline-danger w-100"
                          onClick={() => showDeleteConfirm(course._id)}
                          style={{
                            borderRadius: "10px",
                            fontWeight: "500",
                            padding: "10px 0",
                          }}
                        >
                          Delete
                        </button>
                      </div>

                      <div className="col-4">
                        <Link
                          to={`/quiz/add/course/${course._id}`}
                          className="btn btn-outline-primary w-100"
                          style={{
                            borderRadius: "10px",
                            fontWeight: "500",
                            padding: "10px 0",
                          }}
                        >
                          Quiz
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllCourse;