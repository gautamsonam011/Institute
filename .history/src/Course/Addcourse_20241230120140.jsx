import React, { useState } from 'react';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      courseName,
      duration,
      description,
    };

    // const apiUrl = 'https://instituteapp-web.onrender.com/'

    try {
      const token = localStorage.getItem('access_token'); 

      if (!token) {
        alert('No authentication token found. Please log in again.');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/courses/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Course addition failed:', errorData);
        alert(`Failed to add course: ${errorData.message || response.statusText}`);
      } else {
        const result = await response.json();
        console.log('Course added successfully:', result);
        alert('Course added successfully!');
       
        setCourseName('');
        setDuration('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter course duration"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCourse;
