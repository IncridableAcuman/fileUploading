import { LogOutIcon, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify';
import axiosInstance from '../api/api';
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
const MainNavbar = () => {
const navigate=useNavigate();
const {theme,toggleTheme} = useContext(ThemeContext)
const handleLogout = async ()=>{
    try {
         await axiosInstance.post('/auth/logout');
        localStorage.removeItem('accessToken');
        toast.success("Successfully");
        navigate('/auth');
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
}
  return (
    <>
    <div className="fixed top-0 left-0 flex w-full items-center justify-between px-10 py-4 bg text-white">
        <div className="">
        <h1 className='text-2xl font-bold text-blue-600 cursor-pointer' onClick={()=>navigate('/auth')}>
        Web<span className='text-blue-600 hover:text-blue-700 transition'>Logo</span> </h1>
        </div>
        <div className="flex items-center gap-7">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center w-10 h-10"
        >
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Moon className="text-gray-800 dark:text-white w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Sun className="text-yellow-500 dark:text-yellow-300 w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
            <img src="/image.png" alt="profile image" className="w-8 h-8 rounded-full cursor-pointer" />
            <LogOutIcon className="cursor-pointer hover:text-indigo-600 transition" onClick={handleLogout} />
        </div>
    </div>
    </>
  )
}

export default MainNavbar