import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from 'dotenv';        // dotenv is used to load environment variables from .env file here it is used to hide the api key from other peoples view
dotenv.config();

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', async (req, res) => {
  console.log("Received data:", req.body); // Enhanced logging
  const { symptoms, medicalHistory, currentCondition } = req.body;

  const requestBody = {
    contents: [{
      parts: [{
        text: `I have the following symptoms: ${symptoms}. My medical history includes: ${medicalHistory}. My current condition is: ${currentCondition}. 
  
        Please provide a concise, personalized treatment plan that includes:  
        1. Immediate care at home (self-treatment steps).  
        2. When to see a doctor (red flag symptoms).  
        3. Special considerations based on my medical history.  
  
        Keep it brief, easy to follow, and actionable.`
      }]
    }]
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

  const geminiResponse = await response.json();

  if (geminiResponse && geminiResponse.candidates && geminiResponse.candidates.length > 0) {
    const firstCandidate = geminiResponse.candidates[0];
    if (firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0) {
      const generatedText = firstCandidate.content.parts[0].text;
      // console.log(generatedText); // Output the generated text       ||    This line is primarily used for logging the generated text from the API response to the console.
      res.json({ generatedText }); // Send the generated text back to the client
    } else {
      console.log("No text found in candidate.");
      res.status(500).json({ error: 'No text found in candidate.' });
    }
  } else {
    console.log("No candidates found in response.");
    res.status(500).json({ error: 'No candidates found in response.' });
  }} catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Gemini API' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
