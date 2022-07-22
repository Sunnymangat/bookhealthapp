import React,{useState} from 'react';
import Lottie from 'react-lottie';
import {BsPersonPlusFill} from 'react-icons/bs';
import {FaHospital,FaDonate} from 'react-icons/fa';
import {GiNurseMale} from 'react-icons/gi';
import {ImLab} from 'react-icons/im';
import {MdLocalPharmacy} from 'react-icons/md';
import DoctorSignupModal from './pop_ups/DoctorSignupModal';
import HospitalSignUpModal from './pop_ups/HospitalSignUpModal';
import LaboratorySignUpModal from './pop_ups/LaboratorySignUpModal';
import SignUpModal from './pop_ups/SignUpModal';
import DonationsSignUpModal from './pop_ups/DonationsSignUpModal';
import PharmacySignUpModal from './pop_ups/PharmacySignUpModal';
import animation1 from '../animate_lottie/pop-ups/loadingAnimation1.json';
import animation2 from '../animate_lottie/pop-ups/loadingAnimation2.json';
import animation3 from '../animate_lottie/pop-ups/loadingAnimation3.json';

const OVERLAY_STYLES={
  position: 'fixed',
  top:0,
  bottom:0,
  left:0,
  right:0,
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  zIndex:200,
}

const load=[animation1,animation2,animation3]
const max=2;

const LeftSearchBar = () => {
  const [effect,seteffect]=useState(false);
  const [isUserIconClicked, setUserIcon] = useState(false);
  const [isHospitalClicked, setHospitalIcon]=useState(false);
  const [isDoctorClicked, setDoctorIcon]=useState(false);
  const [isLabClicked, setLabIcon]=useState(false);
  const [isPharmacyClicked,setPharmacyIcon]=useState(false);
  const [isDonationClicked,setDonationIcon]=useState(false);
  
  const v1=Math.floor(Math.random() * (max + 1));  
  
  function func(val){

    seteffect(true)
    setTimeout(()=>{
      seteffect(false)
    },1500);
    switch(val){
      case 'UserIcon':setUserIcon(true);break;
      case 'HospitalIcon':setHospitalIcon(true);break;
      case 'DoctorIcon':setDoctorIcon(true);break;
      case 'LabIcon':setLabIcon(true); break;
      case 'PharmacyIcon':setPharmacyIcon(true);break;
      case 'DonationIcon': setDonationIcon(true); break;            
      default:break;   
    }
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: load[v1],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>
      { effect &&
        <div style={OVERLAY_STYLES}>
         <Lottie options={defaultOptions2} style={{position: 'absolute',left: '50%',top: '50%',WebkitTransform: 'translate(-50%, -50%)',transform: 'translate(-50%, -50%)'}} className="inner1-lottie" width={200} height={200}/>
        </div>
      }
    <div className="LeftOuterIconsStyle">
    <button className="btnIconsstyle1" type='button'onClick={()=>func('UserIcon')} style={{marginLeft:'-1%'}}>
      <BsPersonPlusFill className="Iconsstyle1" size={20}/>
        </button>

    <button className="btnIconsstyle1" type='button' onClick={()=>func('HospitalIcon')}>    
        <FaHospital className="Iconsstyle1" size={20} />
        </button>

    <button className="btnIconsstyle1" type='button' onClick={()=>func('DoctorIcon')}>    
        <GiNurseMale className="Iconsstyle1" size={20} />
    </button> 

    <button className="btnIconsstyle1" type='button' onClick={()=>func('LabIcon')}>
        <ImLab className="Iconsstyle1" size={20} />
    </button>    
    
    <button className="btnIconsstyle1" type='button' onClick={()=>func('PharmacyIcon')}>        
        <MdLocalPharmacy className="Iconsstyle1" size={20} />
    </button>    
       
    <button className="btnIconsstyle1" type='button' onClick={()=>func('DonationIcon')}>
        <FaDonate className="Iconsstyle1" size={20} />
    </button>    

        <SignUpModal open={isUserIconClicked} close={()=>setUserIcon(false)}  load={load[v1]}/>
        <HospitalSignUpModal open={isHospitalClicked} close={()=>setHospitalIcon(false)} load={load[v1]}/>
        <DoctorSignupModal open={isDoctorClicked} close={()=>setDoctorIcon(false)} load={load[v1]}/>
        <LaboratorySignUpModal open={isLabClicked} close={()=>setLabIcon(false)} load={load[v1]}/>
        <PharmacySignUpModal open={isPharmacyClicked} close={()=>setPharmacyIcon(false)} load={load[v1]}/>
        <DonationsSignUpModal open={isDonationClicked} close={()=>setDonationIcon(false)} load={load[v1]}/>
    </div>
    
    </div>
  )
}

export default LeftSearchBar;
