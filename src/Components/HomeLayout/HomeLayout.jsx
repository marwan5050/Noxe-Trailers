import React, { useContext } from 'react';
import Home from '../Home/Home';
import Search from '../Search/Search';
import { Trendmedia } from '../../Context/Media';




export default function HomeLayout() {

  const {searchValue} = useContext(Trendmedia)

  return (
<>
 {searchValue ? <Search /> : <Home />
 }
</> 


)
}
