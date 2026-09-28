import reportData from "../data/reportData";
import SubjectTable from "../components/SubjectTable";
import SemesterSummary from "../components/SemesterSummary";
import { calculateSGPA } from "../utils/calculations";

function Semester2() {
  const semester = reportData.semesters[2];
  const sgpa = calculateSGPA(semester.subjects);

  return (
    <main className="academic-page">
      <section className="academic-container">

        <div className="page-heading">
          <p className="page-label">ACADEMIC RECORD</p>

          <h1>Semester 2</h1>

          <p>
            Academic performance and subject-wise results
          </p>
        </div>

        <SemesterSummary
          semester={semester}
          sgpa={sgpa}
        />

        <section className="subjects-section">

          <div className="section-heading">
            <div>
              <span>02</span>
              <h2>Subject Results</h2>
            </div>

            <p>
              Semester 2 academic performance
            </p>
          </div>

          <SubjectTable subjects={semester.subjects} />

        </section>

      </section>
    </main>
  );
}

export default Semester2;