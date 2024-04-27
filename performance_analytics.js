// Import necessary modules and configurations
import { Performance } from './database.js';
import { aiServices } from './config.json';
import axios from 'axios';

/**
 * Analyzes student performance data and predicts future performance trends.
 * @param {ObjectId} userId - The ID of the user whose performance needs to be analyzed.
 * @param {ObjectId} courseId - The ID of the course related to the performance data.
 */
export const analyzePerformance = async (userId, courseId) => {
  try {
    const performanceData = await Performance.findOne({ userId, courseId });
    if (!performanceData) {
      console.log('No performance data found for the specified user and course.');
      return null;
    }

    const prediction = await predictPerformance(performanceData);
    return {
      currentPerformance: performanceData,
      predictedPerformance: prediction
    };
  } catch (error) {
    console.error('Error analyzing performance:', error);
    throw error;
  }
};

/**
 * Uses AI to predict future performance based on current data.
 * @param {Object} performanceData - The current performance data of the student.
 */
const predictPerformance = async (performanceData) => {
  const { googleAI } = aiServices;
  const headers = {
    'Authorization': `Bearer ${googleAI.apiKey}`,
    'Content-Type': 'application/json'
  };

  const body = {
    prompt: `Predict future performance based on the following data: ${JSON.stringify(performanceData)}`,
    max_tokens: 100
  };

  const response = await axios.post('https://api.google.com/v1/engines/davinci/completions', body, { headers });
  if (response.status !== 200) {
    throw new Error('Failed to predict performance from AI service');
  }

  return response.data.choices[0].text;
};

