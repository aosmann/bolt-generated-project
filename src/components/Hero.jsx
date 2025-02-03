import React from 'react';

function Hero() {
  return (
    <section className="bg-gray-200 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Dream Home</h1>
        <p className="text-lg text-gray-600 mb-8">Explore the best listings in the market.</p>
        <input
          type="text"
          placeholder="Enter location..."
          className="px-6 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md ml-2">
          Search
        </button>
      </div>
    </section>
  );
}

export default Hero;
