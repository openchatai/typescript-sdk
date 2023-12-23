import { CopilotApi, SwaggerApi, ChatApi, FlowApi, ActionApi } from "./api";



class OpenCopilotConnect {
  public copilot: CopilotApi;
  public swagger: SwaggerApi;
  public chat: ChatApi;
  public flow: FlowApi;
  public action: ActionApi;

  constructor(baseUrl: string) {
    this.copilot = new CopilotApi(baseUrl);
    this.swagger = new SwaggerApi(baseUrl);
    this.chat = new ChatApi(baseUrl);
    this.flow = new FlowApi(baseUrl);
    this.action = new ActionApi(baseUrl);
  }
}

export default OpenCopilotConnect;
