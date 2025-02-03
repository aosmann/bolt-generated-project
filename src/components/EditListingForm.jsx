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
    const formattedPrice = `$${parseFloat(price).toLocaleString()}`;
    onUpdate({
      id: listing.id,
      title,
      price: formattedPrice,
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-title"
          type="text"
          placeholder="Listing Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-price">
          Price ($)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-price"
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-propertyType">
          Property Type
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-propertyType"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="Home">Home</option>
          <option value="Land">Land</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-thumbnailImage">
          Thumbnail Image URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-thumbnailImage"
          type="text"
          placeholder="Thumbnail Image URL"
          value={thumbnailImage}
          onChange={(e) => setThumbnailImage(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-propertyImages">
          Property Images URLs (comma-separated)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-propertyImages"
          type="text"
          placeholder="Property Image URLs"
          value={propertyImages}
          onChange={(e) => setPropertyImages(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-rooms">
          Rooms
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-rooms"
          type="number"
          placeholder="Rooms"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-bathrooms">
          Bathrooms
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-bathrooms"
          type="number"
          placeholder="Bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-squareFeet">
          Square Feet
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-squareFeet"
          type="number"
          placeholder="Square Feet"
          value={squareFeet}
          onChange={(e) => setSquareFeet(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-location">
          Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-location"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-features">
          Features (comma-separated)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="edit-features"
          type="text"
          placeholder="Features e.g., Parking,Beachfront"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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
