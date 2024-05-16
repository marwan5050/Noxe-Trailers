import React, { useContext , useEffect, useState } from 'react';
import {  Outlet, useLocation } from 'react-router-dom';
import Snav from './Snav';
import { Trendmedia } from '../../../Context/Media';
import { Trailers } from '../../../Context/LatestTrails';
import { UpComing } from '../../../Context/Upcoming';
import { Pop } from '../../../Context/Popular';
import { HighRated } from '../../../Context/TopRated';
import NowPlaying from './NowPlaying';





export default function WPopularSec() {

  const location = useLocation();
  
  const { selectedMediaType , imgTv ,imgMovie , selectCate  } = useContext(Trailers);
  const { imgPrefix} = useContext(Trendmedia);
  const {popmBg , poptBg  } = useContext(Pop);
  const {  upMovieBg ,upTvBg} = useContext(UpComing);
  const {  RmBg ,RtBg} = useContext(HighRated);






  function handleBg(){

    switch (selectCate) {
      case `NowPlaying`:
       
        return selectedMediaType === 'movie' ? imgPrefix + imgMovie : imgPrefix + imgTv;
        
        break;

        case `UpComing`:

        return selectedMediaType === 'movie' ? imgPrefix + upMovieBg : imgPrefix + upTvBg;
    
        break;

        case `Popular`:

        return selectedMediaType === 'movie' ? imgPrefix + popmBg : imgPrefix + poptBg;
    
        break;


        case `TopRated`:

        return selectedMediaType === 'movie' ? imgPrefix + RmBg : imgPrefix + RtBg;
    
        break;

      default:
        return selectedMediaType === 'movie' ? imgPrefix + imgMovie : imgPrefix + imgTv;    }
  }
 


  
  
  useEffect(()=>{
     
    handleBg();
  },[selectCate , selectedMediaType])


  return (
    <>
    
    <div className='position-relative  container'>
    <div className=' position-absolute top-0 start-0 w-100 h-100 ' style={{backgroundColor:`rgba(0,0,0, .4)`}}></div>
    
    <div className='  py-5  ' style={{backgroundImage: location.pathname === '/' ? `url(${handleBg()})` : `url(${handleBg()})` ,backgroundSize:'cover',backgroundPosition:'center'  , backgroundAttachment:'fixed'}}> 
        
        <div >
          <Snav />
        </div>

      <div >
     
      {location.pathname === '/' && <NowPlaying />}
      <Outlet></Outlet>
      </div>

    </div>
    </div>



   

    </>
  )
}
