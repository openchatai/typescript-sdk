"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const src_1 = require("../src");
const chai = __importStar(require("chai"));
const assert = chai.assert;
const sdk = new src_1.OpenCopilotSdk('http://127.0.0.1:8888/backend');
(0, mocha_1.describe)('Integration Tests', function () {
    let jarvis;
    this.timeout(20000);
    (0, mocha_1.before)(async function () {
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
        }
        catch (error) {
            console.error('Error in the Jarvis saga:', error.message);
            throw error;
        }
    });
    (0, mocha_1.it)('should pass integration tests for Copilot and Chat', async function () {
        try {
            (0, mocha_1.it)('should get all Copilots and assert they are an array', async function () {
                try {
                    const copilots = await sdk.copilot.getAllCopilots();
                    (0, chai_1.expect)(copilots).to.be.an('array');
                }
                catch (error) {
                    console.error("Error in Copilot integration tests:", error.message);
                    chai_1.expect.fail(error.message);
                }
            });
        }
        catch (error) {
            console.error('Error in the integration tests:', error.message);
            chai_1.expect.fail(error.message);
        }
    });
    (0, mocha_1.it)('should list conversations and get unique sessions', async function () {
        try {
            // Test: List Conversations
            const conversations = await sdk.chat.listConversations("abc123");
            // Assert conversations is an array
            (0, chai_1.expect)(conversations).to.be.an('array');
            // Test: Get Unique Sessions
            const uniqueSessions = await sdk.chat.getUniqueSessions(jarvis.id);
            // Assert uniqueSessions is an array
            (0, chai_1.expect)(uniqueSessions).to.be.an('array');
            // Test: Get Messages Per Conversation
            const messages = await sdk.chat.getMessagesPerConversation("abc123");
            (0, chai_1.expect)(messages).to.be.an('array');
        }
        catch (error) {
            console.error("Error in Chat integration tests:", error.message);
            chai_1.expect.fail(error.message);
        }
    });
    (0, mocha_1.describe)('', async function () {
        const chatMessageResult = await sdk.chat.sendChatMessage("abc123", jarvis.token, {
            from: 'user',
            content: 'Greet me in less than 20 characters',
            id: jarvis.id,
            headers: {
                'X-Copilot': jarvis.id,
            },
            session_id: "abc123",
        });
        (0, mocha_1.it)('should have a response text less than 50 characters', function () {
            assert.ok(chatMessageResult.response.text.length < 50, 'Chat message response text is not less than 50 characters');
        });
    });
    (0, mocha_1.after)(async function () {
        const result = await sdk.copilot.deleteCopilot(jarvis.id);
        console.log('Test: Delete Copilot - Passed', result);
    });
});
