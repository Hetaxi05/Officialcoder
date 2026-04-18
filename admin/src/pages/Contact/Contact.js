import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Table, Input, message, Modal, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Contact() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [adminMessage, setAdminMessage] = useState("");

  const [viewMessageModal, setViewMessageModal] = useState(false);
  const [viewMessageText, setViewMessageText] = useState("");

  const { confirm } = Modal;

  useEffect(() => {
    fetchuser();
  }, []);

  function fetchuser() {
    fetch(`${process.env.REACT_APP_API_URL}/contact`)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = Array.isArray(data)
          ? data.map((item) => ({
              ...item,
              adminReply: item.adminReply || "",
              isMessageSent: item.isMessageSent || false,
            }))
          : [];
        setUsers(updatedData);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setUsers([]);
      });
  }

  function confirmDelete(id) {
    message.loading({ content: "deleting...", key: "deleteTopic" });

    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(`${process.env.REACT_APP_API_URL}/contact/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete inquiry");
            }

            setUsers(users.filter((contact) => contact._id !== id));
            message.success({
              content: "Inquiry deleted successfully",
              key: "deleteTopic",
            });
            resolve();
          })
          .catch((err) => {
            message.error({
              content: "Inquiry not deleted: " + err.message,
              key: "deleteTopic",
            });
            resolve();
          });
      }, 1000);
    });
  }

  function showDeleteConfirm(id) {
    confirm({
      title: "Are you sure you want to delete this inquiry?",
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

  function openMessageModal(record) {
    setSelectedInquiry(record);
    setAdminMessage(record.adminReply || "");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedInquiry(null);
    setAdminMessage("");
  }

  function handleSendMessage() {
    if (!adminMessage.trim()) {
      messageApi.error("Please enter message");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/contact/reply/${selectedInquiry._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminReply: adminMessage,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save message");
        }
        return response.json();
      })
      .then(() => {
        messageApi.success(
          selectedInquiry?.isMessageSent
            ? "Message updated successfully"
            : "Message sent successfully"
        );
        handleCloseModal();
        fetchuser();
      })
      .catch((err) => {
        console.error("Save Error:", err);
        messageApi.error("Message not saved");
      });
  }

  function openViewMessage(fullMessage) {
    setViewMessageText(fullMessage);
    setViewMessageModal(true);
  }

  const filteredUsers = users.filter((user) =>
    Object.values(user).join(" ").toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>No</span>,
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>UserName</span>,
      dataIndex: "username",
      key: "username",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Email</span>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Subject</span>,
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Message</span>,
      dataIndex: "message",
      key: "message",
      render: (text) => (
        <div
          style={{
            maxWidth: "220px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={text}
        >
          {text}
        </div>
      ),
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          Inquiry Reply
        </span>
      ),
      key: "inquiryReply",
      render: (_, record) =>
        record.isMessageSent ? (
          <div style={{ minWidth: "210px", maxWidth: "230px" }}>
            <div
              onClick={() => openViewMessage(record.adminReply)}
              style={{
                backgroundColor: "#f6ffed",
                border: "1px solid #b7eb8f",
                color: "#135200",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                lineHeight: "1.5",
                marginBottom: "8px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title="Click to view full message"
            >
              <strong>Sent Message:</strong> {record.adminReply}
            </div>

            <button
              onClick={() => openMessageModal(record)}
              style={{
                backgroundColor: "#1677ff",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              Edit Message
            </button>
          </div>
        ) : (
          <button
            onClick={() => openMessageModal(record)}
            style={{
              backgroundColor: "#07a698",
              color: "#fff",
              border: "none",
              padding: "7px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            Send Message
          </button>
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
            onClick={() => showDeleteConfirm(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <div className="container-fluid" style={{ backgroundColor: "#f5f5f5" }}>
        <div
          className="d-flex justify-content-between align-items-center mt-4 p-3 main"
          style={{ height: "53px", width: "100%", background: "white" }}
        >
          <div
            style={{
              color: "#07a698",
              fontFamily: "sans-serif",
              fontSize: "20px",
            }}
          >
            <span>All Inquiry</span>
          </div>

          <ol
            className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main"
            style={{ fontFamily: "sans-serif" }}
          >
            <Link
              to="/user"
              className="breadcrumb-item"
              style={{ textDecoration: "none", color: "#07a698" }}
            >
              Inquiry
            </Link>
            <Link
              to="/dashboard"
              className="breadcrumb-item active"
              style={{ color: "#07a698", textDecoration: "none" }}
              aria-current="page"
            >
              Dashboard
            </Link>
          </ol>
        </div>

        <div
          className="d-flex justify-content-between align-items-center mt-4 p-3 main"
          style={{ height: "60px", width: "100%", background: "white" }}
        >
          <div
            style={{
              color: "black",
              fontFamily: "sans-serif",
              fontSize: "20px",
            }}
          >
            <span>Inquiry Listing</span>
          </div>
        </div>

        <div className="border-0 mt-1">
          <div className="col-md">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Input
                    placeholder="Search by User Name, Email, Subject, or Message"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    prefix={<SearchOutlined style={{ color: "#aaa", fontSize: 14 }} />}
                    allowClear
                    style={{
                      width: 300,
                      height: 34,
                      fontSize: 13,
                      borderRadius: 8,
                      backgroundColor: "#fafafa",
                      border: "1px solid #d9d9d9",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>

                <Table
                  columns={columns}
                  dataSource={filteredUsers}
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

      <Modal
        title={
          <span style={{ fontSize: "20px", fontWeight: "600", color: "#07a698" }}>
            {selectedInquiry?.isMessageSent ? "Edit Message" : "Send Message to Student"}
          </span>
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSendMessage}
        okText={selectedInquiry?.isMessageSent ? "Update Message" : "Send Message"}
        cancelText="Cancel"
      >
        <div
          style={{
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            border: "1px solid #eee",
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            <strong>User Name:</strong> {selectedInquiry?.username}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Email:</strong> {selectedInquiry?.email}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Subject:</strong> {selectedInquiry?.subject}
          </p>
          <p style={{ marginBottom: "0" }}>
            <strong>Message:</strong> {selectedInquiry?.message}
          </p>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Admin Message
          </label>
          <Input.TextArea
            rows={5}
            placeholder="Write your message here..."
            value={adminMessage}
            onChange={(e) => setAdminMessage(e.target.value)}
            style={{ borderRadius: "8px" }}
          />
        </div>
      </Modal>

      <Modal
        title="Full Sent Message"
        open={viewMessageModal}
        footer={null}
        onCancel={() => setViewMessageModal(false)}
      >
        <p style={{ fontSize: "14px", lineHeight: "1.7", marginBottom: 0 }}>
          {viewMessageText}
        </p>
      </Modal>
    </>
  );
}

export default Contact;