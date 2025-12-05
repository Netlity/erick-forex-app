// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("erick-forex-theme");
    return saved || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    // Add animation class
    document.documentElement.classList.add("theme-transition");
    
    setTheme(newTheme);

    // Remove class after animation ends
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 400);
  };

  // Sync state → DOM when user toggles
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("erick-forex-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}X
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);