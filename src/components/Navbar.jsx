import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">Real Estate</Link>
        <div className="space-x-6">
          <Link to="/buy" className="text-gray-600 hover:text-gray-800">Buy</Link>
          <Link to="/sell" className="text-gray-600 hover:text-gray-800">Sell</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
          <Link to="/studio" className="text-gray-600 hover:text-gray-800">Studio</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
