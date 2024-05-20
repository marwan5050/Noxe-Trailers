import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Trendmedia } from '../../Context/Media';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';
import avatar from '../Assets/Images/user.png'
import cardSize from '../MovieDetails/MovieDetails.module.css';



export default function MovieCast() {

  
   const {id} =  useParams();
   const {imgPrefix} = useContext(Trendmedia);


  async function getCast(id){

     return  await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    }

   const {data} =  useQuery('moviecast' , ()=> getCast(id));



  return (
    <>
      


    <h3 className=' text-capitalize mb-2 ms-2 ms-md-0'>top cast</h3>

    <div className='row ' >
        

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
  {data?.data.cast.map((actor, index) => (
    <SwiperSlide key={index}>
      <div className='col'>
        <div className={`cards ${cardSize.cardWidth}`}>
          <Link to={`/actorsdetails/${actor.id}`}>
            {actor.profile_path ? (
              <img
                src={imgPrefix + actor.profile_path}
                alt='avatar'
                className="card-img-top rounded-circle w-100 mx-auto"
              />
            ) : (
              <img
                src={avatar}
                alt='avatar'
                className="card-img-top rounded-circle mx-auto "
                style={{ width: `100%` }}
              />
            )}
            <div className="card-body">
            
              <p className="card-title text-center my-1"> {actor.name}</p>
              <p className="card-text  text-center text-capitalize">
               <span className='text-warning'>role </span> : {actor.character}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
      
        
    </div>


   
    </>
  )
}
