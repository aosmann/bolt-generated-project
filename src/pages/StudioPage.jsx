import React, { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import EditListingForm from '../components/EditListingForm';
import { supabase } from '../supabaseClient';
import AddListingForm from '../components/AddListingForm';

async function fetchListingsFromDB() {
  try {
    console.log("StudioPage: fetchListingsFromDB - Fetching listings from Supabase...");
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error("StudioPage: fetchListingsFromDB - Error fetching listings:", error);
      throw error;
    }
    console.log("StudioPage: fetchListingsFromDB - Listings fetched successfully:", data);
    return data || [];
  } catch (error) {
    console.error('StudioPage: fetchListingsFromDB - General error:', error);
    return [];
  }
}

async function addListingToDB(listingData) {
  try {
    console.log("StudioPage: Data received in addListingToDB:", listingData);
    const insertData = {
      title: listingData.title,
      price: listingData.price,
      propertyType: listingData.propertyType,
      location: listingData.location,
      description: listingData.description,
      thumbnailImage: listingData.thumbnailImage,
      propertyImages: listingData.propertyImages,
      rooms: listingData.rooms,
      bathrooms: listingData.bathrooms,
      squareFeet: listingData.squareFeet,
      features: listingData.features,
    };
    console.log("StudioPage: Full data being sent to Supabase for insertion:", insertData);

    const { data, error } = await supabase
      .from('listings')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("StudioPage: Supabase insert error details:", error);
      throw error;
    }

    console.log("StudioPage: Successfully inserted listing, Supabase response:", data);
    return data;
  } catch (error) {
    console.error('StudioPage: Error in addListingToDB function:', error.message, error);
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

    console.log("StudioPage: Formatted listing data to be added:", finalNewListing);

    const addedListing = await addListingToDB(finalNewListing);
    if (addedListing) {
      console.log("StudioPage: New listing added successfully:", addedListing);
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
      console.error('StudioPage: handleAddListing: Failed to add listing to database.');
    }
  };

  const startAddProperty = () => {
    setIsAddingNew(true);
    setEditingListingId(null);
  };

  const cancelAddProperty = () => {
    setIsAddingNew(false);
    setIsAddingNew(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-700 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-7.5m-18 3.75h19.5" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">LuxuryEstates Studio</h1>
          </div>
          <div>
            <button className="text-primary hover:text-primary-700">→ Sign Out</button>
          </div>
        </div>
        <div className="container mx-auto mt-2">
          <p className="text-gray-600">Property Management Studio</p>
        </div>
      </header>

      <div className="container mx-auto py-8">
        {/* Property Types */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Property Types</h2>
            <button className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
              + Add Type
            </button>
          </div>
          <div className="bg-white shadow rounded-md overflow-hidden">
            <ul>
              <li className="px-4 py-3 border-b flex justify-between items-center hover:bg-gray-100">
                <span>Home</span>
                <div>
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block align-middle">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm-6.979 7.707a2.25 2.25 0 1 1 3.182 3.182l-1.727 1.728a3.75 3.75 0 0 0-5.304-5.304l1.727-1.728Z" />
                    </svg>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block align-middle">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 14.74-2.87-2.87m0 0A2.4 2.4 0 0 1 12 10.75c3.45-.523 6.533-2.7 7.886-5.346a1.2 1.2 0 1 0-1.737-1.342c-.476.588-1.285 1.504-1.977 2.255m-5.232 5.232L17.27 7.73m0 0a2.4 2.4 0 0 1 1.7-4.1c-3.45.523-6.533 2.7-7.886-5.346a1.2 1.2 0 1 0 1.737 1.342c.476-.588-1.285 1.504-1.977 2.255m-5.232 5.232 2.87 2.87" />
                    </svg>
                  </button>
                </div>
              </li>
              <li className="px-4 py-3 border-b flex justify-between items-center hover:bg-gray-100">
                <span>Land</span>
                <div>
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block align-middle">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm-6.979 7.707a2.25 2.25 0 1 1 3.182 3.182l-1.727 1.728a3.75 3.75 0 0 0-5.304-5.304l1.727-1.728Z" />
                    </svg>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block align-middle">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 14.74-2.87-2.87m0 0A2.4 2.4 0 0 1 12 10.75c3.45-.523 6.533-2.7 7.886-5.346a1.2 1.2 0 1 0-1.737-1.342c-.476.588-1.285 1.504-1.977 2.255m-5.232 5.232L17.27 7.73m0 0a2.4 2.4 0 0 1 1.7-4.1c-3.45.523-6.533 2.7-7.886-5.346a1.2 1.2 0 1 0 1.737 1.342c.476-.588-1.285 1.504-1.977 2.255m-5.232 5.232 2.87 2.87" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Property Listings */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Manage your property listings and types</h2>
            <button
              onClick={startAddProperty}
              className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
            >
              + Add Property
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(listing => (
              <div key={listing.id}>
                <ListingCard listing={listing} onDelete={deleteListing} onEdit={() => startEditListing(listing.id)} />
                {editingListingId === listing.id && (
                  <EditListingForm
                    listing={listing}
                    onUpdate={updateListing}
                    onCancel={cancelEditListing}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Add Listing Modal */}
      {isAddingNew && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Listing</h2>
            <AddListingForm onAdd={handleAddListing} onCancel={cancelAddProperty} />
          </div>
        </div>
      )}
    </div>
  );
}

export default StudioPage;
