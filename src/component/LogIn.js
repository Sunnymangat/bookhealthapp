import React,{useState} from 'react'
import Lottie from 'react-lottie';
import { getDatabase, ref as Ref, child, get } from "firebase/database";
import {IoCloseSharp} from 'react-icons/io5';
import {getDoc,doc} from 'firebase/firestore'
import { db } from '../firebase-config';
import splash from '../animate_lottie/navbar/loadingscreen.json';

const DEFAULT = {
  loop: true,
  autoplay: true,
  animationData: splash,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const LogIn = ({check,setUserValue,close}) => {
  const [credentials,setcredentials]=useState({
    phonenumber:"",password:""
  });
  const [passreset,setpassreset]=useState(false)
  const [err,setError]=useState(null);
  
  if(check==="null") return null;

  const dbRef = Ref(getDatabase());
  let mydoc=null;


  const finalGetData=async(val)=>{
    let docRef=null
    switch(check){
      case 'User':
        docRef=doc(db,"Users",val);
        // eslint-disable-next-line
        getDoc(docRef).then((doc)=>{
          setUserValue(doc.data())
          setError(null)
          setcredentials({phonenumber:"",password:""})
          close("null")
        })
        break;
      case 'Hospital':
        docRef=doc(db,"Hospitals",val);
        // eslint-disable-next-line
        getDoc(docRef).then((doc)=>{
          setUserValue(doc.data())
          setError(null)
          setcredentials({phonenumber:"",password:""})
          close("null")
        })
        break;
      case 'Doctor':
        docRef=doc(db,"Doctors",val);
        // eslint-disable-next-line
        getDoc(docRef).then((doc)=>{
          setUserValue(doc.data())
          setError(null)
          setcredentials({phonenumber:"",password:""})
          close("null")
        })
        break;
      case 'Lab':
        docRef=doc(db,"Labs",val);
        // eslint-disable-next-line
        getDoc(docRef).then((doc)=>{
          setUserValue(doc.data())
          setError(null)
          setcredentials({phonenumber:"",password:""})
          close("null")
        })
        break;
      case 'Pharmacy':
        docRef=doc(db,"Pharmacies",val);
        // eslint-disable-next-line
        getDoc(docRef).then((doc)=>{
          setUserValue(doc.data())
          setError(null)
          setcredentials({phonenumber:"",password:""})
          close("null")
        })
        break;      
      default:
        break;
    }
  }
  const getdocumentId=async()=>{
    get(child(dbRef, `AuthenticateUsers/${credentials.phonenumber}/document`)).then((s) => {
      mydoc=s.val()
      console.log(mydoc)
    }).then(()=>{
      finalGetData(mydoc)
    }).catch((error) => {
      console.error(error);
    });
  }

  const checkCredentials=()=>{
    get(child(dbRef, `AuthenticateUsers/${credentials.phonenumber}/useraccount`)).then((snapshot) => {
      if(snapshot.val()===check){
        console.log('Correct')

        get(child(dbRef, `AuthenticateUsers/${credentials.phonenumber}/userpassword`)).then((snap) => {
          if(snap.val()===credentials.password){
            console.log('Correct')
            getdocumentId();
          }else{
            setError('Wrong_Pass')
            console.log('Incorrect')
          }
        }).catch((error) => {
          console.error(error);
        });
      }else{
        setError('Wrong_Page')
        console.log('Please Check Out your LogIn preference')
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const logIN=async()=>{
    let temp=false;
    get(child(dbRef, `AuthenticateUsers/`)).then((snapshot) => {
    if (snapshot.exists()) {
      // eslint-disable-next-line
      for (const [key, value] of Object.entries(snapshot.val())) {
        if(key===credentials.phonenumber){
          console.log('user exist')
          temp=true;
          break;
        }
      }
    }}).then(()=>{
      if(temp){
        checkCredentials();        
      }else{
        setError('No_User')
        console.log('no user register with a given number')
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  let n;
  let v;
  const getDetails=(event)=>{
    n=event.target.name;
    v=event.target.value;
    setcredentials({...credentials,[n]:v})
  }

  return (
    <div>
    <div style={{position: "fixed",top: '0', left: '0', right: '0', backgroundImage: 'url("splashbackground.jpg")',
    height: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize: 'cover',zIndex:'10',textAlign:'center'}}>{}</div>
    

    <div style={{backdropFilter:'blur(7px)',WebkitBackdropFilter: 'blur(7px)',
    position: "fixed",top: '0', left: '0', right: '0', bottom:'0',height:'auto',zIndex:'10'}}>  
    
    <button  onClick={()=>close("null")} type="button" style={{color:'teal',border:'none',background:'transparent',cursor:'pointer'}}>
      <IoCloseSharp size={25}/>
    </button>
    
    <div className="login" style={{textAlign:'center',color:'white'}}>
      
      <div className="splash-title" style={{marginTop:'-40px'}}>BookHealth</div>
      <Lottie options={DEFAULT} className="inner1-lottie" style={{marginTop:'-60px'}} height={150} width={150}/>
      
      <div className="splash-title" style={{marginBottom:'-45px',textDecorationLine:'underline'}}>{check} Login</div>
      <input className="input-text" placeholder="Mobile number" name='phonenumber' style={{width:'250px'}} onChange={getDetails}/><br/><br/>
      <input className="input-text" placeholder="Password" name='password' style={{width:'250px'}} onChange={getDetails}/><br/><br/>
      {
        err==='No_User' &&
        <h3 style={{color:'White'}}>
          Your are not registered on BookHealth Yet!!!
          </h3>
      }
      {
        err==='Wrong_Page' &&
        <h3 style={{color:'White'}}>
          Trying to LogIn with wrong Login option!!!
          </h3>
      } 
      {
        err==='Wrong_Pass' &&
        <>
        { 
          passreset?
          <>
          <div>Plz wait send verifcation code on your mobile</div><br/>
          </>
          :
          <>
          <button type='button' onClick={()=>setpassreset(true)}>Forgot Password ?</button>
          <h3 style={{color:'White'}}>
          Wrong Password!!!
          </h3>
          </>
        }
        </>
      }
          
      <button className="loginbtn" type="button" style={{width:'200px'}} onClick={()=>{logIN()}}>Login</button>

    </div>

    </div>    
    
    </div>
  )
}

export default LogIn;
