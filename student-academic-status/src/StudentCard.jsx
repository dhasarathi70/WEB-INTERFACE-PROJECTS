function StudentCard({ student }) {
  return (
    <div className="student-card">

      <div className="avatar-wrapper">
        <img
          src={student.Profile}
          alt={student.name}
        />
      </div>

      <h2>{student.name}</h2>

      <p>
        <strong>Reg No:</strong>
        <span>{student.regNo}</span>
      </p>

      <p>
        <strong>Dept:</strong>
        <span>{student.dept}</span>
      </p>

      <p>
        <strong>Year:</strong>
        <span>{student.year}</span>
      </p>

      <p>
        <strong>Semester:</strong>
        <span>{student.semester}</span>
      </p>

      <p>
        <strong>CGPA:</strong>
        <span>{student.cgpa}</span>
      </p>

      <p>
        <strong>Attendance:</strong>
        <span>{student.attendance}%</span>
      </p>

    </div>
  );
}

export default StudentCard;