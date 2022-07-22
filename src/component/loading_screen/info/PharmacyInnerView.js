import React,{useState} from 'react'
import '../infocss/LabPharmacyInnerView.css'

const PharmacyInnerView = ({val}) => {
  const [checkStatus,setStatus]=useState(true)
  const [appointment,setAppointment]=useState({problem:"",medicineName:"",deliveryPreference:""});

  const createOrder = async()=>{ 
    let check=false;
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(appointment)) {
      if(value==="" || value.length<=3){
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
      <img src={val.imageUrl?val.imageUrl:'exlogo.png'} alt="alernate"/>
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
          <button type="button" className="LabPhbtn" onClick={()=>setStatus(false)}>Order Something</button>
        </div>
        </>
        :
        <div className="LPAppointmentForms">
        <h3> Please fill data</h3>
       <span className="signup-textstyle">Problem:{'  '}
         <input name="problem" type="text" className="input-text" placeholder="..." onChange={(e)=>eventHandler(e)}/></span>
         <br/><br/> 

       <span className="signup-textstyle">Medicine Name:{'  '}</span>
           <input name="medicineName" type="text" className="input-text" placeholder="..." onChange={(e)=>eventHandler(e)}/>
         <br/><br/>   
       
       <span className="signup-textstyle">Delivery Time Preference:{'  '}</span>
         <input name="deliveryPreference" type="date" className="input-text" onChange={(e)=>eventHandler(e)}/>      

       <div className="DoctorBtnSection2">
         <button type="button" className="Doctorbtn" onClick={()=>createOrder()}>Make an appointment</button>{' '}        
         <button type="button" className="Doctorbtn" onClick={()=>setStatus(true)}>Cancel</button> 
       </div>
       </div>
      }
    </div>
  )
}

export default PharmacyInnerView;
