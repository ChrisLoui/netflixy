import axios from 'axios';
import React, { useEffect, useState } from 'react'
import endpoints, { createImageUrl } from '../services/movieServices';

const Hero = () => {

const [movie, setMovie] = useState({});

useEffect(() => {
 axios.get(endpoints.popular).then((response) => {
    const movies = response.data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)]

    setMovie(randomMovie);
 });
}, []);

const truncate = (str, length) => {
    if(!str) return "";

    return str.length > length ? str.slice(0, length) + "..." : str
};

 if (!movie)
 return(
<>
<p>Fetching Movie...</p>

</>);

const {title, backdrop_path, release_date, overview} = movie;


  return (
    <div className='w-full h-[350px]  md:h-[400px] lg:h-[500px]'>
        <div className='w-full h-full'>
            <div className='absolute w-full  md:h-[400px] h-[350px] lg:h-[500px] bg-gradient-to-r from-black' />
                <img className='object-cover object-top w-full h-full' src={createImageUrl(backdrop_path, 'original')} 
                alt={title} />
        
        <div className='p-4 md:p-8 absolute w-full top-[15%] lg:top-[25%] space-y-2'>
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-nsans-medium'>{title}</h1>
            <div className='space-x-4'>
                <button className=' bg-gray-300 text-black py-2 px-5 rounded-sm hover:bg-gray-600'>Play</button>
                <button className='border border-gray-300 py-2 px-5 rounded-sm '>Watch Later</button>
            </div>
            <div className='text-sm'>
                <p className='text-gray-400'>{release_date}</p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncate(overview, 165)}</p>
            </div>
        </div>
        </div> 
    </div>
    )
}

export default Hero