import React, { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import EditListingForm from '../components/EditListingForm';
import { supabase } from '../supabaseClient';

async function fetchListingsFromDB() {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

async function addListingToDB(listingData) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .insert([listingData])
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error adding listing:', error);
    return null;
  }
}

async function updateListingInDB(id, listingData) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .update(listingData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error updating listing:', error);
    return null;
  }
}

async function deleteListingFromDB(id) {
  try {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
    return !error;
  } catch (error) {
    console.error('Error deleting listing:', error);
    return false;
  }
}


function StudioPage() {
  const [listings, setListings] = useState([]);
  const [editingListingId, setEditingListingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newListing, setNewListing] = useState({
    title: '',
    price: '',
    propertyType: 'Home',
    description: '',
    thumbnailImage: '',
    propertyImages: '',
    rooms: '',
    bathrooms: '',
    squareFeet: '',
    location: '',
    features: '',
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const fetchedListings = await fetchListingsFromDB();
    if (fetchedListings) {
      setListings(fetchedListings);
    }
  };


  const deleteListing = async (id) => {
    const success = await deleteListingFromDB(id);
    if (success) {
      setListings(listings.filter(listing => listing.id !== id));
      setEditingListingId(null);
    } else {
      console.error('Failed to delete listing');
    }
  };

  const startEditListing = (id) => {
    setEditingListingId(id);
    setIsAddingNew(false);
  };

  const cancelEditListing = () => {
    setEditingListingId(null);
  };

  const updateListing = async (updatedListing) => {
    const updatedData = await updateListingInDB(editingListingId, updatedListing);
    if (updatedData) {
      const updatedListings = listings.map(listing =>
        listing.id === editingListingId ? updatedData : listing
      );
      setListings(updatedListings);
      setEditingListingId(null);
    } else {
      console.error('Failed to update listing');
    }
  };

  const handleInputChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const handleAddListing = async (e) => {
    e.preventDefault();
    const formattedPrice = `$${parseFloat(newListing.price.replace(/[^0-9.]/g, '')).toLocaleString()}`;
    const finalNewListing = { ...newListing, price: formattedPrice };
    const addedListing = await addListingToDB(finalNewListing);
    if (addedListing) {
      setListings([...listings, addedListing]);
      setIsAddingNew(false);
      setNewListing({
        title: '',
        price: '',
        propertyType: 'Home',
        description: '',
        thumbnailImage: '',
        propertyImages: '',
        rooms: '',
        bathrooms: '',
        squareFeet: '',
        location: '',
        features: '',
      });
    } else {
      console.error('Failed to add listing');
    }
  };

  const startAddProperty = () => {
    setIsAddingNew(true);
    setEditingListingId(null);
  };

  const cancelAddProperty = () => {
    setIsAddingNew(false);
  };


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Studio Admin Panel</h1>

      <div className="mb-4">
        {!isAddingNew && (
          <button
            onClick={startAddProperty}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Property
          </button>
        )}
        {isAddingNew && (
          <button
            onClick={cancelAddProperty}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancel Add Property
          </button>
        )}
      </div>

      {isAddingNew && (
        <form onSubmit={handleAddListing} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="block text-gray-700 text-xl font-bold mb-4">Add New Listing</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              placeholder="Listing Title"
              value={newListing.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price ($)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              name="price"
              type="text"
              placeholder="Price"
              value={newListing.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyType">
              Property Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="propertyType"
              name="propertyType"
              value={newListing.propertyType}
              onChange={handleInputChange}
            >
              <option value="Home">Home</option>
              <option value="Land">Land</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              placeholder="Description"
              value={newListing.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnailImage">
              Thumbnail Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="thumbnailImage"
              name="thumbnailImage"
              type="text"
              placeholder="Thumbnail Image URL"
              value={newListing.thumbnailImage}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyImages">
              Property Images URLs (comma-separated)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="propertyImages"
              name="propertyImages"
              type="text"
              placeholder="Property Image URLs"
              value={newListing.propertyImages}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rooms">
              Rooms
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rooms"
              name="rooms"
              type="number"
              placeholder="Rooms"
              value={newListing.rooms}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
              Bathrooms
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bathrooms"
              name="bathrooms"
              type="number"
              placeholder="Bathrooms"
              value={newListing.bathrooms}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="squareFeet">
              Square Feet
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="squareFeet"
              name="squareFeet"
              type="number"
              placeholder="Square Feet"
              value={newListing.squareFeet}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              name="location"
              type="text"
              placeholder="Location"
              value={newListing.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="features">
              Features (comma-separated)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="features"
              name="features"
              type="text"
              placeholder="Features e.g., Parking,Beachfront"
              value={newListing.features}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Add Listing
            </button>
          </div>
        </form>
      )}


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
