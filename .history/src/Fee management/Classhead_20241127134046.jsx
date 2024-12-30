import React, { useState, useEffect } from 'react';
import './classhead.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [feeHeadName, setFeeHeadName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const courses = ['Mathematics', 'Science', 'History', 'Literature'];

  // Function to get the authorization token (assuming it's available from a login process)
  const getAuthToken = async () => {
    // Replace this with the actual way you get your auth token (e.g., from localStorage or a login endpoint)
    const token = localStorage.getItem('access_token'); // Or use any method you have to retrieve the token
    return token;
  };

  // Fetch the fee head data from the API
  useEffect(() => {
    const fetchFeeHeadData = async () => {
      try {
        const token = await getAuthToken();
        
        if (!token) {
          alert('No authentication token found. Please log in again.');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/fees/addFeeHeadAll', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Attach the token to the header
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data); // Set the fetched data to the state
        } else {
          console.error('Failed to fetch data:', response.statusText);
          alert('Failed to load data. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while loading data.');
      }
    };

    fetchFeeHeadData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handle changes in fee amount
  const handleFeeAmountChange = (id, amount) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, amount: amount } : student
    );
    setStudents(updatedStudents);
  };

  // Filter students based on selected course
  const filteredStudents = students.filter(student => {
    const matchesCourse = selectedCourse ? student.course === selectedCourse : true;
    return matchesCourse;
  });

  // Handle form submission for adding a new fee head
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feeHeadName.trim()) {
      const newStudent = { id: Date.now(), feeHeadName: feeHeadName.trim(), amount: '', course: selectedCourse };
      setStudents([...students, newStudent]);
      setFeeHeadName('');
    }
  };

  // Handle save action (POST request)
  const handleSave = async () => {
    try {
      const token = await getAuthToken();
      
      if (!token) {
        alert('No authentication token found. Please log in again.');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/fees/classFeeHead', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the token to the header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(students), // Send the students' data in the request body
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
