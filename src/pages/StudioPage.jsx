import React, { useState, useEffect } from 'react';
import AddListingForm from '../components/AddListingForm';
import EditListingForm from '../components/EditListingForm';
import ListingCard from '../components/ListingCard';

function StudioPage() {
  const [listings, setListings] = useState([]);
  const [editingListingId, setEditingListingId] = useState(null);

  useEffect(() => {
    const storedListings = localStorage.getItem('listings');
    if (storedListings) {
      setListings(JSON.parse(storedListings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listings', JSON.stringify(listings));
  }, [listings]);

  const addListing = (newListing) => {
    setListings([...listings, { ...newListing, id: Date.now() }]);
  };

  const deleteListing = (id) => {
    setListings(listings.filter(listing => listing.id !== id));
    setEditingListingId(null);
  };

  const startEditListing = (id) => {
    setEditingListingId(id);
  };

  const cancelEditListing = () => {
    setEditingListingId(null);
  };

  const updateListing = (updatedListing) => {
    const updatedListings = listings.map(listing =>
      listing.id === updatedListing.id ? updatedListing : listing
    );
    setListings(updatedListings);
    setEditingListingId(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Studio</h1>
      <AddListingForm onAdd={addListing} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {listings.map(listing => (
          <div key={listing.id} className="relative">
            <ListingCard listing={listing} />
            <div className="absolute top-2 right-2 space-x-2">
              <button
                onClick={() => startEditListing(listing.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteListing(listing.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
            {editingListingId === listing.id && (
              <div className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-75 flex justify-center items-center">
                <EditListingForm
                  listing={listing}
                  onUpdate={updateListing}
                  onCancel={cancelEditListing}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudioPage;
