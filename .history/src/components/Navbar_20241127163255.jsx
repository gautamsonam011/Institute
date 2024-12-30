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

  const handleStudentIdChange = (e) => {
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

      // Handle the case where the student certificate is not found
      if (!response.ok) {
        throw new Error('Certificate not found or invalid student ID');
      }

      // Convert the response to a Blob (binary data)
      const blob = await response.blob();

      // Trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `certificate_${studentNo}.pdf`;  // Assuming certificate is a PDF file
      link.click();
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
              <label>Student No:</label>
              <input
                type="text"
                name="studentNo"
                value={studentNo}
                onChange={handleStudentIdChange}
                placeholder="Enter Student No"
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
