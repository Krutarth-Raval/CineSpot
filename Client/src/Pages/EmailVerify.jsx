import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../Styles/EmailVerify.module.css";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"


const  EmailVerify=()=> {
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContent);

  const navigate = useNavigate();

  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));

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

 const handleSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    const { data } = await axios.post(backendUrl + "/api/auth/verify-account", {
      otp,
    });
    if (data.success) {
      toast.success(data.message);
      getUserData();
      navigate("/");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(()=>{

  isLoggedIn && userData && userData.isAccountVerified && navigate('/')

},[isLoggedIn, userData])

  return (
    <div className={style.email_verify_container}>
      <form onSubmit={handleSubmitHandler} className={style.verify_email_form}>
        <h1 className={style.email_verify_title}>Email Verify OTP</h1>
        <p className={style.verify_email_tagline}>Enter the 6-digit code sent to your email</p>

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
<div className={style.verify_email_btn_box}>
        <button type="submit" className={style.verify_email_btn}>
          Verify Email
        </button></div>
      </form>
    </div>
  );
}

export default EmailVerify;
