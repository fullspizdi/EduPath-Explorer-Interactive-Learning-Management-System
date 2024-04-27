// Import necessary modules and configurations
import express from 'express';
import { enhanceLearningPaths } from './ai_integration.js';
import { User, Performance } from './database.js';

// Create a router for adaptive learning module
const router = express.Router();

/**
 * Route to fetch and enhance learning paths for a specific student.
 */
router.get('/path/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const performance = await Performance.findOne({ userId });

    if (!user || !performance) {
      return res.status(404).send('User or performance data not found');
    }

    const studentData = {
      learningPreferences: user.learningPreferences,
      performance: performance.scores,
      progress: performance.progress
    };

    const enhancedPath = await enhanceLearningPaths(studentData);
    res.json({ success: true, enhancedPath });
  } catch (error) {
    console.error('Error fetching and enhancing learning path:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * Route to update learning preferences for a user.
 */
router.post('/preferences/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { learningStyle, preferredLanguages } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      'learningPreferences.learningStyle': learningStyle,
      'learningPreferences.preferredLanguages': preferredLanguages
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.json({ success: true, message: 'Learning preferences updated', updatedUser });
  } catch (error) {
    console.error('Error updating learning preferences:', error);
    res.status(500).send('Internal server error');
  }
});

export const adaptiveLearningRoutes = router;
