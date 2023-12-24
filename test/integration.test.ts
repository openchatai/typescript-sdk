import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import { OpenCopilotSdk } from '../src';
import * as chai from 'chai';

const assert = chai.assert;
import { Copilot } from '../src/models';

const sdk = new OpenCopilotSdk('http://127.0.0.1:8888/backend');

describe('Integration Tests', function () {
    let jarvis: Copilot;

    this.timeout(20000);

    before(async function () {
        try {
            jarvis = await sdk.copilot.createCopilot({
                name: 'Jarvis',
            });

            assert.strictEqual(jarvis.name, 'Jarvis', 'Create Copilot failed');

            await sdk.copilot.updateCopilot(jarvis.id, {
                name: 'Jarvis 2.0',
                promptMessage: 'Hello, I am your friendly AI assistant!',
                status: 'published',
                website: 'http://jarvisworld.com',
            });

            // Test: Get Copilot
            jarvis = (await sdk.copilot.getCopilot(jarvis.id)).chatbot;
            assert.strictEqual(jarvis.name, 'Jarvis 2.0', 'Update Copilot failed');
        } catch (error: any) {
            console.error('Error in the Jarvis saga:', error.message);
            throw error;
        }
    });

    it('should pass integration tests for Copilot and Chat', async function () {
        try {
            it('should get all Copilots and assert they are an array', async function () {
                try {
                    const copilots = await sdk.copilot.getAllCopilots();
                    expect(copilots).to.be.an('array');
                } catch (error: any) {
                    console.error("Error in Copilot integration tests:", error.message);
                    expect.fail(error.message);
                }
            });
        } catch (error: any) {
            console.error('Error in the integration tests:', error.message);
            expect.fail(error.message);
        }
    });


    it('should list conversations and get unique sessions', async function () {
        try {
            // Test: List Conversations
            const conversations = await sdk.chat.listConversations("abc123");
            // Assert conversations is an array
            expect(conversations).to.be.an('array');

            // Test: Get Unique Sessions
            const uniqueSessions = await sdk.chat.getUniqueSessions(jarvis.id);
            // Assert uniqueSessions is an array
            expect(uniqueSessions).to.be.an('array');

            // Test: Get Messages Per Conversation
            const messages = await sdk.chat.getMessagesPerConversation("abc123");
            expect(messages).to.be.an('array');

        } catch (error: any) {
            console.error("Error in Chat integration tests:", error.message);
            expect.fail(error.message);
        }
    });
    
    describe('', async function() {
        const chatMessageResult = await sdk.chat.sendChatMessage("abc123", jarvis.token, {
            from: 'user',
            content: 'Greet me in less than 20 characters',
            id: jarvis.id,
            headers: {
                'X-Copilot': jarvis.id,
            },
            session_id: "abc123",
        });

        it('should have a response text less than 50 characters', function () {
            assert.ok(chatMessageResult.response.text.length < 50, 'Chat message response text is not less than 50 characters');
        });
    })



    after(async function () {
        const result = await sdk.copilot.deleteCopilot(jarvis.id);
        console.log('Test: Delete Copilot - Passed', result);
    });
});

