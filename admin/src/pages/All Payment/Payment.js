import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

function Payment() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment/all-payments`);
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>No</span>,
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>UserName</span>,
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <span style={{ fontWeight: 600, fontSize: "15px" }}>
        {/* {userId.name || "N/A"} */}
        {userId && userId.name ? userId.name : "N/A"}

        </span>,
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Plan</span>,
      dataIndex: "plan",
      key: "plan",
      render: (plan) => plan || "N/A",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>TransactionId</span>,
      dataIndex: "transactionId",
      key: "transactionId",
      render: (transactionId) => transactionId || "N/A",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Date</span>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Status</span>,
      dataIndex: "status",
      key: "status",
      render: (status) => status || "Pending",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Price</span>,
      dataIndex: "price",
      key: "price",
      render: (price) => (price ? `$${price}` : "N/A"),
    },
  ];

  const filteredUsers = users.filter((user) => {
    return (
      (user.userId && user.userId.toString().toLowerCase().includes(searchText.toLowerCase())) ||
      (user.plan && user.plan.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.transactionId && user.transactionId.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.status && user.status.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: "53px", width: "100%", background: "white" }}>
        <div style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }}>
          <span>All Users</span>
        </div>
        <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
          <Link to="/user" className="breadcrumb-item" style={{ textDecoration: "none", color: "#07a698" }}>
            Users
          </Link>
          <Link to="/dashboard" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">
            Dashboard
          </Link>
        </ol>
      </div>

      {/* User Listing Section */}
      <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: "60px", width: "100%", background: "white" }}>
        <div style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }}>
          <span>User Listing</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="border-0 mt-1">
        <div className="col-md">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              {/* Search Input */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Input
                  placeholder="Search by User ID, Plan, Transaction ID, or Status"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  prefix={<SearchOutlined style={{ color: '#aaa', fontSize: 14 }} />}
                  allowClear
                  style={{
                    width: 300,
                    height: 34,
                    fontSize: 13,
                    borderRadius: 8,
                    backgroundColor: '#fafafa',
                    border: '1px solid #d9d9d9',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                />
              </div>

              {/* Payment Table */}
              <Table
                columns={columns}
                dataSource={filteredUsers}
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
  );
}

export default Payment;
