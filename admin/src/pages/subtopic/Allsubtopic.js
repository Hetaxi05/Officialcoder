import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Table, Input, message, Modal, Space } from "antd";


// const users = Array(3).fill();


function Allsubtopic() {

  const navigate = useNavigate()
  const [subtopic, setsubtopic] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");

  const { confirm } = Modal; // extract confirm from Modal



  useEffect(() => {
    displaysubtopic();
  }, [])

  function displaysubtopic() {
    fetch(`${process.env.REACT_APP_API_URL}/subtopics/`, {
      method: "get"
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setsubtopic(data)
      })
      .catch((err) => {
        alert(err);
        // console.log(err)
      })
  }


  function deletesubtopic(id) {
    message.loading({ content: "deleting...", key: "deleteSubtopic" })
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(`${process.env.REACT_APP_API_URL}/subtopics/${id}`, {
          method: "delete",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete the subtopic");
            }
            message.success({ content: "Subtopic deleted successfully", key: "deleteSubtopic" });
            resolve();
          })
          .catch((err) => {
            message.error({ content: "Subtopic not deleted: " + err.message, key: "deleteSubtopic" });
            resolve();
          });
      }, 1000);
    });
  }
  function editSubtopic(id) {
    messageApi.open({
      key: 'edit',
      type: 'loading',
      content: 'Redirecting to edit subtopic...',
    });

    setTimeout(() => {
      messageApi.open({
        key: 'edit',
        type: 'success',
        content: 'Redirected successfully! You will be redirected now.',
        duration: 5, // Message stays visible for 5 seconds
      });

      setTimeout(() => {
        navigate(`/edit-subtopic/${id}`);
      }, 500); // Navigate after 0.5 seconds
    }, 1000);
  }
  function showDeleteConfirm(id) {
    confirm({
      title: "Are you sure you want to delete this subtopic?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deletesubtopic(id);
      },
    });
  }

  // const filteredData = subtopic.filter(
  //   (item) =>
  //     item.subtopictitle.toLowerCase().includes(searchText.toLowerCase())
  // );
  const filteredData = subtopic?.filter(
    (item) =>
      item?.subtopictitle?.toLowerCase().includes(searchText?.toLowerCase())
  ) || [];
  

  const columns = [
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Subtopic Title</span>,
      dataIndex: "subtopictitle",
      key: "subtopictitle",
      render: (text) => <span style={{ fontSize: "15px", fontWeight: 500 }}>{text}</span>,
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Description</span>,
      dataIndex: "content",
      key: "content",
      render: (content) => (
        <div
          style={{
            maxWidth: "600px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ),
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Action</span>,
      key: "action",
      render: (_, record) => (
        <Space size={16}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "blue", fontSize: "15px", cursor: "pointer" }}
            onClick={() => editSubtopic(record._id)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", fontSize: "15px", cursor: "pointer" }}
            onClick={() => showDeleteConfirm(record._id)}
          />
        </Space>
      ),
    },
  ];

  const dataSource = filteredData.map((item, index) => ({
    ...item,
    key: item._id || index,
  }));





  return (
    <>
      {contextHolder}
      <div className="container-fluid " style={{ backgroundColor: '#f5f5f5' }}>
        <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
          <div className="" style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }} >
            <span>All SubTopics</span>
          </div>
          <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
            <Link to="/all-subtopic" className="breadcrumb-item" style={{ textDecoration: "none", color: "#07a698" }}>SubTopic</Link>
            <Link to="/add-subtopic" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Add SubTopic</Link>
          </ol>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 p-3 main " style={{ height: '60px', width: '100%', background: 'white' }}>
          <div className="" style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }} >
            <span>SubTopic Listing</span>
          </div>
        </div>

        <div className="border-0 mt-1">
          <div className="col-md">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div style={{ marginBottom: 16 }}>
                  <Input
                    placeholder="Search by Subtopic Title"
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
export default Allsubtopic;