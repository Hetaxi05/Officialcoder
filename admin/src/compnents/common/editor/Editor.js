import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './editor.css';

const RichTextEditor = ({ value, onChangeContent }) => {
    
    // const modules = {
    //     toolbar: [
    //         [{ 'font': [] }],
    //         [{ 'size': ['small', false, 'large', 'huge'] }],
    //         ['bold', 'italic', 'underline'],
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //         [{ 'align': [] }],
    //         [{ 'color': [] }, { 'background': [] }],
    //         ['code-block'],  // Code Block support enabled
    //         ['clean']
    //     ]
    // };
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

    // const formats = [
    //     'font',
    //     'size',
    //     'bold', 'italic', 'underline',
    //     'list', 'bullet',
    //     'align',
    //     'color', 'background',
    //     'code-block'  // Enable code block formatting
    // ];

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

// export default RichTextEditor;

// import React from 'react';
// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './editor.css';

// // 1. Quill na Font format import karo ane custom fonts add karo
// const Font = Quill.import('formats/font');
// Font.whitelist = ['workSans', 'sans-serif', 'serif', 'monospace','roboto'];
// Quill.register(Font, true);

// // 2. Modules ma external toolbar element specify karo
// const modules = {
//   toolbar: '#toolbar'
// };

// const formats = [
//   'font', 'size', 'bold', 'italic', 'underline',
//   'list', 'bullet', 'align', 'color', 'background', 'code-block'
// ];

// const RichTextEditor = ({ value, onChangeContent }) => {
//   return (
//     <div>
//       {/* Custom toolbar element */}
//       <div id="toolbar">
//         {/* Font dropdown */}
//         <select className="ql-font">
//           {Font.whitelist.map(font => (
//             <option key={font} value={font}>{font}</option>
//           ))}
//         </select>
//         {/* Size dropdown */}
//         <select className="ql-size">
//           <option value="small">Small</option>
//           <option value={false}>Normal</option>
//           <option value="large">Large</option>
//           <option value="huge">Huge</option>
//         </select>
//         {/* Formatting buttons */}
//         <button className="ql-bold" />
//         <button className="ql-italic" />
//         <button className="ql-underline" />
//         {/* List options */}
//         <button className="ql-list" value="ordered" />
//         <button className="ql-list" value="bullet" />
//         {/* Alignment */}
//         <select className="ql-align" />
//         {/* Color and background */}
//         <select className="ql-color" />
//         <select className="ql-background" />
//         {/* Code block and clean formatting */}
//         <button className="ql-code-block" />
//         <button className="ql-clean" />
//       </div>

//       {/* ReactQuill editor */}
//       <ReactQuill
//         theme="snow"
//         modules={modules}
//         formats={formats}
//         value={value}
//         onChange={onChangeContent}
//         className="custom-quill"
//       />
//     </div>
//   );
// };

// export default RichTextEditor;
