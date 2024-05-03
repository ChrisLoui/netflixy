import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { db } from '../services/firebase'
import { createImageUrl } from '../services/movieServices'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Profile = () => {

  const [movies, setMovies] = useState([]);
  const {user} = UserAuth();

  useEffect(() => {

    if(user){
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favshows)
      })
    }

  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft + offset
  }

const handleUnlikedshows = async (movie) => {
  const userDoc = doc(db, 'users', user.email)

  await updateDoc(userDoc, {

  favshows: arrayRemove(movie)})
}


  return (
    <>
    <div>
      <div className='bloc'>
        <img className='h-[500px] w-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/520b8af1-d438-4a78-8f2a-f40aa8d1a38f/PH-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_35ab0f8f-c765-48cf-8cc8-85c5202c55ee_large.jpg" alt="" />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[500px]' />
      </div>
      <div className='gap-1 absolute top-[20%] p-4 md:p-8'>
      <h1 className='text-5xl font-nsans-bold'>
        My Liked Shows
      </h1>
      <p className='text-gray-400'>{user.email}</p></div>
    </div> 

    {/* {movie row} */}

    <div>
    <h2 className='capitalize font-nsans-bold md:text-xl p-4'>Favorite Shows</h2>
 <div className='relative flex items-center group'>
  <MdChevronLeft 
  onClick={() => slide(-500)}
  className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden
  group-hover:block cursor-pointer'
  size={40}/>
    <div
    id={`slider`}
    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
    {movies.map((movie) => (
    <div
    key={movie.id}
     className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block
    overflow-hiden cursor-pointer m-2'>
        <img className='rounded-lg w-full h-40 block object-cover object-top' src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")} alt={movie.title} />
     <div className='absolute top-0 left-0 w-full h-40 bg-black opacity-0 hover:opacity-80'>
     <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{movie.title}</p>
     <p>
     <AiOutlineClose
     size={30}
     onClick = {() => handleUnlikedshows(movie)}
     className='absolute top-2 right-2'
     />
     </p>
     </div>
    </div>
    ))}
    </div>
    <MdChevronRight
    onClick={() => slide(500)}
    className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden
    group-hover:block cursor-pointer'
    size={40}
    />
 </div>
    </div>

    </>
  )
}

export default Profile