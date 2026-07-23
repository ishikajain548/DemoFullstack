import React, { useEffect, useState } from 'react'
import apiClient from '../api/axiosApi'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [users, setUsers] = useState([])
  const navigate =useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await apiClient.get('/userdata')
      setUsers(response.data)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) =>{
    const confirmMessage = window.confirm("do you want want to delete? are you sure?")
    console.log(typeof id);
    
    if(!confirmMessage)
    {
      return;
    }
    try{
      await apiClient.delete(`/userdata/${id}`);
      fetchUserData();
    }
    catch(err)
    {
      console.log(err);
      
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <>
    
    <div className='max-w-6xl mx-auto mt-10 px-4'>
      <h3 className='text-3xl font-bold mb-6 text-center text-gray-800'>All Users</h3>
        <div className='overflow-x-auto shadow-lg rounded-lg'>
       <table className='w-full border border-gray-300 bg-white'>
        <thead className='bg-blue-900 text-white'>
          <tr>
            <th className='p-3'>Id</th>
            <th className='p-3'>Name</th>
            <th className='p-3'>Email</th>
            <th className='p-3'>Age</th>
            <th className='p-3'>Phone Number</th>
            <th className='p-3'>Edit</th>
            <th className='p-3'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='border text-center hover:bg-gray-100'>
              <td className='p-3'>{user.id}</td>
              <td className='p-3'>{user.name}</td>
              <td className='p-3'>{user.email}</td>
              <td className='p-3'>{user.age}</td>
              <td className='p-3'>{user.phone_no}</td>
              <td className="p-3">
                
     <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-200 cursor-pointer" onClick={() =>navigate(`/edit/${user.id}`)}>
             Edit
      </button>
      </td>
      <td className="inline-flex rounded-lg border border-gray-200 shadow-sm bg-white overflow-hidden m-10">
    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer "onClick={()=>handleDelete(user.id)}>
          Delete
    </button>
     
              </td>
            </tr>
          ))}
        </tbody>
       </table>
       </div>
      </div>
     


    </>
  )
}

export default Home
