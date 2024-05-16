import axios from 'axios';
import React, { useContext,  useState } from 'react';
import ReactPlayer from 'react-player';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Trendmedia } from '../../Context/Media';
import style  from './MovieDetails.module.css';
import { CircularProgressbar , buildStyles  } from 'react-circular-progressbar';
import MovieCast from '../MovieDetails/MovieCast';
import MovieRcommendations from './MovieRcommendations';
import Rating from 'react-rating';
import {Bars} from 'react-loader-spinner';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function MovieDetails() {

    const {id} = useParams();

    const {imgPrefix} = useContext(Trendmedia);
    const [rate, setRate] = useState(0);
    


   async function getMovieVideos(id){

     return await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    }


    async function getMovieDetails(id){

      return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    }
    

    const {data : movieVideos} = useQuery('movieVaideos' , ()=> getMovieVideos(id) , {
        // refetchOnMount:false,
        // refetchInterval: false
    });

    const {data : movieDetails , isLoading} = useQuery('moviedetails' , ()=> getMovieDetails(id))


    const ratingWidth = movieDetails?.data?.vote_average.toFixed(1) ;


    const handleChange = (value) => {
      setRate(value);
  };   

  

const handleAddToWatchlist = () => {

  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];

  const newMovieDetails = movieDetails?.data;
  
  const alreadyExists = savedMovies.some(movie => movie.id === newMovieDetails.id); 
  
  if (!alreadyExists && newMovieDetails) {
    savedMovies.push(newMovieDetails);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    toast.success(`Movie Added To Your Favourites 😀`,{
      duration:4000,
      position: `top-center`
    });
  } else if(alreadyExists && newMovieDetails){
    toast(`Movie Already Added 🙄`,{
      duration: 4000,
      position: `top-center`
    });
  } else {
    toast.error(`Error Adding Movie 😢`,{
      duration: 4000,
      position: `top-center`
    });
  }
};

  


  return (
    <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>{movieDetails?.data.original_title}</title>
      
    </Helmet>
    <div className={style.backgroundimg}  style={{backgroundImage: `url(${imgPrefix + (movieDetails?.data.backdrop_path ?  movieDetails?.data.backdrop_path :  movieDetails?.data.poster_path)})`}}></div>

<div className={` mx-0 mx-md-4 ${style.details}`} >
    <div className='row'>
      <div className='col-sm-12 col-md-2'>
        <div className='poster'>
          <img src={imgPrefix + movieDetails?.data?.poster_path} className='w-100' height={300} title='poster'/>
        </div>
      </div>

      <div className='col-sm-12 col-md-6 ms-2 ms-md-0'>
        <div className='moviedetils  '>
          <h3 style={{color:'yellow' , lineHeight:'1.5' , fontStyle:'italic'}}>{movieDetails?.data.original_title}</h3>

          

          <div className={` my-3 ${style.trycircle}`}>
          <CircularProgressbar value={ratingWidth} minValue={0} maxValue={10} text={`${ratingWidth}`}
            styles={buildStyles({
              textColor:"#fff",
              trailColor:'#1d2437',
              pathColor : '#139ad4',
              pathTransitionDuration: 2,
            })}
          />
          </div>

          <div className='d-flex my-3'>{movieDetails?.data.genres.map((categorey , indexCat)=>
            <div className='badge text-bg-danger mx-1 fs-6'  key={indexCat}>
              {categorey.name} 
            </div>)}
          </div>

           <div className='overview my-3  '>
            <h4 className='text-capitalize fst-italic ' style={{color:'yellow' , letterSpacing:'1px'}}>overview</h4> 
            <p style={{fontSize:'18px' , letterSpacing:'1px' , lineHeight:'1.5'}}>{movieDetails?.data.overview}</p>
          </div>

          <div className='d-sm-block d-md-flex justify-content-between text-capitalize  border-bottom'>
            <p className='mx-2 fs-5' > status :  {movieDetails?.data.status} </p>
            <p className='mx-2 fs-5'> release date : {movieDetails?.data.release_date}</p>
            <p className='mx-2 fs-5'> runtime : {movieDetails?.data.runtime}</p>
          </div>
        </div>
      </div>

      <div className='col-sm-12 col-md-4  ms-2 ms-md-0'>
        

        <div className={`text-sm-start text-md-end  text-capitalize mt-4 ${style.fav} `} >
            add to watch list
          <i onClick={handleAddToWatchlist} className={`fa-regular fa-heart fa-xl  ms-3`}></i>
        </div>   
        
        <div className='d-flex align-items-center   justify-content-sm-start justify-content-md-end'> 

        <div className=' fs-5  my-5'>{  rate == 1 ? '😢' : rate == 2 ? '😒' : rate === 3 ? '👍' : rate === 4 ? '😘 ' : rate === 5 ? '😍' : 'Rate' }</div>
        <div className=' my-5 ms-1'>   
        <Rating  onChange={handleChange} initialRating={rate} emptySymbol={<i className="fa-regular fa-star" style={{margin:'0px 3px'}} ></i>} fullSymbol={<i className="fa-regular fa-star" style={{color:'gold' , fontSize:'17px' , }}></i>}/>

        </div>
        
        </div>

      </div>
      
    </div>

    <div className='my-5'>
      <h3 className='text-capitalize ms-2 ms-md-0'>official trailers</h3>

      
   {isLoading ? <>
   
    <div className='d-flex justify-content-center align-items-center'>
          <Bars
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
        />
     </div>
   </> : <>

      {movieVideos?.data.results.length < 2  ? <div className='text-center mx-auto'>
        <ReactPlayer
        url={`https://www.youtube.com/watch?v=${movieVideos?.data.results[0]?.key}`}
        controls
        width="30%"
        height="200px"
        />
      </div> : <>

   

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

      {movieVideos?.data.results.map((video ,index)=> 
      <SwiperSlide  key={index}> 
       <div className='px-1' >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video?.key}`}
          controls
          width="100%"
          height="200px"
          />
      </div>
      </SwiperSlide>
      
      )}
      </Swiper>
    
    </>}
    </>}


    </div>

    <div className='my-5'>
      <MovieCast/>
    </div>

    <div className='my-5'>
      <MovieRcommendations/>      
    </div>

</div>

    </>
  )
}
