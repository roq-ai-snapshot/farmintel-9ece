import axios from 'axios';
import queryString from 'query-string';
import { CropRecommendationInterface } from 'interfaces/crop-recommendation';
import { GetQueryInterface } from '../../interfaces';

export const getCropRecommendations = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crop-recommendations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCropRecommendation = async (cropRecommendation: CropRecommendationInterface) => {
  const response = await axios.post('/api/crop-recommendations', cropRecommendation);
  return response.data;
};

export const updateCropRecommendationById = async (id: string, cropRecommendation: CropRecommendationInterface) => {
  const response = await axios.put(`/api/crop-recommendations/${id}`, cropRecommendation);
  return response.data;
};

export const getCropRecommendationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crop-recommendations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCropRecommendationById = async (id: string) => {
  const response = await axios.delete(`/api/crop-recommendations/${id}`);
  return response.data;
};
