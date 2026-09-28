import { Link } from "react-router-dom";
import profileImage from "../assets/profile.jpg";

function ProfileCard() {
  return (
    <section className="profile-card">
      <div className="profile-image">
        <img
          src={profileImage}
          alt="Dhasarathi A"
          className="profile-photo"
        />
      </div>

      <div className="profile-content">
        <p className="profile-label">STUDENT PROFILE</p>

        <h1>Dhasarathi A</h1>

        <h2>Cyber Security Student</h2>

        <p className="degree">
          B.E. CSE (Cyber Security)
        </p>

        <p className="college">
          Prince Dr. K. Vasudevan College of Engineering & Technology
        </p>

        <div className="divider"></div>

        <h3>About Me</h3>

        <p className="about-text">
          I'm a B.E. CSE (Cyber Security) student interested in
          programming, web development and modern technologies. I enjoy
          learning through academic projects, practicing programming
          concepts and building practical applications.
        </p>

        <div className="skills">
          <span>Python</span>
          <span>Java</span>
          <span>Web Development</span>
          <span>UI/UX</span>
        </div>

        <Link to="/semester-1" className="academic-button">
          View Academic Record
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}

export default ProfileCard;