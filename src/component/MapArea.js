import React,{useState,useEffect} from 'react'
import { MapContainer,TileLayer,useMapEvents,Marker,Popup } from 'react-leaflet';
import {HiOutlineSearch} from 'react-icons/hi'
import {FaMapPin,FaKey} from'react-icons/fa'

const btnstyle={
  border:'none',
  cursor:'pointer',
  color: 'white',
  fontSize: 'large',
  padding: '0.5%',
  margin: '1%',
  borderRadius: '5px',
  backgroundColor:'teal'
}
const MapArea = ({phoneNumber}) => {  
  const[latitude,setlatitude]=useState(null)
  const[loc,setloc]=useState(false)
  const[longitude,setlongitude]=useState(null)
  const[locationErrorEmergency,setlocationErrorEmergency]=useState(null)

  function getCoordinatesNow(){
    const add=document.getElementById('addressEmegerncy').value;
    if(add === ''){
      setlocationErrorEmergency('')
    }else{
      const url="https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=".concat(add).concat("&gen=9&apiKey=PTF2PCeD48s2shMiksMX4tGuMn36l70UscS4xiCnoh8")
      const xh=new XMLHttpRequest();
      xh.open("GET",url,false);
      xh.send(null)
      const json=JSON.parse(xh.responseText);
      if(loc===true) setloc(false)
      if(json.Response.View.length===0){
        setlocationErrorEmergency('NotFound')
      }else{
        setlocationErrorEmergency('Found')
        setlatitude(json.Response.View[0].Result[0].Location.DisplayPosition.Latitude);
        setlongitude(json.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
      }
    }
  }
  function LocateMeNow(){
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      
      locationfound(e) {
        if(position===null){
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
        }
      },
    })
    
    useEffect(()=>{
      map.locate()
    },[map])
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  function Location() {
    const [positionEmergency, setPositionEmergency] = useState(null)
    
    const map = useMapEvents({
      locationfound(e) {
        if(positionEmergency===null){
          const{lat,lng}=e.latlng
          setPositionEmergency([latitude===null?lat:latitude,longitude===null?lng:longitude])
          map.flyTo([latitude===null?lat:latitude,longitude===null?lng:longitude], map.getZoom())
        }else{
          setPositionEmergency({lat:latitude,lng:longitude})
          map.flyTo({lat:latitude,lng:longitude}, map.getZoom())
        }
      },
    })
    useEffect(()=>{
      map.locate()
    },[map])
  
    return positionEmergency === null ? null : (
      <Marker position={positionEmergency} draggable>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  
  return (
        <div style={{textAlign:'center'}}> 
        <input type='text' id='addressEmegerncy' placeholder='Emergency Location' className='search_location'/>
        <button type='button' onClick={()=>getCoordinatesNow()} className='search_location_btn'> <HiOutlineSearch size={20}/></button>
        {
          locationErrorEmergency==='' &&
          <div className='errorMessage'>Enter Something </div>
        }
        {
          locationErrorEmergency==='NotFound' &&
          <div className='errorMessage'>Try Some Another Near Location</div>
        }
        <MapContainer className='leaflet-emergencycontainer'  center={[latitude===null?30.810209:latitude,longitude===null?76.060112:longitude]} zoom={10} scrollWheelZoom={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {
          loc===false?
          <Location/>
          :
          <LocateMeNow/>
        }
        </MapContainer> 
        <button type='button' onClick={()=>{setloc(true)}}
        style={btnstyle} >Locate Me<FaMapPin/></button>
        {
          phoneNumber==='ambulance' && 
          <button type='button'style={btnstyle} >Rescue Me{' '}<FaKey/></button>
        }
        { phoneNumber==='police' &&
          <button type='button' style={btnstyle} >Rescue Me{' '}<FaKey/></button>
        }
        </div>
  )
}

export default MapArea
