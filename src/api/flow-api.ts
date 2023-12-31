import { Flow } from '../models/flow-model';
import { ApiRequester } from './api-requester';

export class FlowApi extends ApiRequester {
  private backendBase: string;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.backendBase = baseUrl;
  }

  public async getAllFlowsByBotId(botId: string) {
    const url = `${this.backendBase}/flows/bot/${botId}`;
    const result = await this.i.get<Flow[]>(url);

    return result.data
  }

  public async createNewFlow(botId: string, flow: Flow) {
    const url = `${this.backendBase}/flows/bot/${botId}`;
    const result = await this.i.post<Flow>(url, flow);

    return result.data
  }

  public async syncFlow(flowId: string, flow: Flow) {
    const url = `${this.backendBase}/flows/${flowId}`;
    return this.i.put<Flow>(url, flow);
  }

  public async getFlow(flowId: string) {
    const url = `${this.backendBase}/flows/${flowId}`;
    return this.i.get<Flow>(url);
  }
}
