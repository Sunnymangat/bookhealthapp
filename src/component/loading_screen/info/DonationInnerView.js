import React,{useState} from 'react'
import '../infocss/DonationInnerView.css'

const DonationInnerView = ({val}) => {
  const [checkStatus,setStatus]=useState(true)
  return (
    <div className="DonationInnerView">
      <img src={val.imageUrl?val.imageUrl:'exlogo.png'} alt="Alternate"/>
      <div style={{fontWeight:'bold'}}>
      <div>{val.title}</div>
      <div>{val.reason}</div>
      </div>
      <div>{val.description}</div>
     
     <div className="LowerPart">
      <div>{val.phoneNumber}</div>
      <div>{val.raisedBy}</div>
      <div>{val.raisedAs}</div>
     </div>
     {
        checkStatus?
        <div>
          <button type="button" className="DonationBtn" onClick={()=>setStatus(false)}>Donate Now</button>
        </div>
        :
        <div className="DoctorAppointmentForm">
         <h3>Under Construction</h3>
         <div className="DoctorBtnSection2">
          <button type="button" className="Doctorbtn" onClick={()=>setStatus(true)}>Cancel</button> 
        </div>
        </div>
      }
    </div>
  )
}

export default DonationInnerView