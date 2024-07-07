import React, { useState, useEffect } from 'react';
import './Preview.css';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useLocation } from 'react-router-dom';


const Preview = () => {
    const data = {
        "Create Table": "Content for script A. This is a very large script content example for A.",
        "Exchange": "Content for script B. This is a very large script content example for B.",
        "View_DDL": "Content for script C. This is a very large script content example for C.",
        "Table_DDL": "Content for script D. This is a very large script content example for D.",
        "VID_PII": "Content for script E. This is a very large script content example for E.",
        "Table_DB_Creation": "Content for script F. This is a very large script content example for F."
    };

    const [scriptNamesList] = useState(["Create Table", "Exchange", "View_DDL", "Table_DDL", "VID_PII", "Table_DB_Creation", "Document Preview"]);
    const [content, setContent] = useState(data["Create Table"]);
    const [activeTab, setActiveTab] = useState("Create Table");
    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState("");

    

    const handleClick = (scriptName) => {
        if (scriptName === "Document Preview") {
            setContent("");
            setEditableContent("");
        } else {
            setContent(data[scriptName]);
            setEditableContent(data[scriptName]);
        }
        setActiveTab(scriptName);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setContent(editableContent);
        setIsEditing(false);
        data[activeTab] = editableContent;
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `${activeTab}.txt`;
        document.body.appendChild(element);
        element.click();
    };


    const location = useLocation();
    const { fileUrl } = location.state;

    return (
        <div className="Preview-container">
            <div className="script-tabs">
                {scriptNamesList.length > 0 ? scriptNamesList.map((scriptName, index) => (
                    <button
                        className={`script-tab ${activeTab === scriptName ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleClick(scriptName)}
                    >
                        {scriptName}
                    </button>
                )) : <p>Loading...</p>}
            </div>
            <div className="buttons-container">
                <button className="action-button" onClick={handleEdit} disabled={!activeTab || isEditing || activeTab === "Document Preview"}>Edit</button>
                <button className="action-button" onClick={handleSave} disabled={!isEditing || activeTab === "Document Preview"}>Save</button>
                <button className="action-button" onClick={handleDownload} disabled={!activeTab || activeTab === "Document Preview"}>Download</button>
            </div>
            <div className="script-content">
                {activeTab === "Document Preview" ? (
                    <DocViewer 
                    documents={[{ uri: fileUrl }]} 
                    pluginRenderers={DocViewerRenderers}
                    />
                ) : 
                isEditing ? (
                    <textarea
                        value={editableContent}
                        onChange={(e) => setEditableContent(e.target.value)}
                        className="content-textarea"
                    />
                ) : (
                    <textarea value={content} readOnly className="content-textarea" />
                )}
            </div>
        </div>
    );
};

export default Preview;
