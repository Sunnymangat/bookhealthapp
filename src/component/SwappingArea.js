import React,{useState,useEffect} from 'react';
import Lottie from 'react-lottie';
import {HiOutlineSearch} from "react-icons/hi";
import {FaMapPin} from'react-icons/fa'
import { MapContainer, TileLayer,MapConsumer,useMapEvents, Marker,Popup } from 'react-leaflet'
import L from "leaflet";
import { HospitalCarousel } from "./HospitalCarousel";
import DoctorCarousel from "./DoctorCarousel";
import DoctorLoading from './loading_screen/DoctorLoading';
import HospitalLoading from './loading_screen/HospitalLoading';
import DonationLoading from './loading_screen/DonationLoading';
import LaboratoryLoading from './loading_screen/LaboratoryLoading';
import PharmacyLoading from './loading_screen/PharmacyLoading';
import UserSignIn from './pop_ups/UserSignIn';
import NotificationsModal from './pop_ups/NotificationsModal';
import GovernmentHospital from './directlist/GovernmentHospital';
import PrivateHospital from './directlist/PrivateHospital';
import NearHospital from './directlist/NearHospital';
import NearDoctor from './directlist/NearDoctor';
import NormalDoctor from './directlist/NormalDoctor';
import SpecializedDoctor from './directlist/SpecializedDoctor';
import load1 from "../animate_lottie/loadingdata/loadingscreen1.json";
import load2 from "../animate_lottie/loadingdata/loadingscreen2.json";
import load3 from "../animate_lottie/loadingdata/loadingscreen3.json";
import UserProfile from './UserProfile';
import CreatorModal from './pop_ups/CreatorModal';

const load=[load1,load2,load3]
const max=2;


