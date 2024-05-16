import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { Trendmedia } from '../../Context/Media';
import listStyle from './SideNave.module.css';



export default function SideNav({mediaType }) {

  const {setSelectedGenre  } = useContext(Trendmedia);
  const [activeGenre, setActiveGenre] = useState(null);


  async function getList(listtype){

    return  await axios.get(`https://api.themoviedb.org/3/genre/${listtype}/list?api_key=c86c012da8e94ae7661bc41ec07634bd`)
   }

  


 async function getMediaList(){

    if(mediaType === 'movie'){

    return await getList(`movie`);
    }
    else if(mediaType === 'tv'){
    return await getList(`tv`);
    }
    
  }


    const {data} =  useQuery('mediasList' , ()=> getMediaList());

   


    const handleClick = (genreId) => {
      setSelectedGenre(genreId);
      setActiveGenre(genreId)
    };

    const handleShowFavorites = () => {
      setSelectedGenre(mediaType === 'movie' ? 'favmovie' : 'favtv');
      setActiveGenre(mediaType === 'movie' ? 'favmovie' : 'favtv');
    };

    const handleFavtv = () => {
      setSelectedGenre('favtv'); 
      setActiveGenre('favtv');
    };


  return (
    <>
    <div >
     
    <nav className="navbar  navbar-expand-sm navbar-dark " >
     <div className="container">
    
      <button className="navbar-toggler d-lg-none mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon " />
      </button>
      <div className="collapse navbar-collapse" id="sidebar">
        <ul className="navbar-nav d-block me-auto mt-1 mt-lg-0  ">
          <li className='nav-item mb-2 mt-3 text-capitalize text-warning  fs-5'> categories</li>
          <li className={`nav-item my-2 border-bottom border-dark-subtle ${activeGenre === null ? listStyle.active : ''}`}>
            <button className={`nav-link  ${listStyle.list}`} onClick={()=> handleClick(null)} > All </button>
          </li>
          <li className={`nav-item my-2 border-bottom border-dark-subtle ${activeGenre === 'favmovie' || activeGenre === 'favtv' ? listStyle.active : ''}`}>
            <button className={`nav-link  ${listStyle.list}`} onClick={()=> handleShowFavorites()} > Favourites </button>
          </li>
          
        
        {data?.data.genres.map((cate, index) => (
          <li key={index} className={`nav-item my-2 border-bottom border-dark-subtle ${activeGenre === cate.id ? listStyle.active : ''}`}>
            <button className={`nav-link   ${listStyle.list}`} onClick={() => handleClick(cate.id)}>
              {cate.name === 'Adventure' ? 'Animation' : cate.name === 'Animation' ? 'Adventure' : cate.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
   </div>
  </nav>

  </div>

    </>
  )
}




