import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" aria-label="Registration system home">
          <span className="brand-mark">RF</span>
          <span>Registration Framework</span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;