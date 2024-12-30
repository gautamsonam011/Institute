import React, { useState } from "react";
import "./navbar.css";
import image from '../assets/image.png';

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCertificateClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(null);  // Reset error when closing the modal
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleDownloadCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!studentId) {
      setError("Please enter a student ID");
      setLoading(false);
      return;
    }

    try {
      // Make API call to get the certificate PDF by student ID
      const response = await fetch(`http://127.0.0.1:8000/certificates/certificate/${studentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If the response is not okay, throw an error
      if (!response.ok) {
        throw new Error('Certificate not found or invalid student ID');
      }

      // Convert the response to a Blob (binary data)
      const blob = await response.blob();

      // Check if the response is a valid PDF file
      const contentType = response.headers.get("Content-Type");
      if (contentType !== "application/pdf") {
        throw new Error("The file is not a PDF.");
      }

      // Create a temporary URL for the blob
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);

      // Set up the download attribute with the desired file name
      link.href = url;
      link.download = `certificate_${studentId}.pdf`;
      link.click();  // Trigger the download

      // Release the object URL after download
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={image} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#certificate" onClick={handleCertificateClick}>Certificate</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Download Certificate</h2>
            <form onSubmit={handleDownloadCertificate}>
              <label>Student ID:</label>
              <input
                type="text"
                name="studentId"
                value={studentId}
                onChange={handleStudentIdChange}
                placeholder="Enter Student ID"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Downloading..." : "Download Certificate"}
              </button>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
