import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentsForMentor = () => {
  const [mentor, setMentor] = useState("");
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    fetchStudentsForMentor();
  }, [mentor]);

  const fetchMentors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/mentor/mentors"
      );
      setMentors(response.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching mentors.");
    }
  };

  const fetchStudentsForMentor = async () => {
    try {
      if (mentor) {
        const response = await axios.get(
          `http://localhost:8000/api/mentor/mentors/${mentor}/students`
        );
        setStudents(response.data);
      } else {
        setStudents([]);
      }
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching students for the mentor.");
    }
  };

  const handleMentorChange = (e) => {
    setMentor(e.target.value);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="card p-3" style={{ maxWidth: "400px" }}>
        <h5 className="card-title">Show Students for a Mentor</h5>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="mentor">
            <h6>Select Mentor:</h6>
          </label>
          <select
            id="mentor"
            className="form-control"
            value={mentor}
            onChange={handleMentorChange}
          >
            <option value="">-- Select Mentor --</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>
          <hr />
        </div>
        <h6>Students List</h6>
        <ul className="list-group mt-1">
          {students.map((student) => (
            <li key={student._id} className="list-group-item">
              {student.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentsForMentor;
