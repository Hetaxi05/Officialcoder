import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Search, X } from "react-feather";
import { useNavigate } from "react-router-dom";
import "./search.css";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearched(true);

    if (!value) {
      setFilteredCourses([]);
      setSearched(false);
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/cour`)
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.filter((course) =>
          course.coursename.toLowerCase().includes(value.toLowerCase())
        );

        const promises = filtered.map((course) => {
          return fetch(
            `${process.env.REACT_APP_API_URL}/cour/lession/count/${course._id}`
          )
            .then((res) => res.json())
            .then((topicData) => ({
              ...course,
              totalTopics: topicData.totalTopics,
            }))
            .catch(() => ({
              ...course,
              totalTopics: 0,
            }));
        });

        Promise.all(promises).then((updatedCourses) =>
          setFilteredCourses(updatedCourses)
        );
      })
      .catch((err) => {
        alert("Error fetching: " + err);
      });
  };

  return (
    <div className="search-page container">

      {/* Search Bar */}
      <div className="search-box-wrapper">

        <InputGroup className="custom-search-box w-100">

          <InputGroup.Text className="search-icon">
            <Search size={18} />
          </InputGroup.Text>

          <Form.Control
            type="text"
            placeholder="Search for courses"
            value={query}
            onChange={handleSearch}
            className="search-input"
          />

          {query && (
            <InputGroup.Text
              className="clear-icon"
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
      <div className="search-results">

        {searched ? (

          filteredCourses.length > 0 ? (

            filteredCourses.map((course, index) => (

              <div
                key={index}
                className="course-result-card"
                onClick={() => navigate(`/course-details/${course._id}`)}
              >

                <img
                  src={course.image}
                  alt="Course"
                  className="course-img"
                />

                <div className="course-info">

                  <h5>{course.coursename}</h5>

                  <p
                    className="course-desc"
                    dangerouslySetInnerHTML={{
                      __html: course.coursedetails || "Loading...",
                    }}
                  ></p>

                  <p className="topic-count">
                    Total Topics: {course.totalTopics || 0}
                  </p>

                </div>

              </div>

            ))

          ) : (

            <p className="no-course">
              No courses found
            </p>

          )

        ) : (

          <div className="text-center empty-search">

            <img
              src="/assets/lesson/review_1263938.png"
              alt="Search Icon"
              width={100}
            />

            <p>Enter keyword to search</p>

          </div>

        )}

      </div>

    </div>
  );
};

export default SearchComponent;