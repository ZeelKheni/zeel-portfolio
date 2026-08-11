import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("m3-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    // Strict default to dark theme for portfolio
    return "dark";
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("m3-theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
