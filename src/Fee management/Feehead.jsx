import React, { useState, useEffect } from 'react';
import './feehead.css';

const FeesHeadTable = () => {
  const [feeHeads, setFeeHeads] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [feeHeadName, setFeeHeadName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch all fee heads
  useEffect(() => {
    const fetchFeeHeads = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = localStorage.getItem('access_token');
        if (!authToken) {
          throw new Error('No authentication token found. Please login.');
        }

        const response = await fetch('http://127.0.0.1:8000/fees/addFeeHeadAll', {
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
        setFeeHeads(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeHeads();
  }, []);

  // ✅ Add new fee head
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

        const newFeeHead = await response.json();
        setFeeHeads([...feeHeads, newFeeHead]);
        setFeeHeadName('');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // ✅ Edit fee head
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
        body: JSON.stringify({ feeHeadName: updatedName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update fee head: ${response.statusText}`);
      }

      const updatedFeeHead = await response.json();
      setFeeHeads(feeHeads.map(item =>
        item.id === id ? { ...item, feeHeadName: updatedFeeHead.feeHeadName } : item
      ));
      setOpenDropdown(null);  // close the dropdown after editing
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete fee head
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

      setFeeHeads(feeHeads.filter(item => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Dropdown toggle
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // ✅ Filter fee heads by search term
  const filteredFeeHeads = feeHeads.filter(item =>
    item.feeHeadName && item.feeHeadName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Fee Head Management</h2>
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
            {filteredFeeHeads.length === 0 ? (
              <tr><td colSpan="3">No fee heads found.</td></tr>
            ) : (
              filteredFeeHeads.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {openDropdown === item.id ? (
                      <input
                        type="text"
                        defaultValue={item.feeHeadName}
                        onBlur={(e) => handleEdit(item.id, e.target.value)}
                      />
                    ) : (
                      item.feeHeadName
                    )}
                  </td>
                  <td>
                    <div className="dropdown">
                      <button onClick={() => toggleDropdown(item.id)} className="dots-button">•••</button>
                      {openDropdown === item.id && (
                        <div className="dropdown-menu">
                          <button onClick={() => toggleDropdown(item.id)}>Cancel</button>
                          <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeesHeadTable;
