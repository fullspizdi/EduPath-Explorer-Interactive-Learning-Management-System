import express from 'express';
import { adaptiveLearningRoutes } from './adaptive_learning.js';
import { virtualAssistantRoutes } from './virtual_assistant.js';
import { collaborationToolsRoutes } from './collaboration_tools.js';
import { gamificationRoutes } from './gamification.js';
import { performanceAnalyticsRoutes } from './performance_analytics.js';
import { multilingualSupportRoutes } from './multilingual_support.js';
import { resourceIntegrationRoutes } from './resource_integration.js';
import { offlineAccessRoutes } from './offline_access.js';
import { dashboardRoutes } from './dashboard.js';
import { accessibilityRoutes } from './accessibility.js';

/**
 * Sets up all the routes for the application.
 * @param {express.Application} app - The Express application instance.
 */
export function setupRoutes(app) {
  app.use('/adaptive-learning', adaptiveLearningRoutes);
  app.use('/virtual-assistance', virtualAssistantRoutes);
  app.use('/real-time-collaboration', collaborationToolsRoutes);
  app.use('/gamification', gamificationRoutes);
  app.use('/performance-analytics', performanceAnalyticsRoutes);
  app.use('/multilingual-support', multilingualSupportRoutes);
  app.use('/resources', resourceIntegrationRoutes);
  app.use('/offline-access', offlineAccessRoutes);
  app.use('/dashboard', dashboardRoutes);
  app.use('/accessibility', accessibilityRoutes);

  // Default route for handling 404
  app.use((req, res) => {
    res.status(404).send('Page not found');
  });
}
