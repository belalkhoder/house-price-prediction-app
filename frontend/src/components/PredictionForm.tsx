import React, { useState } from 'react';
import { PredictionInput } from '../types/prediction';

interface PredictionFormProps {
  onSubmit: (data: PredictionInput) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PredictionInput>({
    location: '',
    area: 0,
    floor: 0,
    bathrooms: 0,
    balconies: 0,
    furnishing: 'Unfurnished',
    transaction: 'Resale',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['area', 'floor', 'bathrooms', 'balconies'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) {
      setError('Please select a location');
      return;
    }
    if (formData.area <= 0) {
      setError('Area must be greater than 0');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 bg-white shadow rounded">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium">Location</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Location</option>
          <option value="Downtown">Downtown</option>
          <option value="Suburbs">Suburbs</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Area (sq ft)</label>
        <input
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Floor</label>
        <input
          type="number"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Bathrooms</label>
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Balconies</label>
        <input
          type="number"
          name="balconies"
          value={formData.balconies}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Furnishing</label>
        <select
          name="furnishing"
          value={formData.furnishing}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Unfurnished">Unfurnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Furnished">Furnished</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Transaction</label>
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Predicting...' : 'Predict Price'}
      </button>
    </form>
  );
};