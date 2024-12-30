import React, { useState } from 'react';
import './classhead.css';

const StudentTable = () => {
  const [students, setStudents] = useState([
    { id: 1, feehead: 'John Doe', feeAmount: '', course: 'Mathematics' },
    { id: 2, feehead: 'Jane Smith', feeAmount: '', course: 'Science' },
    { id: 3, feehead: 'Emily Johnson', feeAmount: '', course: 'History' },
    { id: 4, feehead: 'Michael Brown', feeAmount: '', course: 'Literature' },
  ]);

  const [newFeeHead, setNewFeeHead] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // List of courses for the dropdown
  const courses = ['Mathematics', 'Science', 'History', 'Literature'];

  const handleFeeAmountChange = (id, amount) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, feeAmount: amount } : student
    );
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter(student => {
    const matchesCourse = selectedCourse ? student.course === selectedCourse : true;
    return matchesCourse;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFeeHead.trim()) {
      const newStudent = { id: Date.now(), feehead: newFeeHead.trim(), feeAmount: '', course: selectedCourse };
      setStudents([...students, newStudent]);
      setNewFeeHead('');
    }
  };

  // Function to handle the save action
  const handleSave = () => {
    // Here, you could save the data to a backend, localStorage, etc.
    // For now, we will just log the students' data to the console
    console.log('Saving data:', students);
    alert('Data saved successfully!');
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
              <td>{student.feehead}</td>
              <td>
                <input
                  type="number"
                  placeholder="Enter fee amount"
                  value={student.feeAmount}
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
