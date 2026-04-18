import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { message } from "antd";
import { Table, Tag } from "antd";
import CountUp from 'react-countup';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalChapters, setTotalChapters] = useState(0);
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Table columns
  const columns = [
    {
      title: <strong>NO</strong>,
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: <strong>NAME</strong>,
      dataIndex: "name",
      key: "name",
      render: (name) => name || <Tag color="red">N/A</Tag>,
    },
    {
      title: <strong>EMAIL</strong>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <strong>DATE</strong>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  // DataSource for AntD Table
  const dataSource = users.map((user, index) => ({
    key: user._id,
    ...user,
    index: index + 1,
  }));

  // Fetch total users count
  const fetchTotalUsersCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`);
      setTotalUsersCount(res.data.length);
    } catch (error) {
      message.error("Failed to fetch total user count");
    }
  };

  // Fetch last 5 users
  const fetchLastFiveUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/last-five`);
      setUsers(res.data);
    } catch (error) {
      message.error("Failed to load last five users");
    } finally {
      setLoading(false);
    }
  };

  // Count all categories
  const getCategoryCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/count/total`);
      setTotalCategories(res.data.totalCategories);
    } catch (err) {
      console.error("Error fetching category count", err);
    }
  };

  // Count all courses
  const getCourseCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/cour/count/total`);
      setTotalCourses(res.data.totalCourses);
    } catch (err) {
      console.error("Error fetching course count", err);
    }
  };

  // Count all chapters
  const getChapterCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/chap/count/total`);
      setTotalChapters(res.data.totalChapters);
    } catch (err) {
      console.error("Error fetching chapter count", err);
    }
  };

  // Fetch activity data
  const fetchActivityData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/activity/status`);
      setActivityData(res.data.data); // array of { _id: "2025-03-12", count: 3 }
    } catch (err) {
      console.error("Error fetching activity graph data", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTotalUsersCount();
    fetchLastFiveUsers();
    getCategoryCount();
    getCourseCount();
    getChapterCount();
    fetchActivityData();
  }, []);

  // 1) Get the current date and the date 7 days ago
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  // 2) Filter the activity data to only include items from the last 7 days
  const filteredActivityData = activityData.filter((item) => {
    const [month, day] = item._id.split("-");
    // Create a new Date using current year, month, and day
    const itemDate = new Date(today.getFullYear(), parseInt(month, 10) - 1, parseInt(day, 10));
    return itemDate >= lastWeek && itemDate <= today;
  });

  // 3) Sort the filtered data if needed (ascending by date)
  filteredActivityData.sort((a, b) => {
    const [monthA, dayA] = a._id.split("-");
    const [monthB, dayB] = b._id.split("-");
    const dateA = new Date(today.getFullYear(), parseInt(monthA, 10) - 1, parseInt(dayA, 10));
    const dateB = new Date(today.getFullYear(), parseInt(monthB, 10) - 1, parseInt(dayB, 10));
    return dateA - dateB;
  });

  // 4) Build the chart data using the filtered list
  const chartData = {
    labels: filteredActivityData.map((item) => item._id), // "MM-DD" labels
    datasets: [
      {
        label: "Active Users",
        data: filteredActivityData.map((item) => item.count),
        borderColor: "rgb(128, 128, 128)",
        backgroundColor: "rgba(66, 133, 244, 0.1)",
        pointBackgroundColor: "#4d4d4d",
        pointBorderColor: "#fff",
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `Users: ${context.raw}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E5E5E5" }, beginAtZero: true },
    },
  };

  return (
    <>
      <div className="container-fluid" style={{ background: "#f2f2f2" }}>
        <div className="card shadow-sm border-0 mt-4">
          <div className="card-body">
            <h5 className="fw-bold mb-4" style={{ color: "#07a698" }}>
              Dashboard Summary
            </h5>
            <div className="row g-0 text-center align-items-center">
              {/* Total Users */}
              <div className="col-12 col-md-3 border-end d-flex flex-column align-items-center py-3">
                <div
                  className="d-flex justify-content-center align-items-center mb-2"
                  style={{ width: "50px", height: "50px", backgroundColor: "#ffecec", borderRadius: "50%" }}
                >
                  <i className="bi bi-people-fill text-danger fs-4"></i>
                </div>
                <p className="text-muted mb-1">Total Users</p>
                <h5 className="fw-bold mb-1">
                  +<CountUp end={totalUsersCount} duration={3} separator="," />
                </h5>
              </div>
              {/* Total Category */}
              <div className="col-12 col-md-3 border-end d-flex flex-column align-items-center py-3">
                <div
                  className="d-flex justify-content-center align-items-center mb-2"
                  style={{ width: "50px", height: "50px", backgroundColor: "#e7f3ff", borderRadius: "50%" }}
                >
                  <i className="bi bi-ui-checks-grid text-primary fs-4"></i>
                </div>
                <p className="text-muted mb-1">Total Category</p>
                <h5 className="fw-bold mb-1">
                  +<CountUp end={totalCategories} duration={3} separator="," />
                </h5>
              </div>
              {/* Total Course */}
              <div className="col-12 col-md-3 border-end d-flex flex-column align-items-center py-3">
                <div
                  className="d-flex justify-content-center align-items-center mb-2"
                  style={{ width: "50px", height: "50px", backgroundColor: "#e8f5e9", borderRadius: "50%" }}
                >
                  <i className="bi bi-mortarboard text-success fs-4"></i>
                </div>
                <p className="text-muted mb-1">Total Course</p>
                <h5 className="fw-bold mb-1">
                  +<CountUp end={totalCourses} duration={3} separator="," />
                </h5>
              </div>
              {/* Total Chapters */}
              <div className="col-12 col-md-3 d-flex flex-column align-items-center py-3">
                <div
                  className="d-flex justify-content-center align-items-center mb-2"
                  style={{ width: "50px", height: "50px", backgroundColor: "#f3e8ff", borderRadius: "50%" }}
                >
                  <i className="bi bi-journals text-purple fs-4"></i>
                </div>
                <p className="text-muted mb-1">Total Chapters</p>
                <h5 className="fw-bold mb-1">
                  +<CountUp end={totalChapters} duration={3} separator="," />
                </h5>
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        {/* User Listing */}
        <div className="d-flex gap-1">
          <div className="col-md">
            <div className="card card-border shadow-sm border-0 mt-1">
              <div className="card-body">
                <h5
                  className="d-flex justify-content-between fw-bold"
                  style={{ color: "#07a698" }}
                >
                  User Listing
                  <button
                    className="btn btn-info"
                    style={{ width: "5rem" }}
                    onClick={() => navigate("/user")}
                  >
                    View
                  </button>
                </h5>

                <Table
                  columns={columns}
                  dataSource={dataSource}
                  loading={loading}
                  pagination={false}
                  className="mt-3"
                />
              </div>
            </div>
          </div>
          &nbsp;
          {/* Active User Listing Graph */}
          <div className="col-md-4 mt-1">
            <div className="card shadow-sm border-0" style={{ height: "88%" }}>
              <h5
                className="text-center text-default mb-3 mt-2"
                style={{ color: "#07a698" }}
              >
                📊 Active Users Over Time
              </h5>
              <div style={{ width: "90%", height: "395px", margin: "0 auto" }}>
                <Line data={chartData} options={options} />
              </div>
            </div>
            &nbsp;
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
