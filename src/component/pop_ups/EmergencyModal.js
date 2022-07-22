import React,{useState} from 'react'
import {IoCloseSharp} from 'react-icons/io5';
import Lottie from 'react-lottie';
import {FaAmbulance} from 'react-icons/fa'
import {RiPoliceCarFill} from 'react-icons/ri'
import MapArea from '../MapArea';
import emergency from '../../animate_lottie/pop-ups/emergencysiren.json';
import ambulance from '../../animate_lottie/pop-ups/ambulance.json';
import police from '../../animate_lottie/pop-ups/police.json';
import '../cssfolder/pop_ups_styles/emergencymodal.css';

const OVERLAY_STYLES={
  position: 'fixed',
  top:0,
  bottom:0,
  left:0,
  right:0,
  backgroundColor:'rgba(1,1,1,0.9)',
  zIndex:10,
}

const MODAL_STYLE={
  position:'fixed',
  top:'50%',
  left:'50%',
  backgroundColor:'#f0ffff',
  transform:'translate(-50%,-50%)',
  zIndex:10,
  width:'98.5%',
  borderRadius:'10px',
  overflow:'auto'
}


const BUTT_ST={
  position: 'fixed',
  top:0,
  right:0,
  paddingRight:'0.15%',
  paddingTop:'0.15%' ,
  zIndex:30,
  cursor:'pointer'
}
const EmergencyModal = ({open,close}) => {

  const[phoneNumber,setphoneNumber]=useState('');

  if(!open) return null;
  const Options = {
    loop: true,
    autoplay: true,
    animationData: emergency,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const Options1 = {
    loop: true,
    autoplay: true,
    animationData: police,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const Options2 = {
    loop: true,
    autoplay: true,
    animationData: ambulance,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <div style={OVERLAY_STYLES}>
      <div style={MODAL_STYLE}>
      <IoCloseSharp onClick={close} type="button" style={BUTT_ST} size={20}/>
      <div className='emergencyContainer'>
        <div style={{textAlign:'center'}}>
        <div style={{fontSize:'150%'}}>Emergency<Lottie options={Options} height={25} width={25}/></div>
        {
          phoneNumber===''&&

          <>
            <button type="button" onClick={()=>setphoneNumber('police')}>
            <div style={{fontSize:'140%'}}>Police
              <Lottie options={Options1} height={60} width={115} />
            </div>
            </button>
        
            <button type="button" onClick={()=>setphoneNumber('ambulance')}>
            <div  style={{fontSize:'140%'}}>Ambulance</div>
              <Lottie options={Options2} height={65} width={115} />
            </button>
          </>
        }
        {
          phoneNumber==='police' &&
          <div style={{fontSize:'120%',color:'teal'}}>Police{' '}<RiPoliceCarFill/>{' '}<IoCloseSharp onClick={()=>setphoneNumber('')} type="button" style={{cursor:'pointer'}} size={20}/><br/>
            <input type='tel' placeholder='88720-xxxxx' style={{width:'70%',marginBottom:'0.5%'}} className='search_location'/>  
          </div>
        }
        {
          phoneNumber==='ambulance' &&
          <div style={{fontSize:'120%',color:'teal'}}>Ambulance{' '}<FaAmbulance/>{' '}<IoCloseSharp onClick={()=>setphoneNumber('')} type="button" style={{cursor:'pointer'}} size={20}/><br/>
            <input type='tel' placeholder='88720-xxxxx' style={{width:'70%',marginBottom:'0.5%'}} className='search_location'/>
          </div>
        }
        </div> 
        <MapArea phoneNumber={phoneNumber}/>
      </div>
      </div>
    </div> 
    </div>
  )
}

export default EmergencyModal;
