"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
describe('Your Test Suite Description', function () {
    this.timeout(70000);
    let sdk;
    let createdCopilot;
    before(function () {
        sdk = new src_1.OpenCopilotSdk("http://127.0.0.1:8888/backend");
    });
    it('should create a copilot to add websites', async function () {
        try {
            createdCopilot = await sdk.copilot.createCopilot({
                name: "WebsitesCopilot"
            });
            (0, chai_1.expect)(createdCopilot.name).to.equal("WebsitesCopilot");
        }
        catch (error) {
            console.error("Error in Copilot integration tests:", error.message);
            chai_1.expect.fail(error.message);
        }
    });
    it('should ingest website', async () => {
        // @todo add optional limit parameter to website ingestion, for test we don't want to ingest everything, just one page
        const response = await sdk.knowledgebase.ingestWebsites(createdCopilot.id, ["http://qdrant.tech/"]);
        (0, chai_1.expect)(response).to.have.deep.equal("Datasource ingestion started successfully");
        console.log("Ingestion in progress, wait for 30 seconds, this takes time ...");
        await sleep(30000);
    });
    it('should make sure that the datasource was ingested successfully', async function () {
        const documents = await sdk.knowledgebase.hasDocuments(createdCopilot.id);
        (0, chai_1.expect)(documents.result.points[0]?.payload.page_content).to.be.a('string');
        (0, chai_1.expect)(documents.result.points[0]?.payload.page_content.length).to.be.greaterThan(5);
    });
    after(async function () {
        try {
            if (createdCopilot) {
                const deletionResult = await sdk.copilot.deleteCopilot(createdCopilot.id);
                console.log("Test: Delete Copilot - Passed", deletionResult);
            }
        }
        catch (error) {
            console.error("Error in cleanup:", error.message);
            chai_1.expect.fail(error.message);
        }
    });
});
