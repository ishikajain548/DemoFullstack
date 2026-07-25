import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../../api/axiosApi'
import { useAuth } from '../context/AuthContext'
const Navbar = () => {
const { setIsAuthenticated, setUser ,isAuthenticated} = useAuth();

  const navigate =useNavigate();
  const handleLogout = async ()=>{
          try{
          const res = await apiClient.post("/auth/logout");
  setIsAuthenticated(false);
    setUser(null);
           alert("logout success")
                       

            navigate("/login");
          }
          catch(err)
          {
            console.log(err);
            
          }
  }


  return (
      <nav className="bg-gray-900 border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

     
        <div className="flex items-center gap-8">

{isAuthenticated ? (
<>
   <Link
            to="/users"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Users
          </Link>
                    <button  className="text-gray-300 hover:text-white transition duration-300" onClick={handleLogout}>Logout</button>

          </>
):(
<>
    
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-gray-300 hover:text-white transition duration-300">
            Register
          </Link>

</>
)}
       



        </div>
      </div>
    </nav>
  )
}

export default Navbar