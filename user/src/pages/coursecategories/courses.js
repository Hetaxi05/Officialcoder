// CategoryList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./courses.css";

const Courses = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/category`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Redirect to the fetch-course page with the category ID
    navigate(`/fetch-courses/${categoryId}`);
  };

  return (

<>


<div className="container-fluid pt-5 pb-5 text-center" style={{ backgroundColor: "rgb(240 241 242)" }}>





      <div>
        
        <div className="heading-btn btn ps-1 pe-3 mb-5 mt-5  pb-1">
          <span className="pe-2">
            <img
              className="img"
              src="./assets/image/category-1.png"
              alt="courses category"
              width="30px"
              height="30px"
              style={{ backgroundColor: "#f0f0f0", padding: "5px" }}
            />
          </span>
          Our Course Categories
        </div>

        <h2 className="mb-4"><b>Select The Industry Where You Want To Learn</b></h2>
        <div className="category-list d-flex flex-wrap justify-content-center ps-5 pe-5 me-3 ms-3 mb-4">
          {categories.map((category) => (
            <button
              key={category._id}
              className="category-btn btn"
              onClick={() => handleCategoryClick(category._id)}
            >
              <span className="pe-3" >
                <img src={category.icon} alt="category" className="category-img" />
              </span>
              <b style={{fontWeight:"500" ,fontSize:"15px"}}>{category.categoryname}</b>
            </button>
          ))}
        </div>
      </div>
    </div>

</>

    
   
  );
};

export default Courses;
