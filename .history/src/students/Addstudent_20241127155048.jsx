import React, { useState, useEffect } from "react";
import './addstudent.css';

const AddStudent = ({ studentToEdit }) => {
  const [formData, setFormData] = useState({
    admissionYear: "",
    admissionDate: "",
    courseName: "",
    firstName: "",
    lastName: "",
    gender: "",
    date_of_birth: "",
    category: "",
    email: "",
    mobile: "",
    address: "",
  });

  const [courseName, setCourseName] = useState([]);  // New state for storing courses
  const [error, setError] = useState(""); 
  const [editMode, setEditMode] = useState(false);  // Track if we are in edit mode

  // Fetch courses from the API when the component mounts
  useEffect(() => {
    fetchCourses();

    if (studentToEdit) {
      // If we have a student to edit, set the form data with the existing student details
      setEditMode(true);
      setFormData({
        admissionYear: studentToEdit.admissionYear,
        admissionDate: studentToEdit.admissionDate,
        courseName: studentToEdit.courseName,
        firstName: studentToEdit.firstName,
        lastName: studentToEdit.lastName,
        gender: studentToEdit.gender,
        date_of_birth: studentToEdit.date_of_birth,
        category: studentToEdit.category,
        email: studentToEdit.email,
        mobile: studentToEdit.mobile,
        address: studentToEdit.address,
      });
    }
  }, [studentToEdit]);

  const fetchCourses = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
      if (!authToken) {
        setError("No authentication token found. Please login.");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/courses/courseAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,  // Include token in the request headers
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid or expired token. Please login again.");
        }
        throw new Error("Error fetching courses");
      }

      const data = await response.json();
      setCourseName(data);  // Set the fetched courses

    } catch (error) {
      setError(error.message);  // Store error message in the error state
      console.error(error);
    }
  };

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

      let response;
      const url = editMode 
        ? `http://127.0.0.1:8000/courses/courses/${studentToEdit.id}`  // For editing, use PUT with the student ID
        : "http://127.0.0.1:8000/student/student"; // For adding, use POST

      response = await fetch(url, {
        method: editMode ? "PUT" : "POST",  // Conditional method (PUT for edit, POST for add)
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
      console.log("Student " + (editMode ? "updated" : "added") + " successfully.", result);

      // Reset the form after successful submission
      setFormData({
        admissionYear: "",
        admissionDate: "",
        courseName: "",
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
      <h2>{editMode ? "Edit Student Details" : "Add Student Details"}</h2>
      
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
          <select name="courseName" value={formData.courseName} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courseName.map((course) => (
              <option key={course.id} value={course.courseName}>{course.courseName}</option>  
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

        <button type="submit">{editMode ? "Update Student" : "Add Student"}</button>
      </form>
    </div>
  );
};

export default AddStudent;
