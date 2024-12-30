import React, { useState } from "react";

const FeeSubmission = () => {
  const [formData, setFormData] = useState({
    studentNo:"",
    courseName: "",
    studentName: "",
    totalDueAmount: "",
    paymentMode: "",
    receiptNo: "",
    amountToSubmit: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Fee submission details:", formData);

    try {
      const token = localStorage.getItem("access_token"); // Assuming token is stored in localStorage

      if (!token) {
        alert("No authentication token found. Please log in again.");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/fees/submit", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData) // Send form data in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fee submission failed:", errorData);
        alert(`Submission failed: ${errorData.message || response.statusText}`);
      } else {
        const result = await response.json();
        console.log("Fee submission successful:", result);
        alert("Fee submitted successfully!");
        // Optionally, you can reset the form or redirect the user after submission
        setFormData({
          studentNo:"",
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
      <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
          <label>Course:</label>
          <input
            type="text"
            name="Student No."
            value={formData.studentNo}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.courseName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Student:</label>
          <input
            type="text"
            name="student"
            value={formData.studentName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Total Due Amount:</label>
          <input
            name="totalDue"
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
        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#4CAF50", color: "white" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeeSubmission;
