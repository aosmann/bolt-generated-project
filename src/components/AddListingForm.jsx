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

  const handleSubmit = (e) => {
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
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
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
        {/* ... inputs ... */}
      </div>
      <div className="flex items-center justify-end">
        <button className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" type="submit">
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
