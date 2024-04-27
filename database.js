// Import necessary modules
import mongoose from 'mongoose';
import { database } from './config.json';

// Function to connect to the MongoDB database
export const connectDatabase = () => {
  mongoose.connect(database.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
};

// Define schemas and models for the database
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // e.g., 'student', 'teacher', 'admin'
  learningPreferences: {
    preferredLanguages: [String],
    learningStyle: String // e.g., 'visual', 'auditory', 'kinesthetic'
  }
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  createdBy: mongoose.Schema.Types.ObjectId,
  learningPaths: [{
    title: String,
    objectives: [String],
    content: [String]
  }]
});

const performanceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  courseId: mongoose.Schema.Types.ObjectId,
  scores: Map,
  progress: Number
});

// Models
export const User = mongoose.model('User', userSchema);
export const Course = mongoose.model('Course', courseSchema);
export const Performance = mongoose.model('Performance', performanceSchema);

