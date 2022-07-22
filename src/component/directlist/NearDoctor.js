import React from 'react'
import {IoArrowBackSharp} from 'react-icons/io5';

const NearDoctor = ({check,close}) => {
  if(check===null) return null;
  return (
    <div>
      <button onClick={()=>close("null")} type="button" style={{color:'teal',border:'none',background:'transparent',cursor:'pointer'}}>
        <IoArrowBackSharp size={25}/>
      </button>
      <div className="carouseltext" style={{marginTop:'-50px',marginLeft:'30px',marginRight:'30px'}}>NearBy Doctors</div>
    </div>
  )
}

export default NearDoctor
