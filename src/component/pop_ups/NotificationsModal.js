import React from 'react';
import Lottie from 'react-lottie';
import notification from '../../animate_lottie/pop-ups/notification.json';


const MODAL_STYLE={
  backgroundColor:'#e0ffd4',
  marginBottom:'-5%'
}



const NotificationsModal = ({details}) => {
  
  const Options2 = {
    loop: true,
    autoplay: true,
    animationData: notification,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  if(Object.keys(details).length===0){
    return (
      <div style={MODAL_STYLE}>
        <div style={{textAlign:'center'}}>
        <div className="mainHeading" >Notifications</div>
          <Lottie options={Options2} height={100} width={100} className="inner1-lottie"/>
          <h2>No User Signed in Yet!!!</h2>
        </div>
      </div>
      )
  } 
  return (
    <div style={MODAL_STYLE}>
    <div>
      <div className="mainHeading" >Notifications</div>
        <Lottie options={Options2} height={120} width={120} className="inner1-lottie"/>
        <div className="mainHeading">{details.name}</div>
    </div>
    </div>
  )
}
export default NotificationsModal;
