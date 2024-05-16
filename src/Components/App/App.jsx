import React from 'react';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Movies from '../Movies/Movies';

import Tv from '../Tv/Tv';

import {RouterProvider,  createHashRouter} from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import MovieCast from '../MovieDetails/MovieCast';
import MovieDetails from '../MovieDetails/MovieDetails';
import TvDetails from '../Tv/TvDetails';
import ActorsDetails from '../Actors/ActorsDetails';
import TvSessons from '../Tv/TvSessons';
import SeasonDetails from '../Tv/SeasonDetails';
import Popular from '../Home/WPopularSec/Popular';

import HomeLayout from '../HomeLayout/HomeLayout';
import Upcoming from '../Home/WPopularSec/Upcoming';
import TopRated from '../Home/WPopularSec/TopRated';
import NowPlaying from '../Home/WPopularSec/NowPlaying';
import { Toaster } from 'react-hot-toast';


export default function App() {

    const routes = createHashRouter([
        {path: '/' , element : <Layout/> , children:[
            {index : true , element :<HomeLayout/>},

            {path : '/' , element :<Home/> , children:[
              
              
              
              {path : 'nowplaying' , element : <NowPlaying/>},
              {path : 'upcoming' , element : <Upcoming/>},
              {path : 'toprated' , element : <TopRated/>},
              {path : 'popular' , element : <Popular/>},
            ]},
             

             
          
            {path : 'movies' , element :<Movies/> },
            {path : 'moviedetails/:id' , element :<MovieDetails/> },
            {path : 'moviecast/:id' , element :<MovieCast/> },
            {path : 'actorsdetails/:id' , element :<ActorsDetails/> },
            
            {path : 'tv' , element :<Tv/> },
            {path : 'tvdetails/:id' , element :<TvDetails/> },
            {path : 'TvSessons/:id' , element :<TvSessons/> },
            {path : 'seasondetails/:tvid/:sesid' , element :<SeasonDetails/> },
            {path : 'sidenav' , element :<SideNav/> },
            
        ]}
    ]);

  return (
    <>
    <RouterProvider router={routes}>
      <Layout />
      
    </RouterProvider>
    <Toaster/>
    </>
  )
}
