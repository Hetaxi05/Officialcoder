  import React, { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faTrash, faPenToSquare, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
  import { ExclamationCircleOutlined } from '@ant-design/icons';
  import { Table, Modal, message } from "antd";


  function AllQuiz() {

    const [Quiz, setQuiz] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const { confirm } = Modal; // extract confirm from Modal
    const [expandedRows, setExpandedRows] = useState({});
    const navigate = useNavigate();

    // Filter states
    const [courses, setCourses] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedChapter, setSelectedChapter] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");

    // On component mount: fetch courses and all quizzes
    useEffect(() => {
      displayquiz();
      fetchCourses();
    }, []);

    // When a course is selected, fetch chapters and reset lower-level filters
    useEffect(() => {
      if (selectedCourse) {
        fetchChapters(selectedCourse);
        displayquiz();
      } else {
        setChapters([]);
        setSelectedChapter("");
      }
      setTopics([]);
      setSelectedTopic("");
      
     
    }, [selectedCourse]);



    //     fetchChapters(selectedCourse);
    //   } else {
    //     setChapters([]);
    //     setSelectedChapter("");

    //   }
    //   setTopics([]);
    //   setSelectedTopic("");
    //   displayquiz(); // Show all quizzes if course filter is cleared
    // }, 
    // [selectedCourse]);

    // When a chapter is selected, fetch topics and reset topic filter
    useEffect(() => {
      if (selectedChapter) {
        fetchTopics(selectedChapter);
      } else {
        setTopics([]);
        setSelectedTopic("");
      }
      // displayquiz(); // Refresh quiz list
    }, [selectedChapter]);

    // When a topic is selected, fetch quizzes filtered by that topic
    useEffect(() => {
      displayquiz();
    }, [selectedCourse, selectedTopic]);


    // Function to fetch all courses from the Course API
    function fetchCourses() {
      fetch(`${process.env.REACT_APP_API_URL}/cour/`)
        .then((res) => res.json())
        .then((data) => {
          setCourses(data)
        })
        .catch((err) => {
          console.error("Error fetching courses:", err)
        });
    }

    // Function to fetch chapters filtered by course id from the Chapter API
    function fetchChapters(courseId) {
      fetch(`${process.env.REACT_APP_API_URL}/chap/course/${courseId}`)
        .then((res) => res.json())
        .then((data) => {
          setChapters(data)
        })
        .catch((err) => {
          console.error("Error fetching chapters:", err)
        });
    }

    // Function to fetch topics filtered by chapter id from the Topic API
    function fetchTopics(chapterId) {
      fetch(`${process.env.REACT_APP_API_URL}/topic/chapter/${chapterId}`)
        .then((res) => res.json())
        .then((data) => {
          setTopics(data)
        })
        .catch((err) => {
          console.error("Error fetching topics:", err)
        });
    }

    // Function to fetch quizzes (all or filtered by topic)

    // function displayquiz() {
    //   fetch("http://localhost:3000/quiz/", { method: "get" })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setQuiz(data)
    //     })
    //     .catch((err) => {
    //       alert(err);
    //     });
    // }

    // function displayquiz(url) {
    //   if (!url) {
    //     url = "http://localhost:3000/quiz/";
    //   }
    //   fetch(url, { method: "get" })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setQuiz(data);
    //     })
    //     .catch((err) => {
    //       alert(err);
    //     });
    // }
    function displayquiz() {
      // If no URL is provided, build one based on filters
      // if (!url) {
        var url="";
        if (selectedCourse || selectedTopic) {
          let query = `${process.env.REACT_APP_API_URL}/quiz/data/?`;
          if (selectedCourse) {
            query += `courseid=${selectedCourse}&`;
          }
          if (selectedTopic) {
            query = `${process.env.REACT_APP_API_URL}/quiz/data/?`;
            query += `topicid=${selectedTopic}`;
          }
          // Remove any trailing ampersand if present
          url = query.replace(/&$/, "");
        } else {
          url = `${process.env.REACT_APP_API_URL}/quiz/`;
        }
      // }
      console.log("Fetching URL:", url);
      fetch(url, { method: "get" })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data returned:", data);
          setQuiz(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }



    function deletequiz(id) {
      message.loading({ content: "deleting...", key: "deleteTopic" })
      return new Promise((resolve) => {
        setTimeout(() => {
          fetch(`${process.env.REACT_APP_API_URL}/quiz/${id}`,
            {
              method: "delete"
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to delete the quiz");
              }
              setQuiz(Quiz.filter(user => user._id !== id));
              message.success({ content: "Quiz deleted successfully", key: "deleteQuiz" });
              resolve();
            })
            .catch((err) => {
              message.error({ content: "Quiz not deleted: " + err.message, key: "deleteQuiz" });
              resolve();
            });
        }, 1000);
      });
    }


    function editQuiz(user) {
      messageApi.open({
        key: 'edit',
        type: 'loading',
        content: 'Redirecting to edit quiz...',
      });

      setTimeout(() => {
        messageApi.open({
          key: 'edit',
          type: 'success',
          content: 'Redirected successfully! You will be redirected now.',
          duration: 5, // Message stays visible for 5 seconds
        });

        setTimeout(() => {
          navigate(`/edit-quiz/${user._id}`, {
            state: {
              question: user.question,
              option: user.option,
              answer: user.answer,
            },
          });
        }, 500);
      }, 1000);
    }



    function showDeleteConfirm(id) {
      confirm({
        title: "Are you sure you want to delete this quiz?",
        icon: <ExclamationCircleOutlined />,
        content: "This action cannot be undone",
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        onOk() {
          deletequiz(id);
        },
      });
    }

    const columns = [
      { title: '', dataIndex: 'expandBtn', key: 'expandBtn', render: () => null },
      {
        title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Question</span>,
        dataIndex: "question",
        key: "question",
        render: (question) => <div style={{ maxWidth: 800 }} dangerouslySetInnerHTML={{ __html: question }} />,
      },
      {
        title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Action</span>,
        key: "action",
        render: (_, record) => (
          <div style={{ display: "flex", gap: "15px", cursor: "pointer" }}>
            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "blue" }} onClick={() => editQuiz(record)} />
            <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} onClick={() => showDeleteConfirm(record._id)} />
            <FontAwesomeIcon
              icon={expandedRows[record._id] ? faEyeSlash : faEye}
              style={{ color: "green" }}
              onClick={() =>
                setExpandedRows((prev) => ({ ...prev, [record._id]: !prev[record._id] }))
              }
            />
          </div>
        ),
      },
    ];

    const expandedRowRender = (record) => (
      <div className="p-3 border rounded" style={{ background: "#f9f9f9" }}>
        <h5>Options</h5>
        {Array.isArray(record.option) ? (
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {record.option.map((opt, idx) => (
              <li key={idx}><strong>{String.fromCharCode(65 + idx)}.</strong>&nbsp;<span dangerouslySetInnerHTML={{ __html: opt.text }} /></li>
            ))}
          </ul>
        ) : <p>No options available</p>}
        <h5 className="mt-3">Answer</h5>
        <div dangerouslySetInnerHTML={{ __html: record.answer }} />
      </div>
    );

    const dataSource = Quiz.map((q, i) => ({ ...q, key: q._id || i }));



    return (
      <>
        {contextHolder}

        <div className="container-fluid" style={{ backgroundColor: "#f5f5f5" }}>
          {/* Header Section */}
          <div
            className="d-flex justify-content-between align-items-center mt-4 p-3 main"
            style={{ height: "53px", width: "100%", background: "white" }}
          >
            <div style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }}>
              <span>All Quiz</span>
            </div>
            <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
              <Link to="/all-quiz" className="breadcrumb-item" style={{ textDecoration: "none", color: "#07a698" }}>
                Quiz
              </Link>
              <Link to="/quiz" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">
                Add Quiz
              </Link>
            </ol>
          </div>
          <div
            className="d-flex justify-content-between align-items-center mt-4 p-3 main"
            style={{ height: "60px", width: "100%", background: "white" }}
          >
            <div style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }}>
              <span>Quiz Listing</span>
            </div>
          </div>

          {/* Dropdown Filters */}
          <div className="container my-3">
            <div className="row g-3">
              <div className="col-md-4">
                <label>Course:</label>
                <select className="form-select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                  <option value="">Select Course</option>
                  {courses.map((course) => <option key={course._id} value={course._id}>{course.coursename}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label>Chapter:</label>
                <select className="form-select" value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} disabled={!selectedCourse}>
                  <option value="">Select Chapter</option>
                  {chapters.map((ch) => <option key={ch._id} value={ch._id}>{ch.chaptertitle}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label>Topic:</label>
                <select className="form-select" value={selectedTopic} onChange={(e) => {
                  setSelectedTopic(e.target.value)
                  // alert(e.target.value);
                  // displayquiz();
                }} disabled={!selectedChapter}>
                  <option value="">Select Topic</option>
                  {topics.map((topic) => <option key={topic._id} value={topic._id}>{topic.title}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <Table
                columns={columns}
                dataSource={dataSource}
                expandable={{
                  expandedRowRender,
                  rowExpandable: () => true,
                  expandedRowKeys: Object.keys(expandedRows).filter((k) => expandedRows[k]),
                  onExpand: (expanded, record) => setExpandedRows((prev) => ({ ...prev, [record._id]: expanded })),
                }}
                pagination={{ pageSize: 5 }}
                rowKey="_id"
              />
              <style>
                {`
                                          .ant-table-pagination {
                                          display: flex !important;
                                          justify-content: center !important;
                                          }
                                      `}
              </style>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default AllQuiz;
