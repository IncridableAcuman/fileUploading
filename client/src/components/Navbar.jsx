import {Sun,Moon} from 'lucide-react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeProvider';
const Navbar = () => {
    const navigate=useNavigate();
    const {theme,toggleTheme} = useContext(ThemeContext);
  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-2 bg-gray-100">
        <div className="">
            <h1 className='text-2xl font-bold text-blue-600 cursor-pointer' onClick={()=>navigate('/auth')}>
                Web<span className='text-black hover:text-blue-600 transition'>Logo</span> </h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme}>
            {theme === "light" ? <Moon/> : <Sun/> }
          </button>

        </div>
    </div>
    </>
  )
}

export default Navbar