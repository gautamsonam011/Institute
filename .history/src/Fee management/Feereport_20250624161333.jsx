import React, { useState, useEffect } from 'react';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        if (!token) {
          alert('Authentication token not found.');
          return;
        }

        const [courseRes, feeRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/courses/courseAll', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://127.0.0.1:8000/fees/feeSubmissionAll', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (!courseRes.ok || !feeRes.ok) {
          throw new Error('Failed to load data');
        }

        const courseData = await courseRes.json();
        const feeData = await feeRes.json();

        setCourses(courseData);
        setStudents(feeData);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesName = student.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse ? student.courseName === selectedCourse : true;
    return matchesName && matchesCourse;
  });

  return (
    <div>
      <h2>Show Fee Report</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className="filter-container" style={{ marginBottom: '15px' }}>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.courseName}>
              {course.courseName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Amount Submitted</th>
              <th>Status</th>
              <th>Payment Mode</th>
              <th>Receipt No</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.studentName}</td>
                <td>{student.courseName}</td>
                <td>{student.amountToSubmit}</td>
                <td>{student.status}</td>
                <td>{student.paymentMode}</td>
                <td>{student.receiptNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentTable;
