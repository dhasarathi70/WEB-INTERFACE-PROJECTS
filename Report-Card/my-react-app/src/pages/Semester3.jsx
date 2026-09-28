import { Link } from "react-router-dom";

function Semester3() {
  return (
    <main className="academic-page">
      <section className="academic-container semester-pending">

        <div className="page-heading">
          <p className="page-label">ACADEMIC RECORD</p>

          <h1>Semester 3</h1>

          <p>
            Current semester academic record
          </p>
        </div>

        <section className="pending-card">

          <div className="pending-icon">
            <span>03</span>
          </div>

          <div className="pending-content">
            <p className="pending-label">
              ACADEMIC STATUS
            </p>

            <h2>Results Pending</h2>

            <p>
              Semester 3 results have not been added yet.
              This section will be updated once the official
              academic results are available.
            </p>

            <div className="pending-meta">
              <div>
                <span>Semester</span>
                <strong>03</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>In Progress</strong>
              </div>

              <div>
                <span>Result</span>
                <strong>Pending</strong>
              </div>
            </div>

            <Link
              to="/overall"
              className="academic-button"
            >
              View Overall Performance
              <span>→</span>
            </Link>
          </div>

        </section>

      </section>
    </main>
  );
}

export default Semester3;