import React, { useState } from 'react'
import { createImageUrl } from '../services/movieServices';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { UserAuth } from '../context/AuthContext';

const MovieItem = ({movie}) => {

    const [like, setLike] =useState(false)
    const {user} = UserAuth();

const {title, backdrop_path, poster_path} =movie;

const markfavshow = async () => {
  const userEmail = user?.email;

  if (userEmail) {
    const userDoc = doc(db, 'users', userEmail);
    if (like) {
      // If the movie is already liked, remove it from favorites
      await updateDoc(userDoc, {
        favshows: arrayRemove({ ...movie }),
      });
    } else {
      // If the movie is not liked, add it to favorites
      await updateDoc(userDoc, {
        favshows: arrayUnion({ ...movie }),
      });
    }
    // Toggle the like state
    setLike(!like);
  } else {
    alert("Login to save a movie");
  }
};

  return (
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block
    overflow-hiden cursor-pointer m-2'>
        <img className='rounded-lg w-full h-40 block object-cover object-top' src={createImageUrl(backdrop_path ?? poster_path, "w500")} alt={title} />

     <div className='absolute top-0 left-0 w-full h-40 bg-black opacity-0 hover:opacity-80'>
     <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{title}</p>
     <p onClick={markfavshow} className='cursor-pointer'>{like ? <FaHeart    className='absolute top-2 left-2 text-gray-300'/> : 
                <FaRegHeart className='absolute top-2 left-2 text-gray-300' />}

    </p>  
     </div>
      
    </div>
    
  )
}

export default MovieItem