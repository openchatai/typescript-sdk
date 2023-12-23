"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Copilot = void 0;
class Copilot {
    constructor(data) {
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
exports.Copilot = Copilot;
