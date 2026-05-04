import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { message, Spin } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

function Addchapter() {

    const [chaptertitle, setChapterTitle] = useState("")
    const [courseid, setCourseId] = useState("")
    const [tag, setTag] = useState("")
    const [paid, setPaid] = useState("")
    const [chapterid, setChapterId] = useState("")
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [course, setCourse] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        getCourse()
        if (id) {
            setChapterId(id)
        }

    }, [id])

    useEffect(() => {
        if (chapterid && course.length > 0) {
            getchapterbyId(chapterid);
        }
    }, [chapterid, course]);

    function getCourse() {
        fetch(`${process.env.REACT_APP_API_URL}/cour/`)
            .then((response) => response.json())
            .then((data) => {
                // Reverse order and take last 5 courses
                const latestCourses = data.reverse().slice(0, 5);

                const formattedcourse = latestCourses.map((cat) => ({
                    value: cat._id,
                    label: cat.coursename,
                }));
                setCourse(formattedcourse);
            })
            .catch((err) => {
                alert("Error fetching courses: " + err);
            });
    }

    function getchapterbyId(id) {
        fetch(`${process.env.REACT_APP_API_URL}/chap/${id}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setChapterTitle(data.chaptertitle)
                setCourseId(data.courseid)
                setTag(data.tag)
                setChapterId(data.chapterid)
                setPaid(data.paid)

                if (course.length > 0) {
                    setSelectedOptions(course.filter(t => data.courseid.split(",").includes(t.value)));
                }
            })
            .catch((err) => {
                alert(err)
            })
    }

    function validateForm() {
        let errors = {};
        if (!chaptertitle.trim()) {
            errors.chaptertitle = "Chapter Title is required.";
        }

        if (!tag.trim()) {
            errors.tag = "Chapter Tag is required.";
        }

        if (!selectedOptions.length) {
            errors.courseid = "Topic selection is required.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    function AddChapter(e) {
        e.preventDefault();

        if (!validateForm()) return;
        setLoading(true); // start loader

        const courseid = selectedOptions.map(option => option.value).join(",");
        fetch(`${process.env.REACT_APP_API_URL}/chap/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "chaptertitle": chaptertitle,
                "courseid": courseid,
                "tag": tag,
                "paid": paid
            })
        })
            .then((response) => response.json())
            .then(() => {
                message.success('Chapter successfully inserted!');
                setTimeout(() => {
                    setLoading(false); // stop loader
                    navigate('/all-chapter');
                }, 1000); // slight delay to show the message
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error inserting chapter. Please try again.');
                console.error(err);
            });
    }


    function UpdateChapter(e) {
        e.preventDefault()
        if (!validateForm()) return;
        const courseid = selectedOptions.map(option => option.value).join(",");
        fetch(`${process.env.REACT_APP_API_URL}/chap/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "chaptertitle": chaptertitle,
                "courseid": courseid,
                "tag": tag,
                "paid": paid
            })
        })

            .then(() => {
                message.success('Chapter updated successfully!');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/all-chapter');
                }, 1000);
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error updating chapter. Please try again.');
                console.error(err);
            });
    }

    // for reset the value in cancel button

    function handleCancel() {
        // Clear form fields
        setChapterTitle("");
        setTag("");
        setCourse("");
        // setStatus("");
        setErrors({});
    }


    function onchangeChapterTitle(e) {
        const value = e.target.value;
        setChapterTitle(value);

        if (!/^[A-Za-z\s]*$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                chaptertitle: "Chapter Title must contain only letters.",
            }));
        } else {
            setErrors((prevErrors) => {
                const { chaptertitle, ...rest } = prevErrors;
                return rest;
            });
        }

    }

    function onchangeTag(e) {
        setTag(e.target.value)
    }

    function onChangePaid(e) {
        setPaid(e.target.value)
    }

    return (
        <>
            <div className="container-fluid " style={{ backgroundColor: '#f5f5f5' }}>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>{chapterid === "" ? "Add" : "Edit"} Chapter</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
                        <Link to="/all-chapter" className="breadcrumb-item" style={{ color: "#07a698", textDecoration: "none" }}>Chapter</Link>
                        <Link to="/add-chapter" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Add Chapter</Link>
                    </ol>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '75px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>Chapter Details</span>
                    </div>
                </div>
                <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                    <div className="card">
                        <div className="card-body">

                            <form onSubmit={id ? UpdateChapter : AddChapter}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="ChapterTitle" className="form-label">Chapter Title</label>
                                        <input type="text" value={chaptertitle} className="form-control" id="ChapterTitle" placeholder="Chapter Title" onChange={onchangeChapterTitle} />
                                        {errors.chaptertitle && <div className="text-danger">{errors.chaptertitle}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label for="ChapterTag" className="form-label">Chapter Tag</label>
                                        <input type="text" value={tag} className="form-control" id="ChapterTag" placeholder="Subject Tag" onChange={onchangeTag} />
                                        {errors.tag && <div className="text-danger">{errors.tag}</div>}
                                    </div>

                                </div>
                                <div className="col-md">
                                    <label for="status" class="form-label">Select Course</label>
                                    <Select
                                        options={course}
                                        isMulti
                                        value={selectedOptions}
                                        onChange={setSelectedOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    {errors.courseid && <div className="text-danger">{errors.courseid}</div>}
                                </div> &nbsp;
                                <div className="col-md">
                                    <label className="form-label d-block" style={{ marginRight: "50px" }}>Paid</label>
                                    <div className="form-check form-check-inline" style={{ paddingLeft: "35px" }}>
                                        <input
                                            className="form-check-input border-dark"
                                            type="radio"
                                            name="paymentType"
                                            id="paid"
                                            value="true"
                                            checked={String(paid) === "true"}
                                            onChange={onChangePaid}
                                        />
                                        <label className="form-check-label" htmlFor="paid" style={{ marginRight: "45px" }}>
                                            Paid
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input border-dark"
                                            type="radio"
                                            name="paymentType"
                                            id="free"
                                            value="false"
                                            checked={String(paid) === "false"}
                                            onChange={onChangePaid}
                                        />
                                        <label className="form-check-label" htmlFor="free">
                                            Free
                                        </label>
                                    </div>
                                </div>
                                <div className="d-flex gap-2" style={{ marginTop: "25px" }}>
                                    <button type="submit" className="btn btn-primary">{chapterid === "" ? "Add" : "update"}</button>
                                    <button type="button" className="btn btn-danger" onClick={() => navigate('/all-chapter')}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Spin>
            </div>
        </>
    );
}
export default Addchapter;

