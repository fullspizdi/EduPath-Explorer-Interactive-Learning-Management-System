// Import necessary modules and configurations
import express from 'express';
import { aiServices } from './config.json';
import axios from 'axios';

// Create a router for virtual assistant functionalities
const router = express.Router();

/**
 * Virtual Assistant to help with student queries regarding schedules, homework, and topics.
 */
router.post('/assist', async (req, res) => {
  try {
    const { query, studentId } = req.body;

    if (!query || !studentId) {
      return res.status(400).send('Missing required parameters: query or studentId');
    }

    const responseText = await handleStudentQuery(query, studentId);
    res.json({ success: true, response: responseText });
  } catch (error) {
    console.error('Error in virtual assistant:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * Handles student queries by interacting with AI services.
 * @param {string} query - The student's query.
 * @param {string} studentId - The student's ID.
 * @returns {Promise<string>} - The AI's response to the query.
 */
const handleStudentQuery = async (query, studentId) => {
  const { openAI } = aiServices;
  const headers = {
    'Authorization': `Bearer ${openAI.apiKey}`,
    'Content-Type': 'application/json'
  };

  const body = {
    prompt: `Assist a student with ID ${studentId} with the following query: ${query}`,
    max_tokens: 250
  };

  const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', body, { headers });
  if (response.status !== 200) {
    throw new Error('Failed to process query with AI service');
  }

  return response.data.choices[0].text;
};

export const virtualAssistantRoutes = router;
