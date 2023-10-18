document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("message-input");
    const chatboxContent = document.getElementById("chatbox-content");
    const sendButton = document.querySelector(".send-btn");
    const chatboxContainer = document.querySelector(".chatbox-content");
    const suggestionElements = document.querySelectorAll(".suggest");


    // Load the intents from the JSON file (replace with your actual JSON URL)
    fetch('intents.json')
        .then(response => response.json())
        .then(data => {
            const intents = data.intents;

            function botReply(userMessage) {
                const userMessageContainer = document.createElement("div");
                userMessageContainer.classList.add("user-message-container");

                const userMessageContent = document.createElement("div");
                userMessageContent.classList.add("user-message-content");

                const userMessageElement = document.createElement("p");
                userMessageElement.classList.add("user-message");
                userMessageElement.textContent = userMessage;

                userMessageContent.appendChild(userMessageElement);
                userMessageContainer.appendChild(userMessageContent);
                chatboxContent.appendChild(userMessageContainer);

    
                // Find the best response based on patterns
                let botResponse = "I'm sorry, I don't understand your message.";
                for (const intent of intents) {
                    for (const pattern of intent.patterns) {
                        const regex = new RegExp(pattern, "i");
                        if (userMessage.match(regex)) {
                            botResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            
                            // If there are suggestions, update the suggestions in the chat
                            if (intent.suggestions) {
                                const suggestionList = document.querySelector(".chatbox-suggestion");
                                suggestionList.innerHTML = ''; 
                                
                                intent.suggestions.forEach(suggestion => {
                                    const suggestionElement = document.createElement("li");
                                    suggestionElement.classList.add("suggest");
                                    suggestionElement.textContent = suggestion;
                                    suggestionList.appendChild(suggestionElement);
                                     // Add click event listener to the new suggestion
                                    suggestionElement.addEventListener("click", handleSuggestionClick);
                                });
                            }
                            break; // Stop searching for patterns once a match is found
                        }
                    }
                }

                // Create and append the bot's response
                const botMessageContainer = document.createElement("div");
                botMessageContainer.classList.add("bot-message-container");

                const botMessageContent = document.createElement("div");
                botMessageContent.classList.add("bot-message-content");

                const botMessage = document.createElement("p");
                botMessage.classList.add("bot-message");
                botMessage.textContent = "...";
                setTimeout(function () {
                    botMessage.textContent = botResponse;
                }, 600);   // make a delay reponse of 600ms

                botMessageContent.appendChild(botMessage);
                botMessageContainer.appendChild(botMessageContent);
                chatboxContent.appendChild(botMessageContainer);

                // Clear the input field
                messageInput.value = "";
            }

            //Keep the chatbox container scrolled to the bottom so that new messages are always visible 
            function scrollToBottom() {
                chatboxContainer.scrollTop = chatboxContainer.scrollHeight;
            }

                    // Function to handle suggestion click
            function handleSuggestionClick(event) {
                const clickedSuggestion = event.target.textContent;
                console.log("Clicked suggestion: " + clickedSuggestion); // Add this line to check if the click event is triggered
                botReply(clickedSuggestion);
                scrollToBottom();
            }
            

            // Add click event listeners to suggestion elements
            suggestionElements.forEach(suggestionElement => {
                suggestionElement.addEventListener("click", handleSuggestionClick);
            });
            

            sendButton.addEventListener("click", function () {
                const userMessage = messageInput.value;
                botReply(userMessage);
                scrollToBottom();
            });

            messageInput.addEventListener("keyup", function (event) {
                if (event.key === "Enter") {
                    const userMessage = messageInput.value;
                    botReply(userMessage);
                    scrollToBottom();
                }
            });
        })
        .catch(error => {
            console.error("Error loading intents:", error);
        });
});
