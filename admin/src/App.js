import React from "react";
import { BrowserRouter as Router, useLocation, Routes, Route } from "react-router-dom";

import Dashboard from "./compnents/layout/dashboard/dashboard";
import Sidebar from "./compnents/layout/sidebar/sidebar";
import User from "./pages/users";
import Category from "./pages/category/category";
import Allcategory from "./pages/category/Allcategory";
import Allcourse from "./pages/course/AllCourse";
import ManageCourse from "./pages/course/ManageCourse";
import Addchapter from "./pages/chapter/Addchapter";
import Allchapter from "./pages/chapter/Allchapter";
import ManageTopic from "./pages/topic/ManageTopic";
import Alltopic from "./pages/topic/Alltopic"; 
import Addsubtopic from "./pages/subtopic/Addsubtopic";
import Allsubtopic from "./pages/subtopic/Allsubtopic";
import Certificate from "./pages/certificate/certificate"
import Login from "./pages/auth/login";
import Registration from "./pages/auth/Registration";

import Quiz from "./pages/Quiz/Quiz";
import AllQuiz from "./pages/Quiz/AllQuiz";
import AllRole from "./pages/Role/AllRole";
import Role from "./pages/Role/Role";
import Payment from "./pages/All Payment/Payment";
import Contact from "./pages/Contact/Contact";


function Layout() {
  const location = useLocation();
  const hidesidebar =
    location.pathname === "/"

  return (

    <div style={{ display: "flex" }}>
      {/* Show Sidebar only if not on Login Page */}
      {!hidesidebar && <Sidebar />}
      {/* <Certificate/> */}

      {/* Adjust content width dynamically */}
      {/* <div className="content" style={{ width: isLoginPage ? "100%" : "calc(100% - 250px)" }}> */}
      <Routes>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/category" element={<Category />} />
        <Route path="/edit-category/:id" element={<Category />} />
        <Route path="/all-category" element={<Allcategory />} />
        <Route path="/add-course" element={<ManageCourse />} />
        <Route path="/edit-course/:id" element={<ManageCourse />} />
        <Route path="/all-course" element={<Allcourse />} />
        <Route path="/add-chapter" element={<Addchapter />} />
        <Route path="/edit-chapter/:id" element={<Addchapter />} />
        <Route path="/all-chapter" element={<Allchapter />} />
        <Route path="/add-topic" element={<ManageTopic />} />
        <Route path="/edit-topic/:id" element={<ManageTopic />} />
        <Route path="/all-topic" element={<Alltopic />} />
        <Route path="/add-subtopic" element={<Addsubtopic />} />
        <Route path="/edit-subtopic/:id" element={<Addsubtopic />} />
        <Route path="/all-subtopic" element={<Allsubtopic />} />

        <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/edit-quiz/:id" element={<Quiz/>}/>
          <Route path="/all-quiz" element={<AllQuiz/>}/>
          {/* <Route path="/quiz/add/:topicId" element={<Quiz/>} />*/}
          <Route path="/quiz/add/:contextType/:id" element={<Quiz />} />
          {/* <Route path="/quiz/add/:id" element={<Quiz />} /> */}



          <Route path="/all-role" element={<AllRole/>}/>
          <Route path="/role" element={<Role/>}/>
          <Route path="/edit-role/:id" element={<Role/>}/>

          <Route path="/payment" element={<Payment/>}/>
          <Route path="/inquiry" element={<Contact/>}/>

      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* <Certificate /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Certificate />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  )
}
export default App;


