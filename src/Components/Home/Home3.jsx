import React, { useContext } from 'react';
import { Trendmedia } from '../../Context/Media';
import { useQuery } from 'react-query';
import {Bars} from 'react-loader-spinner';
import style from './Home.module.css';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay , EffectFade  } from 'swiper/modules';



export default function Home3() {

    const {getMovies , imgPrefix} =  useContext(Trendmedia);

   const {data , isLoading}=  useQuery('trendmovies' , ()=> getMovies());


 
  return (

<>

    
    <div className={`row ${style.sliderContainer}`} >
        {isLoading ? <>
         
        <div className='vh-100 d-flex justify-content-center align-items-center '>
          <Bars
            height="80"
            width="80"
            radius="9"
            color="#ffc107"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
              />
        </div>
        </> : <>
        
        <Swiper 
        modules={[Autoplay , EffectFade ]}
        slidesPerView={1}
        speed={2000}
        effect='fade'
        autoplay={{delay : 3000}}
        loop={true}
      
    >

            {data?.data.results.map((mvimg , index)=>
            <SwiperSlide  key={index}>
            <div className='col-12 ' key={index}>

                <div className={` ${style.imgContainer}`} >
                    <img src={imgPrefix + mvimg.backdrop_path} alt='poser'  className='w-100'/>
                </div>
            </div>
            </SwiperSlide>)}
        </Swiper>
        <div className={` d-flex align-items-end  position-absolute top-0 start-0 end-0 bottom-0 z-1 ${style.layer}`}>
                    <div className='ms-4 mb-4 '>
                        <h2 className={`${style.header} text-white`}>Welcome.</h2>
                        <h3 className={`text-info text-capitalize fs-1`}>Millions of movies, TV shows and people to discover. Explore now.</h3>
                    </div>
        </div>
        </>}
    </div>
    
    
</>
    
  )
}
