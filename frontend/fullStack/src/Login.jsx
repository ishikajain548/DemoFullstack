import React, { useState } from 'react'
import apiClient from '../api/axiosApi'
import { useNavigate } from 'react-router-dom'
const Login = () => {
 
  const navigate =useNavigate();

  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })

  const handleChange = (e) =>{
    const {name,value}=e.target;
    setFormData((prev) =>({
     ...prev,
     [name]:value,
    }));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
     try{
       const response = await apiClient.post("/auth/login",formData);
       console.log(response.data);
       alert("login success")
       navigate("/")
     }
     catch(err)
     {
      console.log(err);    
     }
  }

  return (
    <>
          <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
      
          <h3 className="text-center text-gray-200 mt-2 mb-8"> Login Form</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>

          <div >
         <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-300">Email:</label>
         <input type="email" name="email" id='email' value={formData.email} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition" />
        </div>
        <div>
         <label htmlFor='password' className="block mb-2 text-sm font-medium text-gray-300">Password:</label>
         <input type="password" name="password" id='password' value={formData.password} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"/>
        </div>

         <button
            type="submit"
            className="w-full bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-300 transition duration-300 cursor-pointer"
             >
            Login
          </button>
            </form>
      
      </div>
      </div>
    </> 
  )
}

export default Login