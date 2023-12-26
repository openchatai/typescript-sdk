# OpenCopilot Typescript SDK

- SWC
- Jest
- Nodemon
- Prettier

```
npm run start
npm run start:watch
npm run test
npm run test:watch
```



## Usage
### [Copilot APIs](test/integration.test.ts) 

To create a new copilot instance, follow these steps:

1. **Initialize the SDK**:
   ```javascript
   const sdk = new OpenCopilotSdk('http://127.0.0.1:8888/backend');
   ```

2. **Create a Copilot**:
   ```javascript
   let jarvis = await sdk.copilot.createCopilot({
       name: 'Jarvis',
   });
   assert.strictEqual(jarvis.name, 'Jarvis', 'Create Copilot failed');
   ```

3. **Update the Copilot**:
   After creation, you can update the copilot's details such as name, prompt message, status, and website.
   ```javascript
   await sdk.copilot.updateCopilot(jarvis.id, {
       name: 'Jarvis 2.0',
       promptMessage: 'Hello, I am your friendly AI assistant!',
       status: 'published',
       website: 'http://jarvisworld.com',
   });
   ```

### Managing Copilots
You can perform various operations such as retrieving all copilots, listing conversations, and managing chat sessions.

- **Get All Copilots**:
  ```javascript
  const copilots = await sdk.copilot.getAllCopilots();
  ```

- **List Conversations and Sessions**:
  ```javascript
  const conversations = await sdk.chat.listConversations("abc123");
  const uniqueSessions = await sdk.chat.getUniqueSessions(jarvis.id);
  const messages = await sdk.chat.getMessagesPerConversation("abc123");
  ```

### Sending and Receiving Messages
To interact with a copilot through chat:

- **Send a Chat Message**:
  ```javascript
  const chatMessageResult = await sdk.chat.sendChatMessage("abc123", jarvis.token, {
      from: 'user',
      content: 'Greet me in less than 20 characters',
      id: jarvis.id,
      headers: {
          'X-Copilot': jarvis.id,
      },
      session_id: "abc123",
  });
  ```

### Cleanup
After testing or when a copilot is no longer needed:

- **Delete a Copilot**:
  ```javascript
  const result = await sdk.copilot.deleteCopilot(jarvis.id);
  console.log('Test: Delete Copilot - Passed', result);
  ```

-----


### [Actions APIs](test/action.test.ts) 
1. **Create an Action**:
   ```javascript
   const action_ids = await sdk.action.addAction({
       bot_id: createdCopilot.id,
       api_endpoint: "http://127.0.0.1:8888",
       description: "This is a test action",
       name: "Test Action",
       payload: {},
       request_type: "GET",
       status: "active"
   });
   // Validate action creation
   ```

2. **List Actions for the Copilot**:
   ```javascript
   const actions = await sdk.action.getActions({
       chatbot_id: createdCopilot.id
   });
   ```
   
----

### [Chat APIs](test/initChat.test.ts)

### Initializing Chat
To begin a chat session with a copilot, follow these steps:

1. **Initiate Chat Session**:
   After creating a copilot, you can start a chat session using its token.
   ```javascript
   const result = await sdk.chat.initChat("abc1234", createdCopilot.token);
   ```

2. **Send a Chat Message**:
  ```javascript
  const chatMessageResult = await sdk.chat.sendChatMessage("abc123", jarvis.token, {
      from: 'user',
      content: 'Greet me in less than 20 characters',
      id: jarvis.id,
      headers: {
          'X-Copilot': jarvis.id,
      },
      session_id: "abc123",
  });
  ```

----

- [Knowledgebase](test/knowledgebase.test.ts) 
