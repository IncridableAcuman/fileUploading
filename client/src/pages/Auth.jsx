import {useNavigate} from 'react-router-dom'
import {Moon, Sun} from 'lucide-react'
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';
import { AnimatePresence,motion } from 'framer-motion';
const Auth = () => {
  const navigate=useNavigate();
  const {toggleTheme,theme} = useContext(ThemeContext);
  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      navigate('/');
    }
  },[navigate])
  return (
    <>
    <div className={` w-full h-screen ${theme === "light" ? "bg-slate-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4">
        <div className="">
        <h1 className='text-2xl font-bold text-blue-600 cursor-pointer' onClick={()=>navigate('/auth')}>
        Web<span className='text-black hover:text-blue-600 transition'>Logo</span> </h1>
        </div>
        <div className="flex items-center gap-5">
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
          <button className='border border-gray-400 px-5 py-2.5 rounded-full cursor-pointer
           hover:bg-gray-200 transition' onClick={()=>navigate('/login')}>Sign In</button>
        </div>
      </div>
      <div className="flex items-center justify-center text-center h-screen">
        <div className="">
          <h2 className='text-xl font-bold text-indigo-600'>Hi Developer</h2>
          <h3 className={`text-4xl font-bold mb-3 ${theme === "light" ? "text-white" : "text-slate-900"}`}>Build your dreams with our</h3>
          <button className='bg-gradient-to-br from-blue-300 to-indigo-600
           text-white font-semibold px-5 py-2.5 rounded
            shadow-lg cursor-pointer' onClick={()=>navigate('/login')}>Join Now </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Auth