import axios, { AxiosInstance } from "axios";

export abstract class ApiRequester {
    apiUrl: string;
    protected i: AxiosInstance;
    constructor(baseUrl: string) {
        this.apiUrl = `${baseUrl}/copilot`;
        this.i = this.getAxiosInstance()
    }
    private getAxiosInstance(): AxiosInstance {
        if (!this.i) {
            this.i = axios.create({
                baseURL: this.apiUrl,
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        return this.i;
    }
}