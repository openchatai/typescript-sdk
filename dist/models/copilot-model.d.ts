export declare class Copilot {
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
    constructor(data: Copilot);
}
