import React from 'react';

function Hero() {
  return (
    <section className="bg-cover bg-center py-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1738471743329-b50393cf6319?q=80&w=2901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D')` }}>
      <div className="container mx-auto text-center text-white">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Discover Your Perfect Home</h1>
        <p className="text-xl mb-12">Explore a curated selection of exquisite properties.</p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Enter location or property type..."
            className="px-8 py-4 rounded-l-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-96"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-r-md">
            Search Properties
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
