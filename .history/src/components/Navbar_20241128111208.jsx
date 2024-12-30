import React, { useState } from "react";
import "./navbar.css";
import image from "../assets/image.png";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [studentNo, setStudentNo] = useState("");
  const [certificateFile, setCertificateFile] = useState(null); // For file upload
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility

  const handleCertificateClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(null); // Reset error when closing the modal
  };

  const handleStudentNoChange = (e) => {
    setStudentNo(e.target.value);
  };

  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  const handleUploadCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!studentNo || !certificateFile) {
      setError("Please enter a student ID and select a certificate file");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("studentNo", studentNo);
      formData.append("certificate", certificateFile);

      // API call to upload the certificate
      const response = await fetch("http://127.0.0.1:8000/certificates/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the certificate");
      }

      alert("Certificate uploaded successfully!");
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu visibility
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={image} alt="Logo" />
        </div>
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#certificate" onClick={handleCertificateClick}>Certificate</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Upload Certificate</h2>
            <form onSubmit={handleUploadCertificate}>
              <label>Student No:</label>
              <input
                type="text"
                name="studentNo"
                value={studentNo}
                onChange={handleStudentNoChange}
                placeholder="Enter Student No"
                required
              />
              <label>Upload Certificate:</label>
              <input
                type="file"
                name="certificate"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload Certificate"}
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
