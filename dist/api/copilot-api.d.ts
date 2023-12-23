import { Copilot } from "../models";
export declare const getCopilot: (id: string) => Promise<Copilot>;
export declare const getAllCopilots: () => Promise<Copilot[]>;
export declare const updateCopilot: (id: string, copilot: Copilot) => Promise<void>;
export declare const createCopilot: (copilot: Copilot) => Promise<Copilot>;
export declare const deleteCopilot: (id: string) => Promise<void>;
export declare const validateCopilot: (id: string) => Promise<string>;
