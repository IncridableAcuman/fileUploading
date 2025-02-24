import { useContext } from "react"
import MainNavbar from "../components/MainNavbar"
import { ThemeContext } from "../contexts/ThemeProvider"
import FileUpload from "./FileUpload";

const Home = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <>
    <div className={` w-full min-h-screen flex items-center justify-center ${theme === "light" ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
      <MainNavbar/>
    <FileUpload/>
    </div>
    
    </>
  )
}

export default Home