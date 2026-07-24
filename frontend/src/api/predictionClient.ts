import axios from 'axios';
import type { PredictionInput, PredictionResponse } from '../types/prediction';
const API_BASE_URL = 'http://127.0.0.1:8000';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictHousePrice = async (data: PredictionInput): Promise<PredictionResponse> => {
 const response = await apiClient.post<PredictionResponse>('/api/predict', data);
  return response.data;
};