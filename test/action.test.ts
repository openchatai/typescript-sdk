import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import { OpenCopilotSdk } from '../src';
import { Action, Copilot, Flow } from '../src/models';

describe('Copilot Integration Tests', function () {
    this.timeout(20000);
    let sdk: OpenCopilotSdk;
    let createdCopilot: Copilot;
    let action_ids: string[];
    let actions: Action[];

    before(function () {
        sdk = new OpenCopilotSdk("http://127.0.0.1:8888/backend");
    });

    it('should create a copilot to add actions', async function () {
        try {
            createdCopilot = await sdk.copilot.createCopilot({
                name: "ActionsCopilot"
            });
            expect(createdCopilot.name).to.equal("ActionsCopilot");
        } catch (error: any) {
            console.error("Error in Copilot integration tests:", error.message);
            expect.fail(error.message);
        }
    });

    it('should create an action from created copilot', async function () {
        try {
            action_ids = await sdk.action.addAction({
                bot_id: createdCopilot.id,
                api_endpoint: "http://127.0.0.1:8888",
                description: "This is a test action",
                name: "Test Action",
                payload: {},
                request_type: "GET",
                status: "active"
            })

            // assert action_ids is an array with one string
        } catch (error: any) {
            expect.fail(error.message);
        }
    });


    it('should get a list of actions for this copilot', async function () {
        const actions = await sdk.action.getActions({
            chatbot_id: createdCopilot.id
        });

        expect(actions).to.be.an('array');

        actions.forEach((action: any) => {
            expect(action).to.have.keys('api_endpoint', 'bot_id', 'name', 'operation_id', 'status', 'payload', 'request_type', 'updated_at', 'created_at', 'deleted_at', 'description', 'id');
        });
    })


    it('should create a flow', async function() {
        const flow: Flow = {
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
        
        const _flow = await sdk.flow.createNewFlow(createdCopilot.id, flow)
        expect(_flow).to.have.keys('blocks', 'description', 'flow_id', 'last_saved_at', 'name');
    })


    it('should fetch all flows for the bot by bot id', async function() {
        const flows = await sdk.flow.getAllFlowsByBotId(createdCopilot.id)
        expect(flows).to.be.an('array')
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
