// Import necessary modules and configurations
import express from 'express';
import { serverConfig } from './config.json';
import { setupRoutes } from './app.js';
import { connectDatabase } from './database.js';
import { initializeAI } from './ai_integration.js';

// Create an instance of Express
const app = express();

// Initialize database connection
connectDatabase();

// Initialize AI integrations
initializeAI();

// Setup server routes
setupRoutes(app);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(serverConfig.port, () => {
  console.log(`EduPath Explorer server running on port ${serverConfig.port}`);
});
