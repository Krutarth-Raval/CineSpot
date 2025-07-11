import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

import style from "../Styles/Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl, setLoggedIn, getUserData } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let url = state === "Sign Up" ? "/register" : "/login";
      const payload =
        state === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(
        `${backendUrl}/api/auth${url}`,
        payload,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!"
      );
    }
  };

  return (
    <div className={style.login_container}>
      <div className={style.login_box}>
        <h2 className={style.signup_title}>
          {state === "Sign Up" ? "Join Cinespot" : "Welcome Back"}
        </h2>
        <p className={style.signup_tagline}>
          {state === "Sign Up" ? "Create your account" : "Log in to continue"}
        </p>
        <form onSubmit={onSubmitHandler} className={style.signup_form}>
          {state === "Sign Up" && (
            <div className={style.input_group}>
              <img src={assets.person_icon} alt="User" />
              <input
                type="text"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={style.input_group}>
            <img src={assets.mail_icon} alt="Email" />
            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={style.input_group}>
            <img src={assets.lock_icon} alt="Password" />
            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <NavLink to="/reset-password" className={style.reset_password_link}>
            Forget Password?
          </NavLink>
          <div className={style.signup_btn_box}>
            <button className={style.signup_btn}>{state}</button>
          </div>
        </form>

        {state === "Sign Up" ? (
          <p className={style.have_an_account}>
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className={style.no_account}>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")}>SignUp</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
