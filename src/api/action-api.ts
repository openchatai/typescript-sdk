
import axios from 'axios';
import { GetActionsRequest, GetActionsResponse, GetActionRequest, GetActionResponse, AddActionRequest, AddActionResponse } from '../models';

const backendBase = 'YOUR_BACKEND_BASE_URL';

export const getActions = async (request: GetActionsRequest): Promise<GetActionsResponse> => {
  try {
    const response = await axios.get(`${backendBase}/actions/bot/${request.chatbot_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching actions:', error);
    throw error;
  }
};

export const getAction = async (request: GetActionRequest): Promise<GetActionResponse> => {
  try {
    const response = await axios.get(`${backendBase}/actions/p/${request.action_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching action:', error);
    throw error;
  }
};

export const addAction = async (request: AddActionRequest): Promise<AddActionResponse> => {
  try {
    const response = await axios.post(`${backendBase}/actions/bot/${request.bot_id}`, request);
    return response.data;
  } catch (error) {
    console.error('Error adding action:', error);
    throw error;
  }
};
