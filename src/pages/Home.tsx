import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Partners from '../components/Partners';
import Contact from '../components/Contacts';
import Location from '../components/Location';
import Slider from '../components/Projects';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Slider />
      <Partners />
      <Contact />
      <Location />
      
    </>
  );
};

export default Home;
