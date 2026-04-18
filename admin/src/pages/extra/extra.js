import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";

const Extra = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const allowedModules = JSON.parse(localStorage.getItem("allowedModules"));

    if (role !== "Staff") {
      navigate("/login"); // Redirect if not staff
    }

    setModules(allowedModules || {}); // Load assigned modules
  }, []);

  return (
    <Container className="mt-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white">
          <h2>Staff Dashboard</h2>
        </Card.Header>
        <Card.Body>
          {Object.keys(modules).length === 0 ? (
            <Alert variant="warning">⚠️ No permissions assigned. Contact Admin.</Alert>
          ) : (
            <ListGroup>
              {modules.Dashboard && <ListGroup.Item>✅ Dashboard Access</ListGroup.Item>}
              {modules.Reports && <ListGroup.Item>✅ Reports Access</ListGroup.Item>}
              {modules.Attendance && <ListGroup.Item>✅ Attendance Access</ListGroup.Item>}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Extra;
