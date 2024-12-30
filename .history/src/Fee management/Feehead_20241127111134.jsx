import React, { useState } from 'react';
import './feehead.css';

const StudentTable = () => {
  const [students, setStudents] = useState([
    { id: 1, feehead: 'John Doe' },
    { id: 2, feehead: 'Jane Smith' },
    { id: 3, feehead: 'Emily Johnson' },
    { id: 4, feehead: 'Michael Brown' },
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newFeeHead, setNewFeeHead] = useState('');

  const handleEdit = (id) => {
    console.log(`Edit student with id: ${id}`);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const filteredStudents = students.filter(student => 
    student.feehead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (newFeeHead.trim()) {
      const newStudent = { id: Date.now(), feehead: newFeeHead.trim() }; 
      setStudents([...students, newStudent]);
      setNewFeeHead('');
    }
  };

  return (
    <div>
      <h2>Fee head</h2>
      <div className="filter-container">
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Add Fee Head"
            value={newFeeHead}
            onChange={(e) => setNewFeeHead(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Fee Head Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.feehead}</td>
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
