import { BrowserRouter as Router ,Routes,Route } from "react-router-dom"
import Login from "../pages/user/Login"
import Signup from "../pages/user/Signup"
import Home from "../pages/user//Home"
import Profile from "../pages/user//Profile"
import AdminDashbaord from "../pages/admin/AdminDashbaord"

const Approutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/login" element={<Login/>} ></Route>
     <Route path="/signup" element={<Signup/>}></Route>
     <Route path="/adminDashboard" element={<AdminDashbaord/>}></Route>
    </Routes>
  </Router>
  )
}

export default Approutes