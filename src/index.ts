import { CopilotApi, ChatApi, FlowApi, ActionApi } from "./api";
import { KnowledgebaseApi } from "./api/knowledgebase-api";



export class OpenCopilotSdk {
  public copilot: CopilotApi;
  public chat: ChatApi;
  public flow: FlowApi;
  public action: ActionApi;
  public knowledgebase: KnowledgebaseApi

  constructor(baseUrl: string) {
    this.copilot = new CopilotApi(baseUrl);
    this.chat = new ChatApi(baseUrl);
    this.flow = new FlowApi(baseUrl);
    this.action = new ActionApi(baseUrl);
    this.knowledgebase = new KnowledgebaseApi(baseUrl)
  }
}
