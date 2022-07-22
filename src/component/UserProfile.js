import React from 'react'
import HospitalUser from './loggedin/HospitalUser'
import NormalUser from './loggedin/NormalUser'
import DoctorUser from './loggedin/DoctorUser'

const UserProfile = ({details,logOut}) => {
  return (
    <div>
        <div style={{textAlign:'center'}}>
        <h2>{details.name}</h2><br/>
        {
            details.account==="User" &&
            <NormalUser user={details}/>
        }
        {
            details.account==="Hospital" &&
            <HospitalUser user={details}/>          
        }
        {
          details.account==="Doctor" &&
          <DoctorUser user={details}/>
        }
        <button className="loginbtn"  type='button' onClick={()=>{logOut()}}>Log Out</button>
        </div>
    </div>
  )
}

export default UserProfile;
