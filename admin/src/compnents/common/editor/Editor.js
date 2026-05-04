import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './editor.css';

const RichTextEditor = ({ value, onChangeContent }) => {

    const modules = {
        toolbar: [
            [{ font: ["sans-serif", "serif", "monospace", "cursive", "fantasy", "arial", "notoserif", "notosans"] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                modules={modules}
                // formats={formats}
                value={value}
                onChange={onChangeContent}
                className="custom-quill"
            />
        </div>
    );
};
export default RichTextEditor;
