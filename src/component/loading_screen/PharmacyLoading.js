import React,{useEffect,useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {collection,getDocs} from 'firebase/firestore';
import {AiTwotoneShop} from 'react-icons/ai';
import {FaShoppingBag} from 'react-icons/fa';
import { db } from '../../firebase-config';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './skeletonsStyles/pharmacyloading.css';
import FixAppointment from '../FixAppointment';
import ViewInfo from '../ViewInfo';

const PharmacyLoading = ({openEffect,closeEffect,check}) => {

  const [fetch,setFetch]=useState(true);
  const [currentPharmacy,setCurrentPharmacy]=useState({});
  const [info,setInfo]=useState(false);
  const [appointment,fixAppointment]=useState(false);
  const [pharmacy,setPharmacy] =useState([]);
  const pharmacyCollection=collection(db,"Pharmacies");
  let pharmacyData=null;
  
  const getPharmacies = async()=>{
    openEffect()
    pharmacyData = await getDocs(pharmacyCollection);
    setPharmacy(pharmacyData.docs.map((doc)=>({...doc.data(),id:doc.id})));
    setFetch(false)
    closeEffect()
  };
  
  const getDetailedInfo=(val)=>{
    setCurrentPharmacy(val)
    setInfo(true)
  }
  const setAppointment=(val)=>{
    setCurrentPharmacy(val)
    fixAppointment(true);
  }

  useEffect(()=>{ 
    getPharmacies();
    // eslint-disable-next-line
  },[]);

  return (
    <div className="LoadingScrn">
    { fetch===true &&  <div>Loading</div> }  
    { fetch === false && pharmacy.length===0 && <div>No Data Found</div>
       // <DoctorSkeleton/> 
    }
    {
        fetch===false && pharmacy.length>=1 && 
        info?
        <ViewInfo val={currentPharmacy} close={()=>setInfo(false)} check={check}/>
        :
        pharmacy.map((P)=>{
          return(
          <div className="PharmacyCard">
            <div className="PImage">
              <LazyLoadImage src={P.imageUrl!==""?P.imageUrl:'exlogo.png'} alt="ex"  placeholderSrc='exlogo.png' effect="blur" style={{border:'1px solid #20b2aa',ObjectFit:'cover'}}/>
              <h2 style={{textAlign:'center'}}>{P.name}</h2>
            </div>
            
            <div className="POwnerImage">
            <LazyLoadImage src={P.ownerImage!==""?P.ownerImage:'exlogo.png'} alt="ex"  placeholderSrc='exlogo.png' effect="blur" style={{border:'1px solid #20b2aa',ObjectFit:'cover'}}/>
              <div style={{textAlign:'center'}}>{P.owner}</div>
              <div style={{textAlign:'center'}}>{P.location}</div>
            </div>
            <div className="Pdescription">{P.speciality}</div>   
            <div className="LabBtn"> 
              <button type="button" onClick={()=>getDetailedInfo(P)}> <AiTwotoneShop size={20}/></button>
              <button type="button" onClick={()=>setAppointment(P)}> <FaShoppingBag size={18}/></button>
            </div>

            <div className="PSmallScreen">
            <div className="PBtnSmall1"> 
              <button type="button" onClick={()=>getDetailedInfo(P)}> <AiTwotoneShop size={20}/></button>
            </div> 

            <div className="PBtnSmall2">         
              <button type="button" onClick={()=>setAppointment(P)}> <FaShoppingBag size={18}/></button>
            </div>
            </div>   
        </div>
          );
        })
    }     
    {
      appointment?
      <FixAppointment val={currentPharmacy} close={()=>fixAppointment(false)} check={check}/> 
      :
      null
    } 
    </div>
  )
}

export default PharmacyLoading;
