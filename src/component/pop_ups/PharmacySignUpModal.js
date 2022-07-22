import React,{useState} from 'react';
import Lottie from 'react-lottie';
import {IoCloseSharp,IoCameraSharp} from 'react-icons/io5';
import {collection,addDoc} from 'firebase/firestore';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import { getDatabase, ref as Ref, set,child, get } from "firebase/database";
import { getStorage, ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import {db} from '../../firebase-config';
import pharmacy from '../../animate_lottie/pop-ups/pharmacy.json';
import pharmacyinner from '../../animate_lottie/pop-ups/pharmaacy_inner.json';

const MODAL_STYLE={
  position:'fixed',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  zIndex:10,
  padding:'1px',
  width:'90%',
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
  zIndex:10
}
const BUTT_ST={
  position: 'fixed',
  top:0,
  right:0,
  zIndex:30,
  paddingTop:'0.15%',
  paddingRight:'0.15%',
  cursor:'pointer'
}

const Pharmacy = ({open,close,load}) => {
  const [prompt,setPrompt]=useState(null);
  const [result,setResult]=useState({});
  const [countryCode,setCountryCode]=useState();
  const [LeftValue,setLeftValue]=useState(null);  
  const [selectImgOwner,setSelectedImgOwner]=useState(null)
  const [previewImgOwner,setPreiviewImgOwner]=useState(null)
  const [selectImg,setSelectedImg]=useState(null)
  const [previewImg,setPreiviewImg]=useState(null)
  const [effect,seteffect]=useState(false);
  const [newPharmacy,setnewPharmacy]=useState({
  name:"",owner:"",phoneNumber:"",mailId:"",password:"",otp:"",license:"",type:"",verifiedBy:"",city:"",state:"",country:"",location:"",speciality:""});

  function ClearOut(){
    seteffect(false);
    setPrompt(null);setResult({});setCountryCode(undefined); setLeftValue(null);setSelectedImgOwner(null);setPreiviewImgOwner(null);setSelectedImg(null);setPreiviewImg(null);seteffect(false);setCountryCode(undefined);
    setnewPharmacy({name:"",owner:"",phoneNumber:"",otp:"",mailId:"",password:"",license:"",type:"",verifiedBy:"",city:"",state:"",country:"",location:"",speciality:""}); close()
  }
  function resetOut(){
    seteffect(false);setPrompt(null);setResult({});setCountryCode(undefined); setLeftValue(null);setSelectedImgOwner(null);setPreiviewImgOwner(null);setSelectedImg(null);setPreiviewImg(null);seteffect(false);setCountryCode(undefined);
    setnewPharmacy({name:"",owner:"",phoneNumber:"",otp:"",mailId:"",password:"",license:"",type:"",verifiedBy:"",city:"",state:"",country:"",location:"",speciality:""}); 
  }

  const secondUpload=(ownerImage,storageRef)=>{

    const pharmacyRef=collection(db,"Pharmacies");
    const uploadTask = uploadBytesResumable(storageRef, selectImg);
    uploadTask.on('state_changed', (snapshot) => {
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
        
        const { name,owner,phoneNumber,mailId,password,license,type,verifiedBy,city,state,country,location,speciality}=newPharmacy;
        
        if(name){
          const account='Pharmacy'
          console.log('Uploading your Data wait')
          addDoc(pharmacyRef,{account,name,owner,phoneNumber,mailId,license,type,verifiedBy,city,state,country,location,speciality,imageUrl,ownerImage,password}).then((docRef)=>{
            const db1 = getDatabase();
            set(Ref(db1, `AuthenticateUsers/${phoneNumber}`), {
            username: name,
            userpassword:password,
            userphonenumber:phoneNumber,
            usercountry:country,
            useraccount:'Pharmacy',
            document:docRef.id
            }).then(() => {
              ClearOut()
            }).catch((error) => {
              console.log(error)
              seteffect(false)
            });
          })
        }
      });
    });
  }



  const uploadData=async()=>{
    seteffect(true)
    const storage = getStorage();
    const storageRef = ref(storage,`/Pharmacies/${selectImg.name}`);
    const storageReff = ref(storage,`/PharmacyOwners/${selectImgOwner.name}`);
    const uploadTasked = uploadBytesResumable(storageReff, selectImgOwner);
    let ownerImage;

    // eslint-disable-next-line
    
    uploadTasked.on('state_changed', (snapshot) => {
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
        getDownloadURL(uploadTasked.snapshot.ref).then((downloadOwnerURL) => {
          ownerImage=downloadOwnerURL;
          secondUpload(ownerImage,storageRef);
          console.log('Owner: ',ownerImage)
        })
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
function licensecondition(value){
  const exp={
    license:/[a-zA-Z0-9]{4,}$/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.license=exp.license.test(value)
  return expMatch.license
}

const verifyOtp=async()=>{
    
  const code = newPharmacy.otp;
  result.confirm(code).then((res) => {
    seteffect(true)
  // User signed in successfully.
   console.log('Done',res)
   uploadData();
  // ...
   }).catch((error) => {
    seteffect(false)
   console.log('Wrong OTP',error)
   setPrompt('WrongOTP')
  // User couldn't sign in (bad verification code?)
  // ...
  });
}

const onSignInSubmit=async()=>{
  const auth=getAuth();
  const {phoneNumber} = newPharmacy;
  const phone=`+${getCountryCallingCode(countryCode)}${phoneNumber}`;

  console.log(phone,' on sign in submit')
  const appVerifier = window.recaptchaVerifier;
  
  signInWithPhoneNumber(auth, phone, appVerifier)
  .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    console.log('OTP sent',confirmationResult)
    seteffect(false)
    setResult(confirmationResult);
    setPrompt('Sent')
    // ...
  }).catch(() => {
    seteffect(false)
    setPrompt('SMS_Error')
    // Error; SMS not sent
    // ...
  });
}

const getCaptcha=async()=>{
  const auth=getAuth();
  seteffect(true)
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
      if(key===newPharmacy.phoneNumber){
        console.log('user exist')
        check=false;
        setPrompt('User_Exist')
        break;
      }
    }
  } 
  if(check || !snapshot.exists()){
    setTimeout(() => {
      onSignInSubmit();
      }, 4000);
  }}).catch((error) => {
    seteffect(false)
    console.error(error);
  });
}

