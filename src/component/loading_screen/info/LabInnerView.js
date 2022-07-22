import React,{useState} from 'react'
import '../infocss/LabPharmacyInnerView.css'

const LabInnerView = ({val}) => {
  const [checkStatus,setStatus]=useState(true)
  const [appointment,setAppointment]=useState({problem:"",testName:"",meetingPreference:"Any"});

  const createAppointment = async()=>{ 
    let check=false;
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(appointment)) {
      if(key!=='meetingPreference' && (value==="" || value.length<=3)){
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
    <div className="LabPhInnerView">
      <div className="LabPhImageInnerView">
      <img src={val.labImage?val.labImage:'exlogo.png'} alt="alernate"/>
      <h2>{val.name}</h2>
      </div>
      <div className="LabPhPersonalInfo">
        {val.name}<br/>
        {val.location}<br/>
        {val.city}<br/>
        {val.phoneNumber}
        </div>
      <div className="LabPhOwnerImageInnerView">
      <img src={val.ownerImage?val.ownerImage:'exlogo.png'} alt="alernate"/>
      <h2>{val.owner}</h2>
      </div>  
      {
        checkStatus?
        <>
        <div className="LabPhInnerSpeciality">
          Speciality <br/>
          {val.speciality}
        </div>
        <div className="LabPhBtnSection1">
          <button type="button" className="LabPhbtn" onClick={()=>setStatus(false)}>Fix appointment</button>
        </div>
        </>
        :
        <div className="LPAppointmentForms">
         <h3> Please fill data</h3>
        <span className="signup-textstyle">Problem:{'  '}
          <input type="text" name="problem" className="input-text" placeholder="..."  onChange={(e)=>eventHandler(e)}/></span>
          <br/><br/> 

        <span className="signup-textstyle">Test Name:{'  '}
        <input type="text" name="testName" className="input-text" placeholder="..."  onChange={(e)=>eventHandler(e)}/></span>
        <br/><br/>       
        
        <span className="signup-textstyle">Time Preference:{'  '}</span>
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

export default LabInnerView
