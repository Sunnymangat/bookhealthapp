import React from 'react'
import {BsPersonFill} from 'react-icons/bs';
import {IoMdNotifications} from 'react-icons/io'

const RightSearchBar = ({PersonalInfo}) => {
 
  return (
    <div>
    
      <button className="btnIconsstyle2" type='button' onClick={()=>PersonalInfo("Notifications")}>
      <IoMdNotifications className="Iconsstyle2Outer" size={20} />
      </button>

      <button className="btnIconsstyle2" type='button' onClick={()=>PersonalInfo("UserPage")}>
      <BsPersonFill className="Iconsstyle2Outer" size={20} />
      </button>
      
    </div>
  )
}

export default RightSearchBar;
