import React, { useState } from 'react';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      courseName,
      duration,
      description,
    };
    
    console.log(newCourse);
  
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
