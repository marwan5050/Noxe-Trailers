import React, { useContext } from 'react';
import { Trendmedia } from '../../Context/Media';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import avatar2 from '../Assets/Images/view-3d-film-reel.jpg';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';


export default function ActorTv({Name}) {

    const {id} = useParams();
    const {imgPrefix} = useContext(Trendmedia);

    async function actorTv(id){

        try {
            return await axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=c86c012da8e94ae7661bc41ec07634bd`)
        } catch (error) {
            
            console.error(`error fetch actor movies data` , error);

            return null;
        }
    }


    const {data} =  useQuery(`actortv` , ()=>actorTv(id));

    

  return (
    <>

    <h3 className='text-capitalize my-2 ms-2 ms-md-0'>series of <span className='text-warning'>{Name}</span></h3>

    <div className='row'>
    

    <Swiper 
        modules={[Autoplay]}
        slidesPerView={5}
      
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

    {data?.data ? data?.data.cast.map((actmovie , index)=>
    <SwiperSlide key={index}>
         <div className='col' >
        <div className='poster mx-auto position-relative' style={{width:`70%`}}> 
        <div className='position-absolute top-0 end-0 '>
            < div className="badge text-center text-bg-primary p-2" style={{fontSize:'15px'}}>{actmovie.vote_average.toFixed(1)}</div>
            </div>
            <Link to={`/tvdetails/${actmovie.id}`}>
            {actmovie.poster_path ? <>
        <img src={imgPrefix + actmovie.poster_path} className='w-100' height={300} alt='poster' />
        </>: <img src={avatar2} className='w-100' height={300} alt='poster' />}
        </Link>
        <div className='text-center text-capitalize my-1 fw-bolder fst-italic'>{actmovie.title}</div>
        </div>
        
    </div>  </SwiperSlide>) : <div className='text-center text-capitalize'> no series for <span className='text-warning'> {Name} </span> </div>}
    </Swiper>
    </div>
    </>
  )
}
