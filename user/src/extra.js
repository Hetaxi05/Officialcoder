import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import menu from './image/menu.svg';

import { FaFolder, FaFile, FaUpload, FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Outputscreen = () => {
    const [code, setCode] = useState(`# access items of a list\n\nlanguages = ['Python', 'JavaScript', 'C++']\n\n# access the last item\nlast_language = languages[-1]\nprint(last_language)   # C++\n\n# access the third last item\nprint(languages[-3])   # Python\n\n# access the fourth last item\nprint(languages[-4])   # Error`);
    const [output, setOutput] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [files, setFiles] = useState([]);
    const [isFolderNameVisible, setIsFolderNameVisible] = useState(false);
    const [isFileNameVisible, setIsFileNameVisible] = useState(false);
    const [isUploadVisible, setIsUploadVisible] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [newFolderName, setNewFolderName] = useState("");
    const [isExplorerOpen, setIsExplorerOpen] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    // Execute Code
    const executeCode = async () => {
        const payload = {
            language: "python",
            version: "3.10.0",
            files: [{ name: "main.py", content: code }]
        };

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.run && data.run.stdout !== undefined) {
                setOutput(data.run.stdout);
            } else {
                setOutput(`Error: ${data.message || "Execution failed."}`);
            }
        } catch (error) {
            setOutput("Error executing the code.");
        }
    };

    // File Operations
    const createNewFile = () => {
        if (newFileName) {
            setFiles([...files, { name: newFileName, type: "file" }]);
            setNewFileName("");
            setIsFileNameVisible(false);
        }
    };

    const createNewFolder = () => {
        if (newFolderName) {
            setFiles([...files, { name: newFolderName, type: "folder" }]);
            setNewFolderName("");
            setIsFolderNameVisible(false);
        }
    };

    const uploadFile = () => {
        alert("File uploaded successfully!");
        setIsUploadVisible(false);
    };

    const deleteFile = (fileName) => {
        setFiles(files.filter((file) => file.name !== fileName));
    };

    const renameFile = (fileName) => {
        const newName = prompt("Enter new name for the file/folder:", fileName);
        if (newName) {
            setFiles(files.map((file) => (file.name === fileName ? { ...file, name: newName } : file)));
        }
    };

    // Theme change
    useEffect(() => {
        document.body.className = theme === "dark" ? "dark-mode" : "light-mode";
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <div style={{ ...styles.sidebar, backgroundColor: theme === "dark" ? "#2a2d3b" : "#f4f4f4" }}>
                <div style={styles.explorerSection}>
                    <div style={styles.explorerHeader} onClick={() => setIsExplorerOpen(!isExplorerOpen)}>
                        <span style={styles.explorerTitle}>Explorer</span>
                        {isExplorerOpen ? <FaChevronUp style={styles.arrowIcon} /> : <FaChevronDown style={styles.arrowIcon} />}
                    </div>
                    {isExplorerOpen && (
                        <div style={styles.actionsContainer}>
                            <button
                                style={styles.actionButton}
                                onClick={() => setIsFileNameVisible(!isFileNameVisible)}
                            >
                                <FaFile style={styles.icon} /> New File
                            </button>

                            <button
                                style={styles.actionButton}
                                onClick={() => setIsFolderNameVisible(!isFolderNameVisible)}
                            >
                                <FaFolder style={styles.icon} /> New Folder
                            </button>
                            
                            <button
                                style={styles.actionButton}
                                onClick={() => setIsUploadVisible(!isUploadVisible)}
                            >
                                <FaUpload style={styles.icon} /> Upload File
                            </button>
                        </div>
                    )}
                </div>

                {/* File Creation Input */}
                {isFileNameVisible && (
                    <div style={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Enter file name"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            style={styles.input}
                        />
                        <button onClick={createNewFile} style={styles.createButton}>Create File</button>
                    </div>
                )}

                {/* Folder Creation Input */}
                {isFolderNameVisible && (
                    <div style={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Enter folder name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            style={styles.input}
                        />
                        <button onClick={createNewFolder} style={styles.createButton}>Create Folder</button>
                    </div>
                )}

                {/* Upload Input */}
                {isUploadVisible && (
                    <div style={styles.inputContainer}>
                        <input type="file" style={styles.uploadInput} />
                        <button onClick={uploadFile} style={styles.uploadButton}>Upload File</button>
                    </div>
                )}

                {/* Display Files and Folders */}
                <div style={styles.filesList}>
                    {files.map((file, index) => (
                        <div key={index} style={styles.fileItem}>
                            <span>{file.type === "folder" ? "📂" : "📄"} {file.name}</span>
                            <div style={styles.fileActions}>
                                <button style={styles.renameButton} onClick={() => renameFile(file.name)}><FaEdit /></button>
                                <button style={styles.deleteButton} onClick={() => deleteFile(file.name)}><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content (Editor & Output) */}
            <div style={{ flex: 1, padding: '20px' }}>
                {/* Toolbar */}
                <div style={styles.toolbar}>
                    <button style={styles.runbutton} onClick={executeCode}>▶ Run Code</button>
                    <div style={styles.dropdown}>
                    
                        <button style={styles.dropdownbutton} onClick={() => setShowDropdown(!showDropdown)}>
                        <img src={menu} alt="Menu" />
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

                {/* Monaco Editor */}
                <div style={styles.editorContainer}>
                    <MonacoEditor
                        height="400px"
                        language="python"
                        theme={theme === "dark" ? "vs-dark" : "vs-light"}
                        value={code}
                        onChange={setCode}
                        options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
                    />
                </div>

                {/* Output Section */}
                <div style={theme === "dark" ? styles.darkPreview : styles.lightPreview}>
                    <div style={styles.outputHeader}>
                        <h3 style={{color:"white"}}>Output:</h3>
                        <button style={styles.clearShellButton} onClick={() => setOutput("")}>🗑 Clear Shell</button>
                    </div>
                    <pre style={styles.outputBox}>{output}</pre>
                </div>
            </div>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '300px',
        padding: '20px',
        height: '100vh',
        overflowY: 'auto',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
        background: "#1e1e1e",

    },
    explorerSection: {
        marginBottom: '20px',
    },
    explorerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '10px',
        backgroundColor: '#444',
        borderRadius: '5px',
    },
    explorerTitle: {
        fontSize: '18px',
    },
    arrowIcon: {
        fontSize: '18px',
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
    },
    actionButton: {
        background: '#444',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        marginBottom: '10px',
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '5px',
        transition: 'background 0.3s ease',
    },
    icon: {
        marginRight: '8px',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px',
    },
    input: {
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        marginBottom: '10px',
        fontSize: '14px',
    },
    createButton: {
        padding: '8px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    uploadInput: {
        marginBottom: '10px',
    },
    uploadButton: {
        padding: '8px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    filesList: {
        marginTop: '20px',
    },
    fileItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3a3f53',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
    },
    fileActions: {
        display: 'flex',
        gap: '10px',
    },
    renameButton: {
        background: 'none',
        border: 'none',
        color: '#ffd700',
        cursor: 'pointer',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: '#d9534f',
        cursor: 'pointer',
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

export default Outputscreen;
