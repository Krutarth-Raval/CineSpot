import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../Styles/Sidebar.css";
import "../../Styles/variables.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const activeStyle = ({ isActive }) => {
    return {
      color: isActive ? "var(--bg-color)" : "var(--text-color)",
      border: isActive
        ? "2px solid var(--text-color)"
        : "2px solid var(--bg-color)",
      background: isActive ? "var(--primary-color)" : "transparent",
      fontWeight: isActive ? "bold" : "normal",
      transition: "all 0.5s ease",
    };
  };
  const activeLoginStyle = ({ isActive }) => {
    return {
      color: isActive ? "var(--text-color)" : "var(--text-color)",
      borderBottom: isActive ? "4px solid var(--primary-color)" : "none",
      fontWeight: isActive ? "bold" : "normal",
      transition: "all 0.5s ease",
    };
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <GiHamburgerMenu
          className="hamburger-icon"
          onClick={toggleSidebar}
          style={{ display: isOpen ? "none" : "block" }}
        />
        <ImCross
          className="cross-icon"
          onClick={toggleSidebar}
          style={{ display: isOpen ? "block" : "none" }}
        />
      </div>

      <div className="sidebar-logo">
        <p className="logo-text">CINESPOT</p>
      </div>

      <div
        className="sidebar-links"
        style={{
          left: isOpen ? "-30px" : "-120%",
          transition: "left 01s ease-out",
        }}
      >
        <NavLink
          to="/"
          style={activeStyle}
          className="link"
          onClick={toggleSidebar}
        >
          HOME
        </NavLink>
        <NavLink
          to="/movie"
          style={activeStyle}
          className="link"
          onClick={toggleSidebar}
        >
          MOVIE
        </NavLink>
        <NavLink
          to="/tvshow"
          style={activeStyle}
          className="link"
          onClick={toggleSidebar}
        >
          TV SHOW
        </NavLink>
        <NavLink
          to="/news"
          style={activeStyle}
          className="link"
          onClick={toggleSidebar}
        >
          NEWS
        </NavLink>
        <NavLink
          to="/collection"
          style={activeStyle}
          className="link"
          onClick={toggleSidebar}
        >
          COLLECTION
        </NavLink>
        <NavLink
          to="/about"
          style={activeStyle}
          className="link"
          onClick={toggleSidebar}
        >
          ABOUT
        </NavLink>
      </div>

      <div className="sidebar-login">
        <NavLink to="/login" style={activeLoginStyle} className="link">
          LOGIN
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
