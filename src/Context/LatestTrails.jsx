import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const Trailers =  createContext(``);


export function LatestTrail(props){


   const [selectedMediaType , setSelctedMediaTyep] = useState('movie');

   const [theVidId , setThrVidId] = useState([]);

   const  [tvId , setTvId] = useState([]);

  const [imgMovie , setImageMovie] = useState(``);

  const [imgTv , setImageTv] = useState(``);
  

  const [selectCate , setSelectCate] = useState(``);

  const [isNowActive , setNowActive] = useState(true);


  async function getVidesId(){

    try {

      const response =  await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=c86c012da8e94ae7661bc41ec07634bd`);
      const TheIds = response?.data.results.map(item => item.id);
      const moviebg = response?.data.results[0].poster_path;

            setImageMovie(moviebg)
           setThrVidId(TheIds);
           return TheIds;
       
  } catch (error) {
      
      console.error(`error fetch onair data` , error);

      return null;
  }
}



    async function getTvId(){

      try {

        const response =  await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=c86c012da8e94ae7661bc41ec07634bd`);
        const TheIds = response?.data.results.map(item => item.id);
        const tvbg = response?.data.results[0].poster_path;

        setImageTv(tvbg);
        setTvId(TheIds);
        return TheIds;
        
    } catch (error) {
        
        console.error(`error fetch onair data` , error);

        return null;
    }
    }

  const {data : moviesId , refetch : morefetch} = useQuery(`moviesvideosId` ,  ()=>  getVidesId() );

  const {data : tvsId , refetch : tvrefetch} = useQuery(`tvvideosId` ,  ()=>  getTvId() );




   
useEffect(()=>{
  morefetch();
  tvrefetch();
},[selectedMediaType])
 


  function handleMovies(){

    setSelctedMediaTyep('movie');
    
  }
  function handleTvs(){

    setSelctedMediaTyep('tv');
    
  }

  function handleCate(cate){

    setSelectCate(cate);
  }

  function handleActive(active){

    setNowActive(active);
   }




   


    return <Trailers.Provider value={{isNowActive , handleActive ,handleCate , selectCate ,theVidId , imgTv , imgMovie , tvsId ,tvId  ,moviesId ,selectedMediaType ,handleMovies , handleTvs  }}>
       {props.children}
    </Trailers.Provider>
 }