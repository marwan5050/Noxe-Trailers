import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ToggleBut from '../ToggleBut/ToggleBut';
import { Trendmedia } from '../../Context/Media';
import { Link } from 'react-router-dom';
import {Bars} from 'react-loader-spinner';

import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';

export default function TrendingTv() {

    const {imgPrefix} = useContext(Trendmedia);
    const [selectedTv , setSelctedTv] = useState(true);


    async function getMedia(media){

        try {
            
         return await axios.get(`https://api.themoviedb.org/3/trending/tv/${media}?api_key=c86c012da8e94ae7661bc41ec07634bd`)
        } catch (error) {

            console.error(`error fetch trending media data` ,error);

            return error;
            
        }
    }

    const {data , refetch , isLoading} =  useQuery(`trendintv` ,()=> getMedia (selectedTv ? 'week' : 'day'),{
        enabled:true,
        staleTime:0,
        cacheTime:0
       });

   


       function handleDayClick(){
        
        setSelctedTv(false);
        refetch();
       
    }

    function handleWeekClick(){
       
      setSelctedTv(true);
      refetch();
  }

  useEffect(()=>{
    handleDayClick();
    
  },[])

 

  return (
    <>

    
    <div className='container'>

      <ToggleBut selected={selectedTv} headname={`Trending tv`} 
        handleday={handleDayClick} handweek={handleWeekClick}
        firstbut={`day`} secondbut={`week`}/>

      <div className='row'>
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
      
      </> : <>

        <Swiper 
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{delay : 3000}}
        loop={true}
        speed={2000}
        dir="rtl"
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
          992: {
              slidesPerView: 4, 
          },
          
          1024: {
              slidesPerView: 5, 
          },
      }}

      >

          {data?.data.results.map((trtv , index)=>
          <SwiperSlide  key={index}>
           <div className='col ' >
            <div className='poster mx-auto  position-relative' style={{width:`90%`}}> 
                <div className='position-absolute top-0 end-0 '>
                  < div className="badge text-center text-bg-primary " style={{fontSize:'15px'}}>{trtv.vote_average.toFixed(1)}</div>
                </div>
              <Link to={`tvdetails/${trtv.id}`}>
                <img src={imgPrefix + trtv.poster_path} className='w-100' alt='poster' />
              </Link>
              <div className='text-center text-capitalize my-1 fw-bolder fst-italic'>{trtv.name}</div>
            </div>
          </div> 
          </SwiperSlide>)}
        </Swiper>
        </>}
      </div>

    </div>
    </>

    
  )
}
