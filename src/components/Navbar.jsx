import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {

  const {user, logOut} = UserAuth()
  const navigate = useNavigate();



  const handleLogout = async () => {
    try{
      await logOut()
      navigate("/")
    }
    catch (err){
      console.log(err)
    }
  }

  return (
    <div className='absolute p-4 flex items-center w-full justify-between z-50'>
      <Link to='/'><h1 className='uppercase text-5xl font-nsans-bold text-red-600'>
        netflix
        </h1>
      </Link>


    {user?.email?(
      <div className='space-x-1'>
      <Link to='/profile'><button className='capitalize py-1 px-4 '>profile</button></Link>
      <button onClick={handleLogout} className='capitalize bg-red-600 hover:bg-red-700 duration-200 py-2 px-6 rounded-md'>logOut</button>
    </div>
      
    ):
    (
      <div className='space-x-1'>
        <Link to='/login'><button className='capitalize py-1 px-4 '>login</button></Link>
        <Link to='/signup'><button className='capitalize bg-red-600 hover:bg-red-700 duration-200 py-2 px-6 rounded-md'>signup</button></Link>
      </div>
    )
    }

    </div>
  )
}

export default Navbar