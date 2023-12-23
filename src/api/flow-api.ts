import axios, { AxiosResponse } from 'axios';
import { Flow } from '../models/flow-model';

export class FlowApi {
  private backendBase: string;

  constructor(baseUrl: string) {
    this.backendBase = baseUrl;
  }

  private async makeRequest<T>(url: string, method: 'get' | 'post' | 'put', data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data,
        headers: {
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error(`Error making ${method.toUpperCase()} request:`, error);
      throw error;
    }
  }

  public async getAllFlowsByBotId(botId: string): Promise<Flow[]> {
    const url = `${this.backendBase}/flows/bot/${botId}`;
    return this.makeRequest<Flow[]>(url, 'get');
  }

  public async createNewFlow(botId: string, flow: Flow): Promise<Flow> {
    const url = `${this.backendBase}/flows/bot/${botId}`;
    return this.makeRequest<Flow>(url, 'post', flow);
  }

  public async syncFlow(flowId: string, flow: Flow): Promise<Flow> {
    const url = `${this.backendBase}/flows/${flowId}`;
    return this.makeRequest<Flow>(url, 'put', flow);
  }

  public async getFlow(flowId: string): Promise<Flow> {
    const url = `${this.backendBase}/flows/${flowId}`;
    return this.makeRequest<Flow>(url, 'get');
  }

  public async getFlowVariables(flowId: string): Promise<any[]> {
    const url = `${this.backendBase}/flows/${flowId}/variables`;
    return this.makeRequest<any[]>(url, 'get');
  }
}

// // Example usage:
// const backendBase = 'YOUR_BACKEND_BASE_URL';
// const flowService = new FlowService(backendBase);

// // Now you can call the methods on the flowService instance
// const flows = await flowService.getAllFlowsByBotId('bot123');
// const newFlow = await flowService.createNewFlow('bot123', { /* flow properties */ });
// const syncedFlow = await flowService.syncFlow('flow456', { /* updated flow properties */ });
// const singleFlow = await flowService.getFlow('flow789');
// const flowVariables = await flowService.getFlowVariables('flow789');
