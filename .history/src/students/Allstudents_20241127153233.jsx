import React, { useState, useEffect } from 'react';
import './allstudent.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const authToken = localStorage.getItem("access_token");
        if (!authToken) {
          setError("No authentication token found. Please login.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/student/astudentAll", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Log to see the data structure
        setStudents(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = async (id) => {
    // Call the Edit API with the student ID (Assuming an Edit API is available)
    const studentToEdit = students.find(student => student.id === id);
    if (studentToEdit) {
      // Example of updating a student (you can customize the form or logic as per your requirements)
      const updatedStudent = {
        ...studentToEdit, 
        firstName: 'Updated Name', // Example of updating the name
      };

      try {
        const authToken = localStorage.getItem("access_token");
        const response = await fetch(`http://127.0.0.1:8000/student/student/${id}`, {
          method: 'PUT',
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudent),
        });

        if (response.ok) {
          // Update the students list with the new data
          setStudents(students.map(student =>
            student.id === id ? { ...student, ...updatedStudent } : student
          ));
        } else {
          throw new Error('Failed to update student');
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    // Call the Delete API with the student ID
    try {
      const authToken = localStorage.getItem("access_token");
      const response = await fetch(`http://127.0.0.1:8000/student/student/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the student from the state after successful deletion
        setStudents(students.filter(student => student.id !== id));
      } else {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Filter the students based on search term and selected course
  const filteredStudents = students.filter(student => {
    const matchesName = student.firstName && student.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse ? student.course === selectedCourse : true;
    return matchesName && matchesCourse;
  });

  // Get unique courses from students
  const courses = [...new Set(students.map(student => student.course))];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All students list</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">All Courses</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Course</th>
            <th>DOB</th>
            <th>Mobile No.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr><td colSpan="7">No students available.</td></tr>
          ) : (
            filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.course}</td>
                <td>{student.date_of_birth}</td>
                <td>{student.mobile}</td>
                <td>
                  <div className="dropdown">
                    <button onClick={() => toggleDropdown(student.id)} className="dots-button">•••</button>
                    {openDropdown === student.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleEdit(student.id)}>Edit</button>
                        <button onClick={() => handleDelete(student.id)}>Delete</button>
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
