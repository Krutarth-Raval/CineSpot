import { NavLink, useNavigate } from "react-router-dom";
import "../../Styles/Navbar.css";
import "../../Styles/variables.css";
import { useContext } from "react";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

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
      color: isActive ? "var(--primary-color)" : "var(--text-color)",
      borderBottom: isActive ? "4px solid var(--text-color)" : "none",
      fontWeight: isActive ? "bold" : "normal",
      transition: "all 0.3s ease",
    };
  };

  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setLoggedIn } =
    useContext(AppContent);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <p className="logo-text">
          <NavLink to="/">CINESPOT</NavLink>
        </p>
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
        {userData ? (
          <div className="user-logo">
            {userData.name[0].toUpperCase("/login")}
            <div className="logout-btn">
              <ul>
                {!userData.isAccountVerified && <li onClick={sendVerificationOtp}>VERIFY EMAIL</li>}

                <li onClick={logout}>LOG OUT</li>
              </ul>
            </div>
          </div>
        ) : (
          <NavLink to="/login" style={activeLoginStyle} className="link">
            LOGIN
          </NavLink>
        )}
      </div>
    </div>
  );
};
export default Navbar;
