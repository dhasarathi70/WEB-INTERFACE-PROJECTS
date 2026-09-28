function DisplayStatus({ student, totalSubjects }) {

  const attendanceStatus =
    student.attendance >= 80
      ? "Eligible for Semester"
      : "Not Eligible";

  const placement =
    student.cgpa >= 8 && student.attendance >= 80
      ? "Eligible"
      : "Need Improvement";

  return (
    <div className="display-status">

      <h2>Academic Status</h2>

      <div className="status-grid">

        <div className="stat-box">
          <span>Semester</span>
          <strong>{student.semester}</strong>
        </div>

        <div className="stat-box">
          <span>Year</span>
          <strong>{student.year}</strong>
        </div>

        <div className="stat-box">
          <span>Total Subjects</span>
          <strong>{totalSubjects}</strong>
        </div>

        <div className="stat-box">
          <span>Attendance</span>
          <strong>{student.attendance}%</strong>
        </div>

      </div>

      <div className="status-result">
        <p>
          <strong>Attendance Status</strong>
          <span className={student.attendance >= 80 ? "eligible" : "not-eligible"}>
            {attendanceStatus}
          </span>
        </p>

        <p>
          <strong>Placement Status</strong>
          <span className={placement === "Eligible" ? "eligible" : "improvement"}>
            {placement}
          </span>
        </p>
      </div>

    </div>
  );
}

export default DisplayStatus;