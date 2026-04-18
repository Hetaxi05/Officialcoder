import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

function InquirySection() {

  const [userInquiries, setUserInquiries] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.email) {
      fetchInquiry(user.email);
    }

  }, []);

  const fetchInquiry = async (email) => {

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/contact`
    );

    const filtered = res.data.filter(
      (item) => item.email === email
    );

    setUserInquiries(filtered);
  };

  return (
    <div className="profile-container p-4 border rounded shadow-sm bg-white">

      <h4 className="fw-bold mb-4" style={{ color: "#08A88A" }}>
        Inquiry Replies
      </h4>

      {userInquiries.length > 0 ? (
        userInquiries.map((item) => (
          <Card key={item._id} className="mb-3 border-0 shadow-sm">
            <Card.Body>

              <p>
                <strong>Subject:</strong> {item.subject}
              </p>

              <p>
                <strong>Your Inquiry:</strong> {item.message}
              </p>

              <p>
                <strong>Admin Reply:</strong>{" "}
                {item.adminReply || "No reply yet"}
              </p>

            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="text-center text-muted">
          No inquiries found
        </div>
      )}

    </div>
  );
}

export default InquirySection;