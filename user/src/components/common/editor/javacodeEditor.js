import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";

const JavaCodeEditor = () => {
    const [code, setCode] = useState(""); // No default code
    const [output, setOutput] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [showDropdown, setShowDropdown] = useState(false);

    const executeCode = async () => {
        const payload = {
            language: "java",
            version: "15.0.2", 
            files: [{ name: "Main.java", content: code }]
        };

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (data.run && data.run.stdout !== undefined) {
                setOutput(data.run.stdout);
            } else {
                setOutput(`Error: ${data.message || "Execution failed."}`);
            }
        } catch (error) {
            console.error("Execution Error:", error);
            setOutput("Error executing the code. Check the console for details.");
        }
    };

    useEffect(() => {
        document.body.className = theme === "dark" ? "dark-mode" : "light-mode";
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="mt-5" style={theme === "dark" ? styles.darkContainer : styles.lightContainer}>
            <div style={styles.toolbar}>
                <button style={styles.runbutton} onClick={executeCode}>▶ Run Code</button>
                <div style={styles.dropdown}>
                    <button style={styles.dropdownbutton} onClick={() => setShowDropdown(!showDropdown)}>
                        ☰
                    </button>
                    {showDropdown && (
                        <div style={styles.dropdownMenu}>
                            <button style={styles.dropdownItem} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
                            </button>
                            <button style={styles.dropdownItem} onClick={() => navigator.clipboard.writeText(code)}>📋 Copy Code</button>
                            <button style={styles.dropdownItem} onClick={() => setCode("")}>🗑 Clear Editor</button>
                        </div>
                    )}
                </div>
            </div>

            <div style={styles.editorContainer}>
                <MonacoEditor
                    height="400px"
                    language="java"
                    theme={theme === "dark" ? "vs-dark" : "vs-light"}
                    value={code}
                    onChange={setCode}
                    options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
                />
            </div>

            <div style={theme === "dark" ? styles.darkPreview : styles.lightPreview}>
                <div style={styles.outputHeader}>
                    <h3>Output:</h3>
                    <button style={styles.clearShellButton} onClick={() => setOutput("")}>🗑 Clear Shell</button>
                </div>
                <pre style={styles.outputBox}>{output}</pre>
            </div>
        </div>
    );
};

const styles = {
    darkContainer: {
        padding: "20px",
        background: "#1e1e1e",
        color: "#fff",
        height: "100vh"
    },
    lightContainer: {
        padding: "20px",
        background: "#f5f5f5",
        color: "#000",
        height: "100vh"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "#333",
        borderRadius: "5px"
    },
    runbutton: {
        padding: "10px 15px",
        fontSize: "16px",
        backgroundColor: "rgb(26 170 64)",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    },
    dropdown: {
        position: "relative"
    },
    dropdownbutton: {
        padding: "6px"
    },
    dropdownMenu: {
        position: "absolute",
        top: "40px",
        right: "0",
        backgroundColor: "#444",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
        padding: "5px 0",
        zIndex: 10,
        width: "130px"
    },
    dropdownItem: {
        padding: "10px",
        display: "block",
        background: "none",
        border: "none",
        color: "#fff",
        textAlign: "left",
        width: "100%",
        cursor: "pointer"
    },
    editorContainer: {
        border: "1px solid #444",
        borderRadius: "5px"
    },
    darkPreview: {
        background: "#252526",
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px"
    },
    lightPreview: {
        background: "#fff",
        color: "#000",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px"
    },
    outputBox: {
        whiteSpace: "pre-wrap",
        background: "#000",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        minHeight: "100px"
    },
    clearShellButton: {
        padding: "5px 10px",
        fontSize: "14px",
        backgroundColor: "#d9534f",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    },
    outputHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
};

export default JavaCodeEditor;
