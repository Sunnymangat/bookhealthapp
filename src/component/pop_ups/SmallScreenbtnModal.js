import React from 'react';
import {HiOutlineSearch} from 'react-icons/hi';

const MODAL_STYLE1={
  position:'absolute',
  backgroundColor:'#f1ffeb',
  top:'80%',
  left:'0%',
  marginBottom:'20%',
  zIndex:'-1',
  width:'100%',
}


const SmallScreenbtnModal = ({open,Change1,searchIcon}) => {
  if(open===true && searchIcon===false){
    return (
      <div className="smallscrnbtn">
        <div style={MODAL_STYLE1}>
          <div className="smallscrnbtn1">
            <button className="navbtnSmall" type="button" onClick={()=>Change1("Home")}>Home</button>
            <button className="navbtnSmall" type="button" onClick={()=>Change1("Hospitals")}>Hospitals</button>
            <button className="navbtnSmall" type="button" onClick={()=>Change1("Doctors")}>Doctors</button>
          </div>
  
          <div className="smallscrnbtn2">
            <button className="navbtnSmall" type="button" onClick={()=>Change1("Laboratory")}>Laboratory</button>    
            <button className="navbtnSmall" type="button" onClick={()=>Change1("Pharmacy")}>Pharmacy</button>
            <button className="navbtnSmall" type="button" onClick={()=>Change1("Donations")}>Donations</button>
          </div>
        </div>
      </div>
    );
  }
  if(searchIcon===true && open===false){
    return (
      <div style={MODAL_STYLE1}>
      <div className="smallscrnSearch">
    
      <input type="text" className="navSmallScreenSearchBar" style={{width:'85%'}}/>

      <button type="button" className="navSmallScreenSearchIcon" style={{background:'transparent',border:'none'}}>
      <HiOutlineSearch size={18}/>
      </button>

      </div>
      </div>
    );
  }
  return null;

}

export default SmallScreenbtnModal;
