import React from 'react'
import {IoArrowBackSharp} from 'react-icons/io5';

const NormalDoctor = ({check,close}) => {
  if(check===null) return null;
  return (
    <div className="SwappingArea" >
      <button onClick={()=>close("null")} type="button" style={{color:'teal',border:'none',background:'transparent',cursor:'pointer'}}>
        <IoArrowBackSharp size={25}/>
      </button>
      <div className="carouseltext" style={{marginTop:'-50px',marginLeft:'30px',marginRight:'30px'}}>General Doctors</div>
    </div>
  )
}

export default NormalDoctor
