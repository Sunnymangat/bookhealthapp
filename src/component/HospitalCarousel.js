import React from 'react';
import Carousel from 'react-elastic-carousel';
import HospitalCard from './carousellist/carouselsCards/HospitalCard';
import './carousellist/carouselsStyles/cardstyles.css';

export const HospitalCarousel = ({carousel}) => {
  const breakpoints=[
    {width:500,itemsToShow:1},
    {width:600,itemsToShow:2},
    {width:1200,itemsToShow:3},
    {width:1500,itemsToShow:4}
  ];
  return (
    <div>
        <Carousel breakPoints={breakpoints}>
          <HospitalCard num={1} check={carousel}/>
          <HospitalCard num={2} check={carousel}/>
          <HospitalCard num={3} check={carousel} />
        </Carousel>    
    </div>
  )
}
