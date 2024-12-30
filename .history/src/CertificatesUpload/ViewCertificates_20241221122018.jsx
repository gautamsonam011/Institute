import React, { useState, useEffect } from 'react';

const ViewCertificates = () => {
  const [certificates, setCertificates] = useState([]);  // Store fetched courses
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether a course is being edited
  const [editingCertificate, setEditingCertificate] = useState(null);  // Track the course being edited
  const [certificate, setCertificate] = useState('');  // Track the course name input
  const [studentNumber, setStudentNumber] = useState('');  // Track the course duration input

  // Fetch courses data from the backend API
  useEffect(() => {
    const fetchCertificates = async () => {
      const token = localStorage.getItem('access_token');  // Retrieve the token from localStorage
  
      if (!token) {
        console.error('No authentication token found');
        return;
      }
  
      try {
        const response = await fetch('http://127.0.0.1:8000/certificates/certificateAll', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch certificates');
        }
  
        const data = await response.json();
        setCertificates(data); 
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };
  
    fetchCertificates();
  }, []);

  const handleEdit = (new_certificate) => {
    setEditingCertificate(new_certificate);  // Set the certificates being edited
    setCertificate(new_certificate.certificate);  // Set the current certificates name in the input
    setStudentNumber(new_certificate.studentNumber);  // Set the current certificates duration in the input
    setIsEditing(true);  // Show the editing form
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('access_token');  // Retrieve the token from localStorage

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const updatedCertificate = {certificate, studentNumber };

    try {
      const response = await fetch(`http://127.0.0.1:8000/certificatescertificatesUpdate/${editingCertificate.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCertificate),  // Send the updated certificate data
      });

      if (!response.ok) {
        console.error(`Failed to update certificate: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log('Updated certificate data:', data);

      // Update the certificate in the local state with the response data
      setCertificates(certificates.map(certificate => (certificate.id === data.id ? data : certificate)));
      setIsEditing(false);  // Close the editing form
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const handleDelete = (id) => {
    setCertificates(certificates.filter(certificate => certificate.id !== id));  // Remove certificate by id
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div>
      <h2>All Certificates</h2>
      
      {isEditing && (
        <div className="edit-course-form">
          <h3>Edit Certificate</h3>
          <label>
            Student ID:
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
            />
          </label>
          <br />
          <label>
            Certificate:
            <input
              type="text"
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
      
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Student ID</th>
            <th>Certificate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.length === 0 ? (
            <tr>
              <td colSpan="4">No certificate available</td>
            </tr>
          ) : (
            certificates.map((new_certificate, index) => (
              <tr key={new_certificate.id}>
                <td>{index + 1}</td>
                <td>{new_certificate.studentNo}</td>
                <td>{new_certificate.certificate}</td>
                <td>
                  <div className="dropdown">
                    <button onClick={() => toggleDropdown(new_certificate.id)} className="dots-button">•••</button>
                    {openDropdown === new_certificate.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleEdit(new_certificate)}>Edit</button>
                        <button onClick={() => handleDelete(new_certificate.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCertificates;
