import React, { useState, useEffect } from "react";
import './addstudent.css';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    admissionYear: "",
    admissionDate: "",
    course: "",
    firstName: "",
    lastName: "",
    gender: "",
    date_of_birth: "",
    category: "",
    email: "",
    mobile: "",
    address: "",
  });

  const [courses, setCourses] = useState([]);  // New state for storing courses
  const [error, setError] = useState(""); 

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/courses/courseAll");  // Adjust the endpoint if necessary
        if (!response.ok) {
          throw new Error("Error fetching courses");
        }
        const data = await response.json();
        setCourses(data);  // Set the fetched courses
      } catch (error) {
        setError("Failed to load courses");
        console.error(error);
      }
    };
    
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Student Data:", formData);

    try {
      const authToken = localStorage.getItem("access_token");
      if (!authToken) throw new Error("No authentication token found. Please login.");

      const response = await fetch("http://127.0.0.1:8000/student/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized: Invalid or expired token. Please login again.");
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Student added successfully.", result);

      // Reset the form after successful submission
      setFormData({
        admissionYear: "",
        admissionDate: "",
        course: "",
        firstName: "",
        lastName: "",
        gender: "",
        date_of_birth: "",
        email: "",
        mobile: "",
        address: "",
      });
      
      setError(""); // Reset error state

    } catch (error) {
      console.error("Error submitting details.", error);
      setError(error.message);  // Store error message in the error state
    }
  };

  return (
    <div className="form-container">
      <h2>Add Student Details</h2>
      
      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Admission Year:</label>
          <input
            type="number"
            name="admissionYear"
            value={formData.admissionYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Admission Date:</label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Course:</label>
          <select name="course" value={formData.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>{course.name}</option>  
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
