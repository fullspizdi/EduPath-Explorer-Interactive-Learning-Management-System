// Import necessary modules and configurations
import express from 'express';
import { User, Performance } from './database.js';
import { analyzePerformance } from './performance_analytics.js';

// Create a router for the dashboard module
const router = express.Router();

/**
 * Route to get comprehensive dashboard data for a specific educator or administrator.
 */
router.get('/dashboard/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || user.role !== 'educator' && user.role !== 'administrator') {
      return res.status(403).send('Access denied. Only educators and administrators can view dashboard.');
    }

    const students = await User.find({ educatorId: userId });
    const dashboardData = await Promise.all(students.map(async (student) => {
      const performance = await Performance.findOne({ userId: student._id });
      const performanceAnalysis = performance ? await analyzePerformance(student._id, performance.courseId) : null;

      return {
        studentId: student._id,
        name: student.name,
        email: student.email,
        performance: performanceAnalysis
      };
    }));

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).send('Internal server error');
  }
});

export const dashboardRoutes = router;
