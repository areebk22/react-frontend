import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Replace 'http://localhost:8000/api/upload/' with your Django backend API endpoint
      fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Upload success:', data);
          // Handle response or update UI as needed
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          // Handle error state
        });
    }
  };

  return (

    <>
      <div className = "home-container">

        <div className="img-container">
          <img src="../../public/img" alt="" />
        </div>
        <div className="upload-container">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>

      </div>

      <div>
        
    </div>
    </>

    
  );
};

export default FileUpload;
