import axios from 'axios'
import React from 'react'
import ReactPlayer from 'react-player';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';

export default function Tvvideos() {

    const {id} =  useParams();

   async function getTvVideos(id){

        try {
            
          return await  axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=c86c012da8e94ae7661bc41ec07634bd`)

        } catch (error) {
            console.error('Error fetching tv videos data:', error);
            return null; 
        }
    }

   const {data} =  useQuery(`tvvideos` , ()=> getTvVideos(id));


  

    

  return (
<>
<h3 className='text-capitalize'>official trailers</h3>

    {data?.data.results.length < 2 ? 

    data?.data.results.map((videos , index)=> <div className='text-center mx-auto' key={index}>

        <ReactPlayer 
        url={`https://www.youtube.com/watch?v=${videos?.key}`}
        controls
        width="100%"
        height="200px"
        />
    </div>)

    : <>

        {data?.data.results.length > 2 ? 
        
         

      <Swiper 
        modules={[Autoplay]}
        slidesPerView={1}
      
        autoplay={{delay : 7000}}
        loop={true}
        breakpoints={{
          500: {
              slidesPerView: 1, 
          },
          640: {
              slidesPerView: 2, 
          },
          768: {
              slidesPerView: 3, 
          },
          
          1024: {
              slidesPerView: 4, 
          },
      }}

      >

      {data?.data.results.map((videos ,index)=>
        <SwiperSlide  key={index}> 
        <div className='px-1' >

      <ReactPlayer
         url={`https://www.youtube.com/watch?v=${videos?.key}`}
        controls
        width="100%"
        height="200px"
        />

      </div>
      </SwiperSlide>)}

    </Swiper> : 
    <ReactPlayer
        url={`https://www.youtube.com/watch?v`}
       controls
       width="100%"
       height="200px"
       />
       }
    
    </>}
</>
  )
}
