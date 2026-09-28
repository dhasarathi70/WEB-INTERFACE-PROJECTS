import { useState } from "react";
import "./Attandance.css";

function Attendance() {
  const initialStudents = [
    { id: 1, name: "Arun", status: "Absent" },
    { id: 2, name: "Balaganesan", status: "Absent" },
    { id: 3, name: "Praveen Kumar", status: "Absent" },
    { id: 4, name: "Dhasarathi", status: "Absent" },
    { id: 5, name: "Mathesh Rahul", status: "Absent" },
    { id: 6, name: "Manikandan", status: "Absent" },
    { id: 7, name: "Gokul", status: "Absent" },
    { id: 8, name: "Maara", status: "Absent" },
    { id: 9, name: "Suriya", status: "Absent" },
    { id: 10, name: "Jeeva", status: "Absent" },
    { id: 11, name: "Karthik", status: "Absent" },
    { id: 12, name: "Loki", status: "Absent" },
    { id: 13, name: "Leo Parthiban", status: "Absent" },
    { id: 14, name: "Adhi", status: "Absent" },
    { id: 15, name: "Parri", status: "Absent" },
    { id: 16, name: "Rolex", status: "Absent" },
    { id: 17, name: "Atherya", status: "Absent" },
    { id: 18, name: "Thamil", status: "Absent" },
    { id: 19, name: "Vignesh", status: "Absent" },
    { id: 20, name: "Nani", status: "Absent" }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Update one student's attendance
  const updateAttendance = (id, newStatus) => {
    const updatedStudents = students.map((student) =>
      student.id === id
        ? { ...student, status: newStatus }
        : student
    );

    setStudents(updatedStudents);
  };

  // Mark all students as Present
  const markAllPresent = () => {
    const updatedStudents = students.map((student) => ({
      ...student,
      status: "Present"
    }));

    setStudents(updatedStudents);
    setMessage("All students marked as Present!");
  };

  // Reset all attendance
  const resetAttendance = () => {
    const updatedStudents = students.map((student) => ({
      ...student,
      status: "Not Marked"
    }));

    setStudents(updatedStudents);
    setMessage("Attendance has been reset.");
  };

  // Save attendance
  const saveAttendance = () => {
    const notMarked = students.filter(
      (student) => student.status === "Not Marked"
    ).length;

    if (notMarked > 0) {
      setMessage(
        `Please complete attendance. ${notMarked} student(s) are still not marked.`
      );
      return;
    }

    setMessage("Attendance saved successfully!");
  };

  // Count Present
  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  // Count Absent
  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  // Count Not Marked
  const notMarkedCount = students.filter(
    (student) => student.status === "Not Marked"
  ).length;

  // Search students
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  // Get initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Get today's date
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="attendance-page">

      <main className="attendance-dashboard">

        {/* HEADER */}
        <section className="dashboard-header">

          <div className="header-left">
            <div className="header-icon">✓</div>

            <div>
              <h1>Attendance Management</h1>
              <p>Teacher Classroom Dashboard</p>
            </div>
          </div>

          <div className="class-details">
            <span>📅 {today}</span>
            <span>💻 Java Programming</span>
          </div>

        </section>


        {/* CLASS INFORMATION */}
        <section className="class-banner">

          <div>
            <span className="label">CLASS</span>
            <h2>CSE - Cyber Security</h2>
          </div>

          <div>
            <span className="label">SESSION</span>
            <h2>Period 1 • Morning</h2>
          </div>

          <div>
            <span className="label">TOTAL STUDENTS</span>
            <h2>{students.length} Students</h2>
          </div>

        </section>


        {/* ATTENDANCE SUMMARY */}
        <section className="attendance-summary">

          <div className="summary-card total-card">
            <div className="summary-icon">👥</div>

            <div>
              <p>Total Students</p>
              <h2>{students.length}</h2>
            </div>
          </div>

          <div className="summary-card present-card">
            <div className="summary-icon">✓</div>

            <div>
              <p>Present</p>
              <h2>{presentCount}</h2>
            </div>
          </div>

          <div className="summary-card absent-card">
            <div className="summary-icon">✕</div>

            <div>
              <p>Absent</p>
              <h2>{absentCount}</h2>
            </div>
          </div>

          <div className="summary-card pending-card">
            <div className="summary-icon">!</div>

            <div>
              <p>Not Marked</p>
              <h2>{notMarkedCount}</h2>
            </div>
          </div>

        </section>


        {/* SEARCH AND ACTIONS */}
        <section className="controls-section">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="action-buttons">

            <button
              className="mark-all-btn"
              onClick={markAllPresent}
            >
              ✓ Mark All Present
            </button>

            <button
              className="reset-btn"
              onClick={resetAttendance}
            >
              ↻ Reset
            </button>

          </div>

        </section>


        {/* MESSAGE */}
        {message && (
          <div
            className={
              message.includes("successfully")
                ? "message success-message"
                : "message warning-message"
            }
          >
            {message}
          </div>
        )}


        {/* STUDENT LIST */}
        <section className="student-section">

          <div className="section-heading">
            <div>
              <h2>Student Attendance</h2>
              <p>
                Mark each student's attendance for today's session.
              </p>
            </div>

            <span>
              Showing {filteredStudents.length} of {students.length}
            </span>
          </div>


          <div className="student-grid">

            {filteredStudents.map((student) => (

              <div
                className={`student-card ${
                  student.status === "Present"
                    ? "student-present"
                    : student.status === "Absent"
                    ? "student-absent"
                    : "student-pending"
                }`}
                key={student.id}
              >

                {/* Student Details */}
                <div className="student-details">

                  <div className="student-avatar">
                    {getInitials(student.name)}
                  </div>

                  <div className="student-data">
                    <h3>{student.name}</h3>
                    <p>{student.rollNo}</p>
                  </div>

                </div>


                {/* TERNARY OPERATOR FOR STATUS */}

                <div
                  className={`status-badge ${
                    student.status === "Present"
                      ? "status-present"
                      : student.status === "Absent"
                      ? "status-absent"
                      : "status-pending"
                  }`}
                >

                  {student.status === "Present"
                    ? "✓ Present"
                    : student.status === "Absent"
                    ? "✕ Absent"
                    : "! Not Marked"}

                </div>


                {/* ATTENDANCE BUTTONS */}
                <div className="student-buttons">

                  <button
                    className={
                      student.status === "Present"
                        ? "present-button active-present"
                        : "present-button"
                    }
                    onClick={() =>
                      updateAttendance(student.id, "Present")
                    }
                  >
                    ✓ Present
                  </button>

                  <button
                    className={
                      student.status === "Absent"
                        ? "absent-button active-absent"
                        : "absent-button"
                    }
                    onClick={() =>
                      updateAttendance(student.id, "Absent")
                    }
                  >
                    ✕ Absent
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* FOOTER */}
        <section className="save-section">

          <div className="attendance-progress">

            <div className="progress-info">
              <span>Attendance Completion</span>

              <strong>
                {students.length - notMarkedCount} / {students.length}
                {" "}Marked
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    ((students.length - notMarkedCount) /
                      students.length) *
                    100
                  }%`
                }}
              ></div>
            </div>

          </div>

          <button
            className="save-btn"
            onClick={saveAttendance}
          >
            💾 Save Attendance
          </button>

        </section>

      </main>

    </div>
  );
}

export default Attendance;