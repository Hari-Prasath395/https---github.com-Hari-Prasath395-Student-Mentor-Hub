import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdDeleteSweep } from "react-icons/md";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/student/createstudent",
        { name, email }
      );
      console.log(response.data);

      setName("");
      setEmail("");
      toast.success("Student created successfully!");
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the student.");
    }
  };
  const handleDelete = async (studentId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/student/students/${studentId}`
      );
      toast.success("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the student.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 pt-5">
          <h4>Add Student</h4>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              <FaUserPlus className="me-2" />
              Add Student
            </button>
          </form>
        </div>
        <div className="col-md-6 pt-5">
          <h4>Student List</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    {" "}
                    <MdDeleteSweep
                      onClick={() => handleDelete(student._id)}
                      style={{ color: "red", cursor: "pointer" }}
                      size={"20px"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
