import { GetActionsRequest, GetActionsResponse, GetActionRequest, GetActionResponse, AddActionRequest, AddActionResponse } from '../models';
export declare const getActions: (request: GetActionsRequest) => Promise<GetActionsResponse>;
export declare const getAction: (request: GetActionRequest) => Promise<GetActionResponse>;
export declare const addAction: (request: AddActionRequest) => Promise<AddActionResponse>;
