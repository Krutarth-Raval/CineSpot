import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true, // ✅ THIS IS REQUIRED for sending cookies
      });
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async()=>{
    try {
        const  {data} = await axios.get(backendUrl + '/api/auth/is-auth',{
            withCredentials: true,
        })
        if(data.success){
            setLoggedIn(true)
            getUserData()
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(()=>{
getAuthState();
  }, [])

  const value = {
    backendUrl,
    isLoggedIn,
    setLoggedIn,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
