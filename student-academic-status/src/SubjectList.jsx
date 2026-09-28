function SubjectList({ subjects }) {
  return (
    <div className="subject-list">

      <h2>Subjects</h2>

      <ul>
        {subjects.map((subject, index) => (
          <li key={index}>
            {subject}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default SubjectList;