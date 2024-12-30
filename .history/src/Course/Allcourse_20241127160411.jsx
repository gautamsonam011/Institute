import React, { useState, useEffect } from 'react';

const StudentTable = () => {
  const [courses, setCourses] = useState([]);  // Store fetched courses
  const [openDropdown, setOpenDropdown] = useState(null);

  // Fetch courses data from the backend API
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
        setCourses(data);  // Populate the courses state
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);

  const handleEdit = async (id) => {
    const token = localStorage.getItem('access_token');  // Retrieve the token from localStorage
  
    if (!token) {
      console.error('No authentication token found');
      return;
    }
  
    const updatedCourse = { courseName: 'Updated Course Name', duration: 'Updated Duration' };
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/courses/courses/${id}`, {
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
  
      // Assuming the response returns the updated course, update local state
      setCourses(courses.map(course => (course.id === id ? data : course)));
      console.log(`Course with id: ${id} has been updated.`);
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };
  
  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');  // Retrieve the token from localStorage

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/courses/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      // Remove the course from the local state
      setCourses(courses.filter(course => course.id !== id));
      console.log(`Course with id: ${id} has been deleted.`);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
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
                        <button onClick={() => handleEdit(course.id)}>Edit</button>
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

export default StudentTable;
