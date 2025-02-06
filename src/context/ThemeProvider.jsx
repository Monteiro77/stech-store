import { createContext, useContext, useState } from "react";


const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});


export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
