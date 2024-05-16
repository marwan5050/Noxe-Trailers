import React from 'react';
import TrendingMovies from './TrendingMovies';
import TrendingTv from './TrendingTv';
import TrendingActors from './TrendingActors';
import Home3 from './Home3';
import { Helmet } from 'react-helmet';

import WPopularSec from './WPopularSec/WPopularSec';
import {  useLocation } from 'react-router-dom';





export default function Home() {

   const  location = useLocation();
  

  return (
   <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Noxe App</title>
      
    </Helmet>

    <div>
      <Home3/>
    </div>

    <div className='my-5'>
      <TrendingMovies/>
    </div>

    <div className='my-5'>
      <TrendingTv/>
    </div>

    

<div className='container'>  
       <div>
        <WPopularSec/>
        </div> 
  </div>


    <div className='my-5'>
      <TrendingActors/>
    </div>


   </>
  )
}
