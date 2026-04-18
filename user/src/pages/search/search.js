import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Search, X } from "react-feather";
import { useNavigate } from "react-router-dom"; 

const SearchComponent = () => {
    const [query, setQuery] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    // Fetch courses only when a search is performed
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        setSearched(true);
    
        if (!value) {
            setFilteredCourses([]);
            setSearched(false);
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/cour`)
                .then((response) => response.json())
                .then((data) => {
                    const filtered = data.filter((course) =>
                        course.coursename.toLowerCase().includes(value.toLowerCase())
                    );
    
                    // Fetch total topics for each course using .then()
                    const coursesWithTopicsPromises = filtered.map((course) => {
                        return fetch(`${process.env.REACT_APP_API_URL}/cour/lession/count/${course._id}`)
                            .then((response) => response.json())
                            .then((topicData) => {
                                return { ...course, totalTopics: topicData.totalTopics }; 
                            })
                            .catch(() => ({ ...course, totalTopics: 0 })); // Handle errors
                    });
    
                    // Wait for all fetch calls to complete
                    Promise.all(coursesWithTopicsPromises).then((updatedCourses) => {
                        setFilteredCourses(updatedCourses);
                    });
                })
                .catch((err) => {
                    alert("Error fetching: " + err);
                });
        }
    };
    

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100 " >
            {/* Search Bar */}
            <div className="w-50 mb-4 p-4" style={{ marginTop: "-150px", width: "50%", border: "1px solid #d3dce6" }}>
                <InputGroup className="custom-search-box" style={{
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                }}>
                    <InputGroup.Text style={{ backgroundColor: "transparent", border: "none", padding: "8px" }}>
                        <Search size={18} />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search for courses"
                        value={query}
                        onChange={handleSearch}
                        style={{ border: "none", boxShadow: "none", fontSize: "22px" }}
                    />
                    {query && (
                        <InputGroup.Text
                            style={{ cursor: "pointer", backgroundColor: "transparent", border: "none", padding: "8px" }}
                            onClick={() => {
                                setQuery("");
                                setFilteredCourses([]);
                                setSearched(false);
                            }}
                        >
                            <X size={18} />
                        </InputGroup.Text>
                    )}
                </InputGroup>
            </div>

            {/* Search Results */}
            <div className="w-50" style={{ marginTop: "55px" }}>
        {searched ? (
          filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <div
                key={index}
                className="d-flex align-items-center p-3 mb-3 border rounded"
                style={{ backgroundColor: "#f8f9fa" }}
                onClick={() => navigate(`/course-details/${course._id}`)}
              >
                <img
                  src={course.image}
                  alt="Course"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    marginRight: "16px",
                    objectFit: "cover",
                  }}
                />
                <div className="d-flex flex-column">
                  <h5 className="mb-1" style={{ fontWeight: "bold" }}>
                    {course.coursename}
                  </h5>
                  <p className="mb-1 text-muted" style={{ fontSize: "14px" }}  
                  dangerouslySetInnerHTML={{ __html:course.coursedetails || "Loading..." }} >
                    {/* {course.coursedetails} */}
                  </p>
                  <p className="fw-bold">Total Topics: {course.totalTopics || 0}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted fw-bold" style={{ fontSize: "20px" }}>
              No courses found
            </p>
          )
        ) : (
          <div className="text-center">
            <img
              src="/assets/lesson/review_1263938.png"
              alt="Search Icon"
              width={100}
            />
            <p
              className="text-muted fw-bold"
              style={{ fontSize: "20px", marginTop: "15px" }}
            >
              Enter keyword to search
            </p>
          </div>
        )}
      </div>
        </div>
    );
};

export default SearchComponent;
