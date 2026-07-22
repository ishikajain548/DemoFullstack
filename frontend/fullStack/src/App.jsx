import { useState,useEffect} from 'react'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {

  return (
    <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path='/' element={<Home/>} />
           <Route path='/login' element={<Login/>} />
             <Route path='/register' element={<Register/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
