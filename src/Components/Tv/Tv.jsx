import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Trendmedia } from '../../Context/Media';
import SideNav from '../SideNav/SideNav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Bars} from 'react-loader-spinner';
import avatar2 from '../Assets/Images/view-3d-film-reel.jpg';
import Pagination from '../Pagination/Pagination';
import { Helmet } from 'react-helmet';




export default function Tv() {

  const {getTv , imgPrefix , selectedGenre , currentPage } = useContext(Trendmedia);

  const savedTvs = JSON.parse(localStorage.getItem('savedTvs')) || [];

  async function getSimilarTv(page){

    if (!selectedGenre){ 
      return await getTv(page || 1)
    };

  return  axios.get(`https://api.themoviedb.org/3/tv/${selectedGenre}/similar?api_key=c86c012da8e94ae7661bc41ec07634bd&page=${page}`)
  }


  const {data , isLoading} = useQuery(['similarTv' , selectedGenre , currentPage] , ()=> getSimilarTv(currentPage));

 
  function handleSavedTvs(){
    if(selectedGenre === 'favtv'){
       return savedTvs;
    }
  }


  useEffect(()=>{
    handleSavedTvs();
  },[])





  return (
   <>
    
    <Helmet>
      <meta charSet="utf-8" />
      <title>Tv</title>
      
    </Helmet>

    <div className='row gx-5'>

      <div className='col-md-3'>
        <SideNav mediaType='tv' />
      </div>

      <div className='col-md-9'>

      <div className="container">
          <div className="row gy-3">
            {selectedGenre === 'favtv' && savedTvs.length > 0 ?(
              savedTvs.map((tv, index) => (
                <div className="col-md-3" key={index}>
                  <Link to={`/tvdetails/${tv.id}`}>
                    <div className="mve position-relative">
                      <div className="position-absolute top-0 end-0 ">
                        <div className="badge text-center text-bg-primary p-2" style={{ fontSize: '15px' }}>
                          {tv.vote_average.toFixed(1)}
                        </div>
                      </div>
                      {tv.poster_path ? (
                        <img src={imgPrefix + tv.poster_path} alt={tv.title} className="w-100" height={350} />
                      ) : (
                        <img src={avatar2} alt={tv.title} className="w-100" height={350} />
                      )}
                    </div>
                  </Link>
                  <div className="text-center text-capitalize my-1 fst-italic">{tv.title}</div>
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
            </>) :  data?.data.results.length > 0 ?  data?.data.results.map((series, indx) => (
                  <div className='col-md-3' key={indx}>
                    <Link to={`/tvdetails/${series.id}`}>
                      <div className='mve  position-relative'>
                        <div className='position-absolute top-0 end-0 '>
                          < div className="badge text-center text-bg-primary p-2" style={{fontSize:'15px'}}>{series.vote_average.toFixed(1)}</div>
                        </div>
                      {series.poster_path ? <>
                        <img src={imgPrefix + series.poster_path} alt={series.title} className='w-100' height={350} />
                        </>: <img src={avatar2} alt={series.title} className='w-100' height={350} />}
                      </div>
                    </Link>
                    <div className='text-center text-capitalize my-1  fst-italic '>{series.title}</div>
                  </div>
                  
                ))
                
          
          :<div className='vh-100 d-flex justify-content-center align-items-center text-capitalize fs-4'>there's no data try again soon 😟 </div>}
          </div>  

            
          </div>

        
      {selectedGenre !== 'favtv' && (
        <div className="pagi my-4">
          <Pagination mediaType="tv" />
        </div>
      )}
          
      </div>
    </div>
   </>
  )
}