const SwappingArea = ({check,checkit,carousel,details,logOut,close,userPage}) => {
  const[openMyEffect,setMyEffect]=useState(false);
  const[lati,setlati]=useState(null)
  const[loc,setloc]=useState(false)
  const[longi,setlongi]=useState(null)
  const[locationError,setlocationError]=useState(null)
  let marker;
  
  function getCoordinates(){
    const add=document.getElementById('address').value;
    if(add === ''){
      setlocationError('')
    }else{
      const url="https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=".concat(add).concat("&gen=9&apiKey=PTF2PCeD48s2shMiksMX4tGuMn36l70UscS4xiCnoh8")
      const xh=new XMLHttpRequest();
      xh.open("GET",url,false);
      xh.send(null)
      const json=JSON.parse(xh.responseText);
      if(loc===true) setloc(false)
      if(json.Response.View.length===0){
        setlocationError('NotFound')
      }else{
        setlocationError('Found')
        setlati(json.Response.View[0].Result[0].Location.DisplayPosition.Latitude);
        setlongi(json.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
      }
    }
  }
  function LocateMe(){
    const [position, setPosition] = useState(null)
    const mapp = useMapEvents({
      
      locationfound(e) {
        if(position===null){
          setPosition(e.latlng)
          mapp.flyTo(e.latlng, mapp.getZoom())
        }
      },
    })
    
    useEffect(()=>{
      mapp.locate()
    },[mapp])
  
    return position === null ? null : (
      <Marker position={position} draggable>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    
    const mapp = useMapEvents({
      
      locationfound() {
        if(position===null){
          setPosition([lati===null?30.810209:lati,longi===null?76.060112:longi])
          mapp.flyTo([lati===null?30.810209:lati,longi===null?76.060112:longi], mapp.getZoom())
        }else{
          setPosition({lat:lati,lng:longi})
          mapp.flyTo({lat:lati,lng:longi}, mapp.getZoom())
        }
      },
    })
    const map1 = useMapEvents({
      click: (e) => {
        if (marker) {
          map1.removeLayer(marker);
        }
        marker = new L.Marker(e.latlng,{draggable: true}).addTo(map1);
      }
    });
    useEffect(()=>{
      mapp.locate()
    },[mapp])
  
    return position === null ? null : (
      <Marker position={position} draggable>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  const v1=Math.floor(Math.random() * (max + 1));  
  
  const Options = {
    loop: true,
    autoplay: true,
    animationData: load[v1],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
 
  return (
    <div className="SwappingArea">
    {
      openMyEffect &&
      <div>
        <Lottie options={Options} height={100} width={100} className="inner1-lottie"/> 
      </div>
    }
    { check==="Notifications" && 
        <div className="rest-background">
          <NotificationsModal details={details}/> 
        </div>
    }
    { check==="UserPage" && 
        <div className="rest-background">
          {
            Object.keys(details).length===0?
            <UserSignIn checkit={checkit} />
            :
            <div>
            <UserProfile details={details} logOut={logOut}/>
            </div>
          }
        </div>
    }
    { check==="Home" && 

        <div className="rest-background">
         
        <h2 style={{textAlign:"center"}}>Hospitals</h2>
        <HospitalCarousel carousel={carousel}/>
        <h2 style={{textAlign:"center"}}>Doctors</h2>
        <DoctorCarousel carousel={carousel}/>
        <div style={{textAlign:'center'}}> 
        <input type='text' id='address' placeholder='Checkout Your Location' className='search_location'/>
        <button type='button' onClick={()=>getCoordinates()} className='search_location_btn'> <HiOutlineSearch size={20}/></button>
        {
          locationError==='' &&
          <div className='errorMessage'>Please Enter Your Searching Location</div>
        }
        {
          locationError==='NotFound' &&
          <div className='errorMessage'>Try Some Another Near Location</div>
        }
        </div>
          <MapContainer className='leaflet-container' center={[lati===null?30.810209:lati,longi===null?76.060112:longi]} zoom={12} scrollWheelZoom={false}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {
            loc===false?
            <LocationMarker />
            :
            <LocateMe/>
          }
          <MapConsumer>
          {(map1) => {
            // eslint-disable-next-line
            map1.on("click", function (e) {
              if (marker) {
                map1.removeLayer(marker);
              }
              marker = new L.Marker(e.latlng,{draggable: true}).addTo(map1);
  
            });
            return null;
          }}
          </MapConsumer>
          </MapContainer >
          <div style={{textAlign:'center'}}>
          <button type='button' className='locateme_btn' onClick={()=>{setloc(true)}}>Locate Me<FaMapPin/></button>
          </div>
        </div>
    }
    {
      check==="GovtHospital" && 
      <div className="rest-background">
      <GovernmentHospital close={close}/>
      </div>
    }
    {
      check==="PvtHospital" && 
      <div className="rest-background">
      <PrivateHospital close={close}/>
      </div>
    }
    {
      check==="NearHospital" && 
      <div className="rest-background">
      <NearHospital close={close}/>
      </div>
    }
    {
      check==="NearDoctors" && 
      <div className="rest-background">
      <NearDoctor close={close}/>
      </div>
    }
    {
      check==="NormalDoctors" && 
      <div className="rest-background">
      <NormalDoctor close={close}/>
      </div>
    }
    {
      check==="SpecializedDoctors" && 
      <div className="rest-background">
      <SpecializedDoctor close={close}/>
      </div>      
    }
    {
      check==="Hospitals" &&
      <div className="rest-background">
        <h2 style={{textAlign:"center",margin:'0%'}}>Hospitals</h2>
          <HospitalLoading openEffect={()=>{setMyEffect(true)}} closeEffect={()=>{setMyEffect(false)}} check={check} userdetails={details} userPage={userPage}/>
       </div>
    }
    {
      check==="Doctors" &&
      <div className="rest-background">
      <h2 style={{textAlign:"center",margin:'0%'}}>Doctors</h2>
       <DoctorLoading openEffect={()=>{setMyEffect(true)}} closeEffect={()=>{setMyEffect(false)}} check={check}/>
       </div>
    }
    {
      check==="Laboratory" &&
      <div className="rest-background">
        <h2 style={{textAlign:"center",margin:'0%'}}>Laboratory</h2>
        <LaboratoryLoading openEffect={()=>{setMyEffect(true)}} closeEffect={()=>{setMyEffect(false)}} check={check}/>
       </div>
    }
    {
       check==="Pharmacy" &&
       <div className="rest-background">
        <h2 style={{textAlign:"center",margin:'0%'}}>Pharmacy</h2>
        <PharmacyLoading openEffect={()=>{setMyEffect(true)}} closeEffect={()=>{setMyEffect(false)}} check={check}/>
        </div>
    }
    {
       check==="Donations" &&
       <div className="rest-background">
         <h2 style={{textAlign:"center",margin:'0%'}}>Donations</h2>
        <DonationLoading openEffect={()=>{setMyEffect(true)}} closeEffect={()=>{setMyEffect(false)}} check={check}/>
        </div>
    }
    {
      check==="About" &&
      <div className="rest-background">
         <h2 style={{textAlign:"center",margin:'0%'}}>About Us</h2>
        <CreatorModal openEffect={()=>{setMyEffect(true)}} closeEffect={()=>{setMyEffect(false)}} check={check}/>
        </div> 
    }
  </div>
  )
  
}

export default SwappingArea;
