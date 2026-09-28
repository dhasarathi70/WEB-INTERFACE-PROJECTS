//<!--Task-7 A student poratl displays an information box containing profile details only,whenn the user clicks the show detail button write a react jsx program that uses a conditional expression to show or hide the information based on the user action-->

import { useState } from "react";
import "./studentportal.css";

function StudentPortal() {
  const [showDetails, setShowDetails] = useState(false);

  return (
  <div className="portal-container">
      <h1>Student Portal</h1>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="btn"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails ? (
        <div className="info-box">
          <h2>Student Profile</h2>
          <p><strong>Name:</strong> Dhasarathi A</p>
          <p><strong>Roll No:</strong> CS24015</p>
          <p><strong>Department:</strong> CSE (Cyber Security)</p>
          <p><strong>Year:</strong> II Year</p>
          <p><strong>Email:</strong> dhasarathi@example.com</p>
        </div>
      ) : null}
    </div>
  );
}

export default StudentPortal;