import React, { useContext, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Search from '../Search/Search';
import { Trendmedia } from '../../Context/Media';
import Footer from '../Footer/Footer';



export default function Layout() {

  const {searchValue} = useContext(Trendmedia);

  

  return (
    <>
    <Navbar/>

    {searchValue ? <Search /> : 


    <Outlet></Outlet>
  }

    <Footer/>

    </>
  )
}
