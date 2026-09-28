function SubjectTable({ subjects }) {
  return (
    <div className="table-wrapper">
      <table className="subject-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Subject</th>
            <th>Credits</th>
            <th>Grade</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.code}>
              <td>{subject.code}</td>
              <td className="subject-name">{subject.name}</td>
              <td>{subject.credits}</td>
              <td>
                <span className={`grade grade-${subject.grade.replace("+", "plus")}`}>
                  {subject.grade}
                </span>
              </td>
              <td className="result-pass">{subject.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectTable;