import React,{useState} from 'react';
import {IoCloseSharp} from 'react-icons/io5';
import { getDatabase, ref as Ref, child, set, get } from "firebase/database";
import '../infocss/HospitalInnerView.css';
import '../infocss/DoctorInnerView.css';


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
  zIndex:30,
  cursor:'pointer'
}

const MODAL_STYLE={
  position:'fixed',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  zIndex:15,
  width:'auto',
  padding:'2%',
  backgroundColor:'#f0ffff',
  borderRadius:'10px',
  overflow:'auto',
  textAlign:'center'
  
}


const d = new Date();

const HospitalInnerView = ({val,userdetails,userPage}) => {
  const [checkStatus,setStatus]=useState(true)
  const[currentUserData,setCurrentUserData]=useState({});
  const [checkUser,setUser]=useState("")
  const [close,setclose]=useState(false);

  const [myProblem,setMyProblem]=useState({problem:"",phonenumber:"",meetwith:"",timepreference:""});
  let n;
  let v;

  const getNewProblem=(event)=>{
   n= event.target.name;
   v= event.target.value;
   console.log(n,' : ',v)
  setMyProblem({...myProblem,[n]:v});
  };

  const appointmentFunc=async()=>{
    const db = getDatabase();
    const {problem,phonenumber,meetwith,timepreference}=myProblem;
    const date = d.toLocaleDateString().replaceAll('/','-');
    const time=d.toLocaleTimeString()
    if(currentUserData.useraccount!=='Users'){
      set(Ref(db, `HospitalAppointments/Users/${phonenumber}/${date} ${time}`), {
        hospitalname: val.name,
        hospitaldescription:val.hospitalDescription,
        hospitalphonenumber:val.phoneNumber,
        hospitalLocation:val.location,
        hospitalCity:val.city,
        hospitalimage:val.imageUrl,
        userproblem:problem,
        usermeetingwith:meetwith,
        usertimepreference:timepreference
      }).catch((error) => {
        console.log(error)
      });
      set(Ref(db, `HospitalAppointments/Hospitals/${val.phoneNumber}/${date} ${time}`), {
        username:currentUserData.username,
        userproblem:problem,
        usermeetingwith:meetwith,
        usertimepreference:timepreference,
        userphonenumber:phonenumber
      }).catch((error) => {
        console.log(error)
      });
    }
    else{
      console.log('Unknown User');
    }
  }
  const MakeAppointment=async()=>{
      let check=true;
      const dbRef = Ref(getDatabase());
      get(child(dbRef, `AuthenticateUsers/`)).then((snapshot) => {
      if (snapshot.exists()) {
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(snapshot.val())) {
          if(key===myProblem.phonenumber){
            console.log(key)
            check=false;
            break;
          }
        }
      }
      if(!check){
        get(child(dbRef, `AuthenticateUsers/${myProblem.phonenumber}`)).then((s) => {
          setCurrentUserData(s.exportVal())
        }).then(()=>{
          appointmentFunc()
        }).catch((error) => {
            console.error(error);
        });
        
      }
      }).catch((error) => {
        console.error(error);
      });
      
  }

  const check=()=>{
    if(Object.keys(userdetails).length===0){
      setUser('NoUser')
      setclose(false)
    }else{
      setStatus(false)
    }
  }

  return (
    <div className="HospitalInnerView">
      <div className="HospitalTopSection">
        <div>
        <img className="HospitalImageInnerView" src={val.imageUrl?val.imageUrl:'exlogo.png'} alt="alernate"/>
        </div>
        <h2>{val.name}</h2>
      </div>
      {
        checkStatus?
        <>
          <div className="HospitalLowerSection">
          <div className="HospitalPersonalInfo">
            <br/>Personal Information <br/>
            {val.location}<br/>{val.city}<br/>{val.state}<br/>{val.phoneNumber}<br/>{val.mailId}
        </div>

        <div className="HospitalDescription">
          Description <br/>
          {val.hospitalDescription}
        </div><br/>

        <div className="HospitalSpeciality">
          Speciality <br/>
          {val.speciality}
        </div><br/>

        </div>
        <div className="HospitalBtnSection1">
        <button type="button" className="Hospitalbtn" onClick={()=>check()}>Fix appointment</button>
        {
          checkUser==='NoUser' &&
          <>
          {
            close===false &&
            <div style={OVERLAY_STYLES}>
              <div style={MODAL_STYLE} >
                <h3>No User Logged In</h3>
                <button type='button' className="Hospitalbtn" onClick={()=>userPage("UserPage")}>LogIn</button>
                <IoCloseSharp type="button" onClick={()=>setclose(true)} style={BUTT_ST} size={20} />
              </div>
            </div>
          }
          </>
        }        
        </div>
        </>
        :
        <div className="DoctorAppointmentForm" style={{textAlign:'center'}}>
       <h3> Please fill data</h3>
        <span className="signup-textstyle">Problem:{'  '}
          <input type="text" className="input-text" name='problem' value={myProblem.problem} placeholder="..." onChange={getNewProblem}/></span>
          <br/><br/> 

        <span className="signup-textstyle">Phone Number:{'  '}
          <input type="text" className="input-text" name='phonenumber' value={myProblem.phonenumber} placeholder="98778XXXXX" onChange={getNewProblem}/></span>
          <br/><br/> 

        <span className="signup-textstyle">Meet Up With:{'  '}</span>
        <br/>
        <div>
        <input type="radio" name="meetwith" value="Specialist" onChange={getNewProblem}/>
        <span className="signup-textstyle">Specialist</span><br/>
        
        <input type="radio" name="meetwith" value="Normal" onChange={getNewProblem}/>
        <span className="signup-textstyle">Normal</span>
        </div>
        <br/><br/>       
        
        <span className="signup-textstyle">Meeting preference:{'  '}</span>
          <select name="timepreference" className="input-text" value={myProblem.timepreference} onChange={getNewProblem} style={{cursor:'pointer',color:'teal',fontSize:'large'}}>
            <option value="Any" >Any</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>

        <div className="DoctorBtnSection2">
          <button type="button" className="Doctorbtn" onClick={()=>MakeAppointment()}>Make an appointment</button>{' '}        
          <button type="button" className="Doctorbtn" onClick={()=>setStatus(true)}>Cancel</button> 
        </div>
        </div>
      }
      
    </div>
  )
}

export default HospitalInnerView
