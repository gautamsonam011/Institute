import React, { useState, useEffect } from 'react';
import './allstudent.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors from the API

  // Fetch students data from the API
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
        setStudents(data); // Set the fetched students data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError(error.message); // Set error message if the fetch fails
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchStudents();
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

  const filteredStudents = students.filter(student => {
    const matchesName = student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse ? student.course === selectedCourse : true;
    return matchesName && matchesCourse;
  });

  const courses = [...new Set(students.map(student => student.course))];

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
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
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.course}</td>
              <td>{student.dob}</td>
              <td>{student.mobileNo}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
