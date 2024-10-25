import React, { useState } from 'react';
import './allstudent.css';

const StudentTable = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', course: 'Computer Science', dob: '2000-01-15', mobNo: '1234567890' },
    { id: 2, name: 'Jane Smith', course: 'Mathematics', dob: '1999-05-22', mobNo: '0987654321' },
    { id: 3, name: 'Emily Johnson', course: 'Physics', dob: '2001-04-10', mobNo: '1234509876' },
    { id: 4, name: 'Michael Brown', course: 'Mathematics', dob: '2000-12-05', mobNo: '6543210987' },
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

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
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse ? student.course === selectedCourse : true;
    return matchesName && matchesCourse;
  });

  const courses = [...new Set(students.map(student => student.course))];

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
            <th>Name</th>
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
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.dob}</td>
              <td>{student.mobNo}</td>
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
