import React, { useState, useEffect } from 'react';

const StudentTable = () => {
  const [new_data, setStudents] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Fetch students data from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('access_token');  // Retrieve the token from localStorage
  
      if (!token) {
        console.error('No authentication token found');
        return;
      }
  
      try {
        const response = await fetch('http://127.0.0.1:8000/courses/courseAll', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
  
        const data = await response.json();
        console.log(data);  // Process the fetched courses here
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);
  
  const handleEdit = (id) => {
    console.log(`Edit student with id: ${id}`);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div>
      <h2>All Courses</h2>
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
          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No students available</td>
            </tr>
          ) : (
            new_data.map((data, index) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.courseName}</td>
                <td>{data.duration}</td>
                <td>
                  <div className="dropdown">
                    <button onClick={() => toggleDropdown(data.id)} className="dots-button">•••</button>
                    {openDropdown === data.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleEdit(data.id)}>Edit</button>
                        <button onClick={() => handleDelete(data.id)}>Delete</button>
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

export default StudentTable;
