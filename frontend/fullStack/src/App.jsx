import { useState,useEffect} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Users from './Users'
import Login from './Login'
import Register from './Register'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import EditForm from '../EditForm'
import Home from './Home'

function App() {

  return (
    <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path='/users' element={<ProtectedRoute><Users/></ProtectedRoute>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/' element={<Home/>} />
             <Route path='/register' element={<Register/>} />
              <Route path='/edit/:id' element={<ProtectedRoute><EditForm/></ProtectedRoute>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
