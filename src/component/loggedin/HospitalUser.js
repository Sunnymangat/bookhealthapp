import React from 'react'
import '../loggedincss/hospitalUser.css'

const HospitalUser = ({user}) => {
  return (
    <div className='Hospitaluser'>

      <div className='Hospitaluser_img'>  
      <img src={user.imageUrl} alt="ex"/>
      
      </div>
      <div className='Hospitaluser_detail'>
        <div>
      <button type='button' className='Hospitaluser_detail_btn'>New Update</button>
      <button type='button' className='Hospitaluser_detail_btn'>History</button>
      <button type='button' className='Hospitaluser_detail_btn'>Appointments</button>
      <button type='button' className='Hospitaluser_detail_btn'>Details</button>
      <button type='button' className='Hospitaluser_detail_btn'>ReportUser?</button>
        </div>
      </div>
    </div>
  )
}

export default HospitalUser;
