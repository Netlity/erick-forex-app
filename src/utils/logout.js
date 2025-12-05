// src/utils/logout.js  or inside your AuthContext
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // 1. Clear localStorage (your token, user, theme, etc.)
    //localStorage.clear();                   
    // OR be specific if you prefer:
    // localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.removeItem("erick-forex-theme");

    // 2. Clear sessionStorage (if you use it)
    sessionStorage.clear();

    // 3. Clear all cookies (important for httpOnly cookies or third-party)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // 4. Clear any React state (if using Context/Zustand/Redux)
    // Example if you have auth context:
    // setUser(null);
    // setToken(null);

    // 5. Redirect to login + force full page reload (kills any remaining state)
    navigate("/login", { replace: true });
    window.location.reload(); // This is the nuclear option — 100% clean slate
  };

  return logout;
};