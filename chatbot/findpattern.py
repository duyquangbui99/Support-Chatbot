import re
from collections import Counter
import json

def extract_keywords(input_string):
    # Remove special characters and convert to lowercase
    cleaned_string = re.sub(r'[^a-zA-Z ]', '', input_string).lower()

    # Tokenize the cleaned string
    words = cleaned_string.split()

    # Define words to exclude (question words and "to be" verbs)
    exclude_words = ["is", "am", "are", "was", "were", "be", "been", "being", "what",
                     "when", "where", "who", "whom", "whose", "why", "how", "which",
                     "do", "at","you","for", "and", "there","it","or","to","your", "his","her",
                     "an","a","of","in", "such","as","any","have","has","the"]

    # Remove excluded words
    filtered_words = [word for word in words if word not in exclude_words]

    # Count the frequency of each word
    word_counts = Counter(filtered_words)

    # Sort the words by frequency in descending order
    sorted_keywords = sorted(word_counts, key=lambda word: word_counts[word], reverse=True)

     # Format the output as a JSON string
    output_json = json.dumps({"patterns": sorted_keywords}, ensure_ascii=False)

    return output_json

# Example usage:
input_string = "What types of nail services does your salon specialize in, and can you provide details about each service offered? Are there any package deals or discounts available for clients who want a combination of nail services, such as manicures and pedicures? Do you offer nail art and design services, and what creative options are available for clients who want unique nail designs? What safety and hygiene measures do you have in place to ensure the well-being of your clients during nail services?Can clients request personalized or additional services, such as nail extensions, special nail polish options, or treatments to improve nail health and strength?"
keywords = extract_keywords(input_string)
print(keywords)
