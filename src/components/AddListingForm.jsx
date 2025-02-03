import React, { useState } from 'react';

function AddListingForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState('Home');
  const [description, setDescription] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [propertyImages, setPropertyImages] = useState('');
  const [rooms, setRooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState('');

  const handleSubmit = (e) => { // Ensure 'e' is received as the event object
    e.preventDefault();
    onAdd({
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
    setTitle('');
    setPrice('');
    setPropertyType('Home');
    setDescription('');
    setThumbnailImage('');
    setPropertyImages('');
    setRooms('');
    setBathrooms('');
    setSquareFeet('');
    setLocation('');
    setFeatures('');
    onCancel(); // Close modal after submit
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4"> {/* Removed shadow-md and container class */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"> {/* 2-column grid */}
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Listing Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price ($)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyType">
            Property Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="Home">Home</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 md:col-span-2"> {/* Full width for description */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rooms">
            Rooms
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rooms"
            type="number"
            placeholder="Rooms"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
            Bathrooms
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bathrooms"
            type="number"
            placeholder="Bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="squareFeet">
            Square Feet
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="squareFeet"
            type="number"
            placeholder="Square Feet"
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="features">
            Features (comma-separated)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="features"
            type="text"
            placeholder="Features e.g., Parking,Beachfront"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </div>
        <div className="mb-4 md:col-span-2"> {/* Full width for images */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnailImage">
            Thumbnail Image URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="thumbnailImage"
            type="text"
            placeholder="Thumbnail Image URL"
            value={thumbnailImage}
            onChange={(e) => setThumbnailImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyImages">
            Property Images URLs (comma-separated)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="propertyImages"
            type="text"
            placeholder="Property Image URLs"
            value={propertyImages}
            onChange={(e) => setPropertyImages(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-end"> {/* Aligned buttons to the right */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" type="submit">
          Add Listing
        </button>
        <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddListingForm;
