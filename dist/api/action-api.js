"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAction = exports.getAction = exports.getActions = void 0;
const axios_1 = __importDefault(require("axios"));
const backendBase = 'YOUR_BACKEND_BASE_URL';
const getActions = async (request) => {
    try {
        const response = await axios_1.default.get(`${backendBase}/actions/bot/${request.chatbot_id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching actions:', error);
        throw error;
    }
};
exports.getActions = getActions;
const getAction = async (request) => {
    try {
        const response = await axios_1.default.get(`${backendBase}/actions/p/${request.action_id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching action:', error);
        throw error;
    }
};
exports.getAction = getAction;
const addAction = async (request) => {
    try {
        const response = await axios_1.default.post(`${backendBase}/actions/bot/${request.bot_id}`, request);
        return response.data;
    }
    catch (error) {
        console.error('Error adding action:', error);
        throw error;
    }
};
exports.addAction = addAction;
