import Courses from "../coursecategories/courses";
import "../coursecategories/courses.css";

function Category(){
    return(
        <>
        
<div className="course-banner" >

<div className="container">
    {/* Floating Shape */}
    <div className="shape-1">
        <img src="/page-header-shape-1.png" alt="Shape" />
    </div>

    {/* Text Content */}
    <div className="text-content" style={{padding:"50px"}}>
        <h2 style={{color:""}}>Categories </h2>
        <p>
            <span style={{fontWeight:"500"}}>Home</span> / <span className="" style={{color:"#07a698" ,fontWeight:"500"}}>Course Page</span>
        </p>
    </div>
</div>


</div>

        <div className="mobilecategory-container">
        <Courses />
        </div>
        {/* <Courses/> */}
        </>
    )
}
export default Category;