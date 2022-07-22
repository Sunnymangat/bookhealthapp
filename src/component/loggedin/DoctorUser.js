import React from 'react'

const DoctorUser = ({user}) => {
  return (
    <div className='Normaluser'>

    <div className='Normaluser_img'>  
    <img src={user.imageUrl} alt="ex"/>
    
    </div>
    <div className='Normaluser_detail'>
    <button type='button' className='Normaluser_detail_btn'>History</button>
    <button type='button' className='Normaluser_detail_btn'>Appointments</button>
    <button type='button' className='Normaluser_detail_btn'>Details</button>
    <button type='button' className='Normaluser_detail_btn'>ReportUser?</button>
    </div>
  </div>
  )
}

export default DoctorUser
