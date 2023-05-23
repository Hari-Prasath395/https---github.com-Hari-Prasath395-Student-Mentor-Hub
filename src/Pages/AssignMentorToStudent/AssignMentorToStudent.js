import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignMentorToStudent = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    fetchMentors();
    fetchStudents();
  }, []);

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

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/student/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching students.");
    }
  };

  const handleMentorChange = (e) => {
    setSelectedMentor(e.target.value);
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/student/students/${selectedStudent}/mentor`,
        {
          mentorId: selectedMentor,
        }
      );
      console.log(response.data);
      setSelectedMentor("");
      setSelectedStudent("");
      toast.success("Mentor assigned to student successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while assigning mentor to student.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5 pt-5">
      <div className="card p-3" style={{ maxWidth: "600px" }}>
        <h4>Assign Mentor to Student</h4>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="mentor">Select Mentor:</label>
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
          <div className="form-group">
            <label htmlFor="student">Select Student:</label>
            <select
              id="student"
              className="form-control"
              value={selectedStudent}
              onChange={handleStudentChange}
            >
              <option value="">-- Select Student --</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Assign Mentor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignMentorToStudent;
