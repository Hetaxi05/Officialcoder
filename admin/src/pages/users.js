import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/`
      );

      setUsers(res.data || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      messageApi.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Active / Deactive Status
  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;

      await axios.put(
        `${process.env.REACT_APP_API_URL}/user/${userId}/status`,
        {
          statusBar: newStatus,
        }
      );

      // Update UI instantly
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, statusBar: newStatus }
            : user
        )
      );

      messageApi.success("User status updated");
    } catch (error) {
      console.error("Error updating user status:", error);
      messageApi.error("Failed to update status");
    }
  };

  // Safe Search Filter
  const filteredUsers = users.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const search = searchText.toLowerCase();

    return name.includes(search) || email.includes(search);
  });

  // Table Columns
  const columns = [
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          No
        </span>
      ),
      key: "index",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          Name
        </span>
      ),
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>
            {text || "No Name"}
          </div>

          <div
            style={{
              color: "gray",
              fontSize: "13px",
            }}
          >
            {record.email || "No Email"}
          </div>
        </div>
      ),
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          Date
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        date
          ? new Date(date).toLocaleDateString()
          : "N/A",
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          Premium
        </span>
      ),
      dataIndex: "isPremium",
      key: "isPremium",
      render: (isPremium) => (
        <Tag
          color={isPremium ? "green" : "red"}
          style={{
            fontSize: "13px",
            padding: "2px 10px",
          }}
        >
          {isPremium ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          Status
        </span>
      ),
      key: "status",
      render: (_, record) => (
        <div className="d-flex flex-column align-items-start">
          <Switch
            size="small"
            checked={record.statusBar === 1}
            onChange={() =>
              handleStatusToggle(
                record._id,
                record.statusBar
              )
            }
          />

          <span
            style={{
              marginTop: 4,
              fontSize: "13px",
              fontWeight: 500,
              color:
                record.statusBar === 1
                  ? "green"
                  : "red",
            }}
          >
            {record.statusBar === 1
              ? "Active"
              : "Deactive"}
          </span>
        </div>
      ),
    },
  ];

  // Data Source
  const dataSource = filteredUsers.map((user, index) => ({
    ...user,
    key: user._id || index,
  }));

  return (
    <>
      {contextHolder}

      <div
        className="container-fluid"
        style={{
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          className="d-flex justify-content-between align-items-center mt-4 p-3"
          style={{
            background: "white",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              color: "#07a698",
              fontSize: "22px",
              fontWeight: "600",
            }}
          >
            All Users
          </div>

          <ol className="breadcrumb m-0">
            <Link
              to="/user"
              className="breadcrumb-item"
              style={{
                textDecoration: "none",
                color: "#07a698",
              }}
            >
              Users
            </Link>

            <Link
              to="/dashboard"
              className="breadcrumb-item active"
              style={{
                textDecoration: "none",
                color: "#07a698",
              }}
            >
              Dashboard
            </Link>
          </ol>
        </div>

        {/* Title */}
        <div
          className="mt-3 p-3"
          style={{
            background: "white",
            borderRadius: "8px",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          User Listing
        </div>

        {/* Table Card */}
        <div className="mt-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Search */}
              <div className="d-flex justify-content-end mb-3">
                <Input
                  placeholder="Search by Name or Email"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(e.target.value)
                  }
                  prefix={
                    <SearchOutlined
                      style={{
                        color: "#aaa",
                        fontSize: 14,
                      }}
                    />
                  }
                  allowClear
                  style={{
                    width: 260,
                    height: 36,
                    borderRadius: 8,
                  }}
                />
              </div>

              {/* Table */}
              <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                }}
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
    </>
  );
}

export default User;