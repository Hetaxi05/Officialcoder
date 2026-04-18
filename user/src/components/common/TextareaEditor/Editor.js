import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './editor.css';

const RichTextEditor = ({ onChangeContent }) => {
    const [comments, setComments] = useState('');

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ]
    };

    const formats = [
        'font',
        'size',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'align',
        'color', 'background'
    ];

    const handleChange = (value) => {
        setComments(value);
		onChangeContent(value);
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={handleChange}
                value={comments}
                className="custom-quill" // Apply custom class for height control
            />
        </div>
    );
};

export default RichTextEditor;
