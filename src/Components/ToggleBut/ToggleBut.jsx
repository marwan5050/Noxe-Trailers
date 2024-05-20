import React  from 'react';
import Togbut from './ToggleBut.module.css';


export default function ToggleBut({selected , headname ,firstbut , secondbut , handleday , handweek}) {
    

  return (
    <>
    
    <div className='head-content d-block-sm d-md-flex justify-content-between mb-3'>
      <h3 className=' text-capitalize fst-italic'>{headname}</h3>

      <div className={Togbut.toggleContainer}>

          <div className={`${Togbut.toggleEle}`}>
              <div className={`my-1 ms-1 text-capitalize fst-italic ${selected ? Togbut.day :   Togbut.active}`} onClick={()=> handleday()} >{firstbut}</div>
              <div className={`my-1 me-1 text-capitalize fst-italic ${selected ? Togbut.active : Togbut.week}`} onClick={()=> handweek()} >{secondbut}</div>
          </div>
      </div>
    </div>





     

    


    </>


  )
}


