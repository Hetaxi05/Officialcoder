import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
<FontAwesomeIcon icon={faTrash} style={{ "--fa-primary-color": "#ec0909", "--fa-secondary-color": "red", }} />
// const users = Array(3).fill();

function Allsubject() {

  const [getsubject, setgetSubject] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getSubject()
  }, [])
  function getSubject() {
    fetch('http://localhost:3000/sub/')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setgetSubject(data)
      })
      .catch((err) => {
        alert("Error fetching:" + err)
      })
  }
  // const formatDate = (date) => {
  //   const d = new Date(date);
  //   const day = String(d.getDate()).padStart(2, '0');
  //   const month = String(d.getMonth() + 1).padStart(2, '0');
  //   const year = d.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };
  return (
    <>
      <div className="container-fluid " style={{ backgroundColor: '#f5f5f5' }}>
        <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
          <div className="" style={{ color: "#0d6efd", fontFamily: "sans-serif", fontSize: "20px" }} >
            <span>All Subjects</span>
          </div>
          <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
            <Link to="/add-subject" className="breadcrumb-item" style={{ textDecoration: "none", }}>Subject</Link>
            <Link to="/dashboard" className="breadcrumb-item active" style={{ color: "#0d6efd", textDecoration: "none" }} aria-current="page">Dashboard</Link>
          </ol>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 p-3 main " style={{ height: '60px', width: '100%', background: 'white' }}>
          <div className="" style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }} >
            <span>Subject Listing</span>
          </div>
        </div>

        <div className="border-0 mt-1">
          <div className="col-md">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4" >

                  {/* <Link to="/add-course" style={{textdecoration:"none"}}><button className="btn btn-outline-primary">Create Course</button></Link> */}
                </div>
                <table className="table align-middle" style={{ textAlign: "center" }}>
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">ICON</th>
                      <th scope="col">COURSE ID</th>
                      <th scope="col">SUBJECT TITLE</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">ACTION</th>
                      {/* <th scope="col">DATE</th> */}
                    </tr>
                  </thead>
                  <tbody>

                    {
                      getsubject.map((user) => (
                        <tr>
                          <td>
                            {/* <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="campaign1" />
                                          </div> */}
                          </td>
                          <td>{user.icon}</td>
                          <td>{user.courseid}</td>
                          <td> {user.subjecttitle}</td>
                          <td>
                            <span
                              className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                              {user.status}
                            </span>
                          </td>
                          {/* <td>{user.date ? formatDate(user.date) : ''}</td> Display formatted date */}
                          <td>
                            <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />&nbsp;&nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/edit-subject/${user._id}`)} style={{ color: "blue" }} />
                          </td>

                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div> &nbsp;
        </div>
      </div>
    </>

  )
}
export default Allsubject;