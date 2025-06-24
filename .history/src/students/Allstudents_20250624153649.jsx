import React, { useState, useEffect } from 'react';
import './allstudent.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    courseName: '',
    date_of_birth: '',
    mobile: ''
  });

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const authToken = localStorage.getItem("access_token");
        if (!authToken) {
          setError("No authentication token found. Please login.");
          setLoading(false);
          return;
        }

        const [studentsResponse, coursesResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/student/astudentAll", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }),
          fetch("http://127.0.0.1:8000/courseAll", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          })
        ]);

        if (!studentsResponse.ok || !coursesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const studentsData = await studentsResponse.json();
        const coursesData = await coursesResponse.json();

        setStudents(studentsData);
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudentsAndCourses();
  }, []);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditedData({
      firstName: student.firstName,
      lastName: student.lastName,
      courseName: student.courseName,
      date_of_birth: student.date_of_birth,
      mobile: student.mobile
    });
  };

  const handleSaveEdit = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
      const response = await fetch(`http://127.0.0.1:8000/student/student/${editingStudent.id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.log('Error response:', errorDetails);
        throw new Error('Failed to update student');
      }

      const updatedStudent = await response.json();
      console.log('Updated student:', updatedStudent);

      setStudents(students.map(student =>
        student.id === editingStudent.id ? { ...student, ...editedData } : student
      ));

      setEditingStudent(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = async (id) => {
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

  const filteredStudents = students.filter(student => {
    const matchesName = student.firstName && student.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse ? student.courseName === selectedCourse : true;
    return matchesName && matchesCourse;
  });

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
          {courses.map((course) => (
            <option key={course.id} value={course.courseName}>{course.courseName}</option>
          ))}
        </select>
      </div>

      {editingStudent && (
        <div className="edit-modal">
          <h3>Edit Student</h3>
          <label>
            First Name:
            <input 
              type="text" 
              value={editedData.firstName}
              onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
            />
          </label>
          <label>
            Last Name:
            <input 
              type="text" 
              value={editedData.lastName}
              onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
            />
          </label>
          <label>
            Course:
            <input 
              type="text" 
              value={editedData.courseName}
              onChange={(e) => setEditedData({ ...editedData, courseName: e.target.value })}
            />
          </label>
          <label>
            DOB:
            <input 
              type="date" 
              value={editedData.date_of_birth}
              onChange={(e) => setEditedData({ ...editedData, date_of_birth: e.target.value })}
            />
          </label>
          <label>
            Mobile No.:
            <input 
              type="text" 
              value={editedData.mobile}
              onChange={(e) => setEditedData({ ...editedData, mobile: e.target.value })}
            />
          </label>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Student No.</th>
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
                <td>{student.studentNo}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.courseName}</td>
                <td>{student.date_of_birth}</td>
                <td>{student.mobile}</td>
                <td>
                  <div className="dropdown">
                    <button onClick={() => toggleDropdown(student.id)} className="dots-button">•••</button>
                    {openDropdown === student.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleEdit(student)}>Edit</button>
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
