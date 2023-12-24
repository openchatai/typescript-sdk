// models/chatModels.ts
export interface ChatMessage {
    chatbot_id: string;
    created_at: string;
    from_user: boolean;
    id: number;
    message: string;
    session_id: string;
    updated_at: string;
}

export interface ChatSession {
    bot_name: string;
    faq: any[]; // Update the type accordingly
    history: ChatMessage[];
    initial_questions: any[]; // Update the type accordingly
    logo: string;
}

export interface UniqueSession {
    first_message: {
        chatbot_id: string;
        created_at: string;
        from_user: boolean;
        id: number;
        message: string;
        session_id: string;
        updated_at: string;
    };
    session_id: string;
}

export interface SendChatRequest {
    id: string;
    from: string;
    content: string;
    headers: {
        'X-Copilot': string;
    };
    session_id: string;
}


export interface SendChatResponse {
    response: {
        text: string;
    };
    type: string;
}
