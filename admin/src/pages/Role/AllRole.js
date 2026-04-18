

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { message, Modal, Table, Tag, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';




function AllRole() {
    const navigate = useNavigate();

    const [role, setrole] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const { confirm } = Modal; // extract confirm from Modal


    useEffect(() => {
        getallrole();
    }, [])

    function getallrole() {
        fetch(`${process.env.REACT_APP_API_URL}/role`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setrole(data)
            })
            .catch((err) => {
                alert("error fetching:" + err)
            })
    }


    function deleteRole(id) {
        message.loading({ content: "Deleting role...", key: "deleteRole" });

        return new Promise((resolve) => {
            setTimeout(() => {
                fetch(`${process.env.REACT_APP_API_URL}/role/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to delete the role");
                        }
                        // Remove the role from UI without re-fetching
                        setrole((prevRoles) => prevRoles.filter((roleItem) => roleItem._id !== id));

                        message.success({ content: "Role deleted successfully", key: "deleteRole" });
                        resolve();
                    })
                    .catch((err) => {
                        message.error({ content: "Role not deleted: " + err.message, key: "deleteRole" });
                        resolve();
                    });
            }, 1000);
        });
    }

    function editRole(id) {
        messageApi.open({
            key: 'edit',
            type: 'loading',
            content: 'Redirecting to edit role...',
        });

        setTimeout(() => {
            messageApi.open({
                key: 'edit',
                type: 'success',
                content: 'Redirected successfully! You will be redirected now.',
                duration: 5,
            });

            setTimeout(() => {
                navigate(`/edit-role/${id}`);
            }, 500);
        }, 1000);
    }

    function showDeleteConfirmRole(id) {
        confirm({
            title: "Are you sure you want to delete this role?",
            icon: <ExclamationCircleOutlined />,
            content: "This action cannot be undone",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                deleteRole(id);
            },
        });
    }


    const filteredData = role.filter(
        (item) =>
            item.username?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Username</span>,
            dataIndex: "username",
            key: "username",
            render: (text) => <span style={{ fontSize: "15px" }}>{text}</span>,
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Email</span>,
            dataIndex: "email",
            key: "email",
            render: (text) => <span style={{ fontSize: "15px" }}>{text}</span>,
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Password</span>,
            dataIndex: "password",
            key: "password",
            render: (text) => <span style={{ fontSize: "15px" }}>{text}</span>,
        },
        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Selected Roles</span>,
            dataIndex: "permission",
            key: "permission",
            render: (permissions) =>
                Array.isArray(permissions) && permissions.length > 0 ? (
                    permissions.map((perm, index) => (
                        <Tag color="blue" key={index} style={{ fontSize: "13px", padding: "3px 8px" }}>
                            {perm}
                        </Tag>
                    ))
                ) : (
                    <Tag color="gray">No Roles</Tag>
                ),
        },

        {
            title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Action</span>,
            key: "action",
            render: (_, record) => (
                <Space size={16}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "red", fontSize: "15px", cursor: "pointer" }}
                        onClick={() => showDeleteConfirmRole(record._id)}
                    />
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "blue", fontSize: "15px", cursor: "pointer" }}
                        onClick={() => editRole(record._id)}
                    />
                </Space>
            ),
        },
    ];

    // Prepare dataSource
    const dataSource = role.map((item, index) => ({
        ...item,
        key: item._id || index,
    }));

    // const [users, setUsers] = useState(staticUserData);

    // const handleDelete = (id) => {
    //     setUsers(users.filter((user) => user._id !== id));
    // };

    // const handleEdit = (user) => {
    //     navigate(`/edit-user/${user._id}`, { state: user });
    // };

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
                        <span>All Role</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
                        <Link to="/all-role" className="breadcrumb-item" style={{ textDecoration: "none", color: "#07a698" }}>
                            Role
                        </Link>
                        <Link to="/role" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">
                            Add Role
                        </Link>
                    </ol>
                </div>
                <div
                    className="d-flex justify-content-between align-items-center mt-4 p-3 main"
                    style={{ height: "60px", width: "100%", background: "white" }}
                >
                    <div style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }}>
                        <span>Role Listing</span>
                    </div>
                </div>


                {/* Role Table */}
                <div className="border-0 mt-3">
                    <div className="col-md">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div style={{ marginBottom: 16 }}>
                                    <Input
                                        placeholder="Search by Username or Email"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        prefix={<SearchOutlined style={{ color: "black", fontSize: 15 }} />}
                                        allowClear
                                        style={{
                                            width: 250,
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
                &nbsp;
            </div>
        </>
    );
}

export default AllRole;
