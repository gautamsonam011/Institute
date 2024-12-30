import React, { useState, useEffect } from 'react';
import './classhead.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [feeHeadName, setFeeHeadName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const courses = ['Mathematics', 'Science', 'History', 'Literature'];

 
  const getAuthToken = async () => {
   
    const token = localStorage.getItem('access_token');
    return token;
  };

  useEffect(() => {
    const fetchFeeHeadData = async () => {
      try {
        const token = await getAuthToken();
        
        if (!token) {
          alert('No authentication token found. Please log in again.');
          return;
        }

        await fetch('http://127.0.0.1:8000/fees/addFeeHeadAll', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data);
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
  }, []); 

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
      setFeeHeadName('');
    }
  };

  // Handle save action (POST request)
  const handleSave = async () => {
    try {
      // Mapping students to a list with feeHeadName and amount
      const feeHeadsList = students.map(student => ({
        feeHeadName: student.feeHeadName,
        amount: student.amount || 0,
      }));
  
      console.log("Payload being sent:", feeHeadsList);  // Log the list format
  
      const response = await fetch('http://127.0.0.1:8000/fees/classFeeHead', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`,  // Use actual token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feeHeads: feeHeadsList }),  // Send the list as part of the payload
      });
  
      // Handle the response
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Save failed:', errorData);
        alert(`Save failed: ${errorData.message || response.statusText}`);
      } else {
        const result = await response.json();
        console.log('Save successful:', result);
        alert('Data saved successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`An error occurred while saving data: ${error.message}`);
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