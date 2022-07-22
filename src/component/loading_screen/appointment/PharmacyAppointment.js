import React,{useState} from 'react'
import {IoCloseSharp} from 'react-icons/io5';
import '../appointmentcss/LabAppointment.css'

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
  backgroundColor:'#fdf5e6',
  transform:'translate(-50%,-50%)',
  zIndex:10,
  paddingTop:'1%',
  width:'85%',
  height:'75%',
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


const PharmacyAppointment = ({val,close}) => {
  const [checkStatus,setStatus]=useState(true);
  return (
    <div style={OVERLAY_STYLES}>
    <div style={MODAL_STYLE}>
      <IoCloseSharp onClick={close} type="button" style={BUTT_ST} size={25}/>
      <div className="LabAppointment">
        <div className="LALabImage">
          <img src={val.imageUrl?val.imageUrl:'exlogo.png'} alt="alternate"/>
          <h2>{val.name}</h2>
        </div>

        <div className="LAOwner">
        <img src={val.ownerImage?val.ownerImage:'exlogo.png'} alt="alternate"/>
        <div style={{fontWeight:'bold'}}>{val.owner}<br/>{val.location}</div>
        </div>
        {
          checkStatus?
          <>
          <div className="LAContent">{val.speciality}</div>
          <div className="LaAppointmentBtnSection">
          <button type="button" className="hospitalAppointmentBtn" onClick={()=>setStatus(false)}>Order Something</button>
          </div>
          </>
          :
          <div className="LPAppointmentForm">
         <h3> Please fill data</h3>
        <span className="signup-textstyle">Problem:{'  '}
          <input type="text" className="input-text" placeholder="..."/></span>
          <br/><br/> 

        <span className="signup-textstyle">Medicine Name:{'  '}</span>
            <input type="text" className="input-text" placeholder="..."/>
          <br/><br/>   
        
        <span className="signup-textstyle">Delivery Time Preference:{'  '}</span>
          <input type="date" className="input-text"/>      

        <div className="DoctorBtnSection2">
          <button type="button" className="Doctorbtn" >Make an appointment</button>{' '}        
          <button type="button" className="Doctorbtn" onClick={()=>setStatus(true)}>Cancel</button> 
        </div>
        </div>
        }
      </div>
      </div>    
      </div>

  )
}

export default PharmacyAppointment;
