import React from 'react';

function ListingCard({ listing, onDelete, onEdit }) {
  const featuresArray = listing.features ? listing.features.split(',') : [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={listing.thumbnailImage || listing.image} alt={listing.title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{listing.title}</h3>
        <p className="text-gray-600 text-sm truncate">{listing.location}</p>
        <p className="text-blue-500 font-bold mt-2">{listing.price}</p>
        <div className="flex flex-wrap mt-2">
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-1">{listing.propertyType}</span>
          {featuresArray.map((feature, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-1">{feature.trim()}</span>
          ))}
        </div>
      </div>
      <div className="px-4 py-2 bg-gray-100 border-t flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm-6.979 7.707a2.25 2.25 0 1 1 3.182 3.182l-1.727 1.728a3.75 3.75 0 0 0-5.304-5.304l1.727-1.728Z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 14.74-2.87-2.87m0 0A2.4 2.4 0 0 1 12 10.75c3.45-.523 6.533-2.7 7.886-5.346a1.2 1.2 0 1 0-1.737-1.342c-.476.588-1.285 1.504-1.977 2.255m-5.232 5.232L17.27 7.73m0 0a2.4 2.4 0 0 1 1.7-4.1c-3.45.523-6.533 2.7-7.886 5.346a1.2 1.2 0 1 0 1.737 1.342c.476-.588 1.285-1.504 1.977-2.255m-5.232 5.232 2.87 2.87" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ListingCard;
