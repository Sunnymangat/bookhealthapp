import React from 'react';
import {FaUser,FaUserMd,FaHospitalAlt} from 'react-icons/fa'
import {GiLabCoat,GiMedicinePills} from 'react-icons/gi'
import Lottie from 'react-lottie';
import LogIn from '../../animate_lottie/pop-ups/logInTop.json';
import '../cssfolder/pop_ups_styles/signinmodal.css';
import '../LogIn';


const MODAL_STYLE={
  position: 'relative',
  backgroundColor:'whitesmoke',
}



const UserSignIn = ({checkit}) => {
    const Options = {
      loop: true,
      autoplay: true,
      animationData: LogIn,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div>
        <div>
          <div style={MODAL_STYLE}  className="signin">
          
          <div className="signInLottie">
            <Lottie options={Options} height={120} width={120}/>
          </div>
            <div className="userSignIn">
              <FaUser size={50}/><br/>
              User Login
              <p>Login via your register Mobile number with accurate password</p>
              <button className="loginbtn" type="button" onClick={()=>checkit("User")}>Login</button>
            </div>
            
            <div className="hospitalSignIn">
              <FaHospitalAlt size={50}/><br/>
              Hospital Login
              <p>Login via your Hospital mobile ID to track your work and user data</p>
              <button className="loginbtn" type="button" onClick={()=>checkit("Hospital")}>Login</button>
            </div>
            
            <div className="doctorSignIn">
              <FaUserMd size={50}/><br/>
              Doctor Login
              <p>Login via your Phone number to track your work and user data</p>
              <button className="loginbtn" type="button" onClick={()=>checkit("Doctor")}>Login</button>
            </div>
            
            <div className="labSignIn">
            <GiLabCoat size={50}/><br/>
            Lab Login
            <p>Login via your LAB mobile ID to track your work, user data and other information</p>
            <button className="loginbtn" type="button" onClick={()=>checkit("Lab")}>Login</button>
            </div>

            <div className="pharmacySignIn">
            <GiMedicinePills size={50}/><br/>Pharmacy Login
            <p>Login via your Pharmacy mobile ID to track your work and user data</p>
            <button className="loginbtn" type="button" onClick={()=>checkit("Pharmacy")}>Login</button>
            </div>
          </div>
          </div>
      </div>
  )
}

export default UserSignIn;
