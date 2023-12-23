// api/flows.ts
import axios, { AxiosResponse } from 'axios';
import { Flow } from '../models/flow-model';

const backendBase = 'YOUR_BACKEND_BASE_URL';

export async function getAllFlowsByBotId(botId: string): Promise<Flow[]> {
    const url = `${backendBase}/flows/bot/${botId}`;
    const response: AxiosResponse<Flow[]> = await axios.get(url, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}

export async function createNewFlow(botId: string, flow: Flow): Promise<Flow> {
    const url = `${backendBase}/flows/bot/${botId}`;
    const response: AxiosResponse<Flow> = await axios.post(url, flow, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}

export async function syncFlow(flowId: string, flow: Flow): Promise<Flow> {
    const url = `${backendBase}/flows/${flowId}`;
    const response: AxiosResponse<Flow> = await axios.put(url, flow, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}

export async function getFlow(flowId: string): Promise<Flow> {
    const url = `${backendBase}/flows/${flowId}`;
    const response: AxiosResponse<Flow> = await axios.get(url, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}

export async function getFlowVariables(flowId: string): Promise<any[]> {
    const url = `${backendBase}/flows/${flowId}/variables`;
    const response: AxiosResponse<any[]> = await axios.get(url, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data;
}
