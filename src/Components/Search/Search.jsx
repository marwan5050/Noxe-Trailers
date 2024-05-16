import React, { useContext , useEffect } from 'react';
import { useQuery } from 'react-query';
import { Trendmedia } from '../../Context/Media';
import avatar2 from '../Assets/Images/view-3d-film-reel.jpg';
import {Bars} from 'react-loader-spinner';
import { Link } from 'react-router-dom';




export default function Search() {

    const {getSearch ,setSearchValue , searchValue , imgPrefix} = useContext(Trendmedia);

    const {data , refetch , isLoading} = useQuery(`searchvalue` , ()=> getSearch(searchValue))

    useEffect(() => {
        refetch();
        console.log(searchValue);

    }, [searchValue]);



    function clearSearchInput(){
      setSearchValue(``);
    }

  return (
    <>

    <div className='row gy-4'>

      {isLoading ? <>
      
          <div className='d-flex justify-content-center align-items-center'>
            <Bars
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
          />
      </div>
      </>:(
      data ? data?.data.results.map((val , index)=><div className='col-md-3' key={index}>

        <div className='valContainer'>
        {val.media_type === `movie` ? <>
        <Link to={`/moviedetails/${val.id}`} onClick={clearSearchInput}>
          {val.poster_path ? <>
            <img src={imgPrefix + val.poster_path} alt='poster' className='w-100' height={500}/>

          </>: val.profile_path ? <>
          <img src={imgPrefix + val.profile_path} alt='poster' className='w-100' height={500}/>

          </> : <>
          <img src={avatar2} alt='poster' className='w-100' height={500}/>

          </>}
          </Link>
          </>: val.media_type === `tv`? <>
          <Link to={`/tvdetails/${val.id}`} onClick={clearSearchInput}>
          {val.poster_path ? <>
            <img src={imgPrefix + val.poster_path} alt='poster' className='w-100' height={500}/>

          </>: val.profile_path ? <>
          <img src={imgPrefix + val.profile_path} alt='poster' className='w-100' height={500}/>

          </> : <>
          <img src={avatar2} alt='poster' className='w-100' height={500}/>

          </>}
          </Link>
          </> : val.media_type === `person` ? <>
          <Link to={`/actorsdetails/${val.id}` } onClick={clearSearchInput}>
          {val.poster_path ? <>
            <img src={imgPrefix + val.poster_path} alt='poster' className='w-100' height={500}/>

          </>: val.profile_path ? <>
          <img src={imgPrefix + val.profile_path} alt='poster' className='w-100' height={500}/>

          </> : <>
          <img src={avatar2} alt='poster' className='w-100' height={500}/>

          </>}
          </Link>
          </>:''}
        </div>

    </div>):<div className=' text-capitalize fs-4'>there's no data try again soon 😟 </div>)}

    </div>
    </>

    
  )
}
