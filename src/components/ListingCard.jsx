import React from 'react';

function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-56 object-cover" src={listing.image} alt={listing.title} />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{listing.title}</h3>
        <p className="text-gray-600">{listing.location}</p>
        <p className="text-xl font-bold text-blue-500 mt-2">{listing.price}</p>
      </div>
    </div>
  );
}

export default ListingCard;
