import axios from 'axios';

// Always use the production API URL
const API_KEY = import.meta.env.VITE_API_KEY || '70fdc8133c334bf0912769a6407965cb';

// Always use the direct production URL
const baseURL = 'https://merit-uc58.onrender.com';

console.log(`API using baseURL: ${baseURL}`);

// Simple in-memory cache for GET requests
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Create axios instance with default config
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
  withCredentials: false,
  timeout: 15000 // 15 seconds timeout
});

// Add a request interceptor
apiClient.interceptors.request.use(
  config => {
    // Check cache for GET requests
    if (config.method.toLowerCase() === 'get' && !config.skipCache) {
      const cacheKey = getCacheKey(config);
      const cachedData = cache.get(cacheKey);
      
      if (cachedData && Date.now() < cachedData.expiry) {
        // Return cached data by converting config to a cancellable request
        console.log(`Using cached data for: ${config.url}`);
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;
        setTimeout(() => {
          source.cancel('Using cached data');
        }, 0);
        
        // Store the cached response to be returned
        config.cachedResponse = cachedData.data;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
  response => {
    // Cache successful GET responses
    if (response.config.method.toLowerCase() === 'get' && !response.config.skipCache) {
      const cacheKey = getCacheKey(response.config);
      cache.set(cacheKey, {
        data: response.data,
        expiry: Date.now() + CACHE_DURATION
      });
    }
    return response;
  },
  error => {
    // If we cancelled the request for cache reasons, return the cached data
    if (axios.isCancel(error) && error.message === 'Using cached data') {
      return Promise.resolve({ data: error.config.cachedResponse });
    }
    
    // Enhanced error handling
    let errorMessage = 'An error occurred during the request';
    
    if (error.response) {
      // Server responded with an error status
      errorMessage = `Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response received from server';
    } else {
      // Something else caused the error
      errorMessage = error.message;
    }
    
    console.error(errorMessage, error);
    return Promise.reject({ message: errorMessage, originalError: error });
  }
);

// Generate a cache key from request config
const getCacheKey = (config) => {
  const { url, params, data } = config;
  return `${url}:${JSON.stringify(params || {})}:${JSON.stringify(data || {})}`;
};

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
  fetchAllUniversitiesAndCourses,
  // Utility function to clear cache if needed
  clearCache: () => cache.clear()
}; 