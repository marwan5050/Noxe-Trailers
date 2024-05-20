import React, { useContext, useEffect } from 'react';
import { Pop } from '../../../Context/Popular';
import {  useQuery } from 'react-query';
import axios from 'axios';
import ReactPlayer from 'react-player';
import {Bars} from 'react-loader-spinner';
import { Trailers } from '../../../Context/LatestTrails';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';
import { Helmet } from 'react-helmet';


export default function Popular() {

 const {popMid , popTvid} =  useContext(Pop);
 const { selectedMediaType} =  useContext(Trailers);



  async function getPopVideos( vid){

    try {
      
      return await axios.get(`https://api.themoviedb.org/3/movie/${vid}/videos?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    } catch (error) {
      
      console.error(`error fetch Pop movies videos data` , error);

      return null;
    }
  }



  async function handlePopvideos(){

    try {
      
      const video = await Promise.all(popMid?.map(async (vd)=> await  getPopVideos(vd) ));

      return video;
    } catch (error) {
      
      console.error(`error handla pop movies videos data` , error);

      return null;
    }
  }


  async function getPopTvVideos( vid){

    try {
      
      return await axios.get(`https://api.themoviedb.org/3/tv/${vid}/videos?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    } catch (error) {
      
      console.error(`error fetch Pop tvs videos data` , error);

      return null;
    }
  }


  async function handlePopTvvideos(){

    try {
      
      const video = await Promise.all(popTvid?.map(async (vd)=> await  getPopTvVideos(vd) ));

      return video;
    } catch (error) {
      
      console.error(`error handla pop tvs videos data` , error);

      return null;
    }
  }


  const { data: videos, isLoading, error } = useQuery(`pop moives videos` ,handlePopvideos);
  const { data: tvvideos } = useQuery(`pop tvs videos` ,handlePopTvvideos);

  

  useEffect(()=>{
    handlePopvideos();
    handlePopTvvideos();
  }, [popMid , popTvid])



  

  return (
    <>

<Helmet>
      <meta charSet="utf-8" />
      <title>Popular</title>
      
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
      
        {video?.data.results.find((result) =>  result.official) ? ( 
          <ReactPlayer
            key={video?.data.id}
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
    </SwiperSlide>)) 
  }
  
</Swiper>

</>}
</>}
</div>
    </>
  )
}
