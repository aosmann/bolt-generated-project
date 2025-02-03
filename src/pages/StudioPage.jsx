import React, { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import EditListingForm from '../components/EditListingForm';
import { supabase } from '../supabaseClient';
import AddListingForm from '../components/AddListingForm'; // Import AddListingForm

async function fetchListingsFromDB() {
  try {
    console.log("StudioPage: fetchListingsFromDB - Fetching listings from Supabase..."); // Log fetch start
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error("StudioPage: fetchListingsFromDB - Error fetching listings:", error); // Log error
      throw error;
    }
    console.log("StudioPage: fetchListingsFromDB - Listings fetched successfully:", data); // Log success and data
    return data || [];
  } catch (error) {
    console.error('StudioPage: fetchListingsFromDB - General error:', error); // Log general error
    return [];
  }
}

async function addListingToDB(listingData) {
  try {
    console.log("StudioPage: Data received in addListingToDB:", listingData);
    // Reverted to full insert - including all columns
    const insertData = {
      title: listingData.title,
      price: listingData.price,
      propertyType: listingData.propertyType,
      description: listingData.description,
      thumbnailImage: listingData.thumbnailImage,
      propertyImages: listingData.propertyImages,
      rooms: listingData.rooms,
      bathrooms: listingData.bathrooms,
      squareFeet: listingData.squareFeet,
      location: listingData.location,
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

  const handleAddListing = async (listingDataFromForm) => { // Receive listingData from AddListingForm
    console.log("StudioPage: handleAddListing called with data:", listingDataFromForm); // Log received data
    const formattedPrice = `$${parseFloat(listingDataFromForm.price.replace(/[^0-9.]/g, '')).toLocaleString()}`;
    const finalNewListing = { ...listingDataFromForm, price: formattedPrice };

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
    setIsAddingNew(false); // Also close modal on cancel
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
            <button className="text-blue-500 hover:text-blue-700">→ Sign Out</button>
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
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              + Add Type
            </button>
          </div>
          <div className="bg-white shadow rounded-md overflow-hidden">
            <ul>
              <li className="px-4 py-3 border-b flex justify-between items-center hover:bg-gray-100">
                <span>Home</span>
                {/* ... */}
              </li>
              <li className="px-4 py-3 border-b flex justify-between items-center hover:bg-gray-100">
                <span>Land</span>
                {/* ... */}
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
