import axios, { AxiosResponse } from 'axios';
import { expect } from 'chai';
import { OpenCopilotSdk } from '../src';
import { Action, Copilot } from '../src/models';

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Your Test Suite Description', function () {
    this.timeout(70000);
    let sdk: OpenCopilotSdk;
    let createdCopilot: Copilot;

    before(function () {
        sdk = new OpenCopilotSdk("http://127.0.0.1:8888/backend");
    });

    it('should create a copilot to add websites', async function () {
        try {
            createdCopilot = await sdk.copilot.createCopilot({
                name: "WebsitesCopilot"
            });
            expect(createdCopilot.name).to.equal("WebsitesCopilot");
        } catch (error: any) {
            console.error("Error in Copilot integration tests:", error.message);
            expect.fail(error.message);
        }
    });

    it('should ingest website', async () => {
        // @todo add optional limit parameter to website ingestion, for test we don't want to ingest everything, just one page
        const response = await sdk.knowledgebase.ingestWebsites(createdCopilot.id, ["http://qdrant.tech/"])
        expect(response).to.have.deep.equal("Datasource ingestion started successfully");

        console.log("Ingestion in progress, wait for 30 seconds, this takes time ...")
        await sleep(30000);
    });


    it('should make sure that the datasource was ingested successfully', async function () {
        const documents = await sdk.knowledgebase.hasDocuments(createdCopilot.id)
        expect(documents.result.points[0]?.payload.page_content).to.be.a('string');
        expect(documents.result.points[0]?.payload.page_content.length).to.be.greaterThan(5)
    })

    after(async function () {
        try {
            if (createdCopilot) {
                const deletionResult = await sdk.copilot.deleteCopilot(createdCopilot.id);
                console.log("Test: Delete Copilot - Passed", deletionResult);
            }
        } catch (error: any) {
            console.error("Error in cleanup:", error.message);
            expect.fail(error.message);
        }
    });
});
