// Load the JSON data from a file
fetch('intents.json') // Replace 'intents.json' with the path to your JSON file
  .then(response => response.json())
  .then(jsonData => {
    // Get the user input element
    var userInputElement = document.querySelector('.userinput');

    // Get the bot answer element
    var botAnswerElement = document.querySelector('.botAnswer');

    // Get the text from the user input
    var userInputText = userInputElement.textContent;

    // Split the user input text into individual words
    var userInputWords = userInputText.toLowerCase().split(/\s+/);

    // Initialize response variables
    var bestScore = 0;
    var bestResponse = "I don't understand. Can you please rephrase your question?";

    // Loop through the JSON data and check if any patterns match the user input
    jsonData.intents.forEach(intent => {
        intent.patterns.forEach(pattern => {
            // Split the pattern into individual words
            var patternWords = pattern.toLowerCase().split(/\s+/);

            // Calculate the similarity score by counting common words
            var score = patternWords.reduce((total, word) => {
                if (userInputWords.includes(word)) {
                    return total + 1;
                }
                return total;
            }, 0);

            if (score > bestScore) {
                bestScore = score;
                bestResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        });
    });

    // Set the text of the "botAnswer" element to the best response
    botAnswerElement.textContent = bestResponse;
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
  });
