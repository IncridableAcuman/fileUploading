import  { createContext, useEffect, useState } from 'react'

const ThemeContext=createContext();

const ThemeProvider = ({children}) => {
    const storedTheme=localStorage.getItem('theme') || "light";
    const [theme,setTheme] = useState(storedTheme);

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme);
        localStorage.setItem('theme',theme);
    },[theme]);
    const toggleTheme = ()=>{
        setTheme(theme === "light" ? "dark" : "light")
    } 
  return (
    <ThemeContext value={{theme,toggleTheme}}>
        {children}
    </ThemeContext>
  )
}

export  {ThemeContext,ThemeProvider}