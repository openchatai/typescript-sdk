// api/ChatApi.ts
import axios, { AxiosResponse } from 'axios';
import { ChatMessage, ChatSession } from '../models/chat-message';

export class ChatApi {
  private backendBase: string;

  constructor(backendBase: string) {
    this.backendBase = backendBase;
  }

  async listConversations(sessionId: string): Promise<void> {
    const url = `${this.backendBase}/chat/sessions/${sessionId}/chats/`;
    try {
      const response: AxiosResponse<void> = await axios.get(url);
      // Process the response as needed
    } catch (error: any) {
      throw new Error(`Failed to list conversations: ${error.message}`);
    }
  }

  async getUniqueSessions(botId: string): Promise<void> {
    const url = `${this.backendBase}/chat/b/${botId}/chat_sessions`;
    try {
      const response: AxiosResponse<void> = await axios.get(url);
      // Process the response as needed
    } catch (error: any) {
      throw new Error(`Failed to get unique sessions: ${error.message}`);
    }
  }

  async blockSession(sessionId: string): Promise<void> {
    const url = `${this.backendBase}/chat/sessions/${sessionId}/chats/`;
    try {
      const response: AxiosResponse<void> = await axios.get(url);
      // Process the response as needed
    } catch (error: any) {
      throw new Error(`Failed to block session: ${error.message}`);
    }
  }

  async getMessagesPerConversation(sessionId: string): Promise<ChatMessage[]> {
    const url = `${this.backendBase}/chat/sessions/${sessionId}/chats`;
    try {
      const response: AxiosResponse<ChatMessage[]> = await axios.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get messages per conversation: ${error.message}`);
    }
  }

  async deleteConversation(sessionId: string): Promise<void> {
    const url = `${this.backendBase}/chat/sessions/${sessionId}/chats`;
    try {
      const response: AxiosResponse<void> = await axios.get(url);
      // Process the response as needed
    } catch (error: any) {
      throw new Error(`Failed to delete conversation: ${error.message}`);
    }
  }

  async sendChatMessage(sessionId: string, botToken: string): Promise<void> {
    const url = `http://localhost:5000/backend/chat/send`;
    const headers = {
      'X-Session-Id': sessionId,
      'X-Bot-Token': botToken,
    };

    try {
      const response: AxiosResponse<void> = await axios.post(url, {}, { headers });
      // Process the response as needed
    } catch (error: any) {
      throw new Error(`Failed to send chat message: ${error.message}`);
    }
  }

  async initChat(sessionId: string, botToken: string): Promise<ChatSession> {
    const url = `http://localhost:8888/backend/chat/init?session_id=${sessionId}`;
    const headers = {
      'X-Session-Id': sessionId,
      'X-Bot-Token': botToken,
    };

    try {
      const response: AxiosResponse<ChatSession> = await axios.get(url, { headers });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to initialize chat: ${error.message}`);
    }
  }
}
