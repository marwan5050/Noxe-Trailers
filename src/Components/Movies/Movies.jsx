import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Trendmedia } from '../../Context/Media';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import axios from 'axios';
import {Bars} from 'react-loader-spinner';
import avatar2 from '../Assets/Images/view-3d-film-reel.jpg';
import Pagination from '../Pagination/Pagination';
import { Helmet } from 'react-helmet';


export default function Movies() {

  const {getMoviesPagi, imgPrefix ,  selectedGenre , moviePage } = useContext(Trendmedia);


  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  


 async function getSimilarMovies(page){

    if (!selectedGenre){ 
      return await getMoviesPagi(page)
    } 

  return  axios.get(`https://api.themoviedb.org/3/movie/${selectedGenre}/similar?api_key=c86c012da8e94ae7661bc41ec07634bd&page=${page}`);
  }



  const { data , isLoading } = useQuery(['similarMovies', selectedGenre , moviePage ], ()=> getSimilarMovies(moviePage));

  
  const movies = data ? data?.data.results : [];


  function handleSavedMovies(){
    if(selectedGenre === 'favmovie'){
       return savedMovies;
    }
  }


 useEffect(()=>{
  handleSavedMovies();
 },[]);

  return (
    <>
    
   
    <Helmet>
      <meta charSet="utf-8" />
      <title>Movies</title>
    </Helmet>
    <div className='container'>
      <div className="row gx-2">
          <div className="col-md-4 col-lg-3">
            <SideNav mediaType="movie" />
          </div>

          <div className="col-md-8 col-lg-9">
            <div className="container">
              <div className="row gy-3">
                {selectedGenre === 'favmovie' && savedMovies.length > 0 ?(
                  savedMovies.map((movie, indx) => (
                    <div className=" col-md-4 col-lg-3  " key={indx}>
                      <Link to={`/moviedetails/${movie.id}`}>
                        <div className="mve position-relative">
                          <div className="position-absolute top-0 end-0 ">
                            <div className="badge text-center text-bg-primary p-2" style={{ fontSize: '15px' }}>
                              {movie.vote_average.toFixed(1)}
                            </div>
                          </div>
                          {movie.poster_path ? (
                            <img src={imgPrefix + movie.poster_path} alt={movie.title} className="w-100" height={350} />
                          ) : (
                            <img src={avatar2} alt={movie.title} className="w-100" height={350} />
                          )}
                        </div>
                      </Link>
                      <div className="text-center text-capitalize my-1 fst-italic">{movie.title}</div>
                    </div>
                  ))
                
                ) : isLoading ? (<>
                <div className="vh-100 d-flex justify-content-center align-items-center">
                        <Bars
                          height="80"
                          width="80"
                          radius="9"
                          color="#ffc107"
                          ariaLabel="three-dots-loading"
                          wrapperStyle
                          wrapperClass
                        />
                      </div>
                </>) :  movies.length > 0 ? movies.map((movie, index) => (
                      <div className='col-md-6 col-lg-3' key={index}>
                        <Link to={`/moviedetails/${movie.id}`}>
                          <div className='mve  position-relative'>
                            <div className='position-absolute top-0 end-0 '>
                              < div className="badge text-center text-bg-primary p-2" style={{fontSize:'15px'}}>{movie.vote_average.toFixed(1)}</div>
                            </div>
                          {movie.poster_path ? <>
                            <img src={imgPrefix + movie.poster_path} alt={movie.title} className='w-100' height={350} />
                            </>: <img src={avatar2} alt={movie.title} className='w-100' height={350} />}
                          </div>
                        </Link>
                        <div className='text-center text-capitalize my-1  fst-italic '>{movie.title}</div>
                      </div>
                      
                    ))
                    
              
              :<div className='vh-100 d-flex justify-content-center align-items-center text-capitalize fs-4'>there's no data try again soon 😟 </div>}
              </div>  
            </div>

            {selectedGenre !== 'favmovie' && (
          <div className="pagi my-4">
            <Pagination mediaType="movie" />
          </div>
        )}

            
          </div>
        </div>
      </div>
    </>
  )
}



 
