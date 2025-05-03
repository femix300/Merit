/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UniversitiesList = () => {
  const BASE_URL = "https://merit-uc58.onrender.com";
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch universities based on search query
  const fetchUniversities = async (query = "") => {
    setLoading(true);
    try {
      // If there's a search query, use search endpoint, otherwise fetch all universities
      const endpoint = query 
        ? `${BASE_URL}/universities/search?query=${encodeURIComponent(query)}` 
        : `${BASE_URL}/universities/list`;
        
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error("Failed to fetch universities");
      }
      
      const result = await response.json();
      
      // Handle different response structures based on endpoint
      const universitiesList = query 
        ? result["search_results"] || [] 
        : result["Supported Universities"] || [];
        
      setUniversities(universitiesList);
    } catch (error) {
      console.error("Error fetching universities:", error);
      setError("Failed to load universities");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchUniversities();
  }, []);

  // Debounce function to limit API calls while typing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        fetchUniversities(searchQuery);
      } else if (searchQuery.length === 0) {
        fetchUniversities();
      }
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white font-display mb-4">
          Explore Universities
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Discover comprehensive information about universities across Nigeria to help you make informed decisions about your education.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by university name..."
            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl py-3 px-4 pl-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:text-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center p-5 bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-400 rounded-xl mb-6">
          <p>{error}</p>
          <button 
            onClick={() => fetchUniversities()} 
            className="mt-3 px-4 py-2 bg-white dark:bg-neutral-800 text-sm rounded-lg border border-error-200 dark:border-error-800 text-error-700 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/30"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results List */}
      {universities.length > 0 ? (
        <motion.ul 
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-card divide-y divide-neutral-100 dark:divide-neutral-700"
        >
          {universities.map((university, index) => (
            <motion.li
              key={index}
              variants={item}
              className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition duration-200"
            >
              <Link
                className="p-4 flex items-center justify-between w-full"
                to={`/uni-details?university_name=${encodeURIComponent(university)}`}
              >
                <span className="text-neutral-800 dark:text-neutral-200">{university}</span>
                <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 px-4"
          >
            <svg className="h-16 w-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-neutral-500 dark:text-neutral-400">No universities found matching your search.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        )
      )}
    </div>
  );
};

export default UniversitiesList;
