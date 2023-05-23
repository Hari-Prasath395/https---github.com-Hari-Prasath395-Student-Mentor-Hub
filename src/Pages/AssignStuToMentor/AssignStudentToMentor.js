import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignStudentToMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchMentors();
    fetchStudents();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/mentor/mentors');
      setMentors(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while fetching mentors.');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/student/students');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while fetching students.');
    }
  };

  const handleMentorChange = (e) => {
    setSelectedMentor(e.target.value);
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8000/api/mentor/mentors/${selectedMentor}/students`, {
        studentIds: selectedStudents,
      });
      console.log(response.data); // Assuming the API returns the updated data
      setSelectedMentor('');
      setSelectedStudents([]);
      setErrorMessage('');
      alert('Students assigned to mentor successfully!');
    } catch (error) {
      console.error(error);
      setErrorMessage('The student has already assigned to a mentor.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
        <div className='card p-3' >
      <h4>Assign Students to Mentor</h4>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="mentor"><h6>Select Mentor:</h6></label>
          <select
            id="mentor"
            className="form-control"
            value={selectedMentor}
            onChange={handleMentorChange}
          >
            <option value="">-- Select Mentor --</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <p><h6>Select Students:</h6></p>
          {students.map((student) => (
            <div key={student._id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                value={student._id}
                onChange={handleStudentChange}
                checked={selectedStudents.includes(student._id)}
              />
              <label className="form-check-label">{student.name}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Assign Students
        </button>
      </form>
    </div>
    </div>
  );
};

export default AssignStudentToMentor;
