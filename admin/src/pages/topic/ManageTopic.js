import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { message, Spin } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import RichTextEditor from "../../compnents/common/editor/Editor";

function ManageTopic() {
    const [topicTitle, setTopicTitle] = useState("");
    const [topicTag, setTopicTag] = useState("");
    const [topicContent, setTopicContent] = useState("");
    const [readingTime, setReadingTime] = useState("");
    const [topicId, setTopicId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [chapter, setChapter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getChapters();
        if (id) {
            setTopicId(id);
        }
    }, [id]);

    useEffect(() => {
        if (topicId && chapter.length > 0) {
            fetchTopicDetails(topicId);
        }
    }, [topicId, chapter]);

    function validateForm() {
        let newErrors = {};
        if (!topicTitle.trim()) newErrors.topicTitle = "Topic title is required.";
        if (!topicTag.trim()) newErrors.topicTag = "Topic tag is required.";
        if (!topicContent.trim()) newErrors.topicContent = "Content is required.";
        if (!readingTime.trim()) newErrors.readingTime = "Reading time is required.";
        if (selectedOptions.length === 0) newErrors.chapter = "At least one chapter must be selected.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function getChapters() {
        fetch(`${process.env.REACT_APP_API_URL}/chap/`)
            .then((response) => response.json())
            .then((data) => {
                const formattedChapters = data.map((cat) => ({
                    value: cat._id,
                    label: cat.chaptertitle,
                }));
                setChapter(formattedChapters);
            })
            .catch((err) => {
                alert("Error fetching chapters: " + err);
            });
    }

    function fetchTopicDetails(TopicId) {
        fetch(`${process.env.REACT_APP_API_URL}/topic/${TopicId}`)
            .then((response) => response.json())
            .then((data) => {
                setTopicTitle(data.title);
                setTopicTag(data.tag);
                setTopicContent(data.content);
                setReadingTime(data.readingtime);
                setChapterId(data.chapterid);

                if (data.chapterid && Array.isArray(chapter)) {
                    setSelectedOptions(
                        chapter.filter((t) => data.chapterid.split(",").includes(t.value))
                    );
                }
            })
            .catch((err) => console.log("Fetch error:", err));
    }

    function addTopic(e) {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true); // start loader

        const chapterid = selectedOptions.map(option => option.value).join(",");

        fetch(`${process.env.REACT_APP_API_URL}/topic/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: topicTitle, tag: topicTag, content: topicContent, readingtime: readingTime, chapterid })
        })
            .then((response) => response.json())
            .then(() => {
                message.success('Topic successfully inserted!');
                setTimeout(() => {
                    setLoading(false); // stop loader
                    navigate('/all-topic');
                }, 1000); // slight delay to show the message
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error inserting topic. Please try again.');
                console.error(err);
            });
    }


    function updateTopic(e) {
        e.preventDefault();
        const chapterid = selectedOptions.map(option => option.value).join(",");

        fetch(`${process.env.REACT_APP_API_URL}/topic/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: topicTitle, tag: topicTag, content: topicContent, readingtime: readingTime, chapterid })
        })
            .then(() => {
                message.success('Topic updated successfully!');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/all-topic');
                }, 1000);
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error updating topic. Please try again.');
                console.error(err);
            });
    }

    // for reset the value in cancel button(by default remove)

function handleCancel() {
    // Clear form fields
    setTopicTitle("");
    setTopicTag("");
    setTopicContent("");
    setReadingTime("");
    setSelectedOptions("");
    setErrors({});

    // Navigate to All Topic page
    // navigate('/all-topic');
}


    return (
        <div className="container-fluid" style={{ backgroundColor: '#f5f5f5', fontFamily: '"Outfit", sans-serif' }}>
            <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                <div className="" style={{ color: "#07a698", fontSize: "20px" }} >
                    <span>{topicId === "" ? "Add" : "Edit"} Topic</span>
                </div>
                <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ color: "#0d6efd"}}>
                    <Link to="/all-topic" className="breadcrumb-item" style={{ color: "#07a698", textDecoration: "none" }}>Topic</Link>
                    <Link to="/add-topic" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Add Topic</Link>
                </ol>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '60px', width: '100%', background: 'white' }}>
                <div className="" style={{ color: "black", fontSize: "20px" }} >
                    <span>Topic Details</span>
                </div>
            </div>    
            <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <div className="card border-0 mt-1">
                <div className="card-body">
                    <form onSubmit={topicId ? updateTopic : addTopic}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Topic Title</label>
                                <input type="text" value={topicTitle} className="form-control" placeholder="Topic Title" onChange={(e) => setTopicTitle(e.target.value)} />
                                {errors.topicTitle && <small className="text-danger">{errors.topicTitle}</small>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Topic Tag</label>
                                <input type="text" value={topicTag} className="form-control" placeholder="Topic Tag" onChange={(e) => setTopicTag(e.target.value)} />
                                {errors.topicTag && <small className="text-danger">{errors.topicTag}</small>}
                            </div>
                        </div>
                        <div className="col-md">
                            <label className="form-label">Select The Chapter</label>
                            <Select options={chapter} isMulti value={selectedOptions} onChange={setSelectedOptions} classNamePrefix="select" />
                            {errors.chapter && <small className="text-danger">{errors.chapter}</small>}
                        </div>
                        <div className="col-md">
                            <label className="form-label">Content</label>
                            <RichTextEditor value={topicContent} onChangeContent={setTopicContent} />
                            {errors.topicContent && <p className="text-danger">{errors.topicContent}</p>}
                        </div>
                        <div className="col-md">
                            <label className="form-label">Reading Time</label>
                            <input type="text" value={readingTime} className="form-control" placeholder="Reading Time" onChange={(e) => setReadingTime(e.target.value)} />
                            {errors.readingTime && <small className="text-danger">{errors.readingTime}</small>}
                        </div>
                        <div className="d-flex gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">{topicId ? "Update" : "Add"}</button>
                            <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            </Spin>
        </div>
    );
}

export default ManageTopic;
