import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Spin } from "antd"; // Import Spin for loader
import "./certificate.css";
import { useParams } from "react-router-dom";

const Certificate = () => {
  const { courseId } = useParams(); 
  console.log("Course ID from URL:", courseId);
  const certificateRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [courseName, setCourseName] = useState("");
  

  const downloadCertificate = async () => {
    if (!certificateRef.current) {
      console.error("Certificate element not found!");
      return;
    }

     // Detect if it's a mobile device
  const isMobile = window.innerWidth <= 768;

  // Apply mobile-friendly adjustments before capturing
  if (isMobile) {
    certificateRef.current.style.width = "100%";  // Ensure full width on mobile
    certificateRef.current.style.transform = "scale(1)"; // Prevent scaling issues
    certificateRef.current.style.padding = "5px";  // Adjust padding
  }
  
    try {
      // 1) Capture the certificate area
      // const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const canvas = await html2canvas(certificateRef.current, { scale: isMobile ? 3 : 2 });

      const imgData = canvas.toDataURL("image/png");

      // 2) Create a PDF in A4 landscape
      // const pdf = new jsPDF("landscape", "mm", "a4");
      const pdf = new jsPDF(isMobile ? "portrait" : "landscape", "mm", "a4");


      // 3) Get page dimensions (A4 landscape => 297 x 210 mm)
      const pageWidth = pdf.internal.pageSize.getWidth();   // 297
      const pageHeight = pdf.internal.pageSize.getHeight(); // 210

       // Resize image to fit properly in the PDF
    const imgWidth = isMobile ? pageWidth - 20 : pageWidth;
    // const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 4) Fill the entire page with the screenshot
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

      // 5) Save the PDF
      pdf.save("certificate.pdf");
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
    finally {
      // Reset styles after PDF generation
      if (isMobile) {
        certificateRef.current.style.width = "";
        certificateRef.current.style.transform = "";
        certificateRef.current.style.padding = "";
      }
    }
  };

  const fetchCourseDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cour/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("hh")
        if (data && data.coursename) {
          setCourseName(data.coursename);
        } else {
          console.error("Course data not found or coursename missing.");
        }
      })
      .catch((err) => {
        console.error("Error fetching course details:", err);
      });
  };
  useEffect(() => {
    // Get user data from localStorage (adjust the key if needed)
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData && userData.name) {
      setUserName(userData.name);
    }
  }, []);

  useEffect(() => {
    fetchCourseDetails();
    // Show loader for 2 seconds, then download PDF & hide loader
    const timer = setTimeout(() => {
      downloadCertificate();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* The certificate design (to be captured) */}
      <div className="certificate-container" ref={certificateRef}>
        <div className="certificate-frame">
          {/* ===== LEFT SECTION ===== */}
          <div className="certificate-left">
            <div className="col-3 certificate-left-column">
              <img
                className="vertical-line"
                style={{ position: "absolute", top: "0px", left: "80px" }}
                src="/assets/image/certificateSidebarVerticalLine-removebg-preview.png"
                width="180px"
                height="350px"
                alt="sidebar-line"
              />
              <img
                className="sidebar-logo"
                style={{ position: "absolute", bottom: "50px", left: "100px" }}
                src="/assets/image/certificateSidebarlogo-removebg-preview.png"
                width="140px"
                height="140px"
                alt="sidebar-logo"
              />
            </div>
          </div>

          {/* ===== RIGHT SECTION ===== */}
          <div className="certificate-right">
            

            <h2 className="titleq">CERTIFICATE</h2>
            <h3 className="subtitle">OF APPRECIATION</h3>
            <p className="presented-to">THIS CERTIFICATE IS PRESENTED TO</p>
            <h1 className="recipient-name">{userName || "Recipient Name"}</h1>

            <p className="certificate-text">
              {/* Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s. industry’s standard dummy text ever since
              the 1500s. Ipsum is simply dummy text. */}

              This certificate acknowledges excellence in completing <b style={{ color:"#00bfff"}}>{courseName || "Course Name"}</b> . Through dedication and commitment, essential skills and knowledge have been acquired, contributing to both professional and personal development. This milestone marks a step toward continued growth and success.
            </p>

            <div className="signatures">
              <div className="signature">
                <div className="sig-line"></div>
                <p>Mohit</p>
                <span>Director</span>
              </div>
              <div className="signature">
                <div className="sig-line"></div>
                <p>Gulfaraz</p>
                <span>Manager</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loader overlay while generating PDF */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Certificate;
