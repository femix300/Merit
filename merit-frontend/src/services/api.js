import axios from 'axios'

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

// UNIVERSITIES API

/**
 * Fetch universities by course
 * @param {string} courseName - The name of the course to search for
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
 * Fetch university description
 * @param {string} universityName - University name
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
 * @param {string} universityName - University name
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
 * Fetch faculties and their courses
 * @param {string} universityName - University name
 */
export const fetchFacultiesAndCourses = async (universityName) => {
  try {
    const response = await apiClient.get('/universities/faculties/courses', {
      params: { university_name: universityName }
    });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching faculties and courses:');
  }
};

/**
 * Fetch faculty for a specific course
 * @param {string} courseName - Course name
 * @param {string} universityName - University name
 */
export const fetchCourseFaculty = async (courseName, universityName) => {
  try {
    const response = await apiClient.get('/course/faculty', {
      params: { 
        course_name: courseName,
        university_name: universityName
      }
    });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching course faculty:');
  }
};

/**
 * Fetch course recommendations based on scores and grades
 * @param {Object} params - Evaluation parameters
 */
export const fetchCourseRecommendations = async (params) => {
  try {
    const queryParams = {
      course_name: params.courseName,
      utme_score: params.utmeScore,
      university_name: params.universityName
    };

    // Add optional parameters if they exist
    if (params.postUtmeScore) queryParams.post_utme_score = params.postUtmeScore;
    if (params.grades) queryParams.grades = params.grades;
    if (params.noOfSitting) queryParams.no_of_sitting = params.noOfSitting;

    const response = await apiClient.get('/evaluations/recommendations', { params: queryParams });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching course recommendations:');
  }
};

/**
 * Fetch post-UTME requirements
 * @param {Object} params - Post UTME parameters
 */
export const fetchPostUtmeRequirements = async (params) => {
  try {
    const queryParams = {
      course_name: params.courseName, 
      utme_score: params.utmeScore, 
      university_name: params.universityName
    };
    
    // Add optional parameters if they exist
    if (params.grades) queryParams.grades = params.grades;
    if (params.noOfSitting) queryParams.no_of_sitting = params.noOfSitting;

    const response = await apiClient.get('/post-utme/requirements', { params: queryParams });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching post-UTME requirements:');
  }
};

/**
 * Fetch course aggregate information
 * @param {string} courseName - Course name
 * @param {string} universityName - University name
 */
export const fetchCourseAggregate = async (courseName, universityName) => {
  try {
    const response = await apiClient.get('/aggregates/requirements', {
      params: { 
        course_name: courseName, 
        university_name: universityName 
      }
    });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching course aggregate:');
  }
};

/**
 * Fetch university aggregate requirements
 * @param {string} universityName - University name
 */
export const fetchUniversityAggregateRequirements = async (universityName) => {
  try {
    const response = await apiClient.get('/universities/aggregate-requirements', {
      params: { university_name: universityName }
    });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching university aggregate requirements:');
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

/**
 * Send message to AI chat
 * @param {string} message - User message
 */
export const sendChatMessage = async (message) => {
  try {
    const response = await apiClient.post('/chat', { message });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error sending chat message:');
  }
};

export default {
  fetchUniversitiesByCourse,
  fetchUniversitiesList,
  fetchUniversityDescription,
  fetchCoursesByUniversity,
  fetchFacultiesAndCourses,
  fetchCourseFaculty,
  fetchCourseRecommendations,
  fetchPostUtmeRequirements,
  fetchCourseAggregate,
  fetchUniversityAggregateRequirements,
  fetchAllUniversitiesAndCourses,
  sendChatMessage
};

