import axios from 'axios';
import { Copilot } from "../models";

export class CopilotApi {
  private apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/copilot`;
  }

  // @todo: this return type is incorrect, needs to be fixed
  public async getCopilot(id: string): Promise<{chatbot: Copilot}> {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return response.data;
  }

  public async getAllCopilots(): Promise<Copilot[]> {
    const response = await axios.get(this.apiUrl);
    return response.data.map((d: Copilot) => new Copilot(d));
  }

  // @todo: This request should be put but it's post!
  public async updateCopilot(id: string, copilot: Pick<Copilot, 'promptMessage' | 'status' | 'website' | 'name'>): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/${id}`, copilot, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response.data
    } catch (error) {
      // Handle error
      console.error('Error updating copilot:', error);
      throw error;
    }
  }

  // @todo: This should not be form data
  public async createCopilot(copilot: Pick<Copilot, 'name'>): Promise<Copilot> {
    const formData = new FormData();
    formData.append('name', copilot.name);

    try {
      const response = await axios.post<Copilot>(`${this.apiUrl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return new Copilot(response.data);
    } catch (error) {
      // Handle error
      console.error('Error creating copilot:', error);
      throw error;
    }
  }

  public async deleteCopilot(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  public async validateCopilot(id: string): Promise<string> {
    const response = await axios.get(`${this.apiUrl}/${id}/validate`);
    return response.data;
  }
}
