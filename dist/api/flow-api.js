"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlowVariables = exports.getFlow = exports.syncFlow = exports.createNewFlow = exports.getAllFlowsByBotId = void 0;
// api/flows.ts
const axios_1 = __importDefault(require("axios"));
const backendBase = 'YOUR_BACKEND_BASE_URL';
async function getAllFlowsByBotId(botId) {
    const url = `${backendBase}/flows/bot/${botId}`;
    const response = await axios_1.default.get(url, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}
exports.getAllFlowsByBotId = getAllFlowsByBotId;
async function createNewFlow(botId, flow) {
    const url = `${backendBase}/flows/bot/${botId}`;
    const response = await axios_1.default.post(url, flow, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}
exports.createNewFlow = createNewFlow;
async function syncFlow(flowId, flow) {
    const url = `${backendBase}/flows/${flowId}`;
    const response = await axios_1.default.put(url, flow, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}
exports.syncFlow = syncFlow;
async function getFlow(flowId) {
    const url = `${backendBase}/flows/${flowId}`;
    const response = await axios_1.default.get(url, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}
exports.getFlow = getFlow;
async function getFlowVariables(flowId) {
    const url = `${backendBase}/flows/${flowId}/variables`;
    const response = await axios_1.default.get(url, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}
exports.getFlowVariables = getFlowVariables;
