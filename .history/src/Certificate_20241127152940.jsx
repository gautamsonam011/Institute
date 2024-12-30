import React, { useState } from 'react';

const CertificateUpload = () => {
  const [studentId, setStudentId] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!certificateFile) {
      alert('Please select a certificate file to upload.');
      return;
    }

    // Get the auth token from localStorage (or sessionStorage)
    const authToken = localStorage.getItem('authToken'); // or sessionStorage

    // Create FormData to send with POST request
    const formData = new FormData();
    formData.append('certificate', certificateFile);

    // Create URL with studentNo as a query parameter
    const url = `http://127.0.0.1:8000/certificates/certificates?studentNo=${studentId}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log('Success:', data);
          setUploadSuccess(true);
          setUploadError('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setUploadError('Error uploading certificate. Please try again.');
        setUploadSuccess(false);
      });
  };

  return (
    <div>
      <h2>Upload Student Certificate</h2>
      {uploadSuccess && <p style={{ color: 'green' }}>Certificate uploaded successfully!</p>}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="form-container">
          <label htmlFor="certificateFile">Upload Certificate:</label>
          <input
            type="file"
            id="certificateFile"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default CertificateUpload;
