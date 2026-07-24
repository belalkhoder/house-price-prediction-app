export interface PredictionInput {
  location: string;
  area: number;
  floor: number;
  bathrooms: number;
  balconies: number;
  furnishing: string;
  transaction: string;
}

export interface PredictionResponse {
  predicted_price: number;
  currency?: string;
}