export class Copilot {

    id: string;
    name: string;
    token: string;
    website: string;
    status: 'draft' | 'published';
    promptMessage: string;
    swaggerUrl: string;

    constructor(data: Copilot) {
        this.id = data.id;
        this.name = data.name;
        this.token = data.token;
        this.website = data.website;
        this.status = data.status;
        this.promptMessage = data.promptMessage;
        this.swaggerUrl = data.swaggerUrl;
    }
}