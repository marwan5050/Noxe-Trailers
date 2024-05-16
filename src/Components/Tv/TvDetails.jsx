import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Trendmedia } from '../../Context/Media';
import style  from '../MovieDetails/MovieDetails.module.css';
import { CircularProgressbar , buildStyles  } from 'react-circular-progressbar';
import Rating from 'react-rating';
import Tvvideos from './Tvvideos';
import TvCast from './TvCast';
import TvRecomendation from './TvRecomendation';
import { Swiper, SwiperSlide  } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function TvDetails() {

  const {id} =  useParams()

  const {imgPrefix} = useContext(Trendmedia);

  const [seasons , setSeasons] = useState([]);

  const [rate, setRate] = useState(0);


  async function getTvDetails(id){

    try {

     const response  = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=c86c012da8e94ae7661bc41ec07634bd`)
        const seasonsNum = response?.data.seasons.map((season)=> season)
     setSeasons(seasonsNum);
       return response;
    } catch (error) {
      console.error(`error tv details data` , error);

      return null;
    }

    

  }

  const {data} = useQuery('tvdetails' , ()=> getTvDetails(id));

  
  const ratingWidth = data?.data?.vote_average.toFixed(1) ;



  

  const handleChange = (value) => {
    setRate(value);
};   




  const handleAddToWatchlist = () => {

    const savedTvs = JSON.parse(localStorage.getItem('savedTvs')) || [];

    const newTvsDetails = data?.data;
    
    const alreadyExists = savedTvs.some(tv => tv.id === newTvsDetails.id); 
    
    if (!alreadyExists && newTvsDetails) {
      savedTvs.push(newTvsDetails);
      localStorage.setItem('savedTvs', JSON.stringify(savedTvs));
      toast.success(`Tv Added To Your Favourites 😀`,{
        duration:4000,
        position: `top-center`
      });
    } else if(alreadyExists && newTvsDetails){
      toast(`Tv Already Added 🙄`,{
        duration: 4000,
        position: `top-center`
      });
    } else {
      toast.error(`Error Adding Tv 😢`,{
        duration: 4000,
        position: `top-center`
      });
    }
  };







  return (
    <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>{data?.data.name}</title>
      
    </Helmet>

    <div className={style.backgroundimg}  style={{backgroundImage: `url(${imgPrefix + (data?.data.backdrop_path ?  data?.data.backdrop_path :  data?.data.poster_path)})`}}></div>

<div className=' mx-0 mx-md-4 position-relative z-3'>
    <div className='row'>
      <div className='col-sm-12 col-md-2'>
        <div className='poster'>
          <img src={imgPrefix + data?.data.poster_path}  alt='poster' className='w-100 ' />
        </div>

      </div>

      <div className='col-sm-12 col-md-6 ms-2 ms-md-0'>
        <div className='tvdetails'>
          <h3 style={{color:'yellow' , lineHeight:'1.5' , fontStyle:'italic'}}>{data?.data.name}</h3>

          <div className='info  row fs-4 text-capitalize align-items-center'>
            <div className={` col-md-2   ${style.trycircle}`}>
            <CircularProgressbar value={ratingWidth} minValue={0} maxValue={10} text={`${ratingWidth}`}
              styles={buildStyles({
                textColor:"#fff",
                trailColor:'#1d2437',
                pathColor : '#139ad4',
                pathTransitionDuration: 2,
              })}
            />
            </div>

            <div className='sessons col-md-4 '>
              <p>sessons : {data?.data.number_of_seasons}</p>
            </div>

            <div className='sessons col-md-4 '>
              <p>episodes : {data?.data.number_of_episodes}</p>
            </div>
          </div>

          <div className='d-flex my-3'>{data?.data.genres.map((categorey , indexCat)=>
            <div className='badge text-bg-danger mx-1 fs-6'  key={indexCat}>
              {categorey.name} 
            </div>)}
          </div>

          <div className='overview my-3  '>
            <h4 className='text-capitalize fst-italic ' style={{color:'yellow' , letterSpacing:'1px'}}>overview</h4> 
            <p style={{fontSize:'18px' , letterSpacing:'1px' , lineHeight:'1.5'}}>{data?.data.overview}</p>
          </div>

          <div className='d-sm-block d-md-flex justify-content-between text-capitalize  border-bottom'>
            <p className='mx-1 fs-5' > status :  {data?.data.status} </p>
            <p className='mx-1 fs-5'> release date : {data?.data.first_air_date}</p>
            <p className='mx-1 fs-5'> episode time : {data?.data.episode_run_time && data?.data.episode_run_time.length > 0 ? data?.data.episode_run_time : 50  }</p>
          </div>


        </div>
      </div>

      <div className='col-sm-12 col-md-4  ms-2 ms-md-0  '>
        

        <div className={`text-sm-start text-md-end text-capitalize mt-4 ${style.fav}`} >
            add to watch list
          <i onClick={()=>handleAddToWatchlist()} className={`fa-regular fa-heart fa-xl  ms-3`}></i>
        </div>   
        
        <div className='d-flex align-items-center  justify-content-sm-start justify-content-md-end'> 

        <div className=' fs-5  my-5'>{  rate === 1 ? '😢' : rate === 2 ? '😒' : rate === 3 ? '👍' : rate === 4 ? '😘 ' : rate === 5 ? '😍' : 'Rate' }</div>
        <div className=' my-5 ms-1'>   
        <Rating  onChange={handleChange} initialRating={rate} emptySymbol={<i className="fa-regular fa-star" style={{margin:'0px 3px'}} ></i>} fullSymbol={<i className="fa-regular fa-star" style={{color:'gold' , fontSize:'17px' , }}></i>}/>

        </div>
        
          
        </div>


        

      </div>
    </div>

    <div className='my-5'>

      <Tvvideos seasonNumber={seasons}/>
      
    </div>

    <div className='my-5'>
      <TvCast/>
    </div>

    <div className='seasons my-5'>      
    

    <h3 className='text-capitalize ms-2 ms-md-0'>seasons</h3>

      <div className='row'>

      <Swiper 
        modules={[Autoplay]}
        slidesPerView={4}
      
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

        {seasons.filter((season)=> season !== null && season.name !== 'Specials')
        .map((season , sesindx)=>
          <SwiperSlide  key={sesindx}>
          <div className='col' >
            <div className='poster mx-auto position-relative'  style={{width:`60%`}}>
            <div className='position-absolute top-0 end-0 '>
            < div className="badge text-center text-bg-primary p-2" style={{fontSize:'15px'}}>{season.vote_average.toFixed(1)}</div>
          </div>
          <Link to={`/seasondetails/${id}/${season.season_number}`}>
             <img src={imgPrefix + season.poster_path} alt='poster' className='w-100' />
            </Link>
            </div>
          <div className='text-center'>{season.name}</div>
          </div>
        </SwiperSlide>)}

        </Swiper>
      </div>
    </div>

    <div className='my-5'>
      <TvRecomendation/>
    </div>


</div>  
    </>
  )
}
