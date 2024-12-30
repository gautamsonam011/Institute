import React, { useState } from "react";
import "./navbar.css";
import image from '../assets/image.png';

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [studentNo, setStudentNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCertificateClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(null);  // Reset error when closing the modal
  };

  const handleStudentNoChange = (e) => {
    setStudentNo(e.target.value);
  };

  const handleDownloadCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!studentNo) {
      setError("Please enter a student ID");
      setLoading(false);
      return;
    }

    try {
      // API call to get certificate based on student ID
      const response = await fetch(`http://127.0.0.1:8000/certificates/certificate/${studentNo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle if the response status is not ok
      if (!response.ok) {
        throw new Error('Certificate not found or invalid student ID');
      }

      // Convert the response to a Blob (binary data)
      const blob = await response.blob();

      // Check if the response is a valid PDF file
      if (response.headers.get("Content-Type") !== "application/pdf") {
        throw new Error("The file is not a PDF.");
      }

      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `certificate_${studentNo}.pdf`;  // Assign filename
      link.click();  // Trigger the download
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
                name="studentNo"
                value={studentNo}
                onChange={handleStudentNoChange}
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
