import React from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import DoctorInnerView from './loading_screen/info/DoctorInnerView';
import HospitalInnerView from './loading_screen/info/HospitalInnerView';
import LabInnerView from './loading_screen/info/LabInnerView';
import PharmacyInnerView from './loading_screen/info/PharmacyInnerView';
import DonationInnerView from './loading_screen/info/DonationInnerView';

const ViewInfo = ({val,close,check,userdetails,userPage}) => {
  return (
    <div>
      <button onClick={close} type="button" style={{color:'teal',border:'none',background:'transparent',cursor:'pointer'}}> <IoArrowBackSharp size={25}/></button>
      {
        check==="Hospitals" &&
        <>
        <HospitalInnerView val={val} userdetails={userdetails} userPage={userPage}/>
        </>
      }
      {
        check==="Doctors" &&
        <>
           <DoctorInnerView val={val}/>
        </>
      }
      {
        check==="Laboratory" &&
        <>
           <LabInnerView val={val}/>
        </>
      }
      {
        check==="Pharmacy" &&
        <>
          <PharmacyInnerView val={val}/>
        </>
      }
      {
        check==="Donations" &&
        <>
          <DonationInnerView val={val}/>
        </>
      }          
    </div>
  )
}

export default ViewInfo;
