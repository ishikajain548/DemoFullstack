import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <nav className="bg-gray-900 border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

     
        <div className="flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Home
          </Link>


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

        </div>
      </div>
    </nav>
  )
}

export default Navbar