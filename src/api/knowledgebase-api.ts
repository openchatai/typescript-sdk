import axios from 'axios';


interface QdrantResponse {
    result: {
        points: Point[];
        next_page_offset: string;
    };
    status: string;
    time: number;
}

interface Point {
    id: string;
    payload: {
        metadata: {
            bot_id: string;
        };
        page_content: string;
    };
    vector: any; // Replace 'any' with the actual type of the 'vector' property if you have more information about it
}


export class KnowledgebaseApi {
    private backendBase: string;

    constructor(baseUrl: string) {
        this.backendBase = baseUrl;
    }

    public async ingestWebsites(bot_id: string, urls: string[]): Promise<string> {
        const result = await axios.post<string>(`${this.backendBase}/uploads/file/ingest`, {
            "filenames": urls, "bot_id": bot_id
        });

        return result.data
    }


    // This test will not pass for remote deployments
    public async hasDocuments(bot_id: string) {
        const apiUrl = 'http://localhost:6333/collections/knowledgebase/points/scroll';
        const requestData = {
            filter: {
                must: [
                    {
                        key: 'metadata.bot_id',
                        match: {
                            value: bot_id,
                        },
                    },
                ],
            },
            limit: 1,
            with_payload: true,
            with_vector: false,
        };

        // Make the HTTP request using Axios
        const result = await axios.post<QdrantResponse>(apiUrl, requestData)
        return result.data
    }
}
