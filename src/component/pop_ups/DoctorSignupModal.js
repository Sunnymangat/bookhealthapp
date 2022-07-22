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
import doctor from '../../animate_lottie/pop-ups/doctor.json';
import doctorinner from '../../animate_lottie/pop-ups/doctor_inner.json';
import '../cssfolder/pop_ups_styles/signupmodal.css';

const MODAL_STYLE={
  position:'fixed',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  zIndex:10,
  height:'95%',
  width:'95%',
  borderRadius:'10px',
  overflow:'auto',

}

const OVERLAY_STYLES={
  position: 'fixed',
  top:0,
  bottom:0,
  left:0,
  right:0,
  backgroundColor:'rgba(1,1,1,0.005)',
  zIndex:10,
  padding: '20px'
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


const DoctorSignupModal = ({open,close,load}) => {
  const [effect,seteffect]=useState(false);
  const [prompt,setPrompt]=useState(null);
  const [result,setResult]=useState({});
  const [LeftValue,setLeftValue]=useState(null);
  const [selectImg,setSelectedImg]=useState(null)
  const [previewImg,setPreiviewImg]=useState(null)
  const [countryCode,setCountryCode]=useState();
  const [newDoctor,setnewDoctor]=useState({
    name:"",lastname:"",age:"",certificates:"",approvedBy:"",otp:"",speciality:"",phoneNumber:"",mailId:"",password:"",workHospital:"",clinicName:"",clinicLocation:"",clinicOpening:"",clinicClosing:"",
    city:"",state:"",country:"",houseLocation:"",houseOpening:"",houseClosing:"",prevHistory:""
  });
  
  
  function clearOut(){
    setPrompt(null);setResult({});setLeftValue(null);setSelectedImg(null);setPreiviewImg(null);setCountryCode(undefined);setnewDoctor({name:"",lastname:"",age:"",certificates:"",approvedBy:"",otp:"",speciality:"",phoneNumber:"",mailId:"",password:"",workHospital:"",clinicName:"",clinicLocation:"",clinicOpening:"",clinicClosing:"",city:"",state:"",country:"",houseLocation:"",houseOpening:"",houseClosing:"",prevHistory:""});close()
  }
  function resetOut(){
    setPrompt(null);setResult({});setLeftValue(null);setSelectedImg(null);setPreiviewImg(null);setCountryCode(undefined);
          setnewDoctor({name:"",lastname:"",age:"",certificates:"",approvedBy:"",otp:"",speciality:"",phoneNumber:"",mailId:"",password:"",workHospital:"",clinicName:"",clinicLocation:"",clinicOpening:"",clinicClosing:"",city:"",state:"",country:"",houseLocation:"",houseOpening:"",houseClosing:"",prevHistory:""});
  }
  const uploadData=async()=>{
    seteffect(true)
    const storage = getStorage();
    const doctorRef=collection(db,"Doctors");
    
    const storageRef = ref(storage,`/Doctors/${selectImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectImg);
    uploadTask.on('state_changed', 
    (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      const imageUrl=downloadURL;
      const account='Doctor';

      const {name,lastname,age,certificates,password,approvedBy,speciality,phoneNumber,mailId,workHospital,clinicName,clinicLocation,clinicOpening,clinicClosing,city,state,country,houseLocation,houseOpening,houseClosing,prevHistory}=newDoctor;

      if(name && age && certificates && approvedBy && speciality && phoneNumber && mailId && clinicName && clinicLocation && clinicOpening && clinicClosing && city && state && country && houseLocation && houseOpening && houseClosing && prevHistory){
        addDoc(doctorRef,{account,name,lastname,age,password,certificates,approvedBy,speciality,phoneNumber,mailId,workHospital,clinicName,clinicLocation,clinicOpening,clinicClosing,city,state,country,houseLocation,houseOpening,houseClosing,prevHistory,imageUrl}).then((docRef)=>{
          const db1 = getDatabase();
          set(Ref(db1, `AuthenticateUsers/${phoneNumber}`), {
            username: name,
            userpassword:password,
            userphonenumber:phoneNumber,
            usercountry:country,
            useraccount:'Doctor',
            document:docRef.id
          })
          .then(() => {
            clearOut()
          }).catch((error) => {
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

  function checkAddress(value){
    const exp={
      char:/^([a-zA-Z0-9 _ , \s]){4,}$/
    }
    // eslint-disable-next-line
    let expMatch={};
    expMatch.char=exp.char.test(value)
    return expMatch.char
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
  function passwordCondition(value){
    if(value.length>=5){
      return true
    }
    return false
  }

  const checkCondition=()=>{
    let val1=null;
    let val2=null;
    let temp=null;
    let check=true;
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(newDoctor)) {
      switch(`${key}`){
        case 'name':
          check=namecondition(value);
          break;
        case 'age':
          if(value>=18 && value<=70){
            check=true;
            break;
          }
          check=false;
          break;  
        case 'certificates':
          check=charCheck(value);
          break;
        case 'approvedBy':
          check=charCheck(value);
          break;
        case 'speciality':
          check=countWords(value);
          if(check>=80 && check <=100){
              check=true;
          }else{
              check=false;
          }
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
        case 'clinicName':
          check=charCheck(value)
          break;
        case 'clinicLocation':
          check=checkAddress(value)
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
        case 'houseLocation':
            check=checkAddress(value);
            break;                     
        case 'prevHistory':
        check=countWords(value);
        if(check>=80 && check <=100){
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

  const verifyOtp=async()=>{
    seteffect(true)
    const code = newDoctor.otp;
    result.confirm(code).then((res) => {
    // User signed in successfully.
     console.log('Done',res)
     
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

  const onSignInSubmit=async(auth)=>{
    const {phoneNumber} = newDoctor;
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
      console.log(error,'occured');
      seteffect(false);
      setPrompt('SMS_Error');
      // Error; SMS not sent
      // ...
    });
  }

  const getCaptcha=async()=>{
    let check=true;
    seteffect(true)
    const auth=getAuth()
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
        if(key===newDoctor.phoneNumber){
          console.log('user exist')
          check=false;
          setPrompt('User_Exist')
          break;
        }
      }
    }
    if(check || !snapshot.exists()){
      setTimeout(() => {
      onSignInSubmit(auth);
      }, 4000);
    }else{
      seteffect(false)
    }
    }).catch((error) => {
      seteffect(false)
      console.error(error);
    });
  }

  const createDoctor = async()=>{ 
      let check=null;
      // eslint-disable-next-line
      for (const [key, value] of Object.entries(newDoctor)) {
        setLeftValue(` ${key.toUpperCase()} Can't BE Empty!!!`)
        if(`${value}`==="" && key!=='lastname' && key!=='workHospital' && key!=='otp'){
          check=true;
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
  const getNewDoctor=(event)=>{
   n= event.target.name;
   v= event.target.value;
   if(n==='country'){
    newDoctor.country=en[v]
   setnewDoctor({...newDoctor,[n]:en[v]});  
  }else{
    setnewDoctor({...newDoctor,[n]:v});
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
    animationData: doctor,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const Options2 = {
    loop: true,
    autoplay: true,
    animationData: doctorinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <div className="splashBackground" style={{ position:'fixed',top:'50%', left:'50%',width:'95%',height:'95%',
      transform:'translate(-50%,-50%)',borderRadius:'10px',overflow:'auto',backgroundImage: 'url("DoctorSignup.png")',
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', filter: 'blur(2px)'}}>
          {}
      </div>
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
      {true &&
      <div className="lottieOuter" style={{position:"sticky",top:'23%'}}>
        <div className="mainHeading" >Doctor Sign Up</div>
          <Lottie options={Options1} height={225} width={225} className="inner1-lottie"/>
      </div>
      }
      {
       true &&
      <div className="lottieInner" style={{position:"sticky",top:'10%'}}>
      <div className="mainHeading" >Doctor Sign Up</div>
      <Lottie options={Options1} height={75} width={75} className="inner1-lottie" style={{marginTop:'5%'}}/>
      </div>
      }
        </div> 
        <div className="inner2">
        <Lottie options={Options2} height={125} width={125} /><br/>
        <IoCloseSharp onClick={()=>clearOut()} type="button" style={BUTT_ST} size={20}/>
      <form>
      
      <span className="signup-textstyle">First Name:{'  '}</span>
          <input type="text" className="input-text" placeholder="Ex : Jass" name="name" value={newDoctor.name} onChange={getNewDoctor}/>
          <br/><br/>
      
      <span className="signup-textstyle">Last Name:{'  '}</span>
          <input type="text" className="input-text" placeholder="Optional"  name="lastname" value={newDoctor.lastname} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">Age:{'  '}</span>
          <input type="number" className="input-text" placeholder="18" min={20} max={70}  name="age" value={newDoctor.age} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">Certifications Done:{'  '}</span>
          <input type="text" className="input-text" placeholder="Higher Qualification"  name="certificates" value={newDoctor.certificates} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">Approved By:{'  '}</span>
          <input type="text" className="input-text" placeholder="Authority Name" name="approvedBy" value={newDoctor.approvedBy} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">Speciality:{'  '}</span>
          <textarea className="signup-description" placeholder="Any Speciality (In between 80 to 100 words)"  name="speciality" value={newDoctor.speciality} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">Phone Number:{'  '}</span>
          <input type="text" className="input-text" placeholder="98765XXXXX" maxLength="10"  name="phoneNumber" value={newDoctor.phoneNumber} onChange={getNewDoctor}/>
          <br/><br/>              

      <span className="signup-textstyle">Mail ID:{'  '}</span>
          <input type="text" className="input-text" placeholder="xyz@gmail.com"  name="mailId" value={newDoctor.mailId} onChange={getNewDoctor}/>
          <br/><br/>
      <span className="signup-textstyle">Password:{'  '}</span>
          <input type="password" className="input-text"  name="password" value={newDoctor.password} onChange={getNewDoctor}/>
          <br/><br/>    
      <span className="signup-textstyle">Working Hospital:{'  '}</span>
          <input type="text" className="input-text" placeholder="Hospital Name"  name="workHospital" value={newDoctor.workHospital} onChange={getNewDoctor}/>
          <br/><br/>    

      <span className="signup-textstyle">Clinic Name:{'  '}</span>
          <input type="text" className="input-text" placeholder="XYZ"  name="clinicName" value={newDoctor.clinicName} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">Clinic Location:{'  '}</span>
          <input type="text" className="input-text" placeholder="XYZ"  name="clinicLocation" value={newDoctor.clinicLocation} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">Clinic Timing:{'  '}</span>
          <input type="time" className="input-time"  name="clinicOpening" value={newDoctor.clinicOpening} onChange={getNewDoctor}/>

      <span className="signup-textstyle">{' '}To{'  '}</span>
          <input type="time" className="input-time"  name="clinicClosing" value={newDoctor.clinicClosing} onChange={getNewDoctor} style={{margin:'2%'}}/>
          <br/><br/>    

      <span className="signup-textstyle">City:{'  '}</span>
          <input type="text"  className="input-text" placeholder="Ludhiana"  name="city" value={newDoctor.city} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">State:{'  '}</span>
          <input type="text"  className="input-text" placeholder="Punjab"  name="state" value={newDoctor.state} onChange={getNewDoctor}/>
          <br/><br/>

      <span className="signup-textstyle">Country:{'  '}</span>
      <select className="input-text" name='country' value={countryCode} onChange={event => setCountryCode(()=>{getNewDoctor(event); return event.target.value || undefined})}  style={{cursor:'pointer'}}>
        <option value="">{en.ZZ}</option>
            {getCountries().map((country) => (
            <option key={country} value={country}>
            {en[country]} + {getCountryCallingCode(country)}
            </option>
            ))}
          </select>
          <br/><br/>

      <span className="signup-textstyle">House Location:{'  '}</span>
      <textarea className="signup-description" placeholder="Location"  name="houseLocation" value={newDoctor.houseLocation} onChange={getNewDoctor}/>
          <br/><br/>
      
      <span className="signup-textstyle">House Timing:{'  '}</span>
          <input type="time" className="input-time" name="houseOpening" value={newDoctor.houseOpening} onChange={getNewDoctor}/>
          <span className="signup-textstyle">{' '}To{'  '}</span>
          <input type="time" className="input-time" name="houseClosing" value={newDoctor.houseClosing} onChange={getNewDoctor}/>
      <br/><br/>    

      <span className="signup-textstyle">Upload Image:{'  '}</span>
      <br/><br/>
      {
        selectImg===null &&
        <>

        <img src="exlogo.png" alt="ex" style={{width:'50%'}}/><br/><br/>
        
        <label htmlFor="file" className="signup-textstyle">
        <input type="file" id="file" accept='image/*' name="doctorImage" onChange={(e)=>{selectingImage(e)}}/>
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
        <input type="file" id="file" accept='image/*' name="doctorImage" onChange={(e)=>{selectingImage(e)}}/>
        <IoCameraSharp/>{' '}Tap To Select
        </label>
        <br/><br/>
        </>
      }
      <span className="signup-textstyle">Previous History:{'  '}</span>
      <textarea className="signup-description" placeholder="Describe Yourself in Brief (In between 80 to 100 words)"  name="prevHistory" value={newDoctor.prevHistory} onChange={getNewDoctor}/>
      <br/><br/>
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
        <button type="button" className="signup-btn" onClick={()=>{createDoctor()}}>Submit</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}} >Close</button>
        </div>
      </div>
      }
      {
        prompt==='Sent' && prompt!=='SMS_Error' && prompt!=='WrongOTP' &&
        <>
        <div className="signup-textstyle">OTP:{' '}</div>    
        <div><input type='number' className="input-text" placeholder='OTP NUMBER' name='otp' value={setnewDoctor.otp} onChange={getNewDoctor}/></div> 
        <button type='button' className="signup-btn" onClick={()=>verifyOtp()}>Check It</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </>
      }
      {
        prompt==='SMS_Error' && 
        <>
        <div className='signup-textstyle'>SMS cannot be sent</div>
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
        <button type="button" className="signup-btn" onClick={()=>{createDoctor()}}>Submit</button>
        <button type="button" className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}} >Close</button>
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

export default DoctorSignupModal;
