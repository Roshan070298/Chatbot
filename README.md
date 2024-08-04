## Setup

1. Clone the repository and navigate to the project directory.

   ```sh
   git clone https://github.com/Roshan070298/Chatbot.git
   cd Chatbot

2. Configure mongoDb and the db uri to the config.js

3. Run the below commands

    npm install
    node app.js


## API 
 Base_URL: http://localhost:3000/chatbot/

    1. start a new/existing conversation
        route: /chat
        body: {
            "model": "mistral", #specify the model name llama2 or mistral
            "question": "Is it case sensitive", #prompt
            "new": true  # to start a new conversation( if this argument is not added chat continues in the previous conversation)
        }
    2. get messages from a particular conversation
        route : conversation/{chat_id}/messages

    3. get all chats
        route: conversation/allChats