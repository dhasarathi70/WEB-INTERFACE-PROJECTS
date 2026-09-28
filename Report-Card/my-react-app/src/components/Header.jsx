import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* BRAND */}
        <NavLink to="/" className="brand">
          <span className="brand-mark">DA</span>

          <div className="brand-text">
            <strong>Dhasarathi A</strong>
            <span>Academic Profile</span>
          </div>
        </NavLink>

        {/* NAVIGATION */}
        <nav className="main-nav">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/semester-1"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Semester 1
          </NavLink>

          <NavLink
            to="/semester-2"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Semester 2
          </NavLink>

          <NavLink
            to="/semester-3"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Semester 3
          </NavLink>

          <NavLink
            to="/overall"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Overall
          </NavLink>

          {/* THEME TOGGLE */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            <span className="theme-icon">
              {darkMode ? "☀" : "☾"}
            </span>

            <span className="theme-label">
              {darkMode ? "Light" : "Dark"}
            </span>
          </button>

        </nav>
      </div>
    </header>
  );
}

export default Header;