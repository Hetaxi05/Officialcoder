// import React, { useEffect, useState } from "react";
// // import "./customcursor.css"; // Ensure you have styles
// import './customecursor.css';



// const CustomCursor = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const moveCursor = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//       setTimeout(() => {
//         setDotPosition({
//           x: e.clientX - 15, // Offset to follow arrow
//           y: e.clientY - 15,
//         });
//       }, 100); // Slight delay for trailing effect
//     };
//     window.addEventListener("mousemove", moveCursor);
//     return () => window.removeEventListener("mousemove", moveCursor);
//   }, []);

//   return (
//     <>
//       <div
//         className="custom-cursor"
//         style={{ left: `${position.x}px`, top: `${position.y}px` }}
//       >
//         <img src="./assets/image/cursor.png" alt="Cursor Arrow" className="cursor-arrow" />
//       </div>
//       <div
//         className="cursor-dot"
//         style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }}
//       ></div>
//     </>
//   );
// };

// export default CustomCursor;
