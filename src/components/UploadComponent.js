import './UploadComponent.css';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const UploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleDrop = (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('http://localhost:8000/api/upload/', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                // Store the file in the browser's memory
                // const fileBlob = new Blob([selectedFile], { type: selectedFile.type });
                // const fileUrl = URL.createObjectURL(fileBlob);
                // Navigate to the /preview route and pass the file URL as a state object
                // navigate('/preview', { state: { uploadedFile: fileUrl } });

                // OR

                // Assuming your server returns a permanent URL to the uploaded file
                const fileUrl = data.fileUrl;
                navigate('/preview', { state: { uploadedFile: fileUrl } });

            })
            .catch(error => {
                console.error('Error uploading file:', error);
                // Handle error state
            });
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

    return (
        <main className="UploadComponent-main">
            <div className="image-container">
                <img src="./image2.jpg" alt="" />
            </div>
            <div className="text-container">
                <div className="text-content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
                    </p>
                </div>
                <div className={`dropzone-container ${isDragActive ? 'active' : ''} ${selectedFile ? 'file-dropped' : ''}`} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {selectedFile ? (
                        <p>{selectedFile.name}</p>
                    ) : (
                        <p>Drag 'n' drop a file here, or click to select a file</p>
                    )}
                </div>
                <button className="upload-button" onClick={handleUpload}>UPLOAD DOCUMENT</button>
            </div>
        </main>
    );
}

export default UploadComponent;
