import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Modal, Table, Tag, Space } from "antd";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Allcategory() {
    const navigate = useNavigate()
    const [getcategory, setgetCategory] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [searchText, setSearchText] = useState("");
    const { confirm } = Modal;
    const filteredData = getcategory.filter((item) =>
        item.categoryname.toLowerCase().includes(searchText.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        getCategory()
    }, [])

    function getCategory() {
        fetch(`${process.env.REACT_APP_API_URL}/category/`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setgetCategory(data)
            })
            .catch((err) => {
                alert("error fetching:" + err)
            })
    }
    function deleteCategory(id) {
        message.loading({ content: "deleting...", key: "deleteCategory" })
        return new Promise((resolve) => {
            setTimeout(() => {
                fetch(`${process.env.REACT_APP_API_URL}/category/del/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to delete the course");
                        }

                        setgetCategory(getcategory.filter(category => category._id !== id));
                        message.success({ content: "Category deleted successfully", key: "deleteTopic" });
                        resolve();

                    })
                    .catch((err) => {
                        message.error({ content: "Category not deleted: " + err.message, key: "deleteCategory" });
                        resolve();

                    });
            }, 1000);
        });
    }


    function editCategory(id) {
        messageApi.open({
            key: 'edit',
            type: 'loading',
            content: 'Redirecting to edit category...',
        });

        setTimeout(() => {
            messageApi.open({
                key: 'edit',
                type: 'success',
                content: 'Redirected successfully! You will be redirected now.',
                duration: 5, // Message stays visible for 5 seconds
            });

            setTimeout(() => {
                navigate(`/edit-category/${id}`);
            }, 500); // Navigate after 0.5 seconds
        }, 1000);
    }


    function showDeleteConfirm(id) {
        confirm({
            title: "Are you sure you want to delete this category?",
            icon: <ExclamationCircleOutlined />,
            content: "This action cannot be undone",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                deleteCategory(id);
            },
        });
    }

    const columns = [
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Icon</span>,
            dataIndex: 'icon',
            key: 'icon',
            render: (icon) => (
                <img src={icon} alt="icon" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            ),
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Name</span>,
            dataIndex: 'categoryname',
            key: 'categoryname',
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
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Action</span>,
            key: 'action',
            render: (_, record) => (
                <Space size={16}>

                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "blue", cursor: "pointer", fontSize: "15px" }} // Bigger Update Icon
                        onClick={() => editCategory(record._id)}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "red", cursor: "pointer", fontSize: "15px" }} // Bigger Delete Icon
                        onClick={() => showDeleteConfirm(record._id)}
                    />
                </Space>
            ),
        },
    ];

    // Ant Design Table Data
    const dataSource = getcategory.map((item, index) => ({
        ...item,
        key: item._id || index,
    }));

    return (
        <>
            {contextHolder}
            <div className="container-fluid " style={{ backgroundColor: '#f5f5f5' }}>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>All Category</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
                        <Link to="/all-category" className="breadcrumb-item" style={{ textDecoration: "none", color: "#07a698" }}>Category</Link>
                        <Link to="/category" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Add Category</Link>
                    </ol>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main " style={{ height: '60px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>Category Listing</span>
                    </div>
                </div>

                <div className="border-0 mt-1">
                    <div className="col-md">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4" >
                                </div>
                                <div style={{ marginBottom: 16 }}>
                                    <Input
                                        placeholder="Search by Name or Tag"
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
                                    columns={columns}
                                    dataSource={filteredData}
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
                </div>
            </div>
        </>
    );
}
export default Allcategory;