import React from 'react';
import Hero from './home/Hero';
import Features from './home/Features';
import Testimonials from './home/Testimonials';
import CTA from './home/CTA';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Testimonials />
      
      <CTA />

    </main>
  );
};

export default Home;
