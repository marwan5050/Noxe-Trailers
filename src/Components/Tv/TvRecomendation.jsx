import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Trendmedia } from '../../Context/Media';
import { Swiper, SwiperSlide  } from 'swiper/react';

import  { Autoplay } from 'swiper/modules';

export default function TvRecomendation() {

   const {id} =  useParams();

   const {imgPrefix} = useContext(Trendmedia)

  

  async function getTvRecomend(){

    try {
        
     return await   axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=c86c012da8e94ae7661bc41ec07634bd`)

    } catch (error) {
        
        console.error(`err fetch tv recomendation data` , error);
        return null;
    }
   }

   const {data} = useQuery(`tvrecomend` , ()=> getTvRecomend());

  return (
  <>
    <h3 className=' text-capitalize mb-2'>recommendation</h3>

      <div className='row'>
      

      <Swiper 
        modules={[Autoplay]}
        slidesPerView={1}
      
        autoplay={{delay : 5000}}
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
          992: {
              slidesPerView: 4, 
          },
          
          1024: {
              slidesPerView: 5, 
          },
      }}

      >

        {data?.data.results.map((recomend , index)=>
          <SwiperSlide  key={index}>
          <div className='col' >
          <div className='poster mx-auto  position-relative' style={{width:`70%`}}> 
          <div className='position-absolute top-0 end-0 '>
            < div className="badge text-center text-bg-primary p-2" style={{fontSize:'15px'}}>{recomend.vote_average.toFixed(1)}</div>
          </div>
            <img src={imgPrefix + recomend.poster_path} className='w-100' alt='poster' />
          </div>
        </div> 
        </SwiperSlide>)}
      </Swiper>
    </div>
  </>
  )
}
