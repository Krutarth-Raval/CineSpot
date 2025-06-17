import { NavLink } from "react-router-dom";
import "../../Styles/Navbar.css";
import "../../Styles/variables.css";
const Navbar = () => {
  const activeStyle = ({ isActive }) => {
    return {
      color: isActive ? "var(--primary-color)" : "var(--text-color)",
      borderBottom: isActive ? "4px solid var(--text-color)" : "none",
      fontWeight: isActive ? "bold" : "normal",
      transition: "all 0.3s ease",
    };
  };
  const activeLoginStyle = ({ isActive }) => {
    return {
      color: isActive ? "black" : "var(--text-color)",
      borderBottom: isActive ? "4px solid var(--primary-color)" : "none",
      fontWeight: isActive ? "bold" : "normal",
      transition: "all 0.3s ease",
    };
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <p className="logo-text">CINESPOT</p>
      </div>
      <div className="navbar-links">
        <NavLink to="/" style={activeStyle} className="link">
          HOME
        </NavLink>
        <NavLink to="/movie" style={activeStyle} className="link">
          MOVIE
        </NavLink>
        <NavLink to="/tvshow" style={activeStyle} className="link">
          TV SHOW
        </NavLink>
        <NavLink to="/news" style={activeStyle} className="link">
          NEWS
        </NavLink>
        <NavLink to="/collection" style={activeStyle} className="link">
          COLLECTION
        </NavLink>
        <NavLink to="/about" style={activeStyle} className="link">
          ABOUT
        </NavLink>
      </div>
      <div className="navbar-login">
        <NavLink to="/login" style={activeLoginStyle} className="link">
          LOGIN
        </NavLink>
      </div>
    </div>
  );
};
export default Navbar;
