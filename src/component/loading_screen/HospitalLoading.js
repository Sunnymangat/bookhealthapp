import React,{useState,useEffect} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {collection,getDocs} from 'firebase/firestore';
import {FaClinicMedical} from 'react-icons/fa';
import {RiAccountPinCircleFill} from 'react-icons/ri';
import { db } from '../../firebase-config';
import './skeletonsStyles/doctorloading.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './skeletonsStyles/hospitalloading.css';
import ViewInfo from '../ViewInfo';
import FixAppointment from '../FixAppointment';

  
const HospitalLoading = ({openEffect,closeEffect,check,userdetails,userPage}) => {
  const [fetch,setFetch]=useState(true)
  const [currentHospital,setCurrentHospital]=useState({});
  const [info,setInfo]=useState(false);
  const [appointment,fixAppointment]=useState(false);
  const [hospital,setHospital] =useState([]);
  const hospitalCollection=collection(db,"Hospitals");
  let hospitalData=null;

  const getHospitals = async()=>{
    openEffect()
    hospitalData = await getDocs(hospitalCollection);
    setHospital(hospitalData.docs.map((doc)=>({...doc.data(),id:doc.id})));
    setFetch(false)
    closeEffect()
  };
  const getDetailedInfo=(H)=>{
    setCurrentHospital(H)
    setInfo(true)
  }
  const setAppointment=(H)=>{
    setCurrentHospital(H)
    fixAppointment(true);
  }

  useEffect(()=>{ 
    getHospitals();
    // eslint-disable-next-line
  },[]);
 
  return (
    <div>
      {
        fetch===true &&
        <div>Loading</div>
      }  
      {
        fetch === false && hospital.length===0 &&
        <div>No Data Found</div>
      }
      { 
      fetch===false &&
      hospital.length>=1 && 
      
      info?
      <>
      <ViewInfo val={currentHospital} close={()=>setInfo(false)} check={check} userdetails={userdetails} userPage={userPage}/>
      </>
        :
        hospital.map((H)=>{
          
        return(
          
        <div className="hospitalCard">
        <div className="hospitalImage">
        <LazyLoadImage src={H.imageUrl!==""?H.imageUrl:'exlogo.png'} placeholderSrc='exlogo.png' effect="blur"  alt="Jatta" style={{border:'1px solid #20b2aa',ObjectFit:'cover'}}/>
        <h2 style={{textAlign:'center'}}>{H.name}</h2>
        </div>

        <div className="hospitalabout">{H.city}<br/>{H.mailId}<br/>{H.location}<br/></div>
        <div className="hospitaldescription">{H.hospitalDescription}</div>
        
        <div className="doctorBtn"> 
          <button type="button" onClick={()=>{getDetailedInfo(H)}}> <FaClinicMedical size={20}/></button>
          <button type="button" onClick={()=>setAppointment(H)}> <RiAccountPinCircleFill size={18}/></button>
        </div>  
        
        <div className="doctorBtnSmall1"> 
          <button type="button" onClick={()=>getDetailedInfo(H)}> <FaClinicMedical size={20}/></button>
        </div> 
        <div className="doctorBtnSmall2">         
          <button type="button" onClick={()=>setAppointment(H)}> <RiAccountPinCircleFill size={18}/></button>
        </div>       
        </div>
        )
        })       
      } 
      {
        appointment?
        <FixAppointment val={currentHospital} close={()=>fixAppointment(false)} check={check}/>
        :
        null
      }
      </div>
  )
}

export default HospitalLoading;

