// Import necessary modules and configurations
import axios from 'axios';
import { educationalResources } from './config.json';

/**
 * Integrates various educational resources into the EduPath Explorer platform.
 */
export const integrateEducationalResources = async () => {
  try {
    console.log('Integrating educational resources...');
    const resources = await Promise.all([
      fetchResourceData(educationalResources.libraries),
      fetchResourceData(educationalResources.databases),
      fetchResourceData(educationalResources.openEducationalResources)
    ]);
    console.log('Educational resources integrated successfully.');
    return resources;
  } catch (error) {
    console.error('Failed to integrate educational resources:', error);
  }
};

/**
 * Fetches data from specified educational resource URLs.
 * @param {Array} resourceUrls - Array of URLs to fetch educational resources from.
 */
const fetchResourceData = async (resourceUrls) => {
  const resources = [];
  for (const url of resourceUrls) {
    const response = await axios.get(url);
    if (response.status === 200) {
      resources.push(response.data);
    } else {
      throw new Error(`Failed to fetch data from ${url}`);
    }
  }
  return resources;
};

