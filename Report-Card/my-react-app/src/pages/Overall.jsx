import reportData from "../data/reportData";
import {
  calculateSGPA,
  calculateCGPA,
  calculateTotalCredits,
} from "../utils/calculations";

function Overall() {
  const semesters = reportData.semesters;

  const semester1 = semesters[1];
  const semester2 = semesters[2];
  const semester3 = semesters[3];

  const sgpa1 = calculateSGPA(semester1.subjects);
  const sgpa2 = calculateSGPA(semester2.subjects);

  const currentSemesters = {
    1: semester1,
    2: semester2,
  };

  const cgpa = calculateCGPA(currentSemesters);

  const credits1 = calculateTotalCredits(semester1.subjects);
  const credits2 = calculateTotalCredits(semester2.subjects);

  const totalCredits = credits1 + credits2;

  return (
    <main className="academic-page">
      <section className="academic-container overall-page">

        {/* PAGE HEADER */}

        <div className="page-heading">
          <p className="page-label">ACADEMIC OVERVIEW</p>

          <h1>Overall Performance</h1>

          <p>
            A consolidated view of academic performance
          </p>
        </div>

        {/* CGPA HERO */}

        <section className="cgpa-card">

          <div className="cgpa-content">
            <p className="cgpa-label">
              CURRENT CGPA
            </p>

            <div className="cgpa-value">
              {cgpa}
            </div>

            <p className="cgpa-description">
              Calculated from completed semesters
            </p>
          </div>

          <div className="cgpa-ring">
            <div>
              <span>{cgpa}</span>
              <small>CGPA</small>
            </div>
          </div>

        </section>

        {/* SEMESTER CARDS */}

        <section className="performance-section">

          <div className="section-heading">
            <div>
              <span>01</span>
              <h2>Semester Performance</h2>
            </div>

            <p>
              SGPA across completed semesters
            </p>
          </div>

          <div className="semester-performance">

            <div className="performance-card">
              <div className="performance-top">
                <span>SEMESTER 01</span>
                <strong>{sgpa1}</strong>
              </div>

              <div className="performance-bar">
                <span
                  style={{
                    width: `${(Number(sgpa1) / 10) * 100}%`,
                  }}
                ></span>
              </div>

              <div className="performance-bottom">
                <span>{credits1} Credits</span>
                <span>Completed</span>
              </div>
            </div>

            <div className="performance-card">
              <div className="performance-top">
                <span>SEMESTER 02</span>
                <strong>{sgpa2}</strong>
              </div>

              <div className="performance-bar">
                <span
                  style={{
                    width: `${(Number(sgpa2) / 10) * 100}%`,
                  }}
                ></span>
              </div>

              <div className="performance-bottom">
                <span>{credits2} Credits</span>
                <span>Completed</span>
              </div>
            </div>

            <div className="performance-card pending-performance">
              <div className="performance-top">
                <span>SEMESTER 03</span>
                <strong>—</strong>
              </div>

              <div className="performance-bar">
                <span></span>
              </div>

              <div className="performance-bottom">
                <span>Results</span>
                <span>Pending</span>
              </div>
            </div>

          </div>

        </section>

        {/* ACADEMIC STATISTICS */}

        <section className="stats-section">

          <div className="section-heading">
            <div>
              <span>02</span>
              <h2>Academic Statistics</h2>
            </div>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <span>Completed Semesters</span>
              <strong>2</strong>
            </div>

            <div className="stat-card">
              <span>Total Credits</span>
              <strong>{totalCredits}</strong>
            </div>

            <div className="stat-card">
              <span>Current CGPA</span>
              <strong>{cgpa}</strong>
            </div>

            <div className="stat-card">
              <span>Next Semester</span>
              <strong>03</strong>
            </div>

          </div>

        </section>

        {/* NOTE */}

        <div className="academic-note">
          <span>NOTE</span>

          <p>
            Semester 3 results are currently pending and are not
            included in the current CGPA calculation.
          </p>
        </div>

      </section>
    </main>
  );
}

export default Overall;