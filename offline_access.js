// Import necessary modules
import express from 'express';
import { Course } from './database.js';
import fs from 'fs';
import path from 'path';

// Router for offline access features
const router = express.Router();

/**
 * Middleware to check if offline access is enabled
 */
router.use((req, res, next) => {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  if (config.features.offlineAccess) {
    next();
  } else {
    res.status(403).send('Offline access feature is not enabled.');
  }
});

/**
 * Route to download course materials for offline access
 */
router.get('/download/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }

    const coursePath = path.join(__dirname, 'offline_courses', `${courseId}.json`);
    fs.writeFileSync(coursePath, JSON.stringify(course));

    res.download(coursePath, `${course.title.replace(/\s+/g, '_')}_offline.json`, (err) => {
      if (err) {
        res.status(500).send('Error downloading the file');
      }
      // Optionally delete the file after sending to keep the server clean
      fs.unlinkSync(coursePath);
    });
  } catch (error) {
    res.status(500).send('Error processing your request');
  }
});

/**
 * Route to list all available courses for offline access
 */
router.get('/list-available', async (req, res) => {
  try {
    const courses = await Course.find({}, 'title description');
    res.json(courses);
  } catch (error) {
    res.status(500).send('Error retrieving available courses');
  }
});

export const offlineAccessRoutes = router;
