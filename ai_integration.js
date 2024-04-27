// Import necessary modules and configurations
import { aiServices } from './config.json';
import axios from 'axios';

/**
 * Initializes AI integrations by setting up API keys and ensuring services are reachable.
 */
export const initializeAI = async () => {
  try {
    console.log('Initializing AI services...');
    await Promise.all([
      testAIConnection(aiServices.openAI.apiKey, 'https://api.openai.com'),
      testAIConnection(aiServices.googleAI.apiKey, 'https://api.google.com'),
      testAIConnection(aiServices.anthropic.apiKey, 'https://api.anthropic.com')
    ]);
    console.log('AI services initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize AI services:', error);
  }
};

/**
 * Tests the connection to an AI service.
 * @param {string} apiKey - The API key for the AI service.
 * @param {string} apiUrl - The base URL for the AI service.
 */
const testAIConnection = async (apiKey, apiUrl) => {
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const response = await axios.get(`${apiUrl}/v1/status`, { headers });
  if (response.status !== 200) {
    throw new Error(`Failed to connect to AI service at ${apiUrl}`);
  }
  console.log(`Connected successfully to AI service at ${apiUrl}`);
};

/**
 * Utilizes AI to analyze and enhance learning paths based on student data.
 * @param {Object} studentData - Data about the student's performance and preferences.
 * @returns {Object} - Enhanced learning path suggestions.
 */
export const enhanceLearningPaths = async (studentData) => {
  const { openAI } = aiServices;
  const headers = {
    'Authorization': `Bearer ${openAI.apiKey}`,
    'Content-Type': 'application/json'
  };

  const body = {
    prompt: `Generate a personalized learning path for a student with the following data: ${JSON.stringify(studentData)}`,
    max_tokens: 150
  };

  const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', body, { headers });
  if (response.status !== 200) {
    throw new Error('Failed to generate learning path from AI service');
  }

  return response.data.choices[0].text;
};
