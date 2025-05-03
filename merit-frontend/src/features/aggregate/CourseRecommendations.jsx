import { useState, useEffect, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const CourseRecommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const [formData, setFormData] = useState({
    courseName: searchParams.get("course_name") || "",
    utmeScore: searchParams.get("utme_score") || "",
    universityName: searchParams.get("university_name") || "",
    grades: searchParams.get("grades")?.split(",") || []
  });
  
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(!searchParams.get("course_name"));
  const [courseSuggestions, setCourseSuggestions] = useState([]);
  
  // Common course suggestions
  const commonCourses = [
    "Pharmacy", "Medicine", "Computer Science", "Electrical Engineering", 
    "Mechanical Engineering", "Accounting", "Law", "Economics", "Mathematics",
    "Physics", "Chemistry", "Biology"
  ];

  // Memoized fetch function to avoid unnecessary recreations
  const fetchRecommendations = useCallback(async () => {
    if (!formData.courseName || !formData.utmeScore) {
      setError("Please provide course name and UTME score");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors
    setCourseSuggestions([]); // Clear any previous suggestions
    
    try {
      const data = await api.fetchCourseRecommendations({
        courseName: formData.courseName,
        utmeScore: formData.utmeScore,
        postUtmeScore: formData.postUtmeScore,
        grades: formData.grades,
        universityName: formData.universityName
      });
      
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      
      setError(error.message || "Failed to load course recommendations");
      
      // Check if error is related to course not found
      if (error.message?.includes("not found") || error.originalError?.response?.status === 404) {
        // Generate course suggestions based on input
        const input = formData.courseName.toLowerCase();
        const suggestions = commonCourses.filter(course => 
          course.toLowerCase() !== input && 
          (course.toLowerCase().includes(input) || 
           input.includes(course.toLowerCase()) ||
           // Levenshtein distance would be better but using includes for simplicity
           course.toLowerCase().substring(0, 3) === input.substring(0, 3))
        );
        
        setCourseSuggestions(suggestions.length > 0 ? suggestions : commonCourses.slice(0, 5));
      }
    } finally {
      setLoading(false);
    }
  }, [formData, commonCourses]);

  // Initial data fetch on component mount if query params exist
  useEffect(() => {
    if (formData.courseName && formData.utmeScore) {
      fetchRecommendations();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      courseName: suggestion
    }));
    
    // Update URL and fetch with new course name
    const params = new URLSearchParams(location.search);
    params.set("course_name", suggestion);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    
    // Wait for state update before fetching
    setTimeout(() => {
      fetchRecommendations();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update URL with current form data for shareability
    const params = new URLSearchParams();
    if (formData.courseName) params.set("course_name", formData.courseName);
    if (formData.utmeScore) params.set("utme_score", formData.utmeScore);
    if (formData.universityName) params.set("university_name", formData.universityName);
    if (formData.grades && formData.grades.length > 0) params.set("grades", formData.grades.join(","));
    
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    
    fetchRecommendations();
    setShowForm(false); // Hide form after submission
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-display mb-4">
            Course Recommendations
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Find out what Post-UTME score you need and get course recommendations based on your academic credentials.
          </p>
        </div>

        {/* Form Toggle */}
        {!showForm && (
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-300 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Details
            </button>
          </div>
        )}

        {/* Input Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-card p-6 mb-8 border border-neutral-200 dark:border-neutral-700/50"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="courseName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Course Name*
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    placeholder="e.g. Computer Science"
                    className="w-full p-3 bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="universityName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    University Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="universityName"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleInputChange}
                    placeholder="e.g. University of Lagos"
                    className="w-full p-3 bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="utmeScore" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    UTME Score*
                  </label>
                  <input
                    type="number"
                    id="utmeScore"
                    name="utmeScore"
                    value={formData.utmeScore}
                    onChange={handleInputChange}
                    placeholder="e.g. 280"
                    min="1"
                    max="400"
                    className="w-full p-3 bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="postUtmeScore" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Post-UTME Score (Optional)
                  </label>
                  <input
                    type="number"
                    id="postUtmeScore"
                    name="postUtmeScore"
                    value={formData.postUtmeScore}
                    onChange={handleInputChange}
                    placeholder="e.g. 70"
                    min="0"
                    max="100"
                    className="w-full p-3 bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>Get Recommendations</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Error Message with Suggestions */}
        {error && (
          <div className="mb-8 p-4 bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-400 rounded-xl border border-error-100 dark:border-error-800/50">
            <p className="mb-2">{error}</p>
            
            {courseSuggestions.length > 0 && (
              <div className="mt-4">
                <p className="font-medium mb-2">Did you mean one of these courses?</p>
                <div className="flex flex-wrap gap-2">
                  {courseSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800/30 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && !showForm && (
          <div className="flex justify-center items-center py-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg">
              <svg className="animate-spin h-5 w-5 mr-3 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing your request...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {recommendations && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Required Post-UTME Score */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-card border border-neutral-200 dark:border-neutral-700/50">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                <h2 className="text-2xl font-bold font-display">Required Post-UTME Score</h2>
                <p className="mt-1 text-primary-100 dark:text-primary-200">
                  For {recommendations.course} at {recommendations.university_name || "selected university"}
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800/30 text-center">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Required Post-UTME Score</h3>
                    <div className="text-primary-600 dark:text-primary-400 font-bold text-4xl">
                      {recommendations["required score"] || "Not Available"}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2">Minimum score needed</p>
                  </div>
                  
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-700/30 rounded-xl border border-neutral-200 dark:border-neutral-600/30 text-center">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Your UTME Score</h3>
                    <div className="text-neutral-700 dark:text-neutral-300 font-bold text-4xl">
                      {formData.utmeScore}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2">Out of 400</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Important Notes</h3>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Post-UTME cutoff mark: {recommendations["postutme_passmark"] || "Varies by university"}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Maximum Post-UTME score: {recommendations["post utme mark"] || 100}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-warning-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>Achieving the minimum score does not guarantee admission as it depends on competition.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Course Recommendations */}
            {recommendations["other courses qualified for"] && Object.keys(recommendations["other courses qualified for"]).length > 0 && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-card border border-neutral-200 dark:border-neutral-700/50">
                <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 p-6 text-white">
                  <h2 className="text-2xl font-bold font-display">Other Recommended Courses</h2>
                  <p className="mt-1 text-secondary-100 dark:text-secondary-200">
                    Courses you might qualify for based on your credentials
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            Required Aggregate
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        {Object.entries(recommendations["other courses qualified for"]).map(([course, aggregate], index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white dark:bg-neutral-800" : "bg-neutral-50 dark:bg-neutral-700/30"}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-200">
                              {course}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                              {aggregate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              <Link
                                to={`/service/course-faculty?course_name=${encodeURIComponent(course)}`}
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                              >
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Calculate Full Aggregate */}
            <div className="p-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-card text-white text-center">
              <h2 className="text-2xl font-bold mb-3 font-display">
                Want a More Detailed Assessment?
              </h2>
              <p className="mb-6 text-primary-100 max-w-2xl mx-auto">
                Use our Aggregate Calculator for a comprehensive eligibility check for your chosen course.
              </p>
              <Link
                to={`/service/aggregate-calculator?course=${encodeURIComponent(recommendations.course)}&university=${encodeURIComponent(recommendations.university_name || "")}&utme_score=${formData.utmeScore}`}
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-neutral-100 transition-colors gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculate Full Aggregate
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CourseRecommendations; 