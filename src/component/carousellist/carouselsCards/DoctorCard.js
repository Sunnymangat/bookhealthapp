import React from 'react';
import Lottie from 'react-lottie';
import neardoctors from '../../../animate_lottie/carousels/Neardoctors.json';
import normalDoctor from '../../../animate_lottie/carousels/generaldoctor.json';
import specializedDoctor from '../../../animate_lottie/carousels/specializeddoctors.json';
import '../carouselsStyles/doctorcard.css'

const DoctorCard = ({number,check}) => {
  const neardoctor = {
    loop: 1,
    autoplay: true,
    animationData: neardoctors,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
  const normaldoctor = {
    loop: 0,
    autoplay: true,
    animationData: normalDoctor,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const specializeddoctor = {
    loop: 0,
    autoplay: true,
    animationData: specializedDoctor,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="doctor-card">
    {
    number===1 &&
    <button type="button" onClick={()=>check("NormalDoctors")}>
    <Lottie style={{marginTop:'15px'}} options={normaldoctor} height={150} width={150}/>
    <div>General</div>
    </button>
    }
    
    {
      number===2 &&
      <button type="button" onClick={()=>check("NearDoctors")}>
      <Lottie style={{marginTop:'15px'}} options={neardoctor} height={150} width={180}/>  
      <div>Near By</div>
      </button>
    }

    {
      number===3 &&
      <button type="button" onClick={()=>check("SpecializedDoctors")}>
      <Lottie style={{marginTop:'15px'}} options={specializeddoctor} height={150} width={150}/>    
      <div>Specialized</div>
      </button>
    }

  </div>
  )
}

export default DoctorCard;
