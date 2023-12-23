import { SwaggerApiResponse } from '../models/swagger-model';
export declare class SwaggerApi {
    private backendBase;
    constructor(backendBase: string);
    addSwagger(url: string, formData: FormData): Promise<SwaggerApiResponse>;
}
