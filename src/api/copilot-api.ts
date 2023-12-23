import axios from 'axios';
import { Copilot } from "../models";

export class CopilotApi {
  private apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = baseUrl + '/copilots';
  }

  public async getCopilot(id: string): Promise<Copilot> {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return new Copilot(response.data);
  }

  public async getAllCopilots(): Promise<Copilot[]> {
    const response = await axios.get(this.apiUrl);
    return response.data.map((d: Copilot) => new Copilot(d));
  }

  public async updateCopilot(id: string, copilot: Copilot): Promise<void> {
    await axios.put(`${this.apiUrl}/${id}`, copilot);
  }

  public async createCopilot(copilot: Copilot): Promise<Copilot> {
    const response = await axios.post(this.apiUrl, copilot);
    return new Copilot(response.data);
  }

  public async deleteCopilot(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  public async validateCopilot(id: string): Promise<string> {
    const response = await axios.get(`${this.apiUrl}/${id}/validate`);
    return response.data;
  }
}

// Example usage:
// const baseUrl = 'YOUR_BASE_URL';
// const copilotService = new CopilotService(baseUrl);

// // Now you can call the methods on the copilotService instance
// const copilot = await copilotService.getCopilot('123');
// const allCopilots = await copilotService.getAllCopilots();
// await copilotService.updateCopilot('456', { /* updated copilot properties */ });
// const newCopilot = await copilotService.createCopilot({ /* new copilot properties */ });
// await copilotService.deleteCopilot('7
