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
    faq: any[];
    history: ChatMessage[];
    initial_questions: any[];
    logo: string;
}
