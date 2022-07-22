import React,{useEffect,useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {collection,getDocs} from 'firebase/firestore';
import {FaMapPin} from 'react-icons/fa'
import {MdPersonPin} from 'react-icons/md'
import { db } from '../../firebase-config';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './skeletonsStyles/doctorloading.css';
import ViewInfo from '../ViewInfo';
import FixAppointment from '../FixAppointment';



const Doctor = ({openEffect,closeEffect,check}) => {

  const [fetch,setFetch]=useState(true);
  const [currentDoctor,setCurrentDoctor]=useState({});
  const [info,setInfo]=useState(false);
  const [appointment,fixAppointment]=useState(false);
  const [doctor,setDoctor] =useState([]);
  const doctorCollection=collection(db,"Doctors");
  let doctorData=null;

  const getDoctors = async()=>{
    openEffect()
    doctorData = await getDocs(doctorCollection);
    setDoctor(doctorData.docs.map((doc)=>({...doc.data(),id:doc.id})));
    setFetch(false)
    closeEffect()
  };
  const getDetailedInfo=(val)=>{
    setCurrentDoctor(val)
    setInfo(true)
  }
  const setAppointment=(val)=>{
    setCurrentDoctor(val)
    fixAppointment(true);
  }
  
  useEffect(()=>{ 
    getDoctors();
    // eslint-disable-next-line
  },[]);
  

  return (
    <div className="LoadingScrn">
      {
        fetch===true &&
        <>
        <div>Loading</div>
        </>
      }  
      {
        fetch === false && doctor.length===0 &&
        <div>No Data Found</div>
      }
      {
        fetch===false &&
        doctor.length>=1 && 

        info?
        <ViewInfo val={currentDoctor} close={()=>setInfo(false)} check={check}/>
        :
        doctor.map((D)=>{
          return(
            <div className="doctorCard">
            <div className="doctorImage">
            <LazyLoadImage src={D.imageUrl!==""?D.imageUrl:'exlogo.png'} alt="ex"  placeholderSrc='exlogo.png' effect="blur" style={{border:'1px solid #20b2aa',ObjectFit:'cover'}}/>
            <h2 style={{textAlign:'center'}}>{D.name}</h2>
            </div>

            <div className="About">{D.name}{' '}{D.lastname}<br/>{D.mailId}<br/>{D.clinicLocation}<br/></div>
            <div className="description">{D.prevHistory}</div>
            <div className="doctorBtn"> 
              <button type="button" onClick={()=>getDetailedInfo(D)}> <MdPersonPin size={20}/></button>
              <button type="button" onClick={()=>setAppointment(D)}> <FaMapPin size={18}/></button>
            </div>  
            <div className="doctorBtnSmall1"> 
              <button type="button" onClick={()=>getDetailedInfo(D)}> <MdPersonPin size={20}/></button>
            </div> 

            <div className="doctorBtnSmall2">         
              <button type="button" onClick={()=>setAppointment(D)}> <FaMapPin size={18}/></button>
            </div> 
            </div>
          )
        })
      }
      {
        appointment?
        <FixAppointment val={currentDoctor} close={()=>fixAppointment(false)} check={check}/> 
        :
        null
      }

    </div>
  )
}

export default Doctor;
