"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCopilot = exports.deleteCopilot = exports.createCopilot = exports.updateCopilot = exports.getAllCopilots = exports.getCopilot = void 0;
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
const apiUrl = '/copilots';
const getCopilot = async (id) => {
    const response = await axios_1.default.get(`${apiUrl}/${id}`);
    return new models_1.Copilot(response.data);
};
exports.getCopilot = getCopilot;
const getAllCopilots = async () => {
    const response = await axios_1.default.get(apiUrl);
    return response.data.map((d) => new models_1.Copilot(d));
};
exports.getAllCopilots = getAllCopilots;
const updateCopilot = async (id, copilot) => {
    await axios_1.default.put(`${apiUrl}/${id}`, copilot);
};
exports.updateCopilot = updateCopilot;
const createCopilot = async (copilot) => {
    const response = await axios_1.default.post(apiUrl, copilot);
    return new models_1.Copilot(response.data);
};
exports.createCopilot = createCopilot;
const deleteCopilot = async (id) => {
    await axios_1.default.delete(`${apiUrl}/${id}`);
};
exports.deleteCopilot = deleteCopilot;
const validateCopilot = async (id) => {
    const response = await axios_1.default.get(`${apiUrl}/${id}/validate`);
    return response.data;
};
exports.validateCopilot = validateCopilot;
