import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';
import { Trendmedia } from '../../Context/Media';
import avatar from '../Assets/Images/user.png';
import cartSize from './TvDetails.module.css';
export default function TvCast() {

  const {id} =  useParams();

  const {imgPrefix} = useContext(Trendmedia);

  

  async  function getTvCast(){

        try {
            
         return await axios.get(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=c86c012da8e94ae7661bc41ec07634bd`)
        
        } catch (error) {
            console.error(`error fetch tv cast data`);
            return null;
        }
    }

  const {data} =  useQuery(`tvcast` , ()=> getTvCast());


  return (
<>
   <h3 className=' text-capitalize mb-2'>top cast</h3>

    <div className='row ' >
        

        <Swiper 
        modules={[Autoplay]}
        slidesPerView={4}
      
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
          }, 992: {
            slidesPerView: 4, 
        },
        1024: {
            slidesPerView: 5, 
        },
          
          
      }}

      >
        {data?.data.cast.map((actor , index)=>
        <SwiperSlide  key={index}>
           <div className='col' >
        <div className={`cards  ${cartSize.tvcardWidth}`} >
            <Link to={`/actorsdetails/${actor.id}`} >
                {actor.profile_path ?( <img src={imgPrefix + actor.profile_path} alt='avatar' className="card-img-top rounded-circle w-100  mx-auto" />)
                :( <img src={avatar} alt='avatar' className="card-img-top rounded-circle mx-auto" style={{width:`100%`}}/>)}
                
                <div className="card-body">
                    <h5 className="card-title text-center my-1">{actor.name}</h5>
                    <p className="card-text  text-center text-capitalize">
                      <span className='text-warning'>role </span> : {actor.roles.map((role)=> role.character)}
                    </p>
                </div>
            </Link>
        </div>
      </div> 
      </SwiperSlide>)}
     </Swiper>
    </div>

</>
    
  )
}
