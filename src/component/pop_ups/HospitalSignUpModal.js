import React,{useState} from 'react';
import Lottie from 'react-lottie';
import {IoCloseSharp,IoCameraSharp} from 'react-icons/io5';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import { getDatabase, ref as Ref, set,child, get } from "firebase/database";
import {collection,addDoc} from 'firebase/firestore';
import { getStorage, ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import {db} from '../../firebase-config';
import hospital from '../../animate_lottie/pop-ups/hospital.json';
import hospitalinner from '../../animate_lottie/pop-ups/hospital_inner.json';
import '../cssfolder/pop_ups_styles/signupmodal.css';

const MODAL_STYLE={
  position:'fixed',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  zIndex:15,
  padding:'1px',
  width:'95%',
  height:'95%',
  borderRadius:'10px',
  overflow:'auto'
}

const OVERLAY_STYLES={
  position: 'fixed',
  top:0,
  bottom:0,
  left:0,
  right:0,
  backgroundColor:'rgba(1,1,1,0.005)',
  zIndex:10,
}
const BUTT_ST={
  position: 'fixed',
  top:0,
  right:0,
  zIndex:30,
  paddingRight:'0.15%',
  paddingTop:'0.15%',
  cursor:'pointer'
}


const HospitalSignUpModal = ({open,close,load}) => {
  const [effect,seteffect]=useState(false);
  const [prompt,setPrompt]=useState(null);
  const [result,setResult]=useState({});
  const [LeftValue,setLeftValue]=useState(null);
  const [selectImg,setSelectedImg]=useState(null);
  const [previewImg,setPreiviewImg]=useState(null);
  const [countryCode,setCountryCode]=useState();
  const [newHospital,setnewhospital]=useState({name:"",owner:"",phoneNumber:"",mailId:"",password:"",license:"",type:"",otp:"",verification:"",speciality:"",city:"",state:"",country:"",location:"",hospitalDescription:""});
  
  function clearOut(){
    setnewhospital({name:"",owner:"",phoneNumber:"",mailId:"",password:"",license:"",type:"",otp:"",verification:"",speciality:"",city:"",state:"",country:"",location:"",hospitalDescription:""});setPrompt(null);setResult({});setLeftValue(null);setSelectedImg(null);setPreiviewImg(null);setCountryCode(undefined);close();
  }
  function resetOut(){
    setnewhospital({name:"",owner:"",phoneNumber:"",mailId:"",password:"",license:"",type:"",otp:"",verification:"",speciality:"",city:"",state:"",country:"",location:"",hospitalDescription:""});setPrompt(null);setResult({});setLeftValue(null);setSelectedImg(null);setPreiviewImg(null);setCountryCode(undefined);
  }

  const uploadData=async()=>{
    seteffect(true)
    const storage = getStorage();
    const hospitalRef=collection(db,"Hospitals");
    const storageRef = ref(storage,`/Hospitals/${selectImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectImg);
    uploadTask.on('state_changed', 
    (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload is ' + ${progress} + '% done`);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        console.log('default Running');  
    }
    }, 
    (error) => {
      console.log(error)
      seteffect(false)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      const imageUrl=downloadURL;
      
      const {name,owner,phoneNumber,mailId,license,password,type,verification,speciality,city,state,country,location,hospitalDescription}=newHospital;
      const account='Hospital'
      if(name && owner && phoneNumber && mailId && license && type && verification && speciality && selectImg && city && state && country && location && hospitalDescription){
        
        addDoc(hospitalRef,{account,name,owner,phoneNumber,mailId,password,license,type,verification,speciality,city,state,country,location,hospitalDescription,imageUrl}).then((docRef)=>{
        const db1 = getDatabase();
        set(Ref(db1, `AuthenticateUsers/${phoneNumber}`), {
        username: name,
        userpassword:password,
        userphonenumber:phoneNumber,
        usercity:city,
        userstate:state,
        usercountry:country,
        useraccount:'Hospital',
        document:docRef.id
        })
      .then(() => {
        clearOut()
      })
      .catch((error) => {
        console.log(error)
        seteffect(false)
      });
          
      })
      }
    });
  }); 

  }
  function namecondition(val){
    const exp={
      containsAlphabet : /^([A-Za-z\s]){3,}$/
    }
    // eslint-disable-next-line
    let expMatch={};
    expMatch.containsAlphabet=exp.containsAlphabet.test(val);
    return expMatch.containsAlphabet
  }
  function phonenumbercondition(val){
    const exp={
      numbers:/^([0-9]){10}$/
    }
    // eslint-disable-next-line
    let expMatch={};
    expMatch.numbers=exp.numbers.test(val);
    return expMatch.numbers
  }
  function mailidcondition(val1,val2){
    const exp={
      mail:/^[@gmail.|com|net|org]/,
      first: /[a-zA-Z0-9]{4,}$/
    }
    // eslint-disable-next-line
    let expMatch={};
    expMatch.first=exp.first.test(val1);
    expMatch.mail=exp.mail.test(val2);
    return (expMatch.mail && expMatch.first)
  }

  function licensecondition(value){
    const exp={
      license:/[a-zA-Z0-9]{4,}$/
    }
    // eslint-disable-next-line
    let expMatch={};
    expMatch.license=exp.license.test(value)
    return expMatch.license
  }
  function charCheck(value){
    const exp={
      char:/([a-zA-Z\s]){4,}$/
    }
    // eslint-disable-next-line
    let expMatch={};
    expMatch.char=exp.char.test(value)
    return expMatch.char
  }

  function countWords(value){
    return value.match(/(\w+)/g).length;
  }
  function checkAddress(value){
    const exp={
      char:/^([a-zA-Z0-9 _ , \s]){4,}$/
    }
    // eslint-disable-next-line
    let expMatch={};
    expMatch.char=exp.char.test(value)
    return expMatch.char
  }
  function passwordCondition(value){
    if(value.length>=5){
      return true
    }
    return false
  }
  const verifyOtp=async()=>{
    
    const code = newHospital.otp;
    result.confirm(code).then((res) => {
    // User signed in successfully.
     console.log('Done',res)
     seteffect(true)
     uploadData();
    // ...
     }).catch((error) => {
     console.log('Wrong OTP',error)
     setPrompt('WrongOTP')
     seteffect(false)
    // User couldn't sign in (bad verification code?)
    // ...
    });
  }

  const onSignInSubmit=async()=>{
    const auth=getAuth();
    const {phoneNumber} = newHospital;
    const phone=`+${getCountryCallingCode(countryCode)}${phoneNumber}`;

    console.log(phone,' on sign in submit')
    const appVerifier = window.recaptchaVerifier;
    
    signInWithPhoneNumber(auth, phone, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log('OTP sent',confirmationResult);
      seteffect(false);
      setResult(confirmationResult);
      setPrompt('Sent')
      // ...
    }).catch((error) => {
      console.log(error,'occured')
      seteffect(false);
      setPrompt('SMS_Error')
      // Error; SMS not sent
      // ...
    });
  }
  const getCaptcha=async()=>{
    seteffect(true)
    const auth=getAuth();
    let check=true;
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    // eslint-disable-next-line
    'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
    }, auth);
    const dbRef = Ref(getDatabase());
    get(child(dbRef, `AuthenticateUsers/`)).then((snapshot) => {
    if (snapshot.exists()) {
      // eslint-disable-next-line
      for (const [key, value] of Object.entries(snapshot.val())) {
        if(key===newHospital.phoneNumber){
          console.log('user exist')
          check=false;
          setPrompt('User_Exist')
          break;
        }
      }
    }
    if(check===true || !snapshot.exists()){
      
      setTimeout(() => {
        onSignInSubmit();
      }, 4000);
    }else{
      seteffect(false)
    }
    }).catch((error) => {
      console.error(error);
      seteffect(false)
    });
  }

  const checkCondition=()=>{
    let val1=null;
    let val2=null;
    let temp=null;
    let check=true;
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(newHospital)) {
      switch(`${key}`){
        case 'name':
          check=namecondition(value);
          break;
        case 'owner':
          check=namecondition(value);
          break;
        case 'phoneNumber':
          check=phonenumbercondition(value);
          break;  
        case 'mailId':
          temp=value.search("@");
          val1=value.substr(0,temp);
          val2=value.substr(temp,value.length);
          check=mailidcondition(val1,val2);
          break;  
        case 'password':
          check=passwordCondition(value);
          break;  
        case 'license':
         check=licensecondition(value);
         break; 
        case 'verification':
          check=charCheck(value)
          break; 
        case 'speciality':
         check=countWords(value);
         if(check>=80 && check<=100){
           check=true;
         }else{
           check=false;
         }
         break;
        case 'city':
          check=charCheck(value);
          break;
        case 'state':
          check=charCheck(value);
          break;
        case 'country':
          if(value===undefined){
            check=false
          }else{
          check=true;
          }
          break;
        case 'location':
          check=checkAddress(value);
          break;         
        case 'hospitalDescription':
        check=countWords(value);
        if(check>=80 && check<=100){
          check=true;
        }else{
          check=false;
        }
         break;   
        default:
          break;  
      }
      if(!check){
        const k=key.toUpperCase();
        setLeftValue(`Accurate ${k}`)
        break;
      }
    }
    if(!check) return false;
    return true;
  }
  const createHospital = async()=>{ 
      let check=null;

      // eslint-disable-next-line
      for (const [key, value] of Object.entries(newHospital)) {
        if(`${value}`==="" && key!=='otp'){
          check=true;
          setLeftValue(` ${key.toUpperCase()} Can't BE Empty!!!`)
          break;
        }
        check=false;
      }

      if(check){
        seteffect(false)
      }else{
        setLeftValue(null);
        if(selectImg){
          const uploadDecision=checkCondition();
          if(uploadDecision){
            getCaptcha()
          }else{
            seteffect(false)
          }
        }
        else{
          setLeftValue('IMAGE')
          seteffect(false);
        }  
      }
  }
  
  const selectingImage=(event)=>{
    const image=event.target.files[0]
    setSelectedImg(image)
    const imgurl=URL.createObjectURL(image);
    setPreiviewImg(imgurl)  
  }


  let n;
  let v;
  const getNewHospital=(event)=>{
   n= event.target.name;
   v= event.target.value;
   if(n==='country'){
     newHospital.country=en[v]
    setnewhospital({...newHospital,[n]:en[v]});  
   }else{
    setnewhospital({...newHospital,[n]:v});
   }
  };


  if(!open) return null;

  const Options = {
    loop: true,
    autoplay: true,
    animationData: load,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const Options1 = {
    loop: true,
    autoplay: true,
    animationData: hospital,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const Options2 = {
    loop: true,
    autoplay: true,
    animationData: hospitalinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
   
    <div>
        <div className="splashBackground" style={{ position:'fixed',
          top:'50%',left:'50%',width:'95%', height:'95%', borderRadius:'10px',overflow:'auto',
          transform:'translate(-50%,-50%)', backgroundImage: 'url("HospitalSignup.png")', backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',backgroundSize: 'cover', filter: 'blur(1.5px)'}}>{}</div>
      
      <div style={OVERLAY_STYLES}>
      <div id='sign-in-button' style={{display:'none'}}>{}</div>
      { effect &&
        <div style={{ position:'fixed',zIndex:'20',background: 'rgba(255,255,255,0.5)',top:'50%',left:'50%',width:'95%',height:'95%', borderRadius:'10px',
        transform:'translate(-50%,-50%)', backgroundPosition: 'center',backgroundSize: 'cover', filter: 'blur(5px)'}}>
          <Lottie options={Options} style={{position: 'absolute',left: '50%',top: '50%',WebkitTransform: 'translate(-50%, -50%)',transform: 'translate(-50%, -50%)'}} className="inner1-lottie" width={200} height={200}/>
        </div>
       }
      <div style={MODAL_STYLE}  className="signup-modal">
      
      <div className="inner1">
      {
      true &&
      <div className="lottieOuter" style={{position:"sticky",top:'23%'}}>
        <div className="mainHeading">Hospital Sign Up</div>
          <Lottie options={Options1} height={175} width={150} className="inner1-lottie"/>
      </div>
      }
      {
       true &&
      <div className="lottieInner" style={{position:"sticky",top:'10%'}}>
      <div className="mainHeading">Hospital Sign Up</div>
      <Lottie options={Options1} height={75} width={75} className="inner1-lottie" style={{marginTop:'1%'}}/>
      </div>
      }
        
      </div> 
      <div className="inner2" >
      <IoCloseSharp onClick={()=>clearOut()} type="button" style={BUTT_ST} size={20}/>
      <Lottie options={Options2} height={120} width={120} />

      <form>
      <span className="signup-textstyle">Name:{'  '}</span>
      <input type="text" className="input-text" placeholder="ex: Apollo" name="name" value={newHospital.name} onChange={getNewHospital}/>
      <br/><br/>

      <span className="signup-textstyle">Owner:{'  '}</span>
      <input type="text" className="input-text" placeholder="Owner Name" name="owner" value={newHospital.owner} onChange={getNewHospital}/>
      <br/><br/>

      <span className="signup-textstyle">Phone Number:{'  '}</span>
      <input type="text" className="input-text" maxLength="10" placeholder="98788XXXXX" name="phoneNumber" value={newHospital.phoneNumber} onChange={getNewHospital}/>
      <br/><br/>

      <span className="signup-textstyle">Mail ID:{'  '}</span>
      <input type="email"  className="input-text"placeholder="xyz@gmail.com" name="mailId" value={newHospital.mailId} onChange={getNewHospital}/>
      <br/><br/>

      <span className="signup-textstyle">Password:{'  '}</span>
      <input className="input-text" type="password" name="password" value={newHospital.password} onChange={getNewHospital}/>
      <br/><br/>

      <span className="signup-textstyle">License Number:{'  '}</span>
          <input type="text"  className="input-text" name="license" value={newHospital.license} onChange={getNewHospital}/>
          <br/><br/>                 

      <span className="signup-textstyle">Type:{'  '}</span>
          <input type="radio" name="type" value="Government" onChange={getNewHospital}/><span className="signup-textstyle" style={{paddingRight:"5px"}}>Government</span>
          <input type="radio" name="type" value="Private" onChange={getNewHospital}/><span className="signup-textstyle" style={{paddingRight:"5px"}}>Private</span>
          <br/><br/>

      <span className="signup-textstyle">Verified By:{'  '}</span>
        <input type="text"  className="input-text" placeholder="Certificate or Approval" name="verification" value={newHospital.verification}
          onChange={getNewHospital}/>
          <br/><br/>

      <span className="signup-textstyle">Speciality:{'  '}</span>
      <textarea className="signup-description" placeholder="Describe Hospital Speciality!!! (In between 80 to 100 words)" name="speciality" value={newHospital.speciality}
          onChange={getNewHospital}/>
          <br/><br/>  


      <span className="signup-textstyle">City:{'  '}</span>
          <input type="text"  className="input-text" placeholder="Ludhiana" name="city" value={newHospital.city} onChange={getNewHospital}/>
          <br/><br/>

      <span className="signup-textstyle">State:{'  '}</span>
          <input type="text"  className="input-text" placeholder="Punjab" name="state" value={newHospital.state} onChange={getNewHospital}/>
          <br/><br/>

      <span className="signup-textstyle">Country:{'  '}</span>
      <select className="input-text" name='country' value={countryCode} onChange={event => setCountryCode(()=>{getNewHospital(event); return event.target.value || undefined})}  style={{cursor:'pointer'}}>
        <option value="">{en.ZZ}</option>
            {getCountries().map((country) => (
            <option key={country} value={country}>
            {en[country]} +{getCountryCallingCode(country)}
            </option>
            ))}
          </select>
          <br/><br/>    
   
      <span className="signup-textstyle">Location:{'  '}</span>
      <textarea className="signup-description" placeholder="Location" name="location" value={newHospital.location} onChange={getNewHospital}/>
          <br/><br/>

      <span className="signup-textstyle">Hospital Description:{'  '}</span>
      <textarea className="signup-description" placeholder="Describe Your Hospital in Brief (In between 80 to 100 words)" name="hospitalDescription" value={newHospital.hospitalDescription} onChange={getNewHospital}/>
          <br/><br/>    
      
      <span className="signup-textstyle">Upload Image:{'  '}</span>
      <br/><br/>
      {
        selectImg===null &&
        <>

        <img src="exlogo.png" alt="ex" style={{width:'50%'}}/><br/><br/>
        
        <label htmlFor="file" className="signup-textstyle">
        <input type="file" id="file" accept='image/*' name="hospitalImage" onChange={(e)=>{selectingImage(e)}}/>
        <IoCameraSharp/>{' '}Tap To Select
        </label>
        <br/><br/>
        </>
      }
      {
        selectImg &&
        <>
        <img src={previewImg} alt={selectImg} style={{width:'50%'}} />
        <br/><br/>
        <label htmlFor="file" className="signup-textstyle">
        <input type="file" id="file" accept='image/*' name="hospitalImage" onChange={(e)=>{selectingImage(e)}}/>
        <IoCameraSharp/>{' '}Tap To Select
        </label>
        <br/><br/>
        </>
      }
      {
        LeftValue===null?        
        null
        :
        <span className="signup-textstyle">Please Enter :{'  '}{LeftValue}</span>
      }
      {
        prompt===null && 
        <div className="signBtn">
        <div className="signBtnDesign">
        <button type="button" className="signup-btn" onClick={()=>{createHospital()}}>Submit</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </div>
      </div>
      }
      {
        prompt==='Sent' && prompt!=='SMS_Error' && prompt!=='WrongOTP' &&
        <>
        <div className="signup-textstyle">OTP:{' '}</div>    
        <div><input type='number' className="input-text" placeholder='OTP NUMBER' name='otp' value={newHospital.otp} onChange={getNewHospital}/></div> 
        <button type='button' className="signup-btn"  onClick={()=>verifyOtp()}>Check It</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </>
      }
      {
        prompt==='SMS_Error' && 
        <>
        <div className='signup-textstyle'>SMS cannot be sent</div> 
        <div className='signup-textstyle'>Try again later for getting an OTP</div>     
        <button type='button' className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </>
      }
      {
        prompt==='WrongOTP' &&
        <>
        <div className='signup-textstyle'>Wrong OTP</div>
        <button type='button' className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </>
      }
      {
        prompt==="User_Exist" &&
        <>
        <div className='signup-textstyle'>Already User Exists with same Phone Number</div>
        <button type="button" className="signup-btn" onClick={()=>{createHospital()}}>Submit</button>        
        <button type='button' className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </>
      }
      <br/><br/>
      </form>
      </div>

      </div>
    </div>
    </div>
  )
}

export default HospitalSignUpModal;
