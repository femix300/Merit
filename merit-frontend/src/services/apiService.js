import axios from 'axios';

// In development, use the Vite proxy configured in vite.config.js
// In production, use the actual API URL
const isDevelopment = import.meta.env.MODE === 'development';
const API_KEY = import.meta.env.VITE_API_KEY || '70fdc8133c334bf0912769a6407965cb';

// Using local proxy in development and direct URL in production
const baseURL = isDevelopment 
  ? '/api' // This will be proxied to the real server by Vite
  : (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000');

console.log(`API using ${isDevelopment ? 'development proxy' : 'production'} mode with baseURL: ${baseURL}`);

// Create axios instance
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
  withCredentials: false
});

// Simple error handler
const handleError = (error, customMessage) => {
  console.error(customMessage || 'API Error:', error);
  return Promise.reject(error);
};

// API Functions

/**
 * Fetch list of all supported universities
 */
export const fetchUniversitiesList = async () => {
  try {
    const response = await apiClient.get('/universities/list');
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching universities list:');
  }
};

/**
 * Fetch universities by course
 */
export const fetchUniversitiesByCourse = async (courseName) => {
  try {
    const response = await apiClient.get('/universities/courses', {
      params: { course_name: courseName }
    });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching universities by course:');
  }
};

/**
 * Fetch university description
 */
export const fetchUniversityDescription = async (universityName) => {
  try {
    const response = await apiClient.get('/universities/description', { 
      params: { university_name: universityName }
    });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching university description:');
  }
};

/**
 * Fetch list of courses by university
 */
export const fetchCoursesByUniversity = async (universityName) => {
  try {
    const response = await apiClient.get('/universities/list/courses', {
      params: { university_name: universityName }
    });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching courses by university:');
  }
};

/**
 * Fetch all universities and courses
 */
export const fetchAllUniversitiesAndCourses = async () => {
  try {
    const response = await apiClient.get('/all/universities/courses');
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching all universities and courses:');
  }
};

// Export all services
export default {
  fetchUniversitiesList,
  fetchUniversitiesByCourse,
  fetchUniversityDescription,
  fetchCoursesByUniversity,
  fetchAllUniversitiesAndCourses
}; 