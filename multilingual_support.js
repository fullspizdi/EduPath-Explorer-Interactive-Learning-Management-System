// Import necessary configurations
import { application } from './config.json';

/**
 * Provides multilingual support by translating text into the user's preferred language.
 * @param {string} text - The text to be translated.
 * @param {string} targetLanguage - The target language code.
 * @returns {Promise<string>} - The translated text.
 */
export const translateText = async (text, targetLanguage) => {
  if (!application.supportedLanguages.includes(targetLanguage)) {
    console.error(`Translation error: Unsupported language ${targetLanguage}`);
    return text; // Return the original text if the language is not supported
  }

  try {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${application.aiServices.googleAI.apiKey}`
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage
      })
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    return text; // Return the original text if the translation fails
  }
};

/**
 * Sets the default language for the application interface based on user preference or default settings.
 * @param {string} preferredLanguage - The preferred language code.
 */
export const setDefaultLanguage = (preferredLanguage) => {
  const defaultLang = application.defaultLanguage;
  const supportedLangs = application.supportedLanguages;

  if (supportedLangs.includes(preferredLanguage)) {
    document.documentElement.lang = preferredLanguage;
  } else {
    document.documentElement.lang = defaultLang;
    console.log(`Defaulting to application's default language: ${defaultLang}`);
  }
};

/**
 * Initializes multilingual support by setting the default language and preparing translation services.
 */
export const initializeMultilingualSupport = () => {
  console.log('Initializing multilingual support...');
  setDefaultLanguage(application.defaultLanguage);
  console.log('Multilingual support initialized with default language:', application.defaultLanguage);
};

