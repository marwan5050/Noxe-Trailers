import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const HighRated = createContext(``);


export default function HighRatedProvider(props){


    const [RmoviesId , setRmoviesId] = useState([]);

    const [RmBg , setRmBg] = useState(``);

    const [RtvId , setRtvId] = useState([]);

    const [RtBg , setRtBg] = useState(``);

    async function getRatedMovies(){

        try {
            
          const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=c86c012da8e94ae7661bc41ec07634bd`);

          const ratedMids = response?.data.results.map((item)=> item.id);

          const ratedMbg = response?.data.results[0].poster_path;

          setRmoviesId(ratedMids);

          setRmBg(ratedMbg);

          return ratedMids;

        } catch (error) {
            
            console.error(`error fetch rated movies data` , error);

            return null;
        }
    }


    async function getRatedTv(){

        try {
            
            const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=c86c012da8e94ae7661bc41ec07634bd`);

            const RatedTids = response?.data.results.map((item)=> item.id);

            const ratedtBg = response?.data.results[0].poster_path;

            setRtBg(ratedtBg)

            setRtvId(RatedTids);

            return RatedTids;
        } catch (error) {
            
        }
    }


    const {data : ratedmovies , refetch : reRmovies} = useQuery(`topRated movies` , ()=> getRatedMovies());

    const {data : ratedtv , refetch : reRtv} = useQuery(`topRated tvs` , ()=> getRatedTv());


    useEffect(()=>{

        reRmovies();
        reRtv();
    },[])

    // console.log(RmoviesId);

    return <HighRated.Provider value={{RmoviesId , RtvId , RmBg , RtBg }}>

        {props.children}
    </HighRated.Provider>
}