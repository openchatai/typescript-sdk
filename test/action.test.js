"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const src_1 = require("../src");
(0, mocha_1.describe)('Copilot Integration Tests', function () {
    this.timeout(20000);
    let sdk;
    let createdCopilot;
    let action_ids;
    let actions;
    (0, mocha_1.before)(function () {
        sdk = new src_1.OpenCopilotSdk("http://127.0.0.1:8888/backend");
    });
    (0, mocha_1.it)('should create a copilot to add actions', async function () {
        try {
            createdCopilot = await sdk.copilot.createCopilot({
                name: "ActionsCopilot"
            });
            (0, chai_1.expect)(createdCopilot.name).to.equal("ActionsCopilot");
        }
        catch (error) {
            console.error("Error in Copilot integration tests:", error.message);
            chai_1.expect.fail(error.message);
        }
    });
    (0, mocha_1.it)('should create an action from created copilot', async function () {
        try {
            action_ids = await sdk.action.addAction({
                bot_id: createdCopilot.id,
                api_endpoint: "http://127.0.0.1:8888",
                description: "This is a test action",
                name: "Test Action",
                payload: {},
                request_type: "GET",
                status: "active"
            });
            // assert action_ids is an array with one string
        }
        catch (error) {
            chai_1.expect.fail(error.message);
        }
    });
    (0, mocha_1.it)('should get a list of actions for this copilot', async function () {
        const actions = await sdk.action.getActions({
            chatbot_id: createdCopilot.id
        });
        (0, chai_1.expect)(actions).to.be.an('array');
        actions.forEach((action) => {
            (0, chai_1.expect)(action).to.have.keys('api_endpoint', 'bot_id', 'name', 'operation_id', 'status', 'payload', 'request_type', 'updated_at', 'created_at', 'deleted_at', 'description', 'id');
        });
    });
    (0, mocha_1.it)('should create a flow', async function () {
        const flow = {
            blocks: [{
                    actions: [],
                    name: "Block 1",
                    next_on_fail: null,
                    next_on_success: null,
                    order: 1
                }],
            description: "",
            name: "Example flow"
        };
        const _flow = await sdk.flow.createNewFlow(createdCopilot.id, flow);
        (0, chai_1.expect)(_flow).to.have.keys('blocks', 'description', 'flow_id', 'last_saved_at', 'name');
    });
    (0, mocha_1.it)('should fetch all flows for the bot by bot id', async function () {
        const flows = await sdk.flow.getAllFlowsByBotId(createdCopilot.id);
        (0, chai_1.expect)(flows).to.be.an('array');
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
