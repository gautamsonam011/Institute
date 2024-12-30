import React, { useState } from 'react';
import './feehead.css';

const StudentTable = () => {
  const [students, setStudents] = useState([
    { id: 1, feeHeadName: 'John Doe' },
    { id: 2, feeHeadName: 'Jane Smith' },
    { id: 3, feeHeadName: 'Emily Johnson' },
    { id: 4, feeHeadName: 'Michael Brown' },
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [feeHeadName, setNewFeeHeadName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newFeeHead.trim()) {
      try {
        setLoading(true);
        setError(null);

        const authToken = localStorage.getItem('access_token');
        if (!authToken) {
          throw new Error('No authentication token found. Please login.');
        }

        const response = await fetch('http://127.0.0.1:8000/fees/addFeeHead', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ feehead: feeHeadName.trim() }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add fee head: ${response.statusText}`);
        }

        const newStudent = await response.json(); // Assuming the API returns the newly created fee head
        setStudents([...students, newStudent]);
        setNewFeeHeadName('');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
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
            value={feeHeadName}
            onChange={(e) => setNewFeeHeadName(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
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
              <td>{student.feeHeadName}</td>
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
