import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "../../Styles/Sidebar.module.css";
import "../../Styles/variables.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { AppContent } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

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
      transition: "all 0.3s ease",
    };
  };
  const activeLoginStyle = ({ isActive }) => ({
    color: isActive ? "var(--bg-color)" : "var(--text-color)",
    border: isActive
      ? "2px solid var(--text-color)"
      : "2px solid var(--bg-color)",
    background: isActive ? "var(--primary-color)" : "transparent",
    fontWeight: isActive ? "bold" : "normal",
    transition: "all 0.3s ease",
  });

  const { userData, backendUrl, setUserData, setLoggedIn } =
    useContext(AppContent);

  const navigate = useNavigate();

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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_menu}>
        <GiHamburgerMenu
          className={style.hamburger_icon}
          onClick={toggleSidebar}
          style={{
            display: isOpen ? "none" : "block",
          }}
        />
        <ImCross
          className={style.cross_icon}
          onClick={toggleSidebar}
          style={{ display: isOpen ? "block" : "none" }}
        />
      </div>

      <div className={style.sidebar_logo}>
        <p className={style.logo_text}>
          <NavLink to="/">CINESPOT</NavLink>
        </p>
      </div>

      <div
        className={style.sidebar_links}
        style={{
          left: isOpen ? "-30px" : "-120%",
          transition: "left .5s ease-out",
        }}
      >
        <div className={style.sidebar_login}>
          {userData ? (
            <div className={style.user_wrapper}>
              <p className={style.user_logo}>
                {userData.name[0].toUpperCase()}
              </p>
              <div className={style.logout_btn}>
                <ul>
                  {!userData.isAccountVerified && (
                    <li
                      onClick={() => {
                        sendVerificationOtp();
                        toggleSidebar();
                      }}
                    >
                      VERIFY EMAIL
                    </li>
                  )}

                  <li onClick={logout}>LOG OUT</li>
                </ul>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              style={activeLoginStyle}
              className={style.login_link}
              onClick={toggleSidebar}
            >
              LOGIN
            </NavLink>
          )}
        </div>
        <NavLink
          to="/"
          style={activeStyle}
          className={style.link}
          onClick={toggleSidebar}
        >
          HOME
        </NavLink>
        <NavLink
          to="/movie"
          style={activeStyle}
          className={style.link}
          onClick={toggleSidebar}
        >
          MOVIE
        </NavLink>
        <NavLink
          to="/tvshow"
          style={activeStyle}
          className={style.link}
          onClick={toggleSidebar}
        >
          TV SHOW
        </NavLink>
        <NavLink
          to="/news"
          style={activeStyle}
          className={style.link}
          onClick={toggleSidebar}
        >
          NEWS
        </NavLink>
        <NavLink
          to="/collection"
          style={activeStyle}
          className={style.link}
          onClick={toggleSidebar}
        >
          COLLECTION
        </NavLink>
        <NavLink
          to="/about"
          style={activeStyle}
          className={style.link}
          onClick={toggleSidebar}
        >
          ABOUT
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
