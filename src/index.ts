import { CopilotApi, ChatApi, FlowApi, ActionApi } from "./api";



export class OpenCopilotSdk {
  public copilot: CopilotApi;
  public chat: ChatApi;
  public flow: FlowApi;
  public action: ActionApi;

  constructor(baseUrl: string) {
    this.copilot = new CopilotApi(baseUrl);
    this.chat = new ChatApi(baseUrl);
    this.flow = new FlowApi(baseUrl);
    this.action = new ActionApi(baseUrl);
  }
}
