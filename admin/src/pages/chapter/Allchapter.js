import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Modal, Tag, Space, message } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';



// const users = Array(3).fill();
function Allchapter() {

    const navigate = useNavigate()
    const [getchapter, setGetChapter] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [searchText, setSearchText] = useState("");
    const { confirm } = Modal; // extract confirm from Modal

    const filteredData = getchapter.filter((item) =>
        (item.chaptertitle?.toLowerCase()?.includes(searchText.toLowerCase()) || '') ||
        (item.tag?.toLowerCase()?.includes(searchText.toLowerCase()) || '')
    );

    useEffect(() => {
        getChapter()
    }, [])

    function getChapter() {
        fetch(`${process.env.REACT_APP_API_URL}/chap/`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setGetChapter(data)
            })
            .catch((err) => {
                alert(err)
            })
    }
    function deleteChapter(id) {
        // Ask for confirmation before deletion
        message.loading({ content: "deleting...", key: "deleteChapter" })
        return new Promise((resolve) => {
            setTimeout(() => {
                fetch(`${process.env.REACT_APP_API_URL}/chap/del/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to delete the chapter");
                        }
                        // Remove the course from UI without re-fetching
                        setGetChapter(getchapter.filter(chapter => chapter._id !== id));
                        message.success({ content: "Chapter deleted successfully", key: "deleteChapter" });
                        resolve();
                    })
                    .catch((err) => {
                        message.error({ content: "Chapter not deleted: " + err.message, key: "deleteChapter" });
                        resolve();
                    });
            }, 1000);

        });
    }
    function editChapter(id) {
        messageApi.open({
            key: 'edit',
            type: 'loading',
            content: 'Redirecting to edit chapter...',
        });

        setTimeout(() => {
            messageApi.open({
                key: 'edit',
                type: 'success',
                content: 'Redirected successfully! You will be redirected now.',
                duration: 5, // Message stays visible for 5 seconds
            });

            setTimeout(() => {
                navigate(`/edit-chapter/${id}`);
            }, 500); // Navigate after 0.5 seconds
        }, 1000);
    }

    function showDeleteConfirm(id) {
        confirm({
            title: "Are you sure you want to delete this chapter?",
            icon: <ExclamationCircleOutlined />,
            content: "This action cannot be undone",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                deleteChapter(id);
            },
        });
    }

    const columns = [
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Title</span>,
            dataIndex: 'chaptertitle',
            key: 'chaptertitle',
            render: (text) => (
                <span style={{ fontSize: "15px", fontWeight: "500" }}>{text}</span>
            ),
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Tag</span>,
            dataIndex: 'tag',
            key: 'tag',
            render: (tag) => (
                <Tag color="blue" style={{ fontSize: "15px", padding: "5px 10px" }}>
                    {tag}
                </Tag>
            ),
        },
        // {
        //     title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Status</span>,
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status) => (
        //         <span className={`badge ${status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
        //             {status}
        //         </span>
        //     ),
        // },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Action</span>,
            key: 'action',
            render: (_, record) => (
                <Space size={16}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "blue", cursor: "pointer", fontSize: "15px" }}
                        onClick={() => editChapter(record._id)}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "red", cursor: "pointer", fontSize: "15px" }}
                        onClick={() => showDeleteConfirm(record._id)} // ✅ FIXED: now shows modal confirmation
                    />
                </Space>
            ),
        }

    ];

    const dataSource = getchapter.map((item, index) => ({
        ...item,
        key: item._id || index,
    }));

    return (
        <>
            {/* Top Bar */}
            {contextHolder}
            <div className="container-fluid " style={{ backgroundColor: '#f5f5f5' }}>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>All Chapters</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
                        <Link to="/all-chapter" className="breadcrumb-item" style={{ textDecoration: "none", color: "#07a698" }}>Chapter</Link>
                        <Link to="/add-chapter" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Add chapter</Link>
                    </ol>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main " style={{ height: '60px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>Chapter Listing</span>
                    </div>
                </div>
                <div className="border-0 mt-2">
                    <div className="col-md">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div style={{ marginBottom: 16 }}>
                                    <Input
                                        placeholder="Search Chapters"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        prefix={<SearchOutlined style={{ color: 'black', fontSize: 15 }} />}
                                        allowClear
                                        style={{
                                            width: 220,
                                            height: 34,
                                            fontSize: 13,
                                            borderRadius: 8,
                                            backgroundColor: '#fafafa',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            border: '1px solid #d9d9d9',
                                            paddingLeft: 10,
                                        }}
                                    />
                                </div>
                                <Table
                                    dataSource={filteredData}
                                    columns={columns}
                                    pagination={{ pageSize: 5, align: "center" }}
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
                </div>
            </div>
        </>
    );
}
export default Allchapter;