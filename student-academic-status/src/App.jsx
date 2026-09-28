import "./App.css";

import Header from "./Header.jsx";
import StudentCard from "./StudentCard.jsx";
import SubjectList from "./SubjectList.jsx";
import DisplayStatus from "./DisplayStatus.jsx";
import Footer from "./Footer.jsx";

import Profile from "./assets/pp1.jpg";

function App() {

  const student = {
    name: "Dhasarathi A",
    regNo: "22CS1234",
    dept: "B.E CSE (Cyber Security)",
    year: "II Year",
    semester: "III Semester",
    cgpa: 8.5,
    attendance: 87,
    Profile: Profile
  };

  const subjects = [
    "Data Structures",
    "Java Programming",
    "Data Science",
    "Web Interface",
    "Database Management System",
    "Cyber Security"
  ];

  return (
    <div className="app">

      <Header
        college="Prince Dr. K. Vasudevan College of Engineering & Technology"
      />

      <main className="container">

        <StudentCard
          student={student}
        />

        <SubjectList
          subjects={subjects}
        />

        <DisplayStatus
          student={student}
          totalSubjects={subjects.length}
        />

      </main>

      <Footer />

    </div>
  );
}

export default App;