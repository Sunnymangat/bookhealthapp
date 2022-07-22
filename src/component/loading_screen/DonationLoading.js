import React,{useEffect,useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {collection,getDocs} from 'firebase/firestore';
import {GiLifeBar} from 'react-icons/gi';
import {BiStreetView} from 'react-icons/bi'
import { db } from '../../firebase-config';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './skeletonsStyles/donationloading.css'
import FixAppointment from '../FixAppointment';
import ViewInfo from '../ViewInfo';

const DonationLoading = ({openEffect,closeEffect,check}) => {
  const [fetch,setFetch]=useState(true);
  const [currentDonation,setCurrentDonation]=useState({});
  const [info,setInfo]=useState(false);
  const [appointment,fixAppointment]=useState(false);
  const [donation,setDonation] =useState([]);
  const donationCollection=collection(db,"Donations");
  let pharmacyData=null;
  
  const getDonations = async()=>{
    openEffect()
    pharmacyData = await getDocs(donationCollection);
    setDonation(pharmacyData.docs.map((doc)=>({...doc.data(),id:doc.id})));
    setFetch(false)
    closeEffect()
  };

  const getDetailedInfo=(val)=>{
    setCurrentDonation(val)
    setInfo(true)
  }
  const setAppointment=(val)=>{
    setCurrentDonation(val)
    fixAppointment(true);
  }
  
  useEffect(()=>{ 
    getDonations();
    // eslint-disable-next-line
  },[])

  return (
    <div className="LoadingScrn">
    { fetch===true &&  <div>Loading</div>}  
    { fetch === false && donation.length===0 && <div>No Data Found</div>
       // <DoctorSkeleton/> 
    }
    {
        fetch===false && donation.length>=1 &&
        info?
        <ViewInfo val={currentDonation} close={()=>setInfo(false)} check={check}/>
        :
        donation.map((D)=>{
          return (
          <div className="donationCard">
            <div className="donationImage">
              <LazyLoadImage src={D.imageUrl!==""?D.imageUrl:'exlogo.png'} alt="ex"  placeholderSrc='exlogo.png' effect="blur" style={{border:'1px solid #20b2aa',ObjectFit:'cover'}}/>
              <h2 style={{textAlign:'center'}}>{D.name}</h2>
            </div>
          
          <div className="donationabout">{D.reason}</div>
          <div className="donationdescription">{D.description}</div>
          
          <div className="donationBtn"> 
            <button type="button" onClick={()=>getDetailedInfo(D)}> <BiStreetView size={20}/></button>
            <button type="button" onClick={()=>setAppointment(D)}> <GiLifeBar size={20}/></button>
          </div>  
          
          <div className="donationBtnSmall1"> 
            <button type="button" onClick={()=>getDetailedInfo(D)}> <BiStreetView size={20}/></button>
          </div> 

          <div className="donationBtnSmall2">         
            <button type="button" onClick={()=>setAppointment(D)}> <GiLifeBar size={18}/></button>
          </div> 
          </div>
          )
        })  
    }    
    {
      appointment?
      <FixAppointment val={currentDonation} close={()=>fixAppointment(false)} check={check}/> 
      :
      null
    }
    </div>
  )
}

export default  DonationLoading ;