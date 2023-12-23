export interface Action {
    id: string;
    payload: {
        metadata: {
            action: {
                base_uri: string;
                chatbot_id: string;
                description: string;
                name: string;
                payload: {};
                status: string;
            };
        };
        page_content: string;
    };
    vector: string | null;
}
export interface GetActionsRequest {
    chatbot_id: string;
}
export interface GetActionsResponse {
    success: Action[];
}
export interface GetActionRequest {
    action_id: string;
}
export interface GetActionResponse {
    success?: Action;
    error?: {
        message: string;
    };
}
export interface AddActionRequest {
    bot_id: string;
    name: string;
    description: string;
    api_endpoint: string;
    payload: {};
    status: string;
    request_type: string;
}
export interface AddActionResponse {
    success: string;
}
