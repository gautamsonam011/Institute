import React, { useState, useEffect } from 'react';
import './classhead.css';

const ClassFeeHeadTable = () => {
  const [feeHeads, setFeeHeads] = useState([]);
  const [feeHeadName, setFeeHeadName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('access_token');

  // ✅ Fetch existing fee heads
  const fetchFeeHeads = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch('http://127.0.0.1:8000/fees/classFeeHeadAll', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch fee heads');
      const data = await response.json();
      setFeeHeads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeHeads();
  }, []);

  // ✅ Handle form submission to add new fee head
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feeHeadName.trim() || !amount.trim()) {
      alert('Please enter both Fee Head Name and Amount.');
      return;
    }

    try {
      setLoading(true);
      const token = getAuthToken();

      const response = await fetch('http://127.0.0.1:8000/fees/classFeeHead', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feeHeadName: feeHeadName.trim(),
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add fee head');
      }

      setFeeHeadName('');
      setAmount('');
      await fetchFeeHeads(); // refresh table
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="class-fee-head-container">
      <h2>Class Fee Head Management</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="fee-head-form">
        <input
          type="text"
          placeholder="Fee Head Name"
          value={feeHeadName}
          onChange={(e) => setFeeHeadName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Fee Head'}
        </button>
      </form>

      <table className="fee-head-table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Fee Head Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {feeHeads.length === 0 ? (
            <tr>
              <td colSpan="3">No fee heads available.</td>
            </tr>
          ) : (
            feeHeads.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.feeHeadName}</td>
                <td>{item.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassFeeHeadTable;
