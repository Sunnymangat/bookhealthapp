import React from 'react';
import Lottie from 'react-lottie';
import govtbuilding from '../../../animate_lottie/carousels/govt.json';
import pvtbuilding from '../../../animate_lottie/carousels/building.json';
import nearbuilding from '../../../animate_lottie/carousels/nearbuildinghutstructure.json';
import '../carouselsStyles/cardstyles.css'

const HospitalCard = ({num,check}) => {
  const govthospital = {
    loop: 1,
    autoplay: true,
    animationData: govtbuilding,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const nearhospital = {
    loop: 1,
    autoplay: true,
    animationData: nearbuilding,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const pvthospital = {
    loop: 1,
    autoplay: true,
    animationData: pvtbuilding,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="hospital-card">
      {
      num===1 &&
      <button type="button" onClick={()=>check("GovtHospital")}>
      <Lottie style={{marginTop:'-20px'}} options={govthospital}  height={215} width={160}/>
      <div style={{marginTop:'-40px'}}>Government</div>
      </button>
      }
      
      {
        num===2 &&
        <button type="button" onClick={()=>check("NearHospital")}>
        <Lottie options={nearhospital} height={160} width={150}/>
        <div>Near By</div>
        </button>
      }

      {
        num===3 &&
        <button type="button" onClick={()=>check("PvtHospital")}>
        <Lottie options={pvthospital} height={160} width={150}/>
        <div>Private</div>
        </button>
      }

    </div>
  )
}

export default HospitalCard;