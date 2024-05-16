import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export  const UpComing = createContext(``);


export default function UpcomingTrailer(props){

    const [upMovie , setUpMovie] = useState([]);

    const [upTv , setUpTv] = useState([]);

    const [upMovieBg , setUpMovieBg] = useState(``);

    const [upTvBg , setUpTvBg] = useState(``);

    async function getUpmIds(){

        try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=c86c012da8e94ae7661bc41ec07634bd`);

         const upId = response?.data.results.map((item)=> item.id);
         const upmBg = response?.data.results[0].poster_path;
         
         setUpMovieBg(upmBg);
         setUpMovie(upId);
         return upId;

        } catch (error) {
            
            console.error('err fetch upcming movies data' , error);
            return null;
        }
    }


    async function getUpTIds(){

        try {

            const response = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=c86c012da8e94ae7661bc41ec07634bd`);
            const uptId = response?.data.results.map((item)=> item.id);
            const upTbg = response?.data.results[0].poster_path;
            
            setUpTvBg(upTbg);
            setUpTv(uptId);
            return uptId;
        } catch (error) {
            
            console.error(`err fetch tv ids data` , error);

            return null;
        }

    }


    const {data: upmId , refetch : uprefetch} = useQuery(`upmovies`, ()=> getUpmIds());

    const {data : upTvId , refetch : uptreftech} = useQuery(`upTvid` , ()=> getUpTIds())



    useEffect(()=>{

        uprefetch();
        uptreftech();
    },[])


    return <UpComing.Provider value={{upMovie , upTv , upMovieBg , upTvBg}}>

        {props.children}
    </UpComing.Provider>
}