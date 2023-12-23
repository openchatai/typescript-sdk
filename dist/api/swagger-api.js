"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerApi = void 0;
// api/swaggerApi.ts
const axios_1 = __importDefault(require("axios"));
class SwaggerApi {
    constructor(backendBase) {
        this.backendBase = backendBase;
    }
    async addSwagger(url, formData) {
        try {
            const response = await axios_1.default.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to add Swagger: ${error.message}`);
        }
    }
    ;
}
exports.SwaggerApi = SwaggerApi;
// Usage example:
// const swaggerApi = new SwaggerApi('your_backend_base_url');
// swaggerApi.addSwagger('some_id', '/path/to/your/file.json').then(response => console.log(response));
