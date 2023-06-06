import axios from 'axios';
import queryString from 'query-string';
import { LivestockInterface } from 'interfaces/livestock';
import { GetQueryInterface } from '../../interfaces';

export const getLivestocks = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/livestocks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLivestock = async (livestock: LivestockInterface) => {
  const response = await axios.post('/api/livestocks', livestock);
  return response.data;
};

export const updateLivestockById = async (id: string, livestock: LivestockInterface) => {
  const response = await axios.put(`/api/livestocks/${id}`, livestock);
  return response.data;
};

export const getLivestockById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/livestocks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLivestockById = async (id: string) => {
  const response = await axios.delete(`/api/livestocks/${id}`);
  return response.data;
};
