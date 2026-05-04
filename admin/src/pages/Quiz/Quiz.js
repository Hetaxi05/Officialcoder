import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../../compnents/common/editor/Editor";
import { FaPlus } from "react-icons/fa6";
import { Select, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Quiz() {
  const { contextType, id } = useParams();
  const navigate = useNavigate();
  const [question, setquestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [answer, setanswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    if (!contextType && id) {
      fetchquiz(id);
    }
  }, [id, contextType]);

  function fetchquiz(id) {
    fetch(`${process.env.REACT_APP_API_URL}/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setquestion(data.question);
        setOptions(data.option?.map((opt) => opt.text) || [""]);
        setanswer(data.answer);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const addOption = (e) => {
    e.preventDefault();
    setOptions((prevOptions) =>
      Array.isArray(prevOptions) ? [...prevOptions, ""] : [""]
    );
  };

  const onChangequestion = (value) => {
    setquestion(value);
  };

  const onChangeoption = (index, value) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const onChangeanswer = (value) => {
    setanswer(value);
  };

  function validateFormFields() {
    let newErrors = {};

    // Validate question
    if (!question.trim()) {
      newErrors.question = "Question is required.";
    }

    // ensure at least two non-empty options exist
    const filledOptions = options.filter((opt) => opt.trim() !== "");
    if (filledOptions.length < 2) {
      newErrors.options = "At least two options must be entered.";
    }

    // Validate answer
    if (!answer.trim()) {
      newErrors.answer = "Please select the correct answer.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function addquiz(e) {
    e.preventDefault();
    if (!validateFormFields()) return;

    // Filter out any empty options before preparing payload
    const filteredOptions = options.filter((opt) => opt.trim() !== "");
    if (filteredOptions.length < 2) {
      setErrors((prev) => ({
        ...prev,
        options: "At least two options must be entered.",
      }));
      return;
    }

    let payload = {
      question,
      option: filteredOptions.map((opt) => ({ text: opt })),
      answer,
    };

    // Attach the proper context-specific field
    if (contextType === "topic") {
      payload.topicid = id;
    } else if (contextType === "course") {
      payload.courseid = id;
    }

    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/quiz/`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        message.success("Quiz successfully inserted!");
        setTimeout(() => {
          setLoading(false);
          navigate("/all-quiz");
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Error inserting quiz. Please try again.");
        console.error(err);
      });
  }

  function updatequiz(e) {
    e.preventDefault();

    // Filter empty options before updating
    const filteredOptions = options.filter((opt) => opt.trim() !== "");
    if (filteredOptions.length < 2) {
      setErrors((prev) => ({
        ...prev,
        options: "At least two options must be entered.",
      }));
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/quiz/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        option: filteredOptions.map((opt) => ({ text: opt })),
        answer: answer,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        message.success("Quiz successfully updated!");
        setTimeout(() => {
          setLoading(false);
          navigate("/all-quiz");
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Error updating quiz. Please try again.");
        console.error(err);
      });
  }

  function handleCancel() {
    // Reset form fields
    setquestion("");
    setOptions([""]);
    setanswer("");
    setErrors({});
  }

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#f5f5f5", fontFamily: '"Outfit", sans-serif' }}
    >
      <div
        className="d-flex justify-content-between align-items-center mt-4 p-3 main"
        style={{ height: "53px", width: "100%", background: "white" }}
      >
        <div style={{ color: "#07a698", fontSize: "20px" }}>
          <span>Quiz</span>
        </div>
        <ol
          className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main"
          style={{ color: "#0d6efd", fontSize: "20px" }}
        >
          <Link
            to="/all-quiz"
            className="breadcrumb-item"
            style={{ textDecoration: "none", color: "#07a698" }}
          >
            Quiz
          </Link>
          <Link
            to="/quiz"
            className="breadcrumb-item active"
            style={{ color: "#07a698", textDecoration: "none" }}
            aria-current="page"
          >
            Add Quiz
          </Link>
        </ol>
      </div>

      <div
        className="d-flex justify-content-between align-items-center mt-4 p-3 main"
        style={{ height: "75px", width: "100%", background: "white" }}
      >
        <div style={{ color: "black", fontSize: "20px", fontWeight: "500" }}>
          <FaPlus className="me-1 pb-1" />{" "}
          {id && !contextType ? "Update Quiz" : "Add Quiz"}
        </div>
      </div>

      <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
        <div>
          <form onSubmit={id && !contextType ? updatequiz : addquiz}>
            <div
              className="align-items-center mt-4 p-3 main"
              style={{ width: "100%", background: "white" }}
            >
              <div>
                <p style={{ fontSize: "20px" }}>Add Question</p>
                <RichTextEditor value={question} onChangeContent={onChangequestion} />
                {errors.question && <p className="text-danger">{errors.question}</p>}
              </div>
            </div>

            <div
              className="align-items-center mt-4 p-3 main"
              style={{ width: "100%", background: "white" }}
            >
              <p style={{ fontSize: "20px" }}>Add Options</p>
              {options.map((option, index) => (
                <div key={index} className="mb-3">
                  <RichTextEditor
                    value={option}
                    onChangeContent={(value) => onChangeoption(index, value)}
                  />
                </div>
              ))}
              {errors.options && <p className="text-danger">{errors.options}</p>}
              <button className="btn btn-primary mt-2" onClick={addOption}>
                + Add Option
              </button>
            </div>

            <div
              className="align-items-center mt-4 p-3 main"
              style={{ width: "100%", background: "white" }}
            >
              <div className="col">
                <label className="form-label">Select Correct Answer</label>
                <br />
                <Select
                  style={{ width: "100%" }}
                  options={options.map((opt, index) => ({
                    label: opt || `select your correct answer`,
                    value: opt,
                  }))}
                  value={answer}
                  onChange={onChangeanswer}
                />
                {errors.answer && <p className="text-danger">{errors.answer}</p>}
              </div>
            </div>

            <div
              className="align-items-center mt-4 p-3 main"
              style={{ width: "100%", background: "white" }}
            >
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {id && !contextType ? "Update" : "Add"}
                </button>
                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Spin>
    </div>
  );
}

export default Quiz;
