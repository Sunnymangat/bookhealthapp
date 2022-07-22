import React from 'react';
import Carousel from 'react-elastic-carousel';
import DoctorCard from './carousellist/carouselsCards/DoctorCard';
import './carousellist/carouselsStyles/doctorcard.css';

const DoctorCarousel = ({carousel}) => {
  const breakpoints=[
    {width:500,itemsToShow:1},
    {width:600,itemsToShow:2},
    {width:1200,itemsToShow:3},
    {width:1500,itemsToShow:4}
  ];
  return (
    <div>
      <Carousel breakPoints={breakpoints}>
        <DoctorCard number={1} check={carousel}/>
        <DoctorCard number={2} check={carousel}/>
        <DoctorCard number={3} check={carousel}s/>
      </Carousel>
    </div>
  )
}

export default DoctorCarousel;
