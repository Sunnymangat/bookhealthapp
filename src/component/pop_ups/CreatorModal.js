import React from 'react'
import {FaFacebook,FaLinkedin} from 'react-icons/fa'
import {RiInstagramFill} from 'react-icons/ri'
import {TiLocation} from 'react-icons/ti'
import '../cssfolder/pop_ups_styles/creator.css'

const CreatorModal = () => {
  return (
    <div className='aboutSection'>
      <div className='memberOne'>
      <div className='memberOne_Picture'>
        <img src='exlogo.png' alt='memberone_picture'/>
      </div>
      <div className='memberOne_Data'>
        <h2 style={{textDecoration:'none',color:'#2e2e2e'}}>
          Jaskaran Singh
        </h2>
        <h3 style={{padding:'0.5%',textDecoration:'none',fontWeight:'normal',color:'#00ced1'}}>
          FrontEnd- ReactJS,
          BackEnd-Firebase,
          UI and UX Designer
        </h3>
        <div>
          <button className='creatorButton' type='button' onClick={()=> window.open("https://www.instagram.com/sunny.mangat_/", "_blank")}><>{}<RiInstagramFill/></></button>
          <button className='creatorButton' type='button' onClick={()=> window.open("https://www.facebook.com/sunnymangat6/", "_blank")}>{}<FaFacebook/></button>
          <button className='creatorButton' type='button' onClick={()=> window.open("https://www.linkedin.com/in/jaskaran-singh-85a0691b3", "_blank")}>{}<FaLinkedin/></button>
          <button className='creatorButton' type='button' onClick={()=> window.open("https://www.google.com/maps/@30.8110139,76.0610371,17z", "_blank")}>{}<TiLocation/></button>
        </div>
        
        <div className='memberDescription'>
        I am a 3rd year student at Chandigarh University, currently pursuing B.E. in CSE.
        I am a tech savvy person and a eager to learn about new technologies. 
        I worked on basics of Web Development, Android, ReactJS and Firebase in my previous years. 
        I had also made some projects in these fields and they are currently hosted on the web.
        My major interest lies in full stack development. Moreover, I have good command over C++ ,Java and python.
        </div>
      </div>
      </div>
      <br/>
      <br/>
      <div className='memberTwo'>
      <div className='memberTwo_Picture'>
        <img src='exlogo.png' alt='membertwo_picture'/>
      </div>
      <div className='memberTwo_Data'>
      <h2 style={{textDecoration:'none',color:'#2e2e2e'}}>
          Priya Tanwar
        </h2>
        <h3 style={{textDecoration:'none',fontWeight:'normal',color:'#00ced1'}}>
          Content Writing and Supporting Role
        </h3>
        <div>
          <button className='creatorButton' type='button' onClick={()=> window.open("https://www.instagram.com/priya.__08/", "_blank")}>{}<RiInstagramFill/></button>
          <button className='creatorButton' type='button'  onClick={()=> window.open("https://www.facebook.com/", "_blank")}>{}<FaFacebook/></button>
          <button className='creatorButton' type='button' onClick={()=> window.open("https://www.linkedin.com/in/priya-tanwar-70a241200", "_blank")}>{}<FaLinkedin/></button>
        </div>
        <div className='memberDescription'>
        I am a 3rd year student at Chandigarh University, currently pursuing B.E. in CSE.
        I am a tech savvy person and a eager to learn about new technologies. 
        I worked on basics of Web Development, Android, ReactJS and Firebase in my previous years. 
        I had also made some projects in these fields and they are currently hosted on the web.
        My major interest lies in full stack development. Moreover, I have good command over C++ ,Java and python.
        </div>
      </div>
      </div>
    </div>
  )
}

export default CreatorModal
