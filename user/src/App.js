import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/common/layout/footer/sidebar/header/header.js";
import Footer from "./components/common/layout/footer/footer.js";
import PythonBasic from "./pages/python basic/pythonBasic.js";
import PythonCodeEditor from './components/common/editor/CodeEditor.js';
import JavaCodeEditor from "./components/common/editor/javacodeEditor.js";
import PhpCodeEditor from "./components/common/editor/phpcodeEditor.js";
import Outputscreen from './outputscreen.js';
import FetchCoursecard from "./pages/fetchcourse/Fetchcourse.js";
import CourseDetail from "./pages/coursedetail/coursedetail.js";
import Pricing from "./pages/pricing/pricing.js";
import Course from "./pages/course/course.js";
import Details from "./pages/DetailScreen/Details.js";
import UserLogin from "./pages/auth/UserLogin/UserLogin.js";
import UserReg from "./pages/auth/UserRegister/UserReg.js";
import ChangePassword from "./pages/ChangePassword/ChangePassword.js";
import UserProfile from "./pages/Userprofile/UserProfile.js";
import LessonCompleted from "./pages/lesson/lesson.js";
import SearchComponent from "./pages/search/search.js";
import Quiz from "./pages/Quiz/Quiz.js";
import TopicQuiz from "./pages/TopicQuiz/TopicQuiz.js";
import ThankYou from "./pages/Quiz/Thankyou.js";
import Result from "./pages/Quiz/Result.js";
import Certificate from "./pages/certificate/certificate.js";
import PaymentSuccess from "./pages/pricing/PaymentSuccess.js";
import PaymentFailed from "./pages/pricing/PaymentFailed.js";
import Home from "./pages/homepage/Home.js";
import AboutUs from "./components/common/layout/Aboutus/Aboutus.js";
import ScrollToTop from "./ScrollToTop.js";
import Contactus from "./pages/contactus/Contactus.js";
import MobileNav from "./pages/Mobilenav/Mobilenav.js";
import Category from "./pages/Mobilenav/category.js";
import Coursenav from "./pages/Mobilenav/Coursesnav.js";
import InquirySection from "./pages/InquirySection/InquirySection.js"

import "./Global.css";  // Import global styles
import VerifyOtp from "./pages/auth/VerifyOtp/VerifyOtp.js";


function App() {

  const Layout = ({ children }) => {
    const location = useLocation();
    const hideHeaderFooter = [
      "/userlogin",
      "/register",
      "/changepassword",
      "/userprofile",
      "/payment-success",
      "/payment-failed",
      "/language-compiler",
      "/java-compiler",
      "/php-compiler",
      "/header-compiler",
      "/topicquiz",
    ].some(path => location.pathname.startsWith(path)) ||
      location.pathname.startsWith("/quiz") ||
      location.pathname.startsWith("/topic-details") ||
      location.pathname.startsWith("/quiz-thankyou") ||
      location.pathname.startsWith("/quiz-result") ||
      location.pathname.startsWith("/certificate");

    return (
      <>
        {!hideHeaderFooter && <Header />}
        <main>{children}</main>
        {!hideHeaderFooter && !isMobile && <Footer />}
      </>
    );
  };
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebar = () => setIsSidebarVisible(prev => !prev);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/python-basic" element={<PythonBasic />} />
          <Route path="/python-editor" element={<PythonCodeEditor />} />
          <Route path="/course-details/:courseId" element={<CourseDetail />} />
          <Route path="/fetch-courses/:categoryId" element={<FetchCoursecard />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/register" element={<UserReg />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/lesson-completed" element={<LessonCompleted />} />
          <Route path="/search-component" element={<SearchComponent />} />
          <Route
            path="/topic-details/:courseId/:chapterId/:topicId"
            element={<Details isSidebarVisible={isSidebarVisible} onToggleSidebar={toggleSidebar} />}
          />
          <Route path="/language-compiler" element={<PythonCodeEditor />} />
          <Route path="/java-compiler" element={<JavaCodeEditor />} />
          <Route path="/php-compiler" element={<PhpCodeEditor />} />
          <Route path="/header-compiler" element={<Outputscreen />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/inquirySection" element={<InquirySection />} />

          {/* Quiz Routes */}
          <Route path="/quiz/:courseId" element={<Quiz />} />
          <Route path="/topicquiz" element={<TopicQuiz />} />
          <Route path="/quiz-thankyou/:courseId" element={<ThankYou />} />
          <Route path="/quiz-result/:courseId" element={<Result />} />
          <Route path="/certificate/:courseId" element={<Certificate />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/verify-otp/:email" element={<VerifyOtp />} />

          {/* mobile pages */}
          <Route path="/mobilecategory" element={<Category />} />
          <Route path="/mobilecourse" element={<Coursenav />} />
        </Routes>
      </Layout>

      {/* when open mobile is visible */}
      {isMobile && <MobileNav />}
    </Router>
  );
}

export default App;
