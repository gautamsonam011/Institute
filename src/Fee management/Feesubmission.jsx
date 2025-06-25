import React, { useState, useEffect } from "react";

const FeeSubmission = () => {
  const [formData, setFormData] = useState({
    studentNo: "",
    courseName: "",
    studentName: "",
    totalDueAmount: "",
    paymentMode: "",
    receiptNo: "",
    amountToSubmit: ""
  });

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch("http://127.0.0.1:8000/courses/courseAll", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Fee submission details:", formData);

    try {
      const token = getAuthToken();

      if (!token) {
        alert("No authentication token found. Please log in again.");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/fees/feeSubmission", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fee submission failed:", errorData);
        alert(`Submission failed: ${errorData.message || response.statusText}`);
      } else {
        const result = await response.json();
        console.log("Fee submission successful:", result);
        alert("Fee submitted successfully!");

        setFormData({
          studentNo: "",
          courseName: "",
          studentName: "",
          totalDueAmount: "",
          paymentMode: "",
          receiptNo: "",
          amountToSubmit: ""
        });
      }
    } catch (error) {
      console.error("Error submitting fee:", error);
      alert(`An error occurred while submitting the fee: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Fee Submission</h2>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>Error: {error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Student No:</label>
          <input
            type="text"
            name="studentNo"
            value={formData.studentNo}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Course:</label>
          <select
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Student:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Total Due Amount:</label>
          <input
            name="totalDueAmount"
            value={formData.totalDueAmount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Payment Mode:</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Select Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Receipt No:</label>
          <input
            type="text"
            name="receiptNo"
            value={formData.receiptNo}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Amount to Submit:</label>
          <input
            type="number"
            name="amountToSubmit"
            value={formData.amountToSubmit}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 15px", backgroundColor: "#4CAF50", color: "white" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeeSubmission;
