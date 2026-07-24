import React, { useState } from 'react';
import { locationsList } from '../models/location';

interface PredictionFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    location: '',
    carpet_area_sqft: '',
    floor_num: '',
    bathroom: '',
    balcony: '',
    furnishing: 'Semi-Furnished',
    transaction: 'Resale',
    ownership: 'Freehold',
    facing: 'North'
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.location) {
      setError('Please select a location');
      return;
    }

    if (!formData.carpet_area_sqft || Number(formData.carpet_area_sqft) <= 0) {
      setError('Area must be greater than 0');
      return;
    }

    const dataToSend = {
      location: formData.location,
      carpet_area_sqft: Number(formData.carpet_area_sqft),
      floor_num: Number(formData.floor_num || 0),
      bathroom: Number(formData.bathroom || 0),
      balcony: Number(formData.balcony || 0),
      furnishing: formData.furnishing,
      transaction: formData.transaction,
      ownership: formData.ownership,
      facing: formData.facing
    };

    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow rounded">
      {error && <div className="p-3 text-red-600 bg-red-100 rounded">{error}</div>}

      {/* Location */}
      <div>
        <label className="block mb-1 font-medium">Location</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Location</option>
          {locationsList.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Carpet Area */}
      <div>
        <label className="block mb-1 font-medium">Carpet Area (sqft)</label>
        <input
          type="number"
          name="carpet_area_sqft"
          value={formData.carpet_area_sqft}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="e.g. 1000"
        />
      </div>

      {/* Floor Number */}
      <div>
        <label className="block mb-1 font-medium">Floor Number</label>
        <input
          type="number"
          name="floor_num"
          value={formData.floor_num}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="e.g. 1"
        />
      </div>

      {/* Bathroom */}
      <div>
        <label className="block mb-1 font-medium">Bathroom</label>
        <input
          type="number"
          name="bathroom"
          value={formData.bathroom}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="e.g. 2"
        />
      </div>

      {/* Balcony */}
      <div>
        <label className="block mb-1 font-medium">Balcony</label>
        <input
          type="number"
          name="balcony"
          value={formData.balcony}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="e.g. 1"
        />
      </div>

      {/* Furnishing */}
      <div>
        <label className="block mb-1 font-medium">Furnishing</label>
        <select
          name="furnishing"
          value={formData.furnishing}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </div>

      {/* Transaction */}
      <div>
        <label className="block mb-1 font-medium">Transaction</label>
        <select
          name="transaction"
          value={formData.transaction}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Resale">Resale</option>
          <option value="New Property">New Property</option>
        </select>
      </div>

      {/* Ownership */}
      <div>
        <label className="block mb-1 font-medium">Ownership</label>
        <select
          name="ownership"
          value={formData.ownership}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Freehold">Freehold</option>
          <option value="Leasehold">Leasehold</option>
          <option value="Co-operative society">Co-operative society</option>
        </select>
      </div>

      {/* Facing */}
      <div>
        <label className="block mb-1 font-medium">Facing</label>
        <select
          name="facing"
          value={formData.facing}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North-East">North-East</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        {isLoading ? 'Predicting...' : 'Predict Price'}
      </button>
    </form>
  );
};