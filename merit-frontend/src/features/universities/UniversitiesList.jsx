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
      const result = await api.fetchUniversitiesByCourse(courseName);
      setUniversities(result["Universities offering the course"] || []);
      setCourse(result.course);
    } catch (error) {
      console.error("Error fetching universities:", error);
      setError("Failed to load universities");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Universities
        </h1>
        {course && (
          <p className="text-lg text-gray-600">
            Showing universities offering <span className="font-semibold">{course}</span>
          </p>
        )}
      </motion.div>

      {/* Search Form */}
      {!searchParams.get("course_name") && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
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
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter course name..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Results */}
      {!loading && universities.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800">
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
                    <span className="text-blue-600">
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
      {!loading && universities.length === 0 && course && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
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
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg text-white text-center">
        <h2 className="text-2xl font-bold mb-3">
          Want to know your chances of admission?
        </h2>
        <p className="mb-6">
          Use our Aggregator app to calculate your scores and see if you qualify for your dream course.
        </p>
        <Link
          to="/service/aggregate-calculator"
          className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Try Aggregator Calculator
        </Link>
      </div>
    </div>
  );
};

export default UniversitiesList; 