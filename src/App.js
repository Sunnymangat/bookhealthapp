import Lottie from 'react-lottie';
import React, { useState, useEffect } from "react";
import {BsPersonBoundingBox} from 'react-icons/bs'
import Navbar from "./component/Navbar";
import Navbarlink from "./component/Navbarlink";
import Searchbar from "./component/Searchbar";
import LogIn from './component/LogIn';
import splash from './animate_lottie/navbar/loadingscreen.json';
import './component/cssfolder/pop_ups_styles/signupmodal.css';
import SwappingArea from "./component/SwappingArea";
import './app.css';


const MODAL_STYLE = {
  position: 'fixed',
  top:0,
  bottom:0,
  left:0,
  right:0,
  background:'rgba(255,255,255,0)',
  backdropFilter:'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  zIndex:200,
}

const aboutStyle={
  position:'fixed',
  bottom:'2%',
  right:'0.1%',
  fontStyle:'italic',
  fontWeight:'bold',
  zIndex:3,
  cursor:'pointer',
  border:"1px solid black",
  borderColor:'teal',
  padding:'0.01%',
  borderRadius:'5px',
}
const getLocalItems=()=>{
  const info=localStorage.getItem('info')
  if(info){
    return JSON.parse(info)
  }
  return {}
}

function App() {
  const [curr, setcurr] = useState(false)
  const [userData,setUserData]=useState(getLocalItems())
  const [isSelected, SetSelected] = useState("Home")
  const [btnclicked,setbtnclicked] = useState("null")
  const [latitude,setLatitude]=useState('')
  const [longitude,setLongitude]=useState('')

  useEffect(()=>{
    localStorage.setItem('info',JSON.stringify(userData));
  },[userData]);

  useEffect(() => {
    setcurr(true)
    navigator.geolocation.getCurrentPosition((position)=>{
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
    console.log(latitude,longitude)
    setTimeout(() => {
      setcurr(false)
    }, 4000);
    // eslint-disable-next-line
  }, []);
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: splash,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>
      {
        curr ?
          <div>
            <div>
              <div className="splash-screen" style={MODAL_STYLE}>
                <div className="splash-title">BookHealth</div>
                <Lottie options={defaultOptions2} className="inner1-lottie" height={275} width={275}/>
              </div>
            </div>
            <div className="splashBackground" style={{ position: "fixed", top: '10', left: '0', right: '0', backgroundImage: 'url("splashbackground.jpg")',
              height: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>{ }</div>
          </div>

          :
          <div>  
            <Navbar/>
            <div className="bookhealth-navbar">
              <Searchbar Change1={(Val1) => SetSelected(Val1)} PersonalInfo={(Val2)=>SetSelected(Val2)}/>
              <Navbarlink Change={(Val) => SetSelected(Val)} />
            </div>
           <SwappingArea check={isSelected} latitude={latitude} longitude={longitude} checkit={(v)=>setbtnclicked(v)} details={userData} userPage={(v)=>SetSelected(v)} carousel={(v)=>SetSelected(v)} logOut={()=>setUserData({})} close={()=>SetSelected("Home")}/>
           <LogIn check={btnclicked}  close={(v)=>setbtnclicked(v)} setUserValue={(v)=>{setUserData(v)}}/>

           {
             isSelected==="About"?
             null
             :
             <div style={aboutStyle}>
             <button style={{border:'none',background:'transparent' ,fontStyle:'italic',fontWeight:'bold',cursor:'pointer'}}
              type='button' onClick={()=>SetSelected("About")}>
               About <BsPersonBoundingBox />
             </button>
           </div>
           }
          </div>
      }
      
    </div>
  );
}

export default App;