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
import animation1 from '../../animate_lottie/pop-ups/users_signup_lottiefile.json';
import animation2 from '../../animate_lottie/pop-ups/health-heart.json';
import '../cssfolder/pop_ups_styles/signupmodal.css';


const MODAL_STYLE={
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  zIndex:15,
  height:'95%',
  width:'90%',
  borderRadius:'10px',
  overflow: 'auto'
}

const OVERLAY_STYLES={
  position: 'fixed',
  top:0,
  bottom:0,
  left:0,
  right:0,
  background:'white',
  backgroundColor:'rgba(1,1,1,0.005)',
  zIndex:10,
}
const BUTT_ST={
  position: 'fixed',
  top:0,
  right:0,
  paddingTop:'0.15%' ,
  paddingRight:'0.15%',
  cursor:'pointer'
}


const SignUpModal = ({open,close,load}) => {
  const [countryCode,setCountryCode]=useState(undefined);
  const [prompt,setPrompt]=useState(null);
  const [result,setResult]=useState({});
  const [LeftValue,setLeftValue]=useState(null);
  const [selectImg,setSelectedImg]=useState(null);
  const [previewImg,setPreiviewImg]=useState(null); 
  const [effect,seteffect]=useState(false);
  const [newUser,setnewUser]=useState({
    name:"",lastname:"",age:"",gender:"",otp:"",mailId:"",country:"",phoneNumber:"",password:"",address:"",description:""
  });

  
  const clearOut=async()=>{
    setCountryCode(undefined); setPrompt(null); setResult({}); setLeftValue(null); setSelectedImg(null); setPreiviewImg(null);  seteffect(false); setnewUser({name:"",lastname:"",age:"",gender:"",otp:"",mailId:"",country:"",phoneNumber:"",password:"",address:"",description:""});seteffect(false);close();
  }
  
  const resetOut=async()=>{
    setCountryCode(undefined); setPrompt(null); setResult({}); setLeftValue(null); setSelectedImg(null); setPreiviewImg(null);  seteffect(false); setnewUser({name:"",lastname:"",age:"",gender:"",otp:"",mailId:"",country:"",phoneNumber:"",password:"",address:"",description:""});
  }

  const uploadData=async()=>{
    const userRef=collection(db,"Users");
    const storage = getStorage();
    const account='User';
    const {name,lastname,phoneNumber,mailId,age,password,country,gender,address,description}=newUser;
    if(selectImg!==null){
    
    const storageRef = ref(storage,`/Users/${selectImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectImg);
    
    uploadTask.on('state_changed', (snapshot) => {
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

        if(name && phoneNumber && mailId && age && gender && address && description){
          addDoc(userRef,{account,name,password,lastname,phoneNumber,mailId,age,gender,address,description,imageUrl}).then((docRef)=>{
            const db1 = getDatabase();
            set(Ref(db1, `AuthenticateUsers/${phoneNumber}`), {
            username: name,
            userpassword:password,
            userphonenumber:phoneNumber,
            usercountry:country,
            useraccount:'User',
            document:docRef.id
          }).then(() => {
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
  else{
      addDoc(userRef,{account,name,password,lastname,phoneNumber,mailId,age,gender,address,description}).then((docRef)=>{
        const db1 = getDatabase();
        set(Ref(db1, `AuthenticateUsers/${phoneNumber}`), {
        username: name,
        userpassword:password,
        userphonenumber:phoneNumber,
        usercountry:country,
        useraccount:'User',
        document:docRef.id
        }).then(() => {
          clearOut()
        }).catch((error) => {
          console.log(error)
          seteffect(false)
        });
      })
    }     
  }

  const verifyOtp=()=>{
    seteffect(true)
    const code = newUser.otp;
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
  const onSignInSubmit=(auth)=>{
    const {phoneNumber} = newUser;
    const phone=`+${getCountryCallingCode(countryCode)}${phoneNumber}`;

    console.log(phone,' on sign in submit')
    const appVerifier = window.recaptchaVerifier;
    
    signInWithPhoneNumber(auth, phone, appVerifier)
    // eslint-disable-next-line
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
  const resendOtp=async()=>{
    let check=true;
    const auth = getAuth();
    seteffect(true)
    console.log('Resend OTP')
    const dbRef = Ref(getDatabase());
    get(child(dbRef, `AuthenticateUsers/`)).then((snapshot) => {
    if (snapshot.exists()) {
      // eslint-disable-next-line
      for (const [key, value] of Object.entries(snapshot.val())) {
        if(key===newUser.phoneNumber){
          console.log('user exist')
          check=false;
          setPrompt('User_Exist')
          break;
        }
      }
    }
    if(check===true || !snapshot.exists()){
      seteffect(true)
      setTimeout(() => {
        onSignInSubmit(auth);
      }, 4000);
    }else{
      seteffect(false)
    }
    }).catch((error) => {
      console.error(error);
      seteffect(false)
    });
  }
  const getCaptcha=async()=>{
    const auth = getAuth();
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
        if(key===newUser.phoneNumber){
          console.log('user exist')
          check=false;
          setPrompt('User_Exist')
          break;
        }
      }
    }
    if(check===true || !snapshot.exists()){
      seteffect(true)
      setTimeout(() => {
        onSignInSubmit(auth);
      }, 4000);
    }else{
      seteffect(false)
    }
    }).catch((error) => {
      console.error(error);
      seteffect(false)
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
    for (const [key, value] of Object.entries(newUser)) {
      switch(`${key}`){
        case 'name':
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
        case 'country':
          if(value===undefined){
            check=false
          }else{
          check=true;
          }
          break;
        case 'address':
          check=checkAddress(value);
          break;         
        case 'description':
        check=countWords(value);
        if(check>=20 && check<=50){
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

  const createUser=async()=>{
    seteffect(true)
    let check=null;
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(newUser)) {
      if(`${value}`==="" && key!=='otp' && key!=='lastname' ){
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
      const uploadDecision=checkCondition();
        if(uploadDecision){
          getCaptcha()
        }else{
          seteffect(false)
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

  const getNewUser=(event)=>{
   n= event.target.name;
   v= event.target.value;
   if(n==='country'){
     newUser.country=en[v];
     setnewUser({...newUser,[n]:en[v]}); 
   }else{
    setnewUser({...newUser,[n]:v});
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


  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animation1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animation2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <div className="splashBackground" style={{ position:'fixed',
          top:'50%',left:'50%',width:'90%', height:'95%', borderRadius:'10px',overflow:'auto',
          transform:'translate(-50%,-50%)', backgroundImage: 'url("UserSignup.png")', backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',backgroundSize: 'cover', filter: 'blur(2px)'}}>
          {}
        </div>
      {
        open &&

        <div style={OVERLAY_STYLES}>
          <div id='sign-in-button' style={{display:'none'}}>{}</div>
        { effect &&
          <div style={{ position:'fixed',zIndex:'20',background: 'rgba(255,255,255,0.5)',top:'50%',left:'50%',width:'95%',height:'95%', borderRadius:'10px',
          transform:'translate(-50%,-50%)', backgroundPosition: 'center',backgroundSize: 'cover', filter: 'blur(5px)'}}>
          <Lottie options={Options} style={{position: 'absolute',left: '50%',top: '50%',WebkitTransform: 'translate(-50%, -50%)',transform: 'translate(-50%, -50%)'}} className="inner1-lottie" width={200} height={200}/>
          </div>
        }
        <div style={MODAL_STYLE}  className="signup-modal">
        <div className="inner1" >
        
        {true &&
          <div className="lottieOuter" style={{position:"sticky",top:'23%'}}>
          <div className="mainHeading" >Users Sign Up</div>
           <Lottie options={defaultOptions2} height={175} width={150} 
           className="inner1-lottie"/>
           </div>
        }
        {
          true &&
          <div className="lottieInner" style={{position:"sticky",top:'10%'}}>
          <div className="mainHeading" >Users Sign Up</div>
          <Lottie options={defaultOptions2} height={75} width={75} 
           className="inner1-lottie" style={{marginTop:'5%'}}/>
           </div>
        }        
        </div>

        <div className="inner2">
        <Lottie options={defaultOptions1} height={75} width={75}/>
          <IoCloseSharp onClick={()=>clearOut()} type="button" className="close-btn" style={BUTT_ST} size={20}/>
          <form>
            
          <div className="signup-title">Nothing Looks As Good As Healthy Person Feels!!!!!</div>

          <span className="signup-textstyle">First Name:{'  '}</span>
          <input type="text" className="input-text" placeholder="ex: Sunny"  name="name" value={newUser.name} onChange={getNewUser}/>
          <br/><br/>
          
          <span className="signup-textstyle">Last Name:{'  '}</span>
          <input type="text" className="input-text" placeholder="Optional" name="lastname" value={newUser.lastname} onChange={getNewUser}/>
          <br/><br/>

          <span className="signup-textstyle">Age: {'  '}</span>
          <input type="text" className="input-text" min="1" max="100" placeholder="18" name="age" value={newUser.age} onChange={getNewUser}/>
          <br/><br/>

          <span className="signup-textstyle">Gender:{'  '}</span>
          
          <input type="radio" name="gender" value="Male" onChange={getNewUser}/><span className="signup-textstyle" style={{paddingRight:"5px"}}>Male</span>
          <input type="radio" name="gender" value="Female" onChange={getNewUser}/><span className="signup-textstyle" style={{paddingRight:"5px"}}>Female</span>
          <input type="radio" name="gender" value="Other" onChange={getNewUser}/><span className="signup-textstyle">Others</span>
          <br/><br/>

          <span className="signup-textstyle">Email ID:{'  '}</span>
          <input type="email" className="input-text" placeholder="xyz@gmail.com" name="mailId" value={newUser.mailId} onChange={getNewUser}/>
          <br/><br/>

          <span className="signup-textstyle">Country:{'  '}</span>
          <select className="input-text" value={countryCode} name='country' onChange={event => setCountryCode(()=>{getNewUser(event); return(event.target.value || undefined)})}  style={{cursor:'pointer'}}>
          <option value="">{en.ZZ}</option>
            {getCountries().map((country) => (
            <option key={country} value={country}>
            {en[country]} +{getCountryCallingCode(country)}
            </option>
            ))}
          </select>
          <br/><br/>

          <span className="signup-textstyle">Phone Number:{'  '}</span>
          <input type="text" className="input-text" placeholder="98234XXXXX" name="phoneNumber" value={newUser.phoneNumber} onChange={getNewUser}/>
          <br/><br/>
          
          <span className="signup-textstyle">Password:{'  '}</span>
          <input className="input-text" type="password" name="password" value={newUser.password} onChange={getNewUser}/>
          <br/><br/>          

          <span className="signup-textstyle">Address:{'  '}</span>
          <textarea className="signup-description" placeholder="Ludhiana, Punjab" name="address" value={newUser.address} onChange={getNewUser}/>
          <br/><br/>

          
          <span className="signup-textstyle">Upload Image:{'  '}</span>
        <br/><br/>
        {
          selectImg===null &&
          <>

          <img src="exlogo.png" alt="ex" style={{width:'50%'}}/><br/><br/>
        
          <label htmlFor="file" className="signup-textstyle">
          <input type="file" id="file" accept='image/*' name="image" onChange={(e)=>{selectingImage(e)}}/>
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
          <input type="file" id="file" accept='image/*' name="image" onChange={(e)=>{selectingImage(e)}}/>
          <IoCameraSharp/>{' '}Tap To Select
          </label>
          <br/><br/><br/>
            </>
       }
       <div className="signup-textstyle">Health Description:{' '}</div>
          <textarea className="signup-description" placeholder="Describe Your Health in Brief (In between 20 to 50 words)" name="description" value={newUser.description} onChange={getNewUser}/>
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
        <button type="button" className="signup-btn" onClick={()=>{createUser()}}>Submit</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </div>
      </div>
      }
      {
        prompt==='Sent' && prompt!=='SMS_Error' && prompt!=='WrongOTP' &&
        <>
        <div className="signup-textstyle">OTP:{' '}</div>    
        <div><input type='number' className="input-text" placeholder='OTP NUMBER' name='otp' value={newUser.otp} onChange={getNewUser}/></div> 
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
        <button type='button' className="signup-btn" onClick={()=>{resendOtp()}}>Resend</button>
        <button type='button' className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </>
      }
      {
        prompt==="User_Exist" &&
        <>
        <div className='signup-textstyle'>Already User Exists with same Phone Number</div>
        <button type="button" className="signup-btn" onClick={()=>{createUser()}}>Submit</button>        
        <button type='button' className="signup-btn" onClick={()=>{resetOut()}}>Reset</button>
        <button type="button" className="signup-btn" onClick={()=>{clearOut()}}>Close</button>
        </>
      }
      <br/><br/>
      </form>
        
      </div>

    </div>
  </div>
    }
  </div>
  )
}

export default SignUpModal;
