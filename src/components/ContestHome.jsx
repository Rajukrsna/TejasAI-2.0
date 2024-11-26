import React from 'react';
import ContestCard from './ContestCard';

const contests = [
  'Plastic-Free Week Challenge',
  'Pedal Power Challenge',
  'Grow Green Challenge',
  'Sustainable Shopping Challenge',
  'Power Down Challenge',
  'Water Warrior Challenge',
  'Meat-Free Meals Challenge',
  'Eco-Literacy Challenge',
  'Carpool Connect Challenge',
  'Upcycle Masterpiece Challenge'
];

const ContestHome = () => {
  return (
    <>
      <div>
        <h2 className='text-center md:text-4xl text-2xl font-bold my-[20px]'>Upcoming Events</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-[40px] gap-[20px] md:px-[80px] px-[20px]'>
          {contests.map((contest, index) => (
            <ContestCard key={index} name={contest} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ContestHome;
