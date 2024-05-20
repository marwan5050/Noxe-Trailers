import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Trailers } from '../../../Context/LatestTrails'
import navstyle from './Snav.module.css';


export default function Snav() {

   const {handleMovies , handleTvs , selectedMediaType , handleCate , handleActive , isNowActive} = useContext(Trailers)

    function handleNowplay(){
      handleCate('NowPlaying');
      handleActive(true);
    }

    function handleUpcoming(){
      handleCate('UpComing');
      handleActive(false)
    }

    function handlePopular(){
      handleCate('Popular');
      handleActive(false)
    }

    function handleTopRated(){
      handleCate('TopRated');
      handleActive(false)

    }

  return (
    <>

    <nav className="navbar navbar-expand-md navbar-dark text-white mb-5 bg-transparient" style={{backgroundColor:`rgba(0,0,0,.2)`}}>
  <div className="container">
    <NavLink className="navbar-brand text-info fst-italic fw-bold  text-capitalize" to="">latest trailers</NavLink>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">
      <ul className="navbar-nav mx-auto mt-2 mt-lg-0 ">
       
      <li className="nav-item mb-1 mb-md-0 ">
          <NavLink onClick={()=> handleNowplay()} className={  isNowActive ? `${navstyle.NavLink}` : 'nav-link'} to="/nowplaying">NowPlaying</NavLink>
        </li>

      

        <li className="nav-item  ">
          <NavLink onClick={()=> handleUpcoming()} className={({ isActive }) => (isActive ? `${navstyle.NavLink}` : 'nav-link')} to="/upcoming">UpComing</NavLink>
        </li>

        
        

        
        <li className="nav-item ">
          <NavLink onClick={()=> handlePopular()} className={({ isActive }) => (isActive ? `${navstyle.NavLink}` : 'nav-link')} to="/popular">Popular</NavLink>
        </li>

       
       
        <li className="nav-item  ">
          <NavLink onClick={()=> handleTopRated()} className={({ isActive }) => (isActive ? `${navstyle.NavLink}` : 'nav-link')} to="/toprated">TopRated</NavLink>
        </li>

       
        
        
      </ul>

        <div className='mt-3 mt-md-0 d-sm-block d-md-flex '>
        
        <button onClick={()=> handleMovies()} className={` btn btn-outline-success  me-2  text-capitalize ${selectedMediaType === 'movie' ? 'active' : ''}`} type="submit">movies</button>
        <button onClick={()=> handleTvs()} className={` btn btn-outline-success me-2 text-capitalize ${selectedMediaType === 'tv' ? 'active' : ''}`} type="submit">tvs</button>
        </div>

      
    </div>
  </div>
</nav>
    </>
  )
}
