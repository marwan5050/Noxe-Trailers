import React, { useContext } from 'react';

import { Trendmedia } from '../../Context/Media';
import { useQuery } from 'react-query';


 
export default function Actors() {

  const {getActors , imgPrefix} =  useContext(Trendmedia);

  const {data} = useQuery('actors' , ()=> getActors());

  

  return (
    <>

        <div className='row'>
            {data?.data.results.map((actor)=><div className='col-md-3' key={actor.id}>
                <div className='actor'>
                    <img src={imgPrefix + actor.profile_path} alt='poster' className='w-100'/>
                    <h4 className='text-center my-2'>{actor.name}</h4>
                </div>
            </div>)}
        </div>

    </>

    

  )
}
