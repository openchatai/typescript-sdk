// api/swaggerApi.ts
import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { SwaggerApiResponse } from '../models/swagger-model';

export class SwaggerApi {
  private backendBase: string;

  constructor(backendBase: string) {
    this.backendBase = backendBase;
  }

  async addSwagger(id: string, file: string): Promise<SwaggerApiResponse> {
    const url = `${this.backendBase}/swagger_api/u/${id}`;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response: AxiosResponse<SwaggerApiResponse> = await axios.post(url, formData, {
        headers: { ...formData.getHeaders() },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to add Swagger: ${error.message}`);
    }
  }
}

// Usage example:
// const swaggerApi = new SwaggerApi('your_backend_base_url');
// swaggerApi.addSwagger('some_id', '/path/to/your/file.json').then(response => console.log(response));
