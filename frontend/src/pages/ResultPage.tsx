import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PredictionResponse, PredictionInput } from '../types/prediction';

interface LocationState {
  result: PredictionResponse;
  data: PredictionInput;
}

export const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-xl mb-4">No prediction data found.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const { result, data } = state;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Prediction Result</h1>
        <div className="bg-gray-50 p-4 rounded mb-6">
          <p className="text-gray-600">Estimated Price:</p>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">
            {result.predicted_price.toLocaleString()} {result.currency || 'INR'}
          </p>
        </div>
        
        <div className="text-left mb-6 border-t pt-4">
          <h3 className="font-bold mb-2 text-gray-700">Property Details:</h3>
          <p className="text-sm text-gray-600">Location: {data.location}</p>
          <p className="text-sm text-gray-600">Area: {data.carpet_area_sqft} sq ft</p>
          <p className="text-sm text-gray-600">Floor: {data.floor_num}</p>
          <p className="text-sm text-gray-600">Bathrooms: {data.bathroom}</p>
          <p className="text-sm text-gray-600">Balcony: {data.balcony}</p>
          <p className="text-sm text-gray-600">Furnishing: {data.furnishing}</p>
          <p className="text-sm text-gray-600">Transaction: {data.transaction}</p>
          <p className="text-sm text-gray-600">Ownership: {data.ownership}</p>
          <p className="text-sm text-gray-600">Facing: {data.facing}</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Make Another Prediction
        </button>
      </div>
    </div>
  );
};