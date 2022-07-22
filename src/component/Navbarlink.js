import React from 'react';
import './cssfolder/navbarstyles/navbarlink.css';

const Navbarlink = ({Change}) => {
  return (

    <div className="navlink">
      <button className="navbtn" type="button" onClick={()=>Change("Home")}>Home</button>
      <button className="navbtn" type="button" onClick={()=>Change("Hospitals")}>Hospitals</button>
      <button className="navbtn" type="button" onClick={()=>Change("Doctors")}>Doctors</button>
      <button className="navbtn" type="button" onClick={()=>Change("Laboratory")}>Laboratory</button>    
      <button className="navbtn" type="button" onClick={()=>Change("Pharmacy")}>Pharmacy</button>
      <button className="navbtn" type="button" onClick={()=>Change("Donations")}>Donations</button>    
    </div>

  )
};

export default Navbarlink;