const checkCondition=()=>{
  let val1=null;
  let val2=null;
  let temp=null;
  let check=true;
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(newPharmacy)) {
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
      case 'verifiedBy':
        check=charCheck(value);
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
      case 'speciality':
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
  const createPharmacy = async()=>{ 
    let check=null;

      // eslint-disable-next-line
      for (const [key, value] of Object.entries(newPharmacy)) {
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
        if(selectImg && previewImgOwner){
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

  const selectingOwnerImage=(event)=>{
    const image=event.target.files[0]
    setSelectedImgOwner(image)
    const imgurl=URL.createObjectURL(image);
    setPreiviewImgOwner(imgurl)  
  }


  let n;
  let v;
  const getNewPharmacy=(event)=>{
   n= event.target.name;
   v= event.target.value;

   if(n==='country'){
    newPharmacy.country=en[v]
    setnewPharmacy({...newPharmacy,[n]:en[v]});  
    }else{
    setnewPharmacy({...newPharmacy,[n]:v});
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
  const Option1 = {
    loop: true,
    autoplay: true,
    animationData: pharmacy,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const Option2 = {
    loop: true,
    autoplay: true,
    animationData: pharmacyinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <div className="splashBackground" style={{ position:'fixed', top:'50%',left:'50%', transform:'translate(-50%,-50%)',
        width:'90%', height:'95%',borderRadius:'10px', overflow:'auto',backgroundImage: 'url("PharmacySignup.png")',
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize: 'cover', filter: 'blur(2.5px)'}}>
        {}
      </div>

      <div style={OVERLAY_STYLES}>
      <div id='sign-in-button' style={{display:'none'}} >{}</div>
      { effect &&
        <div style={{ position:'fixed',zIndex:'20',background: 'rgba(255,255,255,0.5)',top:'50%',left:'50%',width:'95%',height:'95%', borderRadius:'10px',
          transform:'translate(-50%,-50%)', backgroundPosition: 'center',backgroundSize: 'cover', filter: 'blur(5px)'}}><Lottie options={Options} style={{position: 'absolute',left: '50%',top: '50%',WebkitTransform: 'translate(-50%, -50%)',transform: 'translate(-50%, -50%)'}} className="inner1-lottie" width={200} height={200}/>
        </div>
       }
      <div style={MODAL_STYLE}  className="signup-modal">
      <div className="inner1">
      {true &&
      <div className="lottieOuter" style={{position:"sticky",top:'23%'}}>
        <div className="mainHeading" >Pharmacy Sign Up</div><Lottie options={Option1} height={200} width={200} className="inner1-lottie"/>
      </div>
      }
      {
       true &&
      <div className="lottieInner" style={{position:"sticky",top:'10%'}}>
        <div className="mainHeading" >Pharmacy Sign Up</div><Lottie options={Option1} height={75} width={75} className="inner1-lottie" style={{marginTop:'2%'}}/>
      </div>
      }
      </div>  
      <div className="inner2">
      <Lottie options={Option2} height={120} width={90} />
      <IoCloseSharp onClick={()=>{ClearOut();close()}} type="button" style={BUTT_ST} size={20}/>
      <form>
          <span className="signup-textstyle">Name:{'  '}</span>
            <input type="text" className="input-text" placeholder="Pharmacy" name="name" value={newPharmacy.name} onChange={getNewPharmacy}/>
          <br/><br/>

          <span className="signup-textstyle">Owned By:{'  '}</span>
            <input type="text" className="input-text" placeholder="Ex : Jass" name="owner" value={newPharmacy.owner} onChange={getNewPharmacy}/>
          <br/><br/>

          <span className="signup-textstyle">Pharmacy Owner Image:{'  '}</span><br/><br/>          
          {
            selectImgOwner===null &&
            <>
            <img src="exlogo.png" alt="ex" style={{width:'50%',borderRadius:'50%'}}/><br/><br/>
            <label htmlFor="fileOwner" className="signup-textstyle">
            <input type="file" id="fileOwner" accept='image/*' name="hospitalOwnerImage" onChange={(e)=>{selectingOwnerImage(e)}}/>
            <IoCameraSharp/>{' '}Tap To Select
            </label>
            <br/><br/>
            </>
          }
          {
            selectImgOwner &&
            <>
            <img src={previewImgOwner} alt={selectImgOwner} style={{width:'50%',borderRadius:'50%'}} /><br/><br/>
            <label htmlFor="fileOwner" className="signup-textstyle">
            <input type="file" id="fileOwner" accept='image/*' name="hospitalOwnerImage" onChange={(e)=>{selectingOwnerImage(e)}}/>
            <IoCameraSharp/>{' '}Tap To Select
            </label><br/><br/>
            </>
          }

          <span className="signup-textstyle">Phone Number:{'  '}</span>
            <input type="text" className="input-text" placeholder="98765XXXXX" name="phoneNumber" value={newPharmacy.phoneNumber} onChange={getNewPharmacy}/>
          <br/><br/>

          <span className="signup-textstyle">Mail ID:{'  '}</span>
            <input type="text" className="input-text" placeholder="xyz@gmail.com" name="mailId" value={newPharmacy.mailId} onChange={getNewPharmacy}/>
          <br/><br/>

          <span className="signup-textstyle">Password:{'  '}</span>
          <input className="input-text" type="password" name="password" value={newPharmacy.password} onChange={getNewPharmacy}/>
          <br/><br/> 

          <span className="signup-textstyle">License Number:{'  '}</span>
            <input type="text" className="input-text" name="license" value={newPharmacy.license} onChange={getNewPharmacy}/>
          <br/><br/>                 

          <span className="signup-textstyle">Type:{'  '}</span>
            <input type="radio" name="type" value="Government" onChange={getNewPharmacy}/><span className="signup-textstyle" style={{marginRight:'10px'}}>Government</span>
            <input type="radio" name="type" value="Private" onChange={getNewPharmacy}/><span className="signup-textstyle">Private</span>
          <br/><br/>

          <span className="signup-textstyle">Verified By:{'  '}</span>
            <input type="text" className="input-text" placeholder="Certificate or Approval" name="verifiedBy" value={newPharmacy.verifiedBy} onChange={getNewPharmacy}/>
          <br/><br/>    
      
          <span className="signup-textstyle">City:{'  '}</span>
            <input type="text" className="input-text" placeholder="Ludhiana" name="city" value={newPharmacy.city} onChange={getNewPharmacy}/>
          <br/><br/>

          <span className="signup-textstyle">State:{'  '}</span>
            <input type="text" className="input-text" placeholder="Punjab" name="state" value={newPharmacy.state} onChange={getNewPharmacy}/>
          <br/><br/>
          
        <span className="signup-textstyle">Country:{'  '}</span>
          <select className="input-text" name='country' value={countryCode} onChange={event => setCountryCode(()=>{getNewPharmacy(event); return event.target.value || undefined})}  style={{cursor:'pointer'}}>
          <option value="">{en.ZZ}</option>
            {getCountries().map((country) => (
            <option key={country} value={country}>
            {en[country]} +{getCountryCallingCode(country)}
            </option>
            ))}
          </select>
          <br/><br/>   
          
          <span className="signup-textstyle">Location:{'  '}</span>
            <textarea className="signup-description" placeholder="Current Address" name="location" value={newPharmacy.location} onChange={getNewPharmacy}/>
          <br/><br/>
                  
          <span className="signup-textstyle">Speciality:{'  '}</span>
            <textarea className="signup-description" placeholder="Anything Exceptional!!!  (In between 80 to 100 words)" name="speciality" value={newPharmacy.speciality} onChange={getNewPharmacy}/>
          <br/><br/>
      
          <span className="signup-textstyle">Upload Images:{'  '}</span>
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
        <button type="button" className="signup-btn" onClick={()=>{createPharmacy()}}>Submit</button>
        <button type="button" className="signup-btn" onClick={()=>{ClearOut()}} >Close</button>
        </div>
      </div>
      }
      {
        prompt==='Sent' && prompt!=='SMS_Error' && prompt!=='WrongOTP' &&
        <>
        <div className="signup-textstyle">OTP:{' '}</div>    
        <div><input type='number' className="input-text" placeholder='OTP NUMBER' name='otp' value={newPharmacy.otp} onChange={getNewPharmacy}/></div> 
        <button type='button' style={{background: '#ccffce',fontSize: 'larger',color: 'teal', marginTop:'1%',padding: '10px',borderRadius: '10px',border:'2px'}} onClick={()=>verifyOtp()}>Check It</button>
        <button type="button" className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{ClearOut()}}>Close</button>
        </>
      }
      {
        prompt==='SMS_Error' && 
        <>
        <div className='signup-textstyle'>SMS cannot be sent</div>
        <div className='signup-textstyle'>Try again later for getting an OTP</div> 
        <button type="button" className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{ClearOut()}}>Close</button>
        </>
      }
      {
        prompt==='WrongOTP' &&
        <>
        <div className='signup-textstyle'>Wrong OTP</div>
        <button type="button" className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{ClearOut()}}>Close</button>
        </>        
      }
      {
        prompt==="User_Exist" &&
        <>
        <div className='signup-textstyle'>Already User Exists with same Phone Number</div>
        <button type="button" className="signup-btn" onClick={()=>{createPharmacy()}}>Submit</button>
        <button type="button" className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{ClearOut()}}>Close</button>
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

export default Pharmacy;
