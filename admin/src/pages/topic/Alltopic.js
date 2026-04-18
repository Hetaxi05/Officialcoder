import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Table, Input, message, Modal, Space, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from '@ant-design/icons';

function Alltopic() {
    const navigate = useNavigate();
    const [gettopic, setgetTopic] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [searchText, setSearchText] = useState("");

    const { confirm } = Modal; // extract confirm from Modal

    useEffect(() => {
        getTopic();
    }, []);

    function getTopic() {
        fetch(`${process.env.REACT_APP_API_URL}/topic/`)
            .then((response) => response.json())
            .then((data) => {
                setgetTopic(data);
            })
            .catch((err) => {
                message.error("Error fetching topics: " + err);
            });
    }

    function confirmDelete(id) {
        message.loading({content:"deleting...",key:"deleteTopic"})
        return new Promise((resolve) => {
            setTimeout(() => {
                fetch(`${process.env.REACT_APP_API_URL}/topic/del/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to delete the topic");
                        }
                        setgetTopic(gettopic.filter(topic => topic._id !== id));
                        message.success({content:"Topic deleted successfully",key:"deleteTopic"});
                        resolve();
                    })
                    .catch((err) => {
                        message.error({content:"Topic not deleted: " + err.message,key:"deleteTopic"});
                        resolve();
                    });
            }, 1000);
        });
    }

    function editTopic(id) {
        messageApi.open({
            key: 'edit',
            type: 'loading',
            content: 'Redirecting to edit topic...',
        });

        setTimeout(() => {
            messageApi.open({
                key: 'edit',
                type: 'success',
                content: 'Redirected successfully! You will be redirected now.',
                duration: 5, // Message stays visible for 5 seconds
            });

            setTimeout(() => {
                navigate(`/edit-topic/${id}`);
            }, 500); // Navigate after 0.5 seconds
        }, 1000);
    }

    function showDeleteConfirm(id) {
        confirm({
          title: "Are you sure you want to delete this topic?",
          icon: <ExclamationCircleOutlined />,
          content: "This action cannot be undone",
          okText: "Delete",
          okType: "danger",
          cancelText: "Cancel",
          onOk() {
            confirmDelete(id);
          },
        });
    }

    const filteredData = gettopic.filter(
        (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.tag.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Title</span>,
            dataIndex: "title",
            key: "title",
            render: (text) => <span style={{ fontSize: "15px", fontWeight: 500 }}>{text}</span>,
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Content</span>,
            dataIndex: "content",
            key: "content",
            render: (content) => (
                <div
                    style={{ maxWidth: "350px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            ),
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Tag</span>,
            dataIndex: "tag",
            key: "tag",
            render: (tag) => (
                <Tag color="blue" style={{ fontSize: "14px", padding: "4px 10px" }}>
                    {tag}
                </Tag>
            ),
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Reading Time</span>,
            dataIndex: "readingtime",
            key: "readingtime",
            render: (text) => <span style={{ fontSize: "14px" }}>{text}</span>,
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Action</span>,
            key: "action",
            render: (_, record) => (
                <Space size={16}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "blue", fontSize: "15px", cursor: "pointer" }}
                        onClick={() => editTopic(record._id)}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "red", fontSize: "15px", cursor: "pointer" }}
                        onClick={() => showDeleteConfirm(record._id)}
                    />
                </Space>
            ),

        },

        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Add Quiz</span>,
            key: "quiz",
            render: (record) => (
                <Link to={`/quiz/add/topic/${record._id}`} className="btn btn-primary btn-sm">
                    Add Quiz
                </Link>

                 
                
            ),
            
        },
    ];

    const dataSource = filteredData.map((item, index) => ({
        ...item,
        key: item._id || index,
    }))


    return (
        <>
            {contextHolder}
            <div className="container-fluid" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                    <div style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }}>
                        <span>All Topics</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
                        <Link to="/all-topic" className="breadcrumb-item" style={{ textDecoration: "none", color:"#07a698" }}>Topic</Link>
                        <Link to="/add-topic" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Add Topic</Link>
                    </ol>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ background: "white", height: "60px" }}>
                    <div style={{ fontSize: "20px", fontWeight: "500" }}>Topic Listing</div>
                </div>

                <div className="border-0 mt-1">
                    <div className="col-md">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div style={{ marginBottom: 16 }}>
                                    <Input
                                        placeholder="Search by Title or Tag"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        prefix={<SearchOutlined style={{ color: "black", fontSize: 15 }} />}
                                        allowClear
                                        style={{
                                            width: 220,
                                            height: 34,
                                            fontSize: 13,
                                            borderRadius: 8,
                                            backgroundColor: "#fafafa",
                                            border: "1px solid #d9d9d9",
                                            paddingLeft: 10,
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                        }}
                                    />
                                </div>

                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                    pagination={{ pageSize: 5 }}
                                    rowKey="_id"
                                />

                                <style>{`
                                    .ant-table-pagination {
                                        display: flex !important;
                                        justify-content: center !important;
                                    }
                                `}</style>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Alltopic;