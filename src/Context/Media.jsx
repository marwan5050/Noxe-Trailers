import { createContext, useState } from 'react';
import axios from 'axios'; 



export const Trendmedia = createContext([]);


export function MediaProvider(props){

    const imgPrefix = 'https://image.tmdb.org/t/p/w500';

    const [selectedGenre, setSelectedGenre] = useState(null);

    const [searchValue , setSearchValue] = useState('');

    const[selectedAirType , setSelectedAirType] =  useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [totlalTvPag , setTotalTvPage] = useState(``);

    const [moviePage , setMoviePage] = useState(1);

    const [totalMvPage , setTotalMvPage] = useState(``);

   const [favMovie , setFavMovie] = useState([]);

   

   async function getMoviesPagi(moviePage){

    try {
        
        const response =  await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=c86c012da8e94ae7661bc41ec07634bd&page=${moviePage}`)
    
        const totalPages = response?.data.total_pages;
        
        setTotalMvPage(totalPages);

        return response;

    }   catch (error) {
        
        console.error(`error fetch movies pagination data` , error);

        return null;
      }
    }


   async function getMovies(){

    try {
        
        const response =  await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=c86c012da8e94ae7661bc41ec07634bd`)
    
        const totalPages = response?.data.total_pages;
        
        setTotalMvPage(totalPages);

        return response;

    }   catch (error) {
        
        console.error(`error fetch movies data` , error);

        return null;
      }
    }



  async  function getTv(currentPage){

    try {
        
        const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=c86c012da8e94ae7661bc41ec07634bd&page=${currentPage}`)
        const totalPages = response?.data.total_pages;
        
        setTotalTvPage(totalPages);

        return response;

    } catch (error) {
        console.error(`error fetch movies data` , error);

        return null;
    }

    }


    async function getActors(){

        try {
            
            return await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=c86c012da8e94ae7661bc41ec07634bd`)
        
        } catch (error) {
            console.error(`error fetch movies data` , error);
            return null;
        }

    }


    async function onAir(type , airing){

        try {
            return await axios.get(`https://api.themoviedb.org/3/${type}/${airing}?api_key=c86c012da8e94ae7661bc41ec07634bd`)
        } catch (error) {
            
            console.error(`error fetch onair data` , error);
            return null;
        }
    }

    async function getSearch(value){

        try {
         return await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=c86c012da8e94ae7661bc41ec07634bd&query=${value}`)
        } catch (error) {
            
            console.error(`error fetch movies data` , error);
            return null;
        }
    }
    

    function handllePage(newPage){

        if (newPage > 0 && newPage <= totlalTvPag) {
            setCurrentPage(newPage);
        }
    }


    function handlleMoviePage(newPage){

        if (newPage > 0 && newPage <= totalMvPage) {
            setMoviePage(newPage);
        }
    }
    

    

    return <Trendmedia.Provider value={{favMovie , setFavMovie ,getMoviesPagi, moviePage  ,totalMvPage , currentPage ,totlalTvPag , handlleMoviePage  ,handllePage , getMovies ,getActors , getTv, onAir, selectedAirType , setSelectedAirType ,getSearch , searchValue , setSearchValue ,imgPrefix , selectedGenre , setSelectedGenre}}>

        {props.children}

    </Trendmedia.Provider>
}