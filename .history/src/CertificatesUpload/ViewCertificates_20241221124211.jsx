import React, { useState, useEffect } from 'react';

const ViewCertificates = () => {
  const [certificates, setCertificates] = useState([]);  // Store fetched certificates
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Track whether a certificate is being edited
  const [editingCertificate, setEditingCertificate] = useState(null);  // Track the certificate being edited
  const [certificate, setCertificate] = useState('');  // Track the certificate name input
  const [studentNo, setStudentNo] = useState('');  // Track the student number input

  // Fetch certificates data from the backend API
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
        setCertificates(data);  // Set the fetched certificates
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };
  
    fetchCertificates();
  }, []);

  const handleEdit = (certificateToEdit) => {
    setEditingCertificate(certificateToEdit);  // Set the certificate being edited
    setCertificate(certificateToEdit.certificate);  // Set the current certificate name in the input
    setStudentNo(certificateToEdit.studentNo);  // Set the current student number in the input
    setIsEditing(true);  // Show the editing form
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('access_token');  // Retrieve the token from localStorage
  
    if (!token) {
      console.error('No authentication token found');
      return;
    }
  
    // Create updatedCertificate object with both fields
    const updatedCertificate = { 
      certificate, 
      studentNo
    };
  
    try {
      // Construct the URL with query parameters for ID and studentNo
      const url = `http://127.0.0.1:8000/certificatescertificatesUpdate?ID=${editingCertificate.id}&studentNo=${studentNo}`;
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCertificate),  // Send both updated certificate and studentNo
      });
  
      if (!response.ok) {
        console.error(`Failed to update certificate: ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      console.log('Updated certificate data:', data);
  
      // Update the certificate in the local state with the response data, ensuring its original position
      setCertificates(prevCertificates => {
        return prevCertificates.map(cert => 
          cert.id === data.id ? data : cert // Replace the edited certificate in its original position
        );
      });
  
      setIsEditing(false);  // Close the editing form
    } catch (error) {
      console.error('Error updating certificate:', error);
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
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
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
              <td colSpan="4">No certificates available</td>
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
