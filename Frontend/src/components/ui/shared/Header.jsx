import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Button } from '../button';

function Header() {
  return (
    <header className="shadow-lg sticky ">
     <div className="flex justify-between items-center max-w-6xl lg:max-w-7xl mx-auto ">

      <Link to={"/"}>
      <h1 className="font-bold text-xl sm:text-2xl ">
        <span className=' text-slate-500 '>Local</span>
        <span className=' text-slate-900 '>Buzz</span>
      </h1>
      </Link>
      <form className='p-3 bg-slate-100 rounded-lg flex items-center '>
        <input type="text" placeholder='Search...' className=' on focus:outline-none bg-transparent w-14 sm:w-60 ' />
      
      <button>
      <FaSearch className='text-slate-600 '/>
      </button>
      </form>
      <ul className='flex gap-4 '>
      <Link to={"/"}>
      <li  className='hidden lg:inline text-slate-700 hover:underline '>Home</li></Link>
        <Link to={"/about"}>
        <li  className='hidden lg:inline text-slate-700 hover:underline '>About</li>
        </Link>
        <Link to={"/news"}>
        <li  className='hidden lg:inline text-slate-700 hover:underline '>
          News Artical
        </li>
        </Link>
      </ul>
      <Link to="/sign-in">
       <Button>Sign In</Button>
        </Link>
     </div> 



    </header>
  )
}

export default Header