import Auth from "./pages/Auth"
import Home from "./pages/Home"
import {Route,Routes} from 'react-router-dom'
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ProtectedRoutes from "./private/ProtectedRoutes"
import {ToastContainer} from 'react-toastify'
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route path='/' element={<ProtectedRoutes element={<Home/>} />} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/recovery-account" element={<ResetPassword/>} />
    </Routes>
    </>
  )
}

export default App