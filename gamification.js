// Import necessary modules and configurations
import express from 'express';
import { User, GameStats } from './database.js';

// Create a router for gamification features
const router = express.Router();

/**
 * Route to fetch game stats for a specific student.
 */
router.get('/stats/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const stats = await GameStats.findOne({ userId });

    if (!stats) {
      return res.status(404).send('Game stats not found');
    }

    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching game stats:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * Route to update game stats for a specific student.
 */
router.post('/update/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { points, achievements } = req.body;

    const updatedStats = await GameStats.findOneAndUpdate(
      { userId },
      { $inc: { points }, $push: { achievements } },
      { new: true }
    );

    if (!updatedStats) {
      return res.status(404).send('User not found');
    }

    res.json({ success: true, updatedStats });
  } catch (error) {
    console.error('Error updating game stats:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * Route to reset game stats for a specific student.
 */
router.post('/reset/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const resetStats = await GameStats.findOneAndUpdate(
      { userId },
      { points: 0, achievements: [] },
      { new: true }
    );

    if (!resetStats) {
      return res.status(404).send('User not found');
    }

    res.json({ success: true, resetStats });
  } catch (error) {
    console.error('Error resetting game stats:', error);
    res.status(500).send('Internal server error');
  }
});

export default router;
