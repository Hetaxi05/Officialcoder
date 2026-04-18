import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Input, Switch, Tag, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`);
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;

      await axios.put(`${process.env.REACT_APP_API_URL}/user/${userId}/status`, {
        statusBar: newStatus,
      });

      // Refresh the user list after update
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>No</span>,
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Name</span>,
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>{text}</div>
          <div style={{ color: "gray", fontSize: "13px" }}>{record.email}</div>
        </div>
      ),
    },
    // {
    //   title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Login Type</span>,
    //   dataIndex: "loginType",
    //   key: "loginType",
    //   render: (type) => (
    //     <Tag color="green" style={{ fontSize: "13px", padding: "2px 10px" }}>
    //       {type || "Unknown"}
    //     </Tag>
    //   ),
    // },
    // {
    //   title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Location</span>,
    //   dataIndex: "location",
    //   key: "location",
    //   render: (location) => location || "N/A",
    // },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Date</span>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    // {
    //   title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Primium</span>,
    //   dataIndex: "isPremium",
    //   key: "isPremium",
    //   render: (isPremium)=>isPremium,
    // },
    
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Premium</span>,
      dataIndex: "isPremium",
      key: "isPremium",
      render: (isPremium) => (
        <Tag color={isPremium ? "green" : "red"} style={{ fontSize: "13px", padding: "2px 10px" }}>
          {isPremium ? "Yes" : "No"}
        </Tag>
      ),
    },
    
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Status</span>,
      key: "status",
      render: (_, record) => (
        <div className="d-flex flex-column align-items-start">
          <Switch
            size="small"
            checked={record.statusBar === 1}
            onChange={() => handleStatusToggle(record._id, record.statusBar)}
          />
          <span
            style={{
              marginTop: 4,
              fontSize: "13px",
              fontWeight: 500,
              color: record.statusBar === 1 ? "green" : "red",
            }}
          >
            {record.statusBar === 1 ? "Active" : "Deactive"}
          </span>
        </div>
      ),
    },
  ];

  const dataSource = filteredUsers.map((user, index) => ({
    ...user,
    key: user._id || index,
  }));



  return (
    <>
      {contextHolder}
      <div className="container-fluid" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: "53px", width: "100%", background: "white" }}>
          <div style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }}>
            <span>All Users</span>
          </div>
          <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
            <Link to="/user" className="breadcrumb-item" style={{ textDecoration: "none" , color: "#07a698"}}>Users</Link>
            <Link to="/dashboard" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Dashboard</Link>
          </ol>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: "60px", width: "100%", background: "white" }}>
          <div style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }}>
            <span>User Listing</span>
          </div>
        </div>
        <div className="border-0 mt-1">
          <div className="col-md">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Input
                    placeholder="Search by Name or Email"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    prefix={<SearchOutlined style={{ color: '#aaa', fontSize: 14 }} />}
                    allowClear
                    style={{
                      width: 220,
                      height: 34,
                      fontSize: 13,
                      borderRadius: 8,
                      backgroundColor: '#fafafa',
                      border: '1px solid #d9d9d9',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  />
                </div>

                <Table
                  columns={columns}
                  dataSource={dataSource}
                  loading={loading}
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


export default User;
