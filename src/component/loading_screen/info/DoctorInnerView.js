import React,{useState} from 'react';
import '../infocss/DoctorInnerView.css'

const DoctorInnerView = ({val}) => {
  const [checkStatus,setStatus]=useState(true)
  const [appointment,setAppointment]=useState({problem:"",meetingPreference:"Any"});
  

  const createAppointment = async()=>{ 
    let check=false;
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(appointment)) {
      if(value==="" || (key==='problem' && value.length<=4)){
        check=true;
        break;
      }
      check=false
    }
    if(check){
      console.log('Left')
    }else{
      console.log('done')
    }
  }
  const eventHandler=(e)=>{
    const n=e.target.name;
    const v=e.target.value;
    setAppointment({...appointment,[n]:v})
  }

  return (
    <div className="DoctorInnerView">
        <div className="DoctorImageInnerView">
        <img src={val.imageUrl?val.imageUrl:'exlogo.png'} alt="alernate"/>
        <h2>{val.name}</h2>
        </div>
        
        <div className="DoctorPersonalInfo">
            Personal Information <br/>
            {val.name}<br/>
            {val.city}<br/>
            {val.state}<br/>
            {val.phoneNumber}
        </div>

        <div className="DoctorClinicInfo">
            {val.clinicName}<br/>
            {val.clinicOpening}<br/>
            {val.clinicClosing}<br/>
            {val.clinicLocation}<br/>
        </div>

        <div className="DoctorHouseInfo">
            {val.houseLocation}<br/>{val.houseOpening}<br/>{val.houseClosing}
        </div>

      {
        checkStatus?
        <>
        <div className="DoctorLowerSection">

        <div className="DoctorSpeciality">
          Speciality <br/>
          {val.speciality}
        </div><br/>
        <div className="DoctorHistory">
          Previous History <br/>
          {val.prevHistory}
        </div>
        </div>
        <div className="DoctorBtnSection1">
          <button type="button" className="Doctorbtn" onClick={()=>setStatus(false)}>Fix appointment</button>
        </div>
        </>
        :
        <div className="DoctorAppointmentForms">
         <h3> Please fill data</h3>
        <span className="signup-textstyle">Problem:{'  '}</span>
          <input type="text" className="input-text" name="problem" placeholder="..." onChange={(e)=>eventHandler(e)}/>
          <br/><br/>   
        
        <span className="signup-textstyle">Meeting preference:{'  '}</span>
          <select name="meetingPreference" className="input-text" style={{cursor:'pointer',color:'teal',fontSize:'large'}} onChange={(e)=>eventHandler(e)}>
            <option value="Any">Any</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>

        <div className="DoctorBtnSection2">
          <button type="button" className="Doctorbtn" onClick={()=>createAppointment()}>Make an appointment</button>{' '}        
          <button type="button" className="Doctorbtn" onClick={()=>setStatus(true)}>Cancel</button> 
        </div>
        </div>
      }
      
    </div>
  )
}

export default DoctorInnerView;
