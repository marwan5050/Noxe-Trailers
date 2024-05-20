import React, { useContext, useEffect } from 'react'
import {UpComing} from '../../../Context/Upcoming';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useQuery } from 'react-query';
import { Trailers } from '../../../Context/LatestTrails';
import {Bars} from 'react-loader-spinner';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';
import { Helmet } from 'react-helmet';


export default function Upcoming() {

  const {upMovie , upTv} = useContext(UpComing);
  const {selectedMediaType} = useContext(Trailers);


  async function getVideos( vid){

    try {
      
      return await axios.get(`https://api.themoviedb.org/3/movie/${vid}/videos?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    } catch (error) {
      
      console.error(`error fetch upcoming movies videos data` , error);

      return null;
    }

  }


  async function handlevideos(){

    try {
      
      const video = await Promise.all(upMovie?.map(async (vd)=> await  getVideos(vd) ));

      return video;
    } catch (error) {
      
      console.error(`error handla upcoming movies videos data` , error);

      return null;
    }
  }



  async function getTvVideos( vid){

    try {
      
      return await axios.get(`https://api.themoviedb.org/3/tv/${vid}/videos?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    } catch (error) {
      
      console.error(`error fetch upTvs videos data` , error);

      return null;
    }
  }



  async function handleTvvideos(){

    try {
      
      const video = await Promise.all(upTv?.map(async (vd)=> await  getTvVideos(vd) ));

      return video;
    } catch (error) {
      
      console.error(`error handla upTvs videos data` , error);

      return null;
    }
  }


  useEffect(()=>{
    handlevideos();
    handleTvvideos();
   
  }, [upMovie , upTv])

  const { data: videos, isLoading } = useQuery(`upMovieVideo` ,handlevideos);
  const { data: tvvideos } = useQuery(`upTvVideo` ,handleTvvideos);




  
  
  return (
<>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Upcoming</title>
      
    </Helmet>

<div className='my-4 '>

{isLoading ? <>
  <div className='d-flex justify-content-center align-items-center'>
      <Bars
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
    />
 </div>

</> 
:<>

  {selectedMediaType === 'movie' ? <> 
  
  <Swiper 
        modules={[Autoplay]}
        slidesPerView={1}
      
        autoplay={{delay : 4000}}
        loop={true}
        speed={2000}
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
      }}
    >
  {videos?.map((video, index) => (
    <SwiperSlide  key={index}>
  <div className='container' >
    {video?.data.results.find((result) => result.official) && ( 
      <ReactPlayer
        key={video.data.id} 
        url={`https://www.youtube.com/watch?v=${video?.data.results.find((result) => result.official).key}`}
        controls
        width="100%"
        height="200px"
      />
    )}
  </div>
  </SwiperSlide>))}
</Swiper>

</>
:<>

<Swiper 
        modules={[Autoplay]}
        slidesPerView={3}
      
        autoplay={{delay : 4000}}
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
      }}
    >
  {tvvideos?.map((video, ind) => (
    <SwiperSlide  key={ind}>
    <div className='container' >
      
        {video?.data.results.some((result) =>  result.official) ? ( 
          <ReactPlayer
            key={video.data.id}
            url={`https://www.youtube.com/watch?v=${video?.data.results.find((result) => result.official || result.type === 'Trailer' || result.type === 'Teaser').key}`}
            controls
            width="100%"
            height="200px"
          />
        ) : (
          <ReactPlayer
            url={`https://www.youtube.com/watch`}
            controls
            width="100%"
            height="200px"
          />
      )}
    </div>
    </SwiperSlide>))}
  
</Swiper>

</>}
</>}
</div>
</>
  )
}
