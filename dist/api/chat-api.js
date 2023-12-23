"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatApi = void 0;
// api/ChatApi.ts
const axios_1 = __importDefault(require("axios"));
class ChatApi {
    constructor(backendBase) {
        this.backendBase = backendBase;
    }
    async listConversations(sessionId) {
        const url = `${this.backendBase}/chat/sessions/${sessionId}/chats/`;
        try {
            const response = await axios_1.default.get(url);
            // Process the response as needed
        }
        catch (error) {
            throw new Error(`Failed to list conversations: ${error.message}`);
        }
    }
    async getUniqueSessions(botId) {
        const url = `${this.backendBase}/chat/b/${botId}/chat_sessions`;
        try {
            const response = await axios_1.default.get(url);
            // Process the response as needed
        }
        catch (error) {
            throw new Error(`Failed to get unique sessions: ${error.message}`);
        }
    }
    async blockSession(sessionId) {
        const url = `${this.backendBase}/chat/sessions/${sessionId}/chats/`;
        try {
            const response = await axios_1.default.get(url);
            // Process the response as needed
        }
        catch (error) {
            throw new Error(`Failed to block session: ${error.message}`);
        }
    }
    async getMessagesPerConversation(sessionId) {
        const url = `${this.backendBase}/chat/sessions/${sessionId}/chats`;
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to get messages per conversation: ${error.message}`);
        }
    }
    async deleteConversation(sessionId) {
        const url = `${this.backendBase}/chat/sessions/${sessionId}/chats`;
        try {
            const response = await axios_1.default.get(url);
            // Process the response as needed
        }
        catch (error) {
            throw new Error(`Failed to delete conversation: ${error.message}`);
        }
    }
    async sendChatMessage(sessionId, botToken) {
        const url = `http://localhost:5000/backend/chat/send`;
        const headers = {
            'X-Session-Id': sessionId,
            'X-Bot-Token': botToken,
        };
        try {
            const response = await axios_1.default.post(url, {}, { headers });
            // Process the response as needed
        }
        catch (error) {
            throw new Error(`Failed to send chat message: ${error.message}`);
        }
    }
    async initChat(sessionId, botToken) {
        const url = `http://localhost:8888/backend/chat/init?session_id=${sessionId}`;
        const headers = {
            'X-Session-Id': sessionId,
            'X-Bot-Token': botToken,
        };
        try {
            const response = await axios_1.default.get(url, { headers });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to initialize chat: ${error.message}`);
        }
    }
}
exports.ChatApi = ChatApi;
