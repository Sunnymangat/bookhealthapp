import React,{useState} from 'react';
import {HiOutlineSortDescending,HiOutlineSearch} from "react-icons/hi";
import {IoIosArrowDropdownCircle} from 'react-icons/io';
import {IoCloseSharp} from 'react-icons/io5';
import LeftSearchBar from './LeftSearchBar';
import RightSearchBar from './RightSearchBar';
import SmallScreenModal from './pop_ups/SmallScreenModal';
import SmallScreenbtnModal from './pop_ups/SmallScreenbtnModal';

const Searchbar = ({Change1,PersonalInfo}) => {
  const [isHamburgerClicked,setHamburgerIcon]=useState(false);
  const[issearchClicked,setsearchbutton]=useState(false);
  const[isdropdownedClicked,setdropdown]=useState(false);

  function setSearch(){
    setsearchbutton(()=>{
      if(isdropdownedClicked){
        setdropdown(()=>!isdropdownedClicked)
      }
      return !issearchClicked
    }
    );
  }

  function setExplore(){
    setdropdown(()=>{
      if(issearchClicked){
        setsearchbutton(()=>!issearchClicked)
      }
      return !isdropdownedClicked;
    });
  }

  return (
    <div className="searchbar">
      <div className="Icons-left">{/* For a bigger screen */}
        <LeftSearchBar/>
      </div>

    <div className="smallIcons-left">
      <button className="smallbtnIconsstyle1" type='button'  onClick={()=>setHamburgerIcon(()=>!isHamburgerClicked)}>
        <HiOutlineSortDescending size={20} className="smallIconsstyle1"/>
      </button>
      
      <button className="smallbtnIconsstyle1" type='button' onClick={()=>setSearch()} >
        {
        issearchClicked?
          <IoCloseSharp size={20} />
        :
          <HiOutlineSearch size={20} />
        }
        </button>
        <SmallScreenModal open={isHamburgerClicked} close={()=>setHamburgerIcon(false)} />
    </div>
    <button  type="button" className="exploreButton" onClick={()=>setExplore()}>Explore!!!{' '}<IoIosArrowDropdownCircle size={12}/></button>
    
    <SmallScreenbtnModal hamburger={isHamburgerClicked} open={isdropdownedClicked} Change1={Change1} searchIcon={issearchClicked} close={()=>setdropdown(!isdropdownedClicked)}/>

    <div className="search-bar-type" >
        <input type="text" placeholder="Search" className="searchbarinput"/>
          <button className="searchbtnIconsStyle" type='button'>
            <HiOutlineSearch size={20} className="searchbarinputIcon"/>
          </button>
    </div>
      
    <div className="Icons-right">
        <RightSearchBar PersonalInfo={PersonalInfo}/>
      </div>
    </div>
  )
}

export default Searchbar;
