import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import MentorForm from './Pages/mentors/Mentor';
import Student from './Pages/students/Student';
import NavBar from './components/Navbar';
import AssignStudentToMentor from './Pages/AssignStuToMentor/AssignStudentToMentor';
import AssignMentorToStudent from './Pages/AssignMentorToStudent/AssignMentorToStudent';
import StudentsForMentor from './Pages/StudentsForMentor/StudentsForMentor';
import PreviousMentorForStudent from './Pages/PreviousMentorForStudent/PreviousMentorForStudent';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentor" element={<MentorForm />} />
        <Route path="/student" element={<Student />} />
        <Route path="/assign-student-to-mentor" element={<AssignStudentToMentor />} />
        <Route path="/assignMentorToStudent" element={<AssignMentorToStudent />} />
        <Route path="/students-for-mentor" element={<StudentsForMentor />} />
        <Route path="/previous-mentor-for-student" element={<PreviousMentorForStudent/>} />
      </Routes>
    </div>
  );
}

export default App;
