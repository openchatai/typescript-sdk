interface ActionInternal {
    name: string;
    description: string;
    api_endpoint: string;
    request_type: string;
    operation_id: string;
    payload: {
        parameters: {
            name: string;
            in: string;
            description: string;
            required: boolean;
            schema: {
                type: string;
                format: string;
            };
        }[];
        requestBody: {
            content: {
                'application/octet-stream': {
                    schema: {
                        type: string;
                        format: string;
                    };
                };
            };
        };
    };
}
export interface Flow {
    name: string;
    description: string;
    blocks: {
        name: string;
        actions: ActionInternal[];
        next_on_fail: string | null;
        next_on_success: string | null;
        order: number;
    }[];
}
export {};
