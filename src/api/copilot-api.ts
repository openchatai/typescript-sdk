import axios from 'axios';
import { Copilot } from "../models";

const apiUrl = '/copilots';

export const getCopilot = async (id: string): Promise<Copilot> => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return new Copilot(response.data);
};

export const getAllCopilots = async (): Promise<Copilot[]> => {
  const response = await axios.get(apiUrl);
  return response.data.map((d: Copilot) => new Copilot(d));
};

export const updateCopilot = async (id: string, copilot: Copilot): Promise<void> => {
  await axios.put(`${apiUrl}/${id}`, copilot);
};

export const createCopilot = async (copilot: Copilot): Promise<Copilot> => {
  const response = await axios.post(apiUrl, copilot);
  return new Copilot(response.data);
};

export const deleteCopilot = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/${id}`);
};

export const validateCopilot = async (id: string): Promise<string> => {
  const response = await axios.get(`${apiUrl}/${id}/validate`);
  return response.data;
};
