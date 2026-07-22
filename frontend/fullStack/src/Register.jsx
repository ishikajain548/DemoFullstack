import React, { useState } from 'react'

const Register = () => {

  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    age:"",
    phone_no:""
  })

  const handleChange = (e) =>{
    const {name,value}=e.target;
    setFormData((prev) =>({
     ...prev,
     [name]:value,
    }));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log('form submitted: ',formData);
    
  }

  return (

    <>
    <div className="max-w-sm mx-auto"> Register Form</div>
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
         <label for='name' className="block mb-2.5 text-sm font-medium text-heading" >Name:</label>
         <input type="text" name="name" id="name"  value={formData.name} onChange={handleChange} className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body'/>
        </div>
        <div className="mb-5">
         <label for='email' className="block mb-2.5 text-sm font-medium text-heading">Email:</label>
         <input type="email" name="email" id='email' value={formData.email} onChange={handleChange} className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body' />
        </div>
        <div className="mb-5">
         <label for='password' className="block mb-2.5 text-sm font-medium text-heading">Password:</label>
         <input type="password" name="password" id='password' value={formData.password} onChange={handleChange} className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body'/>
        </div>
        <div className="mb-5">
         <label for='age' className="block mb-2.5 text-sm font-medium text-heading">Age:</label>
         <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body'/>
        </div>
        <div className="mb-5">
         <label for='phone_no' className="block mb-2.5 text-sm font-medium text-heading">Phone Number:</label>
         <input type="phone" name="phone" id='phone_no' value={formData.phone} onChange={handleChange} className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body'/>
        </div>
         <div className="mb-5">

         <input type="submit"   onChange={handleSubmit} id='submit' />
        </div>
      </form>
    </div>
    </>
  )
}

export default Register