import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteSweep } from "react-icons/md";

const MentorForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/mentor/mentors"
      );
      setMentors(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch mentors");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/mentor/creatementor",
        { name, email }
      );
      console.log(response.data);

      setName("");
      setEmail("");
      toast.success("Mentor created successfully!");
      fetchMentors();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the mentor.");
    }
  };

  const handleDelete = async (mentorId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/mentor/mentors/${mentorId}`
      );
      toast.success("Student deleted successfully!");
      fetchMentors();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the student.");
    }
  };

  return (
    <div className="mt-5 pt-5 px-5 ">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Add Mentor</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group ">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success mt-3">
                <FaUserPlus />
                Add Mentor
              </button>
            </form>
          </div>
          <div className="col-md-6 mt-n5">
            <h4>Mentor List</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map((mentor) => (
                  <tr key={mentor._id}>
                    <td>{mentor.name}</td>
                    <td>{mentor.email}</td>
                    <td>
                      {" "}
                      <MdDeleteSweep
                        onClick={() => handleDelete(mentor._id)}
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
    </div>
  );
};

export default MentorForm;
