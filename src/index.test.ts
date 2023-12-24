import { OpenCopilotSdk } from ".";

const sdk = new OpenCopilotSdk("http://localhost:8888")

async function testCopilot() {
    try {
        // Test: Create Copilot
        let jarvis = await sdk.copilot.createCopilot({
            name: "Jarvis"
        });
        console.log("Test: Create Copilot - Passed", jarvis);

        // Test: Update Copilot
        await sdk.copilot.updateCopilot(jarvis.id, {
            name: "Jarvis 2.0",
            promptMessage: 'Hello, I am your friendly AI assistant!',
            status: 'published',
            website: 'http://jarvisworld.com'
        });
        console.log("Test: Update Copilot - Passed");

        // Test: Get Copilot
        jarvis = await sdk.copilot.getCopilot(jarvis.id);
        console.log("Test: Get Copilot - Passed", jarvis);

        // Test: Get All Copilots
        const copilots = await sdk.copilot.getAllCopilots();
        console.log("Test: Get All Copilots - Passed", copilots);



        await testChat({ sessionId: "ABC123", botId: jarvis.id, botToken: jarvis.token })
        await testActions({bot_id: jarvis.id})
        // Test: Delete Copilot
        const result = await sdk.copilot.deleteCopilot(jarvis.id);
        console.log("Test: Delete Copilot - Passed", result);
    } catch (error: any) {
        console.error("Error in the Jarvis saga:", error.message);
    }
}

async function testChat({ sessionId, botId, botToken }: { sessionId: string, botId: string, botToken: string }) {
    try {
        // Test: List Conversations
        const conversations = await sdk.chat.listConversations(sessionId);
        console.log(`Test: List Conversations - Total conversations in ${sessionId} = ${conversations.length}`);

        // Test: Get Unique Sessions
        const uniqueSessions = await sdk.chat.getUniqueSessions(botId);
        console.log(`Test: Get Unique Sessions - Total unique sessions found: ${uniqueSessions.length}`);

        // Test: Block Session
        await sdk.chat.blockSession(sessionId);
        console.log("Test: Block Session - Passed", sessionId);

        // Test: Get Messages Per Conversation
        const messages = await sdk.chat.getMessagesPerConversation(sessionId);
        console.log('Test: Get Messages Per Conversation - Messages per conversation:', messages);

        // Test: Delete Conversation
        await sdk.chat.deleteConversation(sessionId);
        console.log(`Test: Delete Conversation - Deleted conversation for sessionId: ${sessionId}`);

        // Test: Send Chat Message
        const chatMessageResult = await sdk.chat.sendChatMessage(sessionId, botToken, {
            "from": "user",
            "content": "write a short story on mona lisa",
            "id": botId,
            "headers": {
                "X-Copilot": botId
            },
            "session_id": sessionId
        });
        console.log(`Test: Send Chat Message - Sent chat message to sessionId: ${sessionId}, botToken: ${botToken}, response: ${chatMessageResult.response.text}`);

        // Test: Initialize Chat Session
        const chatSession = await sdk.chat.initChat(sessionId, botToken);
        console.log('Test: Initialize Chat Session - Passed', chatSession);
    } catch (error: any) {
        console.error('Error in the Chat saga:', error.message);
    }
}


async function testActions({ bot_id }: { bot_id: string }) {
    const action_ids = await sdk.action.addAction({
        bot_id: bot_id,
        description: "This action will help you in creating your b-1 visa application",
        name: "Create a new b-1 visa application",
        api_endpoint: "https://hello.requestcatcher.com/",
        payload: {
            "parameters": [
                {
                    "name": "petId",
                    "in": "path",
                    "description": "ID of pet to update",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64"
                    }
                },
                {
                    "name": "additionalMetadata",
                    "in": "query",
                    "description": "Additional Metadata",
                    "required": false,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "requestBody": {
                "content": {
                    "application/octet-stream": {
                        "schema": {
                            "type": "string",
                            "format": "binary"
                        }
                    }
                }
            }
        },
        request_type: "",
        status: "draft"
    })

    console.log("Add action response: ", action_ids)

    const action = await sdk.action.getAction({
        action_id: action_ids[0]
    })

    console.log("Found action with id: ", action.success?.payload)


    const actions = await sdk.action.getActions({
        chatbot_id: bot_id
    })


    console.log(`Got actions for ${bot_id}: ${actions.success}`)
}

// Let the Jarvis show begin!
testCopilot();
