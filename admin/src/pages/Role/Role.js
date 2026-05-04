import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { useParams, Link, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

function Role() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [permission, setPermission] = useState([])
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [errors, setErrors] = useState({});


    const handlePermissionChange = (e) => {
        const { value, checked } = e.target;

        setPermission((prevPermissions) =>
            checked
                ? [...prevPermissions, value]
                : prevPermissions.filter((p) => p !== value)
        );
    };

    useEffect(() => {
        if (id) {
            fetchrole(id);
        }
    }, [id]);

    function validateFormFields() {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required.";
        } else if (!/^[A-Za-z\s]+$/.test(username)) {
            newErrors.username = "Username must contain only letters.";
        }


        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(password)) {
            newErrors.password = "Password must be at least 6 characters, include uppercase, lowercase, number & special character.";
        }


        if (permission.length === 0) {
            newErrors.permission = "Please select at least one permission.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function fetchrole(id) {
        fetch(`${process.env.REACT_APP_API_URL}/role/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setusername(data.username)
                setemail(data.email)
                setpassword(data.password)
                if (Array.isArray(data.permission)) {
                    setPermission(data.permission.map(perm => typeof perm === "object" ? perm.text : perm));
                } else {
                    setPermission([]);
                }

            })
            .catch((err) => {
                alert(err)
            })
    }

    function addrole(e) {
        e.preventDefault();
        if (!validateFormFields()) return;
        setLoading(true); // start loader

        fetch(`${process.env.REACT_APP_API_URL}/role`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                permission: permission
            })
        })
            .then((response) => response.json())
            .then((data) => {
                message.success('Role successfully inserted!');
                setTimeout(() => {
                    setLoading(false); // stop loader
                    navigate('/all-role');
                }, 1000); // slight delay to show the message
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error inserting role. Please try again.');
                console.error(err);
            });
    }

    function updaterole(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/role/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                permission: permission
            })
        })
            .then(() => {
                message.success('Category updated successfully!');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/all-role');
                }, 1000);
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error updating role. Please try again.');
                console.error(err);
            });
    }

    const handleCancel = () => {
        setusername("");
        setpassword("");
        setemail("");
        setPermission([]);
        setErrors({});
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    // Live Validation on Change
    const onChangeusername = (e) => {
        const value = e.target.value;
        setusername(value);
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, username: "Username is required." }));
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
            setErrors((prev) => ({ ...prev, username: "Username must contain only letters." }));
        } else {
            setErrors((prev) => ({ ...prev, username: "" }));
        }
    };



    const onChangeemail = (e) => {
        const value = e.target.value;
        setemail(value);
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, email: "Email is required." }));
        } else if (!/^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(value)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
        } else {
            setErrors((prev) => ({ ...prev, email: "" }));
        }
    };

    const onchangepassword = (e) => {
        const value = e.target.value;
        setpassword(value);
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, password: "Password is required." }));
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be at least 6 characters, include uppercase, lowercase, number & special character."
            }));
        } else {
            setErrors((prev) => ({ ...prev, password: "" }));
        }
    };


    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: "#f5f5f5", fontFamily: '"Outfit", sans-serif' }} >
                <div className="d-flex justify-content-between align-items-center mt-4  mb-4 p-3 main" style={{ height: "53px", width: "100%", background: "white" }}>
                    <div style={{ color: "#07a698", fontSize: "20px" }}>
                        <span>Role</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-4  p-3 main" style={{ color: "#0d6efd" }}>
                        <Link to="/all-role" className="breadcrumb-item" style={{ textDecoration: "none", color: "#07a698" }}>
                            Show Role
                        </Link>
                        <Link to="/role" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">
                            Add Role
                        </Link>

                    </ol>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2 p-3 main"
                    style={{ height: "75px", width: "100%", background: "white" }}
                >
                    <div style={{ color: "black", fontSize: "20px", fontWeight: "500" }}>
                        <span>
                            <FaPlus className="me-1 pb-1" /> {id ? "Update Role" : "Add Role"}
                        </span>
                    </div>
                </div>
                <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>


                    <form onSubmit={id ? updaterole : addrole}>
                        <div className="card border-0 mt-1">
                            <div className="card-body">
                                <div className=" mb-4">

                                    <label htmlFor="userName" className="form-label">
                                        UserName
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        className="form-control"
                                        id="userName"
                                        placeholder="User Name"
                                        onChange={onChangeusername}
                                    />
                                    {errors.username && <p className="text-danger">{errors.username}</p>}

                                </div>

                                <div className=" mb-4">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        onChange={onChangeemail}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}

                                </div>

                                <div className=" mb-4">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        onChange={onchangepassword}
                                    />
                                    {errors.password && <p className="text-danger">{errors.password}</p>}

                                </div>

                                {/* Checkboxes for managing permissions */}
                                <hr />
                                <div className="mb-3">
                                    <label className="form-label">Manage</label>

                                    {["category", "course", "chapter", "topic", "subtopic", "quiz", "role", "payment", "inquiry"].map((perm) => (
                                        <div className="form-check mb-2" key={perm}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={perm}
                                                id={perm}
                                                onChange={handlePermissionChange}
                                                checked={permission.includes(perm)}
                                            />
                                            <label className="form-check-label" htmlFor={perm}>
                                                {perm.charAt(0).toUpperCase() + perm.slice(1)}
                                            </label>

                                        </div>

                                    ))}
                                    {errors.permission && <p className="text-danger">{errors.permission}</p>}

                                </div>

                                {/* </div> */}
                            </div>
                            <div className="align-items-center mt-2 p-3 main" style={{ width: '100%', background: 'white' }}>

                                <div className="d-flex gap-2">

                                    <button type="submit" className="btn btn-primary" >{id ? "update" : "Add"}</button>
                                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>

                                </div>

                            </div>
                        </div>
                    </form>
                </Spin>

            </div>
        </>
    );
}

export default Role;
