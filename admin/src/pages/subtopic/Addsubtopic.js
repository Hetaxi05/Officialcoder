import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import RichTextEditor from "../../compnents/common/editor/Editor";
import { message, Spin } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


function Addsubtopic() {
    // const [subtopicName, setSubtopicName] = useState("");
    const [subtopictitle, setSubtopicTitle] = useState("");
    const [topicid, setTopicId] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});
    const [subtopicid, setSubtopicId] = useState("");
    const [topic, setTopic] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTopics();

        if (id) {
            setSubtopicId(id);
            // fetchSubtopic(id);
        }
    }, [id]);


    useEffect(() => {
        if (subtopicid && topic.length > 0) {
            fetchSubtopic(subtopicid);
        }
    }, [subtopicid, topic]);


    function getTopics() {
        fetch(`${process.env.REACT_APP_API_URL}/topic/`)
            .then((response) => response.json())
            .then((data) => {
                const formattedTopics = data.map((cat) => ({
                    value: cat._id,
                    label: cat.title,
                }));
                setTopic(formattedTopics);
            })
            .catch((err) => alert("Error fetching topics: " + err));
    }

    // function fetchSubtopic(id) {
    //     fetch(`http://localhost:3000/subtopic/${id}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // setSubtopicName(data.name || "");
    //             setTopicId(data.topicid);
    //             setContent(data.content);
    //             setSelectedOptions(topic.filter(t => data.topicid.includes(t.value)));
    //         })
    //         .catch((err) => console.log("Fetch error:", err));
    // }


    function fetchSubtopic(id) {
        fetch(`${process.env.REACT_APP_API_URL}/subtopics/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTopicId(data.topicid);
                setContent(data.content);
                setSubtopicTitle(data.subtopictitle)

                // Only set selected options when topics are available
                if (topic.length > 0) {
                    setSelectedOptions(topic.filter(t => data.topicid.split(",").includes(t.value)));
                }
            })
            .catch((err) => console.log("Fetch error:", err));
    }



    function validateFormFields() {
        let newErrors = {};
        if (!subtopictitle.trim()) {
            newErrors.subtopictilte = "Subtopic Title must be required."
        }
        if (!selectedOptions.length) {
            newErrors.topicid = "Topic selection is required.";
        }
        if (!content.trim()) {
            newErrors.content = "Content must be  required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function addSubTopic(e) {
        e.preventDefault();
        if (!validateFormFields()) return;
        setLoading(true); // start loader


        const topicString = selectedOptions.map(option => option.value).join(",");
        fetch(`${process.env.REACT_APP_API_URL}/subtopics/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subtopictitle: subtopictitle,
                topicid: topicString,
                content: content
            })
        })
            .then((response) => response.json())
            .then(() => {
                message.success('Subtopic successfully inserted!');
                setTimeout(() => {
                    setLoading(false); // stop loader
                    navigate('/all-subtopic');
                }, 1000); // slight delay to show the message
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error inserting subtopic. Please try again.');
                console.error(err);
            });
    }
    function updateSubTopic(e) {
        e.preventDefault();
        if (!validateFormFields()) return;

        const topicString = selectedOptions.map(option => option.value).join(",");
        fetch(`${process.env.REACT_APP_API_URL}/subtopics/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subtopictitle: subtopictitle,
                topicid: topicString,
                content: content
            })
        })
            .then(() => {
                message.success('Subtopic updated successfully!');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/all-subtopic');
                }, 1000);
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error updating subtopic. Please try again.');
                console.error(err);
            });
    }
    // for reset the value in cancel button(by default remove)

    function handleCancel() {
        // Clear form fields
        setSubtopicTitle("");
        setSelectedOptions("");
        setContent("");
        setErrors({});

        // Navigate to All Chapter page
        // navigate('/all-chapter');
    }



    return (
        <div className="container-fluid" style={{ backgroundColor: '#f5f5f5' }}>
            <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                <div style={{ color:"#07a698", fontFamily: "sans-serif", fontSize: "20px" }}>
                    <span>{subtopicid ? "Edit" : "Add"} SubTopic</span>
                </div>
                <ol className="breadcrumb d-flex align-items-center mt-3 p-3" style={{ fontFamily: "sans-serif" }}>
                    <Link to="/all-subtopic" className="breadcrumb-item" style={{ color: "#07a698", textDecoration: "none" }} >SubTopic</Link>
                    <Link to="/add-subtopic" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} >Add SubTopic</Link>
                </ol>
            </div>
            <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <div className="card border-0 mt-1">
                <div className="card-body">
                    <form onSubmit={subtopicid ? updateSubTopic : addSubTopic}>
                        {/* <div className="mb-3">
                            <label className="form-label">SubTopic Name</label>
                            <input type="text" className="form-control" value={subtopicName}
                                onChange={(e) => setSubtopicName(e.target.value)} />
                            {errors.subtopicName && <p className="text-danger">{errors.subtopicName}</p>}
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label">SubTopic Title</label>
                            <input type="text" value={subtopictitle} className="form-control" placeholder="Topic Title" onChange={(e) => setSubtopicTitle(e.target.value)} />
                            {errors.subtopictitle && <small className="text-danger">{errors.subtopictitle}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Topic</label>
                            <Select options={topic} isMulti value={selectedOptions}
                                onChange={setSelectedOptions} classNamePrefix="select" />
                            {errors.topicid && <p className="text-danger">{errors.topicid}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <RichTextEditor value={content} onChangeContent={setContent} />
                            {errors.content && <p className="text-danger">{errors.content}</p>}
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">{subtopicid ? "Update" : "Add"}</button>
                            <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </Spin>
        </div>
    );
}

export default Addsubtopic;
