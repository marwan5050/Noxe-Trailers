import React, { useContext } from 'react';
import { Trendmedia } from '../../Context/Media';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import ActorMovies from './ActorMovies';
import ActorTv from './ActorTv';
import { Helmet } from 'react-helmet';



export default function ActorsDetails() {

  const {id} = useParams();

  const {imgPrefix} = useContext(Trendmedia);

  async function actorDetails(id){

    try {
      
      return await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    } catch (error) {
      
      console.error(`error fetch actor details data` , error);

      return null;
    }
  }

  const {data} = useQuery(`actordetails` , ()=> actorDetails(id));


  


  return (
    
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{data?.data.name}</title>
      
    </Helmet>

<div className='mx-0 mx-md-4'>
    <div className='row'>
      <div className='col-sm-12 col-md-2'>
        <div className='poster'>
          <img src={imgPrefix + data?.data?.profile_path} className='w-100' height={300} title='poster'/>
        </div>
      </div>

      <div className='col-sm-12 col-md-8 ms-2 ms-md-0'>
        <div className='moviedetils'>
          <h3 className='text-capitalize fst-italic' style={{ lineHeight:'1.7'  }}> Name : <span className='text-warning'>{data?.data.name}</span></h3>

          

          <div className={` my-3 `}>
            <h4 className=' fst-italic'>popularity : <span className='text-warning'> {data?.data.popularity} </span></h4>
          
          </div>

         

           <div className='overview my-3  '>
            <h4 className='text-capitalize fst-italic text-danger ' style={{ letterSpacing:'1px'}}>biography</h4> 
            <p style={{fontSize:'20px' , letterSpacing:'1px' , lineHeight:'1.7'}}>{data?.data.biography}</p>
          </div>

          <div className='d-sm-block d-md-flex justify-content-between text-capitalize  border-bottom'>
            <p className='mx-2 fs-5' > birthday : <span className='text-warning'> {data?.data.birthday} </span> </p>
            <p className='mx-2 fs-5'> place of birth : <span className='text-warning'> {data?.data.place_of_birth} </span></p>
            <p className='mx-2 fs-5'> known for : <span className='text-warning'> {data?.data.known_for_department} </span></p>
          </div>
        </div>
      </div>

     
      
    </div>

    <div className='my-5'>
    <ActorMovies Name={data?.data.name}/>
    </div>

    <div className='my-5'>
    <ActorTv Name={data?.data.name}/>
    </div>
</div>
    </>


  )
}
