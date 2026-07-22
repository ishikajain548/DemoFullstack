import React, { useEffect } from 'react'
import apiClient from '../api/axiosApi'

const Home = () => {

  const fetchUserData = async ()=>{
   
     try{
         const response = await apiClient.get('/userdata');
         console.log(response.data);
         
     }
     catch(err)
     {
       console.log(err);
       
     }
  }

  useEffect(()=>{
       fetchUserData();
  },[]);

  return (
    <div>Home</div>

  )
}

export default Home