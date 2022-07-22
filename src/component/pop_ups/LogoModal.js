import React from 'react';
import {IoCloseSharp} from 'react-icons/io5';
import Lottie from 'react-lottie';
import {GiPunch} from 'react-icons/gi';
import ani1 from '../../animate_lottie/pop-ups/vocalocal1.json'
import '../cssfolder/navbarstyles/navbar.css'

const OVERLAY_STYLES={
  position: 'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor:'rgba(1,1,1,0.9)',
  zIndex:10,
}
const BUTT_ST={
  position: 'fixed',
  top:0,
  right:0,
  paddingTop:'1%',
  paddingRight:'1%',
  zIndex:30
}

const MODAL_STYLE={
  position:'fixed',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  zIndex:15,
  width:'auto',
  padding:'2%',
  backgroundColor:'#f9fc3a',
  borderRadius:'10px',
  overflow:'auto',
  
}


const LogoModal = ({open,close}) => {
  if(!open) return null;
  const Options1={
    loop: true,
    autoplay:true,
    animationData: ani1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    },
  };
  
  
  return (
    <div>
      <div style={OVERLAY_STYLES} onClickCapture={close}>
        
      <div style={MODAL_STYLE} className="plusIcon" onAnimationEnd={close}>
        
        <Lottie options={Options1} height={100} width={140} />
        <p style={{textAlign:'center',fontSize:'50px'}}>BookHealth</p>
        <p style={{textAlign:'center',fontSize:'xx-large'}}>Vocal For Local<GiPunch size={35}/></p>

      <IoCloseSharp onClick={close} type="button" style={BUTT_ST} size={20} />
      </div>
      </div>
      
       
    </div>
  )
}

export default LogoModal;
