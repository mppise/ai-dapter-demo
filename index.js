const apiRepository = require('./api-repository.json');
const AIDapter = require('ai-dapter');

const ai = new AIDapter({
  "provider": "OpenAI",
  "model_name": "gpt-3.5-turbo-16k",
  "endpoint": "https://api.openai.com/v1/chat/completions",
  "authentication": {
    "api_key": "<<Your API Key>>",
    "org_id": "<<Your Org ID>>"
  }
});

let aiDapterOptions = {
  "agentConfig": { "role": "virtual assistant" },
  "dataConfig": { "max_records": 5 }
};

// Update dataConfig object with additional_context ...
/*
aiDapterOptions.dataConfig['additional_context'] = [
  { "original_question": "Where is the nearest Tesla charging station from where I am right now?", "response_summary": "This conversation is about finding the nearest Tesla charging station from the user's current location. The user is requesting assistance in locating the charging station.", "entities": { "address": [""], "radius": [""] } },
  { "original_question": "I am near Columbus airport", "response_summary": "This conversation is about finding Tesla Supercharger stations near Columbus airport.", "entities": { "Location": ["Columbus airport"] } }
];
*/

ai.getLLMResponseFromRealtimeSources(process.argv[2], apiRepository, aiDapterOptions)
  .then((response) => {
    console.log("\nResponse\n", response.ai_response);
    console.log("\nContext\n", JSON.stringify(response.ai_context));
    console.log("\nTokens\n", JSON.stringify(response.tokens));
  });