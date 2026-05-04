import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


function Addcategory() {

    const [categoryname, setCategoryName] = useState("")
    const [tag, setTag] = useState("")
    const [icon, setIcon] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);


    const { id } = useParams();
    useEffect(() => {
        if (id) {
            setCategoryId(id);
            fetchCategory(id);
        }
    }, [id])
    function fetchCategory(categoryId) {
        fetch(`${process.env.REACT_APP_API_URL}/category/${categoryId}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setCategoryName(data.categoryname)
                setTag(data.tag)
                setIcon(data.icon)
            })
            .catch((err) => {
                alert("error fetching", err)
            })
    }
    function ValidFormFiled() {
        let newErrors = {};

        // Regular expression to check if categoryname contains numbers
        const numberRegex = /\d/;

        if (!categoryname.trim()) {
            newErrors.categoryname = "Category Name must be required";
        }

        if (!tag.trim()) {
            newErrors.tag = "Tag must be required";
        }

        if (!icon.trim()) {
            newErrors.icon = "Icon must be required"
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function AddCategory(e) {
        e.preventDefault();
        if (!ValidFormFiled()) return;
        setLoading(true); // start loader
        fetch(`${process.env.REACT_APP_API_URL}/category/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categoryname,
                tag,
                icon
            })
        })
            .then((response) => response.json())
            .then((data) => {
                message.success('Category successfully inserted!');
                setTimeout(() => {
                    setLoading(false); // stop loader
                    navigate('/all-category');
                }, 1000); // slight delay to show the message
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error inserting category. Please try again.');
                console.error(err);
            });
    }


    function UpdateCategory(e) {
        e.preventDefault();
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/category/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categoryname,
                tag,
                icon
            })
        })
            .then(() => {
                message.success('Category updated successfully!');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/all-category');
                }, 1000);
            })
            .catch((err) => {
                setLoading(false);
                message.error('Error updating category. Please try again.');
                console.error(err);
            });
    }

    // for reset the value in cancel button

    function handleCancel() {
        // Clear form fields
        setCategoryName("");
        setTag("");
        setIcon("");
        setErrors({});

        // Reset file input value manually
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }

    function onChangeCategoryName(e) {
        setCategoryName(e.target.value)
    }

    function onChangeTag(e) {
        setTag(e.target.value)
    }
    function handleIconChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setIcon(reader.result); 
            };
        }
    }
    return (
        <>
            <div className="container-fluid " style={{ backgroundColor: '#f5f5f5' }}>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main" style={{ height: '53px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "#07a698", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>{categoryId === "" ? "Add" : "Edit"} Category</span>
                    </div>
                    <ol className="breadcrumb d-flex justify-content-between align-items-center mt-3 p-3 main" style={{ fontFamily: "sans-serif" }}>
                        <Link to="/all-category" className="breadcrumb-item" style={{ textDecoration: "none", color: "#07a698" }}>Category</Link>
                        <Link to="/category" className="breadcrumb-item active" style={{ color: "#07a698", textDecoration: "none" }} aria-current="page">Add Category </Link>
                    </ol>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 main " style={{ height: '60px', width: '100%', background: 'white' }}>
                    <div className="" style={{ color: "black", fontFamily: "sans-serif", fontSize: "20px" }} >
                        <span>Category Details</span>
                    </div>
                </div>
                <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                    <div className="card border-0 mt-1">
                        <div className="card-body">
                            <form onSubmit={categoryId ? UpdateCategory : AddCategory}>
                                <div className="row mb-3">
                                    <div className="col-md-6 ">
                                        <label for="categoryName" className="form-label">Category Name</label>
                                        <input type="text" value={categoryname} className="form-control" id="categoryName" placeholder="Category Name" onChange={onChangeCategoryName} />
                                        {errors.categoryname && <p className="text-danger">{errors.categoryname}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label for="categorytag" className="form-label">Category Tag</label>
                                        <input type="text" value={tag} className="form-control" id="categoryTag" placeholder="Category Tag" onChange={onChangeTag} />
                                        {errors.tag && <p className="text-danger">{errors.tag}</p>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="categoryIcon" className="form-label">Category Icon</label>
                                    <input type="file" className="form-control" id="categorIcon" onChange={handleIconChange} ref={fileInputRef} />
                                    {icon && <img src={icon} alt="category" style={{ width: "150px", marginTop: "10px" }} />}
                                    {errors.icon && <p className="text-danger">{errors.icon}</p>}
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary" >{categoryId === "" ? "Add" : "Update"}</button>
                                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Spin>
            </div>
        </>
    );
}
export default Addcategory;