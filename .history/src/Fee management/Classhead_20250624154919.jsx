import React, { useState, useEffect } from 'react';
import './classhead.css';

const ClassHeadTable = () => {
  const [feeHeads, setFeeHeads] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = async () => {
    return localStorage.getItem('access_token');
  };

  // ✅ Fetch courses and fee heads on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getAuthToken();
        if (!token) {
          alert('No authentication token found.');
          return;
        }

        const [feeHeadRes, courseRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/fees/addFeeHeadAll', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://127.0.0.1:8000/courseAll', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (!feeHeadRes.ok || !courseRes.ok) {
          throw new Error('Failed to fetch data.');
        }

        const feeHeadData = await feeHeadRes.json();
        const courseData = await courseRes.json();

        const enrichedFeeHeads = feeHeadData.map((item) => ({
          ...item,
          amount: '',
          course: '',
        }));

        setFeeHeads(enrichedFeeHeads);
        setCourses(courseData);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Handle amount change
  const handleFeeAmountChange = (id, amount) => {
    setFeeHeads(feeHeads.map((item) =>
      item.id === id ? { ...item, amount, course: selectedCourse } : item
    ));
  };

  // ✅ Filter by selected course
  const filteredFeeHeads = feeHeads.filter((item) =>
    selectedCourse ? item.course === selectedCourse || item.course === '' : true
  );

  // ✅ Save to backend
  const handleSave = async () => {
    try {
      const token = await getAuthToken();
      const payload = {
        course: selectedCourse,
        feeHeads: feeHeads
          .filter(fh => fh.amount && selectedCourse)
          .map(fh => ({
            feeHeadName: fh.feeHeadName,
            amount: parseFloat(fh.amount),
            course: selectedCourse
          })),
      };

      if (payload.feeHeads.length === 0) {
        alert("No data to save.");
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/fees/classFeeHead', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to save');
      }

      alert('Fee data saved successfully!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'An error occurred during save.');
    }
  };

  return (
    <div>
      <h2>Class Fee Head</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className="filter-container">
        <label htmlFor="courseDropdown">Select Course:</label>
        <select
          id="courseDropdown"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.courseName}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Fee Head Name</th>
                <th>Fee Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeeHeads.map((feeHead, index) => (
                <tr key={feeHead.id}>
                  <td>{index + 1}</td>
                  <td>{feeHead.feeHeadName}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Enter fee amount"
                      value={feeHead.amount}
                      onChange={(e) =>
                        handleFeeAmountChange(feeHead.id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassHeadTable;
