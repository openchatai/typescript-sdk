import { Flow } from '../models/flow-model';
export declare function getAllFlowsByBotId(botId: string): Promise<Flow[]>;
export declare function createNewFlow(botId: string, flow: Flow): Promise<Flow>;
export declare function syncFlow(flowId: string, flow: Flow): Promise<Flow>;
export declare function getFlow(flowId: string): Promise<Flow>;
export declare function getFlowVariables(flowId: string): Promise<any[]>;
