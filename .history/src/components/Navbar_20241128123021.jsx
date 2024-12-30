import React, { useState } from "react";
import "./navbar.css";
import image from "../assets/image.png";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [studentNo, setStudentNo] = useState("");
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

  const handleDownloadCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (!studentNo) {
      setError("Please enter a valid Student ID");
      setLoading(false);
      return;
    }
  
    try {
      // API call to download the certificate based on the student ID
      const response = await fetch(
        `http://127.0.0.1:8000/certificates/certificate/${studentNo}.pdf`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Check if the response is a PDF file
      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/pdf")) {
        // Log the response content for debugging
        const text = await response.text(); // Get the response text for debugging
        console.error("Response is not a PDF:", text);
        throw new Error("Failed to fetch PDF, invalid response type.");
      }
  
      // Create a Blob (binary data) for the downloaded certificate
      const blob = await response.blob();
  
      // Create a download link for the Blob and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `certificate_${studentNo}.pdf`; // Assuming the certificate is a PDF
      document.body.appendChild(link); // Append link to the body (needed for certain browsers)
      link.click();
      document.body.removeChild(link); // Clean up by removing the link after the click
  
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
         
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#certificate" onClick={handleCertificateClick}>Certificate</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
        
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
            <h2>Download Certificate</h2>
            <form onSubmit={handleDownloadCertificate}>
              <label>Student No:</label>
              <input
                type="text"
                name="studentNo"
                value={studentNo}
                onChange={handleStudentNoChange}
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
