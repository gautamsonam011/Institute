import React, { useState } from 'react';

const StudentTable = () => {
  const [students, setStudents] = useState([
    { id: 1, duration: '3', courseName: 'Computer Science'},
    { id: 2, duration: '4', courseName: 'Mathematics' },
    { id: 3, duration: '8', courseName: 'Physics' },
    { id: 4, duration: '7', courseName: 'Mathematics'},
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);


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
      <h2>All students list</h2>
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
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.courseName}</td>
              <td>{student.duration}</td>
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
