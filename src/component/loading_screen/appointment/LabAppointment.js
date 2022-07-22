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
  backgroundColor:'#f5fffa',
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


const LabAppointment = ({val,close}) => {
  const [checkStatus,setStatus]=useState(true);
  return (
    <div style={OVERLAY_STYLES}>
    <div style={MODAL_STYLE}>
      <IoCloseSharp onClick={close} type="button" style={BUTT_ST} size={25}/>
      <div className="LabAppointment">
        <div className="LALabImage">
          <img src={val.labImage?val.labImage:'exlogo.png'} alt="alternate"/>
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
          <button type="button" className="hospitalAppointmentBtn" onClick={()=>setStatus(false)}>Fix appointment</button>
          </div>
          </>
          :
        <div className="LPAppointmentForm">
         <h3> Please fill data</h3>
        <span className="signup-textstyle">Problem:{'  '}
          <input type="text" className="input-text" placeholder="..."/></span>
          <br/><br/> 

        <span className="signup-textstyle">Test Name:{'  '}
        <input type="text" className="input-text" placeholder="..."/></span>
        <br/><br/>       
        
        <span className="signup-textstyle">Time Preference:{'  '}</span>
          <select name="meeting_Preference" className="input-text" style={{cursor:'pointer',color:'teal',fontSize:'large'}}>
            <option value="Any">Any</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>

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

export default LabAppointment
