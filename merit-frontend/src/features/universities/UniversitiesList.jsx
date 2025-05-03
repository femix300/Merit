import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const UniversitiesList = () => {
  const [universities, setUniversities] = useState([]);
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const courseName = searchParams.get("course_name");
    if (courseName) {
      fetchUniversities(courseName);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchUniversities = async (courseName) => {
    try {
      setLoading(true);
      setIsTyping(false);
      setError(""); // Clear any previous errors when starting a new search
      const result = await api.fetchUniversitiesByCourse(courseName);
      setUniversities(result["Universities offering the course"] || []);
      setCourse(courseName);
    } catch (error) {
      console.error("Error fetching universities:", error);
      setError("Failed to load universities");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search as user types
  useEffect(() => {
    if (!course || course.trim().length < 2 || searchParams.get("course_name")) {
      return; // Don't search when course is too short or when URL param is set
    }
    
    setIsTyping(true);
    const debounceTimeout = setTimeout(() => {
      fetchUniversities(course);
    }, 500); // 500ms delay after user stops typing
    
    return () => clearTimeout(debounceTimeout);
  }, [course]);

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setCourse(value);
    if (!value.trim()) {
      setUniversities([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 text-enhancer"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Universities
        </h1>
        {searchParams.get("course_name") && course && (
          <p className="text-lg text-gray-600">
            Showing universities offering <span className="font-semibold">{course}</span>
          </p>
        )}
      </motion.div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 content-card">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Find Universities by Course
        </h2>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (course) {
              fetchUniversities(course);
            }
          }}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            value={course}
            onChange={handleCourseChange}
            placeholder="Enter course name..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Loading State */}
      {(loading || isTyping) && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && !isTyping && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Results */}
      {!loading && !isTyping && universities.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden content-card"
        >
          <div className="p-6 bg-primary-50 border-b border-primary-100">
            <h2 className="text-xl font-semibold text-primary-800">
              Universities offering {course}
            </h2>
            <p className="text-gray-600 mt-1">
              Found {universities.length} {universities.length === 1 ? "university" : "universities"}
            </p>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {universities.map((university, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 hover:bg-gray-50"
              >
                <Link 
                  to={`/universities/${encodeURIComponent(university)}`}
                  className="block"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{university}</span>
                    <span className="text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* No Results */}
      {!loading && !isTyping && universities.length === 0 && course && !searchParams.get("course_name") && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md content-card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No universities found</h3>
          <p className="text-gray-500">
            No universities were found offering {course}. Try searching for another course.
          </p>
        </div>
      )}

      {/* Aggregator Promotion */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg text-white text-center">
        <h2 className="text-2xl font-bold mb-3">
          Want to know your chances of admission?
        </h2>
        <p className="mb-6">
          Use our Aggregator app to calculate your scores and see if you qualify for your dream course.
        </p>
        <Link
          to="/service/aggregate-calculator"
          className="inline-block px-6 py-3 bg-accent-500 text-primary-900 font-semibold rounded-lg shadow-sm hover:bg-accent-400 transition-colors"
        >
          Calculate My Aggregate Now
        </Link>
      </div>
    </div>
  );
};

export default UniversitiesList; 