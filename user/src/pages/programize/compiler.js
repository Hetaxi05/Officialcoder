import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { BsTerminal } from "react-icons/bs";
import "./compiler.css";
import { Link } from "react-router-dom";


function Programize() {
    const numDots = 9;
    const compilers = [
        { name: "Python", link: "/language-compiler" },
        { name: "Java", link: "/java-compiler" },
        { name: "PHP", link: "/php-compiler" },

        { name: "R", link: "/r-compiler" },
        { name: "SQL", link: "/sql-compiler" },
        { name: "HTML/CSS", link: "/html-css-compiler" },
        { name: "JavaScript", link: "/javascript-compiler" },
        { name: "C", link: "/c-compiler" },
        { name: "C++", link: "/cpp-compiler" },
        { name: "C#", link: "/csharp-compiler" },
        { name: "GO", link: "/go-compiler" },
        { name: "Swift", link: "/swift-compiler" },
        { name: "Rust", link: "/rust-compiler" }
    ];
    return (
        <div className="programize-container container position-relative">
            {/* Background Dots */}
            <div className="dots-container">
                {Array.from({ length: numDots }).map((_, index) => {
                    // Assign sizes & colors randomly
                    const sizeClass =
                        index % 3 === 0 ? "dot-large" : index % 3 === 1 ? "dot-medium" : "dot-small";
                    const colorClass = `dot-color-${(index % 5) + 1}`;

                    return (
                        <div
                            key={index}
                            className={`dot ${sizeClass} ${colorClass}`}
                            style={{
                                top: `${Math.random() * 100}%`, // Random vertical start position
                                left: `-${Math.random() * 10}vw`, // Start slightly outside left
                                animationDuration: `${20 + Math.random() * 20}s`, // Random speed
                                animationDelay: `${Math.random() * 5}s`, // Random delay
                            }}
                        ></div>
                    );
                })}
            </div>

            <div className="d-flex justify-content-center mt-4">
                <span style={{ backgroundColor: "rgb(76, 214, 203)", padding: "8px" }}>
                    <BsTerminal />
                </span>
                <h2 className="ms-3">Practice with our Online Compilers</h2>
            </div>

            <p className="d-flex justify-content-center pt-5">
                We believe coding should be accessible to all, so we made our own compilers for web and mobile—and they're free!
            </p>

            <div className="col d-flex flex-wrap gap-4 justify-content-center p-4 mb-4">
                {compilers.map((compiler, index) => (
                    <Link to={compiler.link} key={index} className="button-customm">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>{compiler.name} Compiler</div>
                            <IoMdArrowRoundForward />
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}

export default Programize;
