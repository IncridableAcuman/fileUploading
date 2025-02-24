import { useEffect, useState} from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import axiosInstance from '../api/api';
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isLogin,setIsLogin] = useState(true);
  const navigate=useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if ( !isLogin ) {
      try {
        const {data} = await axiosInstance.post('/auth/signup',{name,email,password});
        localStorage.setItem('accessToken',data.accessToken);
        toast.success("Successfully");
        navigate('/');
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    } else {
      try {
        const {data} = await axiosInstance.post('/auth/signin',{email,password});
        localStorage.setItem('accessToken',data.accessToken);
        toast.success("Successfully");
        navigate('/');
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      navigate('/');
    }
  },[navigate])

  return (
    <>
    <div className="">
       <Navbar/>
    <div className="flex min-h-screen 
    items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className='text-2xl font-bold text-center mb-4'>{isLogin ? "Sign In" : "Sign Up"}</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" 
          placeholder='Full Name' 
          className='w-full p-3 border rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-blue-500' 
          value={name} onChange={(e)=>setName(e.target.value)} required />
          )}    

          <input type="email" 
          placeholder='example@gmail.com' className='w-full p-3 border rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-blue-500' 
          value={email} onChange={(e)=>setEmail(e.target.value)} required />

          <input type="password" placeholder='Password'
          className='w-full p-3 border rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-blue-500' value={password} 
          onChange={(e)=>setPassword(e.target.value)} required />
                 <p className='text-blue-500 cursor-pointer hover:underline transition' onClick={()=>navigate("/forgot-password")}>Forgot Password?</p>
          <button type="submit" 
         className='w-full p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-600 transition' >{isLogin ? "Sign In" : "Sign Up"}</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className='text-blue-500 hover:underline' onClick={()=>setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Sign In"}</button>
        </p>
      </div>
    </div>
    </div>
   
    </>
  )
}

export default Login