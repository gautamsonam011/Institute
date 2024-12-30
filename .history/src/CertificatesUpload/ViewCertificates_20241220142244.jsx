import React, { useState, useEffect } from 'react';

const ViewCertificates = () => {
  const [certificates, setCertificates] = useState([]);  // Store fetched courses
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether a course is being edited
  const [editingCourse, setEditingCourse] = useState(null);  // Track the course being edited
  const [cetificate, setCetificate] = useState('');  // Track the course name input
  const [studentNumber, set] = useState('');  // Track the course duration input

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
    setCetificate(new_certificate.courseName);  // Set the current certificates name in the input
    setDuration(new_certificate.duration);  // Set the current certificates duration in the input
    setIsEditing(true);  // Show the editing form
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('access_token');  // Retrieve the token from localStorage

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const updatedCertificate = { studentNo, duration };

    try {
      const response = await fetch(`http://127.0.0.1:8000/courses/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCourse),  // Send the updated course data
      });

      if (!response.ok) {
        console.error(`Failed to update course: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log('Updated course data:', data);

      // Update the course in the local state with the response data
      setCourses(courses.map(course => (course.id === data.id ? data : course)));
      setIsEditing(false);  // Close the editing form
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(course => course.id !== id));  // Remove course by id
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div>
      <h2>All Courses</h2>
      
      {isEditing && (
        <div className="edit-course-form">
          <h3>Edit Course</h3>
          <label>
            Course Name:
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Duration:
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
            <th>Course Name</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4">No courses available</td>
            </tr>
          ) : (
            courses.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.courseName}</td>
                <td>{course.duration}</td>
                <td>
                  <div className="dropdown">
                    <button onClick={() => toggleDropdown(course.id)} className="dots-button">•••</button>
                    {openDropdown === course.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleEdit(course)}>Edit</button>
                        <button onClick={() => handleDelete(course.id)}>Delete</button>
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
