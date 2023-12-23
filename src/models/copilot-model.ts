export interface CopilotData {
    id: string;
    name: string;
    token: string;
    website: string;
    status: 'draft' | 'published';
    promptMessage: string;
    enhancedPrivacy: boolean;
    smartSync: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    swaggerUrl: string;
    isPremadeDemoTemplate: boolean;
}

export class CopilotApi implements CopilotData {

    id: string;
    name: string;
    token: string;
    website: string;
    status: 'draft' | 'published';
    promptMessage: string;
    enhancedPrivacy: boolean;
    smartSync: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    swaggerUrl: string;
    isPremadeDemoTemplate: boolean;

    constructor(data: CopilotData) {
        this.id = data.id;
        this.name = data.name;
        this.token = data.token;
        this.website = data.website;
        this.status = data.status;
        this.promptMessage = data.promptMessage;
        this.enhancedPrivacy = data.enhancedPrivacy;
        this.smartSync = data.smartSync;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
        this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        this.swaggerUrl = data.swaggerUrl;
        this.isPremadeDemoTemplate = data.isPremadeDemoTemplate;
    }

}