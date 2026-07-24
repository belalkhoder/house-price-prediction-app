import axios from 'axios';
import { PredictionInput, PredictionResponse } from '../types/prediction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictHousePrice = async (data: PredictionInput): Promise<PredictionResponse> => {
  const response = await apiClient.post<PredictionResponse>('/predict', data);
  return response.data;
};