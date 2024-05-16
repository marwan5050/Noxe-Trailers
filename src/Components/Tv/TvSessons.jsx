import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Trendmedia } from '../../Context/Media';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';


//========>>> THIS IS CANCELED



export default function TvSessons({seasonNumber , poster}) {

    const {id} = useParams();
    const {imgPrefix} =  useContext(Trendmedia);
//  console.log(seasonNumber);


    async function getSeasons(seasonNumber) {
        try {
          return  await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=c86c012da8e94ae7661bc41ec07634bd`);
             
        } catch (error) {
            console.error('Error fetching season data:', error);
            throw new Error(`Error fetching season ${seasonNumber} data:`, error);
        }
    }

    const {data} = useQuery(`tvseasons` ,()=> getSeasons(id))

    // const { data, isLoading, isError } = useQuery('tvseasons', async () => {
    //     const allSeasons = seasonNumber?.map(season => getSeasons(season));
    //     return await Promise.all(allSeasons);
    // });

   

// console.log(data?.data)
      


    
  
  return (
    <>
    <h3 className=' text-capitalize '>Seasons</h3>
   
   
      <div className='row'>


      {data && data?.length <= 3 ? (
        data?.filter(ses =>   ses !== null && ses.name !== 'Specials')
        .map((ses, index) => (
          <div className='col-md-3 position-relative z-3' key={index}>
          <div className='poster mx-auto text-center' style={{width:`70%`}}>
          <div className='position-absolute top-0 end-0 '>
            < div className="badge text-center text-bg-primary p-2" style={{fontSize:'15px'}}>{ses.vote_average.toFixed(1)}</div>
          </div>
            <Link to={`/seasondetails/${ses.id}`}>
            {ses.poster_path ? (
              <img src={imgPrefix + ses.poster_path} alt='poster' className='w-100' />
            ) : (
              <img src={imgPrefix + poster} alt='poster' className='w-100' />
            )}
            <div className='my-1 bg-dangers'>{ses.name} hello</div>
        </Link>
        

          </div>
        </div>
      ))
  ) : (

     <Swiper 
        modules={[Autoplay]}
        slidesPerView={3}
      
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
      { data?.filter(ses => ses !== null && ses.name !== 'Specials')
        .map((ses, index) => (
          <SwiperSlide  key={index}>
          <div >
            <div className='poster w-75 text-center'>
            <Link to={`/seasondetails/${ses.id}`}>
              {ses.poster_path ? (
                <img src={imgPrefix + ses.poster_path} alt='poster' className='w-100' />
              ) : (
                <img src={imgPrefix + poster} alt='poster' className='w-100' />
              )}
              <div className='my-1'>{ses.name}</div>
          </Link>
            </div>
          </div>
          </SwiperSlide>
        ))}
       </Swiper>
      )} 
      </div> 



    </>
  )
}






