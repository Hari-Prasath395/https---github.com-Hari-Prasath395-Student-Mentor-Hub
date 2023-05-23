import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreviousMentorForStudent = () => {
  const [student, setStudent] = useState("");
  const [previousMentor, setPreviousMentor] = useState("");
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    fetchPreviousMentor();
  }, [student]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/student/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch students");
    }
  };

  const fetchPreviousMentor = async () => {
    try {
      if (student) {
        const response = await axios.get(
          `http://localhost:8000/api/student/students/${student}/mentor`
        );
        setPreviousMentor(response.data);
      } else {
        setPreviousMentor("");
      }
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occurred while fetching the previous mentor for the student."
      );
    }
  };

  const handleStudentChange = (e) => {
    setStudent(e.target.value);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5 pt-5">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Show Previous Mentor for a Student</h4>
          {errorMessage && <p>{errorMessage}</p>}
          <div className="form-group">
            <label htmlFor="student">
              <h6>Select Student:</h6>
            </label>
            <select
              id="student"
              value={student}
              onChange={handleStudentChange}
              className="form-control"
            >
              <option value="">-- Select Student --</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          {previousMentor && (
            <p>
              <h6 className="mt-3">Previous Mentor: {previousMentor.name}</h6>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousMentorForStudent;
