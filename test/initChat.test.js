"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const src_1 = require("../src");
(0, mocha_1.describe)('Copilot Integration Tests', function () {
    this.timeout(20000);
    let sdk;
    let createdCopilot;
    (0, mocha_1.before)(function () {
        sdk = new src_1.OpenCopilotSdk("http://127.0.0.1:8888/backend");
    });
    (0, mocha_1.it)('should create a Copilot and update it', async function () {
        try {
            createdCopilot = await sdk.copilot.createCopilot({
                name: "TestCopilot"
            });
            (0, chai_1.expect)(createdCopilot.name).to.equal("TestCopilot");
        }
        catch (error) {
            console.error("Error in Copilot integration tests:", error.message);
            chai_1.expect.fail(error.message);
        }
    });
    (0, mocha_1.it)('should use the created Copilot to init chat', async function () {
        try {
            const result = await sdk.chat.initChat("abc1234", createdCopilot.token);
            (0, chai_1.expect)(result).to.have.keys('bot_name', 'faq', 'history', 'initial_questions', 'logo');
            (0, chai_1.expect)(result.bot_name).to.be.a('string');
            (0, chai_1.expect)(result.faq).to.be.an('array');
            (0, chai_1.expect)(result.history).to.be.an('array');
            (0, chai_1.expect)(result.initial_questions).to.be.an('array');
            (0, chai_1.expect)(result.logo).to.be.a('string');
        }
        catch (error) {
            console.error("Error in another operation:", error.message);
            chai_1.expect.fail(error.message);
        }
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
