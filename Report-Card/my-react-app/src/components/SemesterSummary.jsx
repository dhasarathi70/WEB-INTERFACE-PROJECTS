function SemesterSummary({ semester, sgpa }) {
  const totalCredits = semester.subjects.reduce(
    (total, subject) => total + subject.credits,
    0
  );

  return (
    <div className="semester-summary">
      <div className="summary-card">
        <span>Semester</span>
        <strong>{semester.name}</strong>
      </div>

      <div className="summary-card">
        <span>Total Subjects</span>
        <strong>{semester.subjects.length}</strong>
      </div>

      <div className="summary-card">
        <span>Total Credits</span>
        <strong>{totalCredits}</strong>
      </div>

      <div className="summary-card highlight">
        <span>SGPA</span>
        <strong>{sgpa}</strong>
      </div>
    </div>
  );
}

export default SemesterSummary;