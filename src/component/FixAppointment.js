import React from 'react'
import HospitalAppointment from './loading_screen/appointment/HospitalAppointment';
import DoctorAppointment from './loading_screen/appointment/DoctorAppointment';
import LabAppointment from './loading_screen/appointment/LabAppointment';
import PharmacyAppointment from './loading_screen/appointment/PharmacyAppointment';
import DonationAppointment from './loading_screen/appointment/DonationAppointment';

const FixAppointment = ({check,val,close}) => {
  return (
    <div>
    {
      check==="Hospitals" &&      
      <HospitalAppointment val={val} close={close}/>
    }
    {
      check==="Doctors" &&      
      <DoctorAppointment val={val} close={close}/>
    }
    {
      check==="Laboratory" &&
      <LabAppointment val={val} close={close}/>
    }
    {
        check==="Pharmacy" &&
        <PharmacyAppointment val={val} close={close}/>
    }
    {
        check==="Donations" &&
        <DonationAppointment val={val} close={close}/>
    }   
    </div>
  )
}

export default FixAppointment
