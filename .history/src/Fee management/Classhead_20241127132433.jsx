import React, { useState, useEffect } from 'react';
import './classhead.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [feeHeadName, setfeeHeadName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = ['Mathematics', 'Science', 'History', 'Literature'];

  
  useEffect(() => {
    const fetchFeeHeadData = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/get-fee-heads'); // Replace with your GET API URL
        if (response.ok) {
          const data = await response.json();
          setStudents(data); // Set the fetched data to the state
        } else {
          console.error('Failed to fetch data:', response.statusText);
          alert('Failed to load data. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while loading data.');
      }
    };

    fetchFeeHeadData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleFeeAmountChange = (id, amount) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, amount: amount } : student
    );
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter(student => {
    const matchesCourse = selectedCourse ? student.course === selectedCourse : true;
    return matchesCourse;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feeHeadName.trim()) {
      const newStudent = { id: Date.now(), feeHeadName: feeHeadName.trim(), amount: '', course: selectedCourse };
      setStudents([...students, newStudent]);
      setfeeHeadName('');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/fees/addFeeHead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(students), // Sending the `students` data
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Save successful:', result);
        alert('Data saved successfully!');
      } else {
        console.error('Failed to save data:', response.statusText);
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving data.');
    }
  };

  return (
    <div>
      <h2>Class Fee Head</h2>
      <div className="filter-container">
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
            <th>Fee Head Name</th>
            <th>Fee Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.feeHeadName}</td>
              <td>
                <input
                  type="number"
                  placeholder="Enter fee amount"
                  value={student.amount || ''}
                  onChange={(e) => handleFeeAmountChange(student.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSave} className="save-button">Save</button>
      </div>
    </div>
  );
};

export default StudentTable;
