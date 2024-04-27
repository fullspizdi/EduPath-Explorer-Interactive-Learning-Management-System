/**
 * utilities.js
 * Utility functions for EduPath Explorer
 */

/**
 * Logs messages to the console with a timestamp.
 * @param {string} message - The message to log.
 */
function logWithTimestamp(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} text - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalizeWords(text) {
    return text.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Checks if the provided feature is enabled in the configuration.
 * @param {string} featureName - The name of the feature to check.
 * @returns {boolean} - True if the feature is enabled, false otherwise.
 */
function isFeatureEnabled(featureName) {
    const features = require('./config.json').features;
    return features[featureName] || false;
}

/**
 * Retrieves the API key for a specified AI service.
 * @param {string} serviceName - The name of the AI service.
 * @returns {string} - The API key for the service.
 */
function getApiKey(serviceName) {
    const aiServices = require('./config.json').aiServices;
    return aiServices[serviceName].apiKey;
}

/**
 * Converts text to a language specified, using the default language if not specified.
 * @param {string} text - The text to translate.
 * @param {string} targetLanguage - The target language code.
 * @returns {string} - The translated text.
 */
async function translateText(text, targetLanguage) {
    const defaultLanguage = require('./config.json').application.defaultLanguage;
    targetLanguage = targetLanguage || defaultLanguage;

    // Placeholder for translation logic
    // This should ideally call an external translation service API
    logWithTimestamp(`Translating text to ${targetLanguage}`);
    return `Translated(${targetLanguage}): ${text}`;
}

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - The generated random integer.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    logWithTimestamp,
    capitalizeWords,
    isFeatureEnabled,
    getApiKey,
    translateText,
    getRandomInt
};
. l,\
