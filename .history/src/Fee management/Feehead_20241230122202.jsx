import React, { useState, useEffect } from 'react';
import './feehead.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [feeHeadName, setFeeHeadName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data using the GET API
  useEffect(() => {
    const fetchFeeHeads = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = localStorage.getItem('access_token');
        if (!authToken) {
          throw new Error('No authentication token found. Please login.');
        }
     
        await fetch('http://127.0.0.1:8000/fees/addFeeHeadAll', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch fee heads: ${response.statusText}`);
        }

        const data = await response.json();
        setStudents(data); // Assuming `data` is an array of fee heads
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeHeads();
  }, []);

  // Add new fee head using the POST API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feeHeadName.trim()) {
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
          body: JSON.stringify({ feeHeadName: feeHeadName.trim() }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add fee head: ${response.statusText}`);
        }

        const newStudent = await response.json(); // Assuming the API returns the newly created fee head
        setStudents([...students, newStudent]);
        setFeeHeadName('');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit fee head using the PUT API
 // Edit fee head using the PUT API
const handleEdit = async (id, updatedName) => {
  try {
    setLoading(true);
    setError(null);

    const authToken = localStorage.getItem('access_token');
    if (!authToken) {
      throw new Error('No authentication token found. Please login.');
    }

    const response = await fetch(`http://127.0.0.1:8000/fees/addFeeHead/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feeHeadName: updatedName }), // Ensure you're passing the updated data here
    });

    if (!response.ok) {
      throw new Error(`Failed to update fee head: ${response.statusText}`);
    }

    const updatedFeeHead = await response.json();
    setStudents(students.map(student =>
      student.id === id ? { ...student, feeHeadName: updatedFeeHead.feeHeadName } : student
    ));
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};


  // Delete fee head using the DELETE API
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const authToken = localStorage.getItem('access_token');
      if (!authToken) {
        throw new Error('No authentication token found. Please login.');
      }

      const response = await fetch(`http://127.0.0.1:8000/fees/addFeeHead/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete fee head');
      }

      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter fee heads based on search term
  const filteredStudents = students.filter(student =>
    student.feeHeadName && student.feeHeadName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div>
      <h2>Fee Head</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="filter-container">
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Add Fee Head"
            value={feeHeadName}
            onChange={(e) => setFeeHeadName(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                <td>
                  {openDropdown === student.id ? (
                    <input
                      type="text"
                      value={student.feeHeadName}
                      onChange={(e) => handleEdit(student.id, e.target.value)}
                    />
                  ) : (
                    student.feeHeadName
                  )}
                </td>
                <td>
                  <div className="dropdown">
                    <button onClick={() => toggleDropdown(student.id)} className="dots-button">•••</button>
                    {openDropdown === student.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleEdit(student.id, student.feeHeadName)}>Edit</button>
                        <button onClick={() => handleDelete(student.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentTable;
