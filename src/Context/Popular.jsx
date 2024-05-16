import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const Pop = createContext(``);


export default function PopTrailer(props){

    const [popMid , setPopMid] = useState([]);

    const [popmBg , setPopmBg] = useState(``);

    const [popTvid , setPopTvid] = useState([]);

    const [poptBg , setPoptBg] = useState(``);


    async function getPopMovies(){

        try {
            
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c86c012da8e94ae7661bc41ec07634bd`);
                const PopIds = response?.data.results.map((item)=> item.id);
                const popularMbg = response?.data.results[0].poster_path;

                setPopmBg(popularMbg);
                setPopMid(PopIds);

                return PopIds;

        } catch (error) {
            
            console.error(`error fetch popular movies data` , error);

            return null;
        }
    }


    async function getPopTv(){

        try {
            
         const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=c86c012da8e94ae7661bc41ec07634bd`)

         const popTvids = response?.data.results.map((item)=> item.id);

         const popTvBg = response?.data.results[0].poster_path;

         setPopTvid(popTvids);
         setPoptBg(popTvBg)

         return popTvids

        } catch (error) {
            
            console.error(`error fetch popular tv data` , error);

            return error;
        }
    }


    const {data : popmovies , refetch : popreftch} =  useQuery(`popularMovies` , ()=> getPopMovies());

    const {data : poptvs , refetch : poptvreftch} =  useQuery(`popularTvs` , ()=> getPopTv());



    useEffect(()=>{

        popreftch();
        poptvreftch();
    },[]);

// console.log(popTvid)

    return <Pop.Provider value={{popMid , popTvid , popmBg ,poptBg }}>

        {props.children}
    </Pop.Provider>
}