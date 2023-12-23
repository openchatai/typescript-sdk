// api/swaggerApi.ts
import axios, { AxiosResponse } from 'axios';
import { SwaggerApiResponse } from '../models/swagger-model';

export class SwaggerApi {
  private backendBase: string;

  constructor(backendBase: string) {
    this.backendBase = backendBase;
  }

  async addSwagger(url: string, formData: FormData): Promise<SwaggerApiResponse> {
    try {
      const response: AxiosResponse<SwaggerApiResponse> = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to add Swagger: ${error.message}`);
    }
  };

}

// Usage example:
// const swaggerApi = new SwaggerApi('your_backend_base_url');
// swaggerApi.addSwagger('some_id', '/path/to/your/file.json').then(response => console.log(response));
