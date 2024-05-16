import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../Assets/Images/logo-dark.webp';
import { useContext } from 'react';
import { Trendmedia } from '../../Context/Media';



export default function Navbar() {

  const {setSearchValue} = useContext(Trendmedia);

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent p-4 position-relative z-3">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img src={logo} alt='logo'/></Link>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">
      <ul className="navbar-nav pt-1 fs-5 me-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " to="/" aria-current="page">Home
            <span className="visually-hidden">(current)</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies">Movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/tv">Tv</NavLink>
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="d-flex" role="search">
        <input className="form-control me-2" type="search" onKeyUp={(e)=>setSearchValue(e.target.value)} placeholder="Search" aria-label="Search"/>
      </form>
      
    </div>
  </div>
</nav>

    </>
  )
}
