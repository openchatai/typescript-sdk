import { GetActionsRequest, GetActionRequest, GetActionResponse, AddActionRequest, Action } from '../models';
import { ApiRequester } from './api-requester';

export class ActionApi extends ApiRequester {
  private backendBase: string;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.backendBase = baseUrl;
  }

  public async getActions(request: GetActionsRequest) {
    const url = `${this.backendBase}/actions/bot/${request.chatbot_id}`;
    return (await this.i.get<Action[]>(url)).data;
  }

  public async getAction(request: GetActionRequest) {
    const url = `${this.backendBase}/actions/p/${request.action_id}`;
    return (await this.i.get<GetActionResponse>(url)).data;
  }

  public async addAction(request: AddActionRequest) {
    const { bot_id, ...rest } = request;
    const url = `${this.backendBase}/actions/bot/${bot_id}`;
    return (await this.i.post<string[]>(url, rest)).data;
  }
}

// // Example usage:
// const backendBase = 'YOUR_BACKEND_BASE_URL';
// const actions = new Actions(backendBase);

// // Now you can call the methods on the actions instance
// const actionsResponse = await actions.getActions({ chatbot_id: '123' });
// const actionResponse = await actions.getAction({ action_id: '456' });
// const addActionResponse = await actions.addAction({ bot_id: '789', /* other properties */ });

