import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Trendmedia } from '../../Context/Media';
import { Link } from 'react-router-dom';
import {Bars} from 'react-loader-spinner';
import ToggleBut from '../ToggleBut/ToggleBut';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';
import avatar from '../Assets/Images/view-3d-film-reel.jpg';


export default function TrendingActors() {

    const [selctedActor , setSelectedActor] = useState(true);
    const {imgPrefix} = useContext(Trendmedia);


  async function getPopularActors(){

        try {
            
         return await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=c86c012da8e94ae7661bc41ec07634bd`)
        } catch (error) {
            
            console.error(`error fetch popular actor data` , error);

            return null;
        }
    }

    async function getTrendActors(){

        try {
            return await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=c86c012da8e94ae7661bc41ec07634bd`)
        } catch (error) {
            
            console.error(`error fetch trend actors data` , error);

            return null;
        }
    }

    const {data , refetch , isLoading} = useQuery(`popularactors` , ()=> selctedActor ? getTrendActors() : getPopularActors(),{

        enabled:true,
        staleTime:0,
        cacheTime:0
    })

    function handleDayClick(){
        
        setSelectedActor(false);
        refetch();
       
    }

    function handlePopularClick(){
       
     setSelectedActor(true);
      refetch();
  }

  useEffect(()=>{
    handleDayClick();
    
  },[])


 

  return (
    <>

  <div className='container'>
    <ToggleBut selected={selctedActor} headname={`actors`} 
      handleday={handleDayClick} handweek={handlePopularClick}
      firstbut={`day`} secondbut={`popular`}/>

    <div className='row'>
     {isLoading ? <>
      <div className='d-flex justify-content-center  align-items-center'>
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
          992: {
            slidesPerView: 4, 
        },
          1024: {
              slidesPerView: 5, 
          },
      }}

      >
        {data?.data.results.map((tractor , index)=>
        <SwiperSlide  key={index}>
         <div className='col ' >
          <div className='poster mx-auto  position-relative' style={{width:`90%`}}> 
             <div className='position-absolute top-0 end-0 '>
                < div className="badge text-center text-bg-primary " style={{fontSize:'15px'}}>{tractor.popularity.toFixed(1)}</div>
              </div>
            <Link to={`actorsdetails/${tractor.id}`}>
              {tractor.profile_path ?<>
              <img src={imgPrefix + tractor.profile_path} className='w-100' alt='poster' />
              </> : <img src={avatar} className='w-100' height={340} alt='poster' /> }
            </Link>
            <div className='text-center text-capitalize my-1 fw-bolder fst-italic'>{tractor.name}</div>
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
