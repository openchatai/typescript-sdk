import { ChatMessage, ChatSession } from '../models/chat-message';
export declare class ChatApi {
    private backendBase;
    constructor(backendBase: string);
    listConversations(sessionId: string): Promise<void>;
    getUniqueSessions(botId: string): Promise<void>;
    blockSession(sessionId: string): Promise<void>;
    getMessagesPerConversation(sessionId: string): Promise<ChatMessage[]>;
    deleteConversation(sessionId: string): Promise<void>;
    sendChatMessage(sessionId: string, botToken: string): Promise<void>;
    initChat(sessionId: string, botToken: string): Promise<ChatSession>;
}
