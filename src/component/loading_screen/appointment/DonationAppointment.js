import React,{useState} from 'react'
import {IoCloseSharp} from 'react-icons/io5';
import '../appointmentcss/DonationAppointment.css'

const OVERLAY_STYLES={
  position: 'fixed',
  top:0,
  bottom:0,
  left:0,
  right:0,
  backgroundColor:'rgba(1,1,1,0.9)',
  zIndex:10,
}

const MODAL_STYLE={
  position:'fixed',
  top:'50%',
  left:'50%',
  backgroundColor:'#f0fff0',
  transform:'translate(-50%,-50%)',
  zIndex:10,
  paddingTop:'1%',
  width:'85%',
  height:'80%',
  borderRadius:'10px',
  overflow:'auto'
}

const BUTT_ST={
  position: 'fixed',
  top:0,
  right:0,
  paddingRight:'0.15%',
  paddingTop:'0.15%' ,
  zIndex:30,
  cursor:'pointer'
}


const Donation = ({val,close}) => {
  const [checkStatus,setStatus]=useState(true);
  return (
    <div style={OVERLAY_STYLES}>
    <div style={MODAL_STYLE}>
      <IoCloseSharp onClick={close} type="button" style={BUTT_ST} size={25}/>
      <div className="DonationAppointment">
        <div>
          <img src={val.imageUrl?val.imageUrl:'exlogo.png'} alt="alternate"/><br/>   
          <div style={{fontWeight:'bold'}}>
          {val.reason}<br/>
          {val.phoneNumber}<br/><br/>
          {val.location}<br/>
          {val.state}
          </div>
        </div>
        {
          checkStatus?
          <>
          <div className="DADescription">{val.description}</div>
          <div className="DABtnSection1">
          <button type="button" className="hospitalAppointmentBtn" onClick={()=>setStatus(false)}>Report?</button>
          </div>
          </>
          :
          <div className="DoctorAppointmentForm">
         <h3>Under Construction</h3>
         <div className="DoctorBtnSection2">
          <button type="button" className="Doctorbtn" onClick={()=>setStatus(true)}>Cancel</button> 
        </div>
        </div>
          }
      </div>
      </div>    
      </div>

  )
}

export default Donation;
