import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import {  useParams } from 'react-router-dom';
import { Trendmedia } from '../../Context/Media';
import style  from '../MovieDetails/MovieDetails.module.css';
import { CircularProgressbar , buildStyles  } from 'react-circular-progressbar';





export default function SeasonDetails() {


  const {tvid , sesid} = useParams();

  const {imgPrefix} = useContext(Trendmedia);

  
 

 async  function getSeasonDetails(tvid , sesid){

    try {
      
      const response =  await axios.get(`https://api.themoviedb.org/3/tv/${tvid}/season/${sesid}?api_key=c86c012da8e94ae7661bc41ec07634bd`);
       
      const episodeNumber = response?.data.episodes.map((episode)=> episode.episode_number);


      return response;

    } catch (error) {
      
      console.error(`error fetching season details error` , error);

      return null;
    }
  }



  const {data} = useQuery(`seasonDetail` , ()=> getSeasonDetails(tvid , sesid));

  

  

  const ratingWidth = data?.data?.vote_average.toFixed(1) ;

   




  return (
    <>

    <div className={style.backgroundimg}  style={{backgroundImage: `url(${imgPrefix + (data?.data.backdrop_path ?  data?.data.backdrop_path :  data?.data.poster_path)})`}}></div>
    <div className='container'>
        <div className='row '>
          <div className='col-sm-12 col-md-3'>
            <div className='poster'>
              <img src={imgPrefix + data?.data.poster_path}  alt='poster' className='w-100 ' />
            </div>

          </div>

          <div className='col-sm-12 col-md-9 '>
           <div className='tvdetails'>
             <h3 className='my-3' style={{color:'yellow' , lineHeight:'1.5' , fontStyle:'italic'}}>{data?.data.name}</h3>

          <div className='info   fs-4 text-capitalize align-items-center'>
            <div className={` mb-3   ${style.trycircle}`}>
            <CircularProgressbar value={ratingWidth} minValue={0} maxValue={10} text={`${ratingWidth}`}
              styles={buildStyles({
                textColor:"#fff",
                trailColor:'#1d2437',
                pathColor : '#139ad4',
                pathTransitionDuration: 2,
              })}
            />
            </div>

          </div>

          

          

          <div className='d-block  justify-content-between text-capitalize  '>
            <p className='mx-1 fs-5' > episodes :  {data?.data.episodes.length} </p>
            <p className='mx-1 fs-5'> release date : {data?.data.air_date}</p>
            <p className='mx-1 fs-5'> average episode time : {data?.data.episode_run_time && data?.data.episode_run_time.length > 0 ? data?.data.episode_run_time : `${23} min`}</p>
          </div>


        </div>
      </div>

      
        </div>


    
        <div > 
          <h3 className='text-center text-info text-capitalize fw-bold fst-italic fs-1 my-5' style={{letterSpacing:`3px`}}>episodes</h3>
        {data?.data.episodes.map((episode , index)=>(
          <div className='row gy-4  border-bottom my-4 pb-4' key={index}>
          <div className='col-md-4'>
            <div className='poster position-relative'>
                <div className='position-absolute top-0 end-0 '>
                  < div className="badge text-center text-bg-primary p-2" style={{fontSize:'15px'}}>{episode.vote_average.toFixed(1)}</div>
                </div>
              <img src={imgPrefix + episode.still_path} className='w-100'  alt='poster'/>
            </div>
          </div>
          <div className='col-md-8'>
            <h4 className='text-capitalize mb-3' style={{lineHeight:`1.6`}}><span className='text-warning '>name</span> : {episode.name}</h4>
            <h5 className='text-capitalize'> <span className='text-warning my-5 fw-bold'>overview</span> : </h5>
            <p className='text-capitalize   mb-3' style={{lineHeight:'1.8' , fontSize:`20px`}}>{episode.overview}</p>
            <div className='d-sm-block d-md-flex  align-items-center'>
              <h5 className='me-0 me-md-5 mb-3 mb-md-0 '> <span className='text-info text-capitalize'>episode</span> : {episode.episode_number} </h5>
              <h5 className='ms-0 ms-md-5'><span className='  text-warning text-capitalize'>runtime</span> : {episode.runtime} min</h5>
            </div>

          </div>
          </div>
        ))}
        </div>
     </div>


    </>
  )
}


  
 