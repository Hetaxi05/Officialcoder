import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import RichTextEditor from "../../compnents/common/editor/Editor";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Spin } from "antd";


function ManageCourse() {

    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseDetails, setCourseContent] = useState("");
    const [Duration, setDuration] = useState("");
    const [Tag, setTag] = useState("");
    const [image, setImage] = useState("");
    const [courseId, setCourseId] = useState("");
    const [errors, setErrors] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([])
    const fileInputRef = useRef(null);


    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            setCourseId(id);
            // fetchCourseDetails(id);
        }
        getCategory()
    }, [id]);


    useEffect(() => {
        if (courseId && category.length > 0) {
            fetchCourseDetails(courseId);
        }
    }, [courseId, category]);



    function getCategory() {
        fetch(`${process.env.REACT_APP_API_URL}/category/`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {

                const formattedCategories = data.map((cat) => ({
                    value: cat._id,
                    label: cat.categoryname,
                }));
                setCategory(formattedCategories);

                // setCategory(data)
            })
            .catch((err) => {
                alert("error fetching:" + err)
            })
    }

    function fetchCourseDetails(courseId) {
        // console.log(`http://localhost:3000/cour/${courseId}`);
        fetch(`${process.env.REACT_APP_API_URL}/cour/${courseId}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setCourseName(data.coursename);
                setCourseCode(data.coursecode);
                setCourseContent(data.coursedetails);
                // setCategory(data.category);
                setDuration(data.duration);
                setTag(data.tag);
                setImage(data.image)

                const selectedCategories = category.filter((cat) => data.category.includes(cat.value));
                setSelectedOptions(selectedCategories);


            })
            .catch((err) => {
                console.error("Error fetching course details:", err);
            });
    }
    function validateForm() {
        let newErrors = {};

        if (!courseName.trim()) {
            newErrors.courseName = "Course name is required.";
        }
        if (!courseCode.trim()) {
            newErrors.courseCode = "Course code is required.";
        }

        if (!courseDetails.trim()) {
            newErrors.courseDetails = "Course details are required.";
        }
        if (!Duration.trim()) {
            newErrors.Duration = "Course duration is required.";
        }
        if (!Tag.trim()) {
            newErrors.Tag = "Course tag is required.";
        }
        if (!image.trim()) {
            newErrors.image = "Image must be required."
        }
        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    }

    function checkDuplicateCourseCode(code) {
        return fetch(`${process.env.REACT_APP_API_URL}/cour/checkcoursecode/${code}`)
            .then((response) => response.json());
    }


    function addCourse(e) {
        e.preventDefault();
        if (!validateForm()) {
            return; // Stop form submission if there are errors
        }
        setLoading(true); // Start loader

        // Check for duplicate course code
        checkDuplicateCourseCode(courseCode)
            .then((result) => {
                if (result.exists) {
                    // If course code already exists, show error message and stop further processing
                    message.error("Course code already exists. Please use a different code.");
                    setLoading(false);
                } else {
                    const categoryString = selectedOptions.map(option => option.value).join(",");
                    // setLoading(true); // start loader

                    fetch(`${process.env.REACT_APP_API_URL}/cour/add/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "coursename": courseName,
                            "coursecode": courseCode,
                            "coursedetails": courseDetails,
                            "duration": Duration,
                            "tag": Tag,
                            "image": image,
                            "category": categoryString,
                        })
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            message.success('Course successfully inserted!');
                            setTimeout(() => {
                                setLoading(false); // stop loader
                                navigate('/all-course');
                            }, 1000); // slight delay to show the message
                        })
                        .catch((err) => {
                            setLoading(false);
                            message.error('Error inserting course. Please try again.');
                            console.error(err);
                        });
                }
            })
            .catch((error) => {
                setLoading(false);
                message.error("Error checking course code.");
                console.error(error);
            });
    }
    function updatecourse(e) {
        e.preventDefault();
        // if (!validateForm()) {
        //     return; // Stop form submission if there are errors
        // }
        const categoryString = selectedOptions.map(option => option.value).join(",");
        fetch(`${process.env.REACT_APP_API_URL}/cour/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "coursename": courseName,
                    "coursecode": courseCode,
                    "coursedetails": courseDetails,
                    "duration": Duration,
                    "tag": Tag,
                    "category": categoryString,
                    "image": image
                })
            })
            .then(() => {
                message.success('Course updated successfully!');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/all-course');
                }, 1000);
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error updating course. Please try again.');
                console.error(err);
            });
    }

    // for reset the value in cancel button(bydefault remove)

    function handleCancel() {
        // Clear form fields
        setCourseName("");
        setCourseCode("");
        setCourseContent("");
        setDuration("");
        setTag("");
        setImage("");
        setErrors({});

        // Reset file input value manually
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }

        // Navigate to All Category page
        // navigate('/all-category');
    }


    function onchangeCourseName(e) {
        setCourseName(e.target.value)
    }

    function onchangeCourseCode(e) {
        const value = e.target.value;
        setCourseCode(value);

        if (!value.trim()) {
            // If input is empty, remove the error
            setErrors((prevErrors) => {
                const { courseCode, ...rest } = prevErrors;
                return rest;
            });
        } else if (!/^\d{3,10}$/.test(value)) {
            // If invalid, show error
            setErrors((prevErrors) => ({
                ...prevErrors,
                courseCode: "Course code must be numeric and between 3 and 10 characters.",
            }));
        } else {
            // If valid, remove the error
            setErrors((prevErrors) => {
                const { courseCode, ...rest } = prevErrors;
                return rest;
            });
        }
    }


    const onChangeContent = (value) => {
        setCourseContent(value);
    };

    function onchangeTag(e) {
        setTag(e.target.value);
    }

    function onchangeDuration(e) {
        const value = e.target.value
        setDuration(value);
        if (!value.trim()) {
            // If input is empty, remove the error
            setErrors((prevErrors) => {
                const { Duration, ...rest } = prevErrors;
                return rest;
            });
        }
        else if (/^[A-Za-z0-9\s]*$/.test(value)) {
            setDuration(value);
            setErrors((prevErrors) => {
                const { Duration, ...rest } = prevErrors;
                return rest; // Remove error if input is valid
            });
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Duration: "Duration must only contain letters and numbers (no special characters).",
            }));
        }
    }
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result); // Store Base64 string in state
            };
        }
    }
    return (
        <>

            <div className="container-fluid " style={{ backgroundColor: '#f5f5f5' }}>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>{courseId === "" ? "Add" : "Edit"} Course</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
                        <Link to="/all-course" className="breadcrumb-item" style={{ color: "#07a698", textDecoration: "none" }}>Courses</Link>
                        <Link to="/add-course" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Add Course</Link>
                    </ol>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '75px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>Course Details</span>
                    </div>
                </div>
                <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>

                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={courseId ? updatecourse : addCourse}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="courseName" className="form-label">Course Name</label>
                                        <input type="text" value={courseName} className="form-control" id="courseName" placeholder="Course Name" onChange={onchangeCourseName} />
                                        {errors.courseName && <p className="text-danger">{errors.courseName}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label for="courseCode" className="form-label">Course Code</label>
                                        <input type="text" value={courseCode} className="form-control" id="courseCode" placeholder="Course Code" onChange={onchangeCourseCode} />
                                        {errors.courseCode && <p className="text-danger">{errors.courseCode}</p>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="courseDetails" className="form-label">Course Details</label>
                                    {/* <RichTextEditor onChange={onchangeCourseDetail}  /> */}
                                    {/* <RichTextEditor
                                            value={coursedetail}
                                            onChange={(value) => setCourseDetail(value)}
                                        /> */}
                                    <RichTextEditor value={courseDetails} onChangeContent={onChangeContent} />
                                    {errors.courseDetails && <p className="text-danger">{errors.courseDetails}</p>}
                                    {/* <textarea className="form-control" id="courseDetails" style={{height:"7rem"}} placeholder="Course Details" required></textarea> */}
                                </div>
                                <label for="category" className="form-label">Category</label>
                                <Select
                                    options={category}
                                    isMulti
                                    value={selectedOptions}
                                    onChange={setSelectedOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />&nbsp;

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="coursetag" className="form-label">Course Tag</label>
                                        <input type="text" value={Tag} className="form-control" id="courseTag" placeholder="Course Tag" onChange={onchangeTag} />
                                        {errors.Tag && <p className="text-danger">{errors.Tag}</p>}

                                    </div>
                                    <div className="col-md-6">
                                        <label for="courseDuration" className="form-label">Course Duration</label>
                                        <input type="text" value={Duration} className="form-control" id="courseDuration" placeholder="Course Duration" onChange={onchangeDuration} />
                                        {errors.Duration && <p className="text-danger">{errors.Duration}</p>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="coursePhoto" className="form-label">Course Photo</label>
                                    <input type="file" className="form-control" id="coursePhoto" onChange={handleImageChange} />
                                    {image && <img src={image} alt="Course" style={{ width: "150px", marginTop: "10px" }} />}
                                    {errors.image && <p className="text-danger">{errors.image}</p>}
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary">{courseId === "" ? "Add" : "Update"}</button>
                                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Spin>
            </div>
        </>
    );
}
export default ManageCourse;