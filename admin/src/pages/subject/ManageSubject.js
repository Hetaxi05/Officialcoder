import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function ManageSubject() {

    const [subjecttitle, setSubjectTitle] = useState("");
    const [courseid, setCourseId] = useState("");
    const [icon, setIcon] = useState("");
    const [tag, setTag] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const [subjectId, setSubjectId] = useState("");

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            setSubjectId(id);
            // getCourseById(id)
            // fetchCourseDetails(id); 
        }
    }, []);
    function addSubject(e) {

        e.preventDefault();
        const formattedDate = formatDate(date);

        fetch("http://localhost:3000/sub/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "subjecttitle": subjecttitle,
                "courseid": courseid,
                "icon": icon,
                "tag": tag,
                "status": status,
                "date": date
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                alert(data)
                // navigate('/all-course')
            })
            .catch((err) => {
                alert(err)
                // navigate('/add-course')
                // console.log(err);
            })

    }
    function updateSubject(e){
        e.preventDefault();
         const formattedDate = formatDate(date);
        fetch("http://localhost:3000/sub/add/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "subjecttitle": subjecttitle,
                "courseid": courseid,
                "icon": icon,
                "tag": tag,
                "status": status,
                "date": date
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                alert(data)
                // navigate('/all-course')
            })
            .catch((err) => {
                alert(err)
                // navigate('/add-course')
                // console.log(err);
            })

    }
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    function onchangeSubjectTitle(e) {
        setSubjectTitle(e.target.value)
    }
    function onchangeCourseId(e) {
        setCourseId(e.target.value)
    }
    function onchangeIcon(e) {
        setIcon(e.target.value)
    }
    function onchangeTag(e) {
        setTag(e.target.value)
    }
    function onchangeStatus(e) {
        setStatus(e.target.value)
    }
    function onChangeDate(e) {
        setDate(e.target.value)
    }
    return (
        <>

            <div className="container-fluid " style={{ backgroundColor: '#f5f5f5' }}>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "#0d6efd", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>{subjectId === "" ? "Add" : "Edit"}Subjects</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
                        <Link to="/all-course" className="breadcrumb-item" style={{ textDecoration: "none" }}>Courses</Link>
                        <Link to="" className="breadcrumb-item active" style={{ color: "#0d6efd", textDecoration: "none" }} aria-current="page">Add Subjects</Link>
                    </ol>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '60px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>Subject Details</span>
                    </div>
                </div>
                <div className="card border-0 mt-1">
                    <div className="card-body">
                        <form onSubmit={subjectId ? updateSubject : addSubject}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label for="SubjectTitle" className="form-label">Subject Title</label>
                                    <input type="text" className="form-control" id="SubjectTitle" placeholder="Subject Title" onChange={onchangeSubjectTitle} />
                                </div>
                                <div class="col-md-6">
                                    <label for="startDate" class="form-label">Start Form</label>
                                    <input type="date" class="form-control" id="startDate" onChange={onChangeDate} />
                                </div>
                            </div>
                            <div className="col-md">
                                <label for="status" class="form-label">Status</label>
                                <select class="form-select form-select-md" aria-label=".form-select-lg example" onChange={onchangeStatus}>
                                    <option selected>Select The Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Deactive">Deactive</option>
                                </select>
                            </div> &nbsp;

                            <div className="col-md">
                                <label for="status" class="form-label">Select The Course Id:</label>
                                <select class="form-select form-select-md" aria-label=".form-select-lg example" onChange={onchangeCourseId}>
                                    <option selected>Course Id</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div> &nbsp;

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label for="SubjectTag" className="form-label">Subject Tag</label>
                                    <input type="text" className="form-control" id="SubjectTag" placeholder="Subject Tag" onChange={onchangeTag} />
                                </div>
                                <div className="col-md-6">
                                    <label for="SubjectIcon" className="form-label">Subject Icon</label>
                                    <input type="file" className="form-control" id="SubjectIcon" placeholder="Subject Icon" onChange={onchangeIcon} />
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary">{subjectId === "" ? "Add" : "Update"}</button>
                                <button type="button" className="btn btn-danger">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>







    );
}
export default ManageSubject;

