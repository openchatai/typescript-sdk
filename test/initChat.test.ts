import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import { OpenCopilotSdk } from '../src';
import { Copilot } from '../src/models';

describe('Copilot Integration Tests', function () {
  this.timeout(20000);
  let sdk: OpenCopilotSdk;
  let createdCopilot: Copilot;

  before(function () {
    sdk = new OpenCopilotSdk("http://127.0.0.1:8888/backend");
  });

  it('should create a Copilot and update it', async function () {
    try {
      createdCopilot = await sdk.copilot.createCopilot({
        name: "TestCopilot"
      });
      expect(createdCopilot.name).to.equal("TestCopilot");
    } catch (error: any) {
      console.error("Error in Copilot integration tests:", error.message);
      expect.fail(error.message);
    }
  });

  it('should use the created Copilot to init chat', async function () {
    try {
      const result = await sdk.chat.initChat("abc1234", createdCopilot.token)
      expect(result).to.have.keys('bot_name', 'faq', 'history', 'initial_questions', 'logo');
      expect(result.bot_name).to.be.a('string');
      expect(result.faq).to.be.an('array');
      expect(result.history).to.be.an('array');
      expect(result.initial_questions).to.be.an('array');
      expect(result.logo).to.be.a('string');
    } catch (error: any) {
      console.error("Error in another operation:", error.message);
      expect.fail(error.message);
    }
  });

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
