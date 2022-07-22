import React,{useEffect,useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {collection,getDocs} from 'firebase/firestore';
import {FaNotesMedical} from 'react-icons/fa'
import {RiHospitalFill} from 'react-icons/ri'
import { db } from '../../firebase-config';
import './skeletonsStyles/doctorloading.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './skeletonsStyles/labloading.css'
import ViewInfo from '../ViewInfo';
import FixAppointment from '../FixAppointment';

const LaboratoryLoading = ({openEffect,closeEffect,check}) => {

  const [fetch,setFetch]=useState(true)
  const [currentLab,setCurrentLab]=useState({});
  const [info,setInfo]=useState(false);
  const [appointment,fixAppointment]=useState(false);
  const [lab,setLab] =useState([]);
  const labCollection=collection(db,"Labs");
  let labData=null;
  
  const getLabs = async()=>{
    openEffect()
    labData = await getDocs(labCollection);
    setLab(labData.docs.map((doc)=>({...doc.data(),id:doc.id})));
    setFetch(false)
    closeEffect()
  };

  const getDetailedInfo=(val)=>{
    setCurrentLab(val)
    setInfo(true)
  }
  const setAppointment=(val)=>{
    setCurrentLab(val)
    fixAppointment(true);
  }
  useEffect(()=>{ 
    getLabs();
    // eslint-disable-next-line
  },[]);

  return (
    <div className="LoadingScrn">
      { fetch===true &&  <div>Loading</div> }  
      { fetch === false && lab.length===0 && <div>No Data Found</div>
         // <DoctorSkeleton/> 
      }
      {
        fetch===false && lab.length>=1 && 
        info?
        <ViewInfo val={currentLab} close={()=>setInfo(false)} check={check}/>
        :
        lab.map((L)=>{
          return(
          <div className="LaboratoryCard">
            <div className="LabImage">
            <LazyLoadImage src={L.labImage!==""?L.labImage:'exlogo.png'} alt="ex"  placeholderSrc='exlogo.png' effect="blur" style={{border:'1px solid #20b2aa',ObjectFit:'cover'}}/>
              <h2 style={{textAlign:'center'}}>{L.name}</h2>
            </div>
            
            <div className="LabOwnerImage">
            <LazyLoadImage src={L.ownerImage!==""?L.ownerImage:'exlogo.png'} alt="ex"  placeholderSrc='exlogo.png' effect="blur" style={{border:'1px solid #20b2aa',ObjectFit:'cover'}}/>
              <div style={{textAlign:'center'}}>{L.owner}</div>
              <div style={{textAlign:'center'}}>{L.location}</div>
            </div>
            
            <div className="Labdescription">{L.speciality}</div>
            <div className="LabBtn"> 
              <button type="button" onClick={()=>getDetailedInfo(L)}> <RiHospitalFill size={20}/></button>
              <button type="button" onClick={()=>setAppointment(L)}> <FaNotesMedical size={18}/></button>
            </div>  
            <div className="LabBtnSmall1"> 
              <button type="button" onClick={()=>getDetailedInfo(L)}> <RiHospitalFill size={20}/></button>
            </div> 

            <div className="LabBtnSmall2">         
              <button type="button"  onClick={()=>setAppointment(L)}> <FaNotesMedical size={18}/></button>
            </div>    
          </div>
          )
        })
      }  
      {
        appointment?
        <FixAppointment val={currentLab} close={()=>fixAppointment(false)} check={check}/> 
        :
        null
      }
    </div>
  )
}

export default LaboratoryLoading;
