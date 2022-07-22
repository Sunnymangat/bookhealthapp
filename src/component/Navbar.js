import React,{useState} from 'react';
import Lottie from 'react-lottie';
import emergency from '../animate_lottie/navbar/emergency.json';
import health from '../animate_lottie/navbar/bookhealth.json';
import EmergencyModal from './pop_ups/EmergencyModal';
import LogoModal from './pop_ups/LogoModal'
import './cssfolder/navbarstyles/navbar.css';



const Navbar = () => {
  const [currIcon,setIconcurr]=useState(false);
  const [isEmergencyIconClicked, setEmergencyIcon] = useState(false);

  const default1 = {
    loop: true,
    autoplay: true,
    animationData: health,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const default2 = {
    loop: true,
    autoplay: true,
    animationData: emergency,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="navbar">
      <div className="navimage1">
      <button type="button" onClick={()=>setIconcurr(true)} style={{cursor:'pointer',marginRight:'-2%'}}>
      <Lottie options={default1} height={60} width={35} />
      </button>
      </div>
      
      <div  className="navheading">
        <div>BookHealth</div> 
      </div>
      
      <div className="navimage2">
        <button type="button" onClick={()=>setEmergencyIcon(true)} style={{cursor:'pointer',marginLeft:'-2%'}}>        
          <Lottie options={default2} height={60} width={35} />
        </button>
      </div>
            
      <LogoModal open={currIcon} close={()=>setIconcurr(false)}/>
      <EmergencyModal open={isEmergencyIconClicked} close={()=>setEmergencyIcon(false)}/>
    </div>
  )
}

export default Navbar;
