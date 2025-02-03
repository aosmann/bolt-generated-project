import React from 'react';
import Hero from '../components/Hero';
import FeaturedListings from '../components/FeaturedListings';

function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedListings />
      <div className="bg-white p-4 rounded-md mt-8">
        <p>This is a test shadow.</p>
      </div>
    </div>
  );
}

export default HomePage;
