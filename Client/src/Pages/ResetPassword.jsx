import React, { useContext, useRef, useState } from "react";
import style from "../Styles/ResetPassword.module.css";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    paste.split("").forEach((char, i) => {
      if (i < 6 && /^[0-9]$/.test(char)) {
        newOtp[i] = char;
        inputRefs.current[i].value = char;
      }
    });
    setOtp(newOtp);
    const nextIndex = paste.length < 6 ? paste.length : 5;
    inputRefs.current[nextIndex].focus();
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={style.reset_password_container}>
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className={style.email_form}>
          <h1 className={style.email_title}>Reset Password </h1>
          <p className={style.email_tagline}>Enter your registered email address</p>
          <div className={style.input_group}>
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={style.submit_btn_box}>
          <button type="submit" className={style.submit_btn}>
            Submit
          </button></div>
        </form>
      )}
      {/* password reset otp form  */}
      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp} className={style.otp_form}>
          <h1 className={style.otp_title}>Reset Password OTP</h1>
          <p className={style.otp_tagline}>Enter the 6-digit code sent to your email</p>

          <div className={style.input_otp} onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                value={digit}
              />
            ))}
          </div>
<div className={style.submit_btn_box}>
          <button type="submit" className={style.submit_btn}>
            Submit
          </button></div>
        </form>
      )}

      {/* enter new password */}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className={style.new_password_form}>
          <h1 className={style.new_password_title}>New Password </h1>
          <p className={style.new_password_tagline}>Enter the new password</p>
          <div className={style.input_group}>
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={style.submit_btn_box}>
          <button className={style.submit_btn} type="submit">
            Submit
          </button></div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
