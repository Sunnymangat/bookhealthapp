import React from 'react'
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton';

const DoctorSkeleton = () => {
  return (
    <div className="doctorCard">
        <div className="doctorImageSkl1">
        <SkeletonTheme color="#dedede" highlightColor="#dedede">
          <Skeleton height={110} width={150}/></SkeletonTheme></div>
        <div className="doctorImageSkl2">
          <Skeleton circle={1} height={100} width={130}/></div>
        <div className="About"><Skeleton height={50} width={100}/></div>
        <div className="description"><Skeleton height={100}/></div>
        <div className="doctorBtn"> 
          <button type="button">
          <Skeleton height={25} width={25}/>
            </button>
          <button type="button">
          <Skeleton height={25} width={25}/>
          </button>
        </div>  
      <div className="doctorBtnSmall1"> 
          <button type="button"> <Skeleton height={18} width={30}/></button>
          </div> 
      <div className="doctorBtnSmall2">         
          <button type="button"> <Skeleton height={18} width={30}/></button>
      </div> 
      </div>
  )
}

export default DoctorSkeleton;
