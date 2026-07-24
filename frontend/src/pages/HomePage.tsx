import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PredictionForm } from '../components/PredictionForm';
import { predictHousePrice } from '../api/predictionClient';
import { PredictionInput } from '../types/prediction';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleFormSubmit = async (data: PredictionInput) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const result = await predictHousePrice(data);
      // بنبعت النتيجة لصفحة الـ Result عبر الـ state
      navigate('/result', { state: { result, data } });
    } catch (error) {
      console.error('Prediction failed:', error);
      setErrorMessage('Failed to connect to the server. Please make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">House Price Prediction</h1>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <PredictionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};