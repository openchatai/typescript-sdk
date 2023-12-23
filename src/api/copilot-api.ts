import { Copilot, CopilotData } from "../models/copilot-model";


export const getCopilot = async (id: string): Promise<Copilot> => {

  const response = await fetch(`/copilots/${id}`);
  const data: CopilotData = await response.json();

  return new Copilot(data);

}

export const getAllCopilots = async (): Promise<Copilot[]> => {

  const response = await fetch('/copilots');
  const data: CopilotData[] = await response.json();

  return data.map(d => new Copilot(d));

}

export const updateCopilot = async (id: string, copilot: Copilot): Promise<void> => {
  await fetch(`/copilots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(copilot)
  });

}

export const createCopilot = async (copilot: Copilot): Promise<Copilot> => {
  const response = await fetch('/copilots', {
    method: 'POST', 
    body: JSON.stringify(copilot)
  });

  return new Copilot(await response.json());

}

export const deleteCopilot = async (id: string): Promise<void> => {

  await fetch(`/copilots/${id}`, {
    method: 'DELETE'
  });

}

export const validateCopilot = async (id: string): Promise<string> => {

  const response = await fetch(`/copilots/${id}/validate`);

  return response.text();

}
