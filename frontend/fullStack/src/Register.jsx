import React, { useState } from 'react'
import apiClient from '../api/axiosApi'
import { useNavigate } from 'react-router-dom'
const Register = () => {

   const navigate=useNavigate();

  const initialState = {
    name:"",
    email:"",
    password:"",
    age:"",
    phone_no:""
  }

  const [formData,setFormData]=useState(initialState)

  const handleChange = (e) =>{
    const {name,value}=e.target;
    setFormData((prev) =>({
     ...prev,
     [name]:value,
    }));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

     const { name, email, password, age, phone_no } = formData;

     if(name.trim() === "")
     {
       alert("name is required");
       return;
     }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Invalid Email");
    return;
  }

 const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordRegex.test(password)) {
    
       alert("Password must contain uppercase, lowercase, number and special character.")
       return; 
}
  if (age < 0) {
    alert("Age should be positive");
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone_no)) {
    alert("Phone number must contain exactly 10 digits");
    return;
  }

     try{
        
       const response = await apiClient.post("/auth/register",formData);
      
       alert('user registered success!')
       setFormData(initialState)
       navigate("/login")
       
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
     
    <h3 className="text-center text-gray-200 mt-2 mb-8"> Register Form</h3>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div >
         <label htmlFor='name'  className="block mb-2 text-sm font-medium text-gray-300" >Name:</label>
         <input type="text" name="name" id="name"  value={formData.name} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"/>
        </div>
        <div >
         <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-300">Email:</label>
         <input type="email" name="email" id='email' value={formData.email} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition" />
        </div>
        <div>
         <label htmlFor='password' className="block mb-2 text-sm font-medium text-gray-300">Password:</label>
         <input type="password" name="password" id='password' value={formData.password} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"/>
        </div>
        <div >
         <label htmlFor='age' className="block mb-2 text-sm font-medium text-gray-300">Age:</label>
         <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"/>
        </div>
        <div>
         <label htmlFor='phone_no' className="block mb-2 text-sm font-medium text-gray-300">Phone Number:</label>
         <input type="tel" name="phone_no" id='phone_no' value={formData.phone_no} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"/>
        </div>
         <div>

            <button
            type="submit"
            className="w-full bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-300 transition duration-300 cursor-pointer"
             >
            Register
          </button>
        
        </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default Register