import React, { useState } from 'react';

function EditListingForm({ listing, onUpdate, onCancel }) {
  const [title, setTitle] = useState(listing.title);
  const [price, setPrice] = useState(listing.price.replace(/[$,]/g, ''));
  const [propertyType, setPropertyType] = useState(listing.propertyType);
  const [description, setDescription] = useState(listing.description);
  const [thumbnailImage, setThumbnailImage] = useState(listing.thumbnailImage);
  const [propertyImages, setPropertyImages] = useState(listing.propertyImages);
  const [rooms, setRooms] = useState(listing.rooms);
  const [bathrooms, setBathrooms] = useState(listing.bathrooms);
  const [squareFeet, setSquareFeet] = useState(listing.squareFeet);
  const [location, setLocation] = useState(listing.location);
  const [features, setFeatures] = useState(listing.features);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      id: listing.id,
      title,
      price,
      propertyType,
      description,
      thumbnailImage,
      propertyImages,
      rooms,
      bathrooms,
      squareFeet,
      location,
      features
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-y-auto max-h-screen">
      <h2 className="block text-gray-700 text-xl font-bold mb-4">Edit Listing</h2>
      {/* ... inputs ... */}
      <div className="flex items-center justify-between">
        <button className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Update Listing
        </button>
        <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditListingForm;
