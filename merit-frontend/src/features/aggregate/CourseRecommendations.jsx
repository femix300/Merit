import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const CourseRecommendations = () => {
  const location = useLocation();
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

  useEffect(() => {
    if (formData.courseName && formData.utmeScore) {
      fetchRecommendations();
    }
  }, []);

  const fetchRecommendations = async () => {
    if (!formData.courseName || !formData.utmeScore) {
      setError("Please provide course name and UTME score");
      return;
    }

    setLoading(true);
    try {
      const data = await api.fetchCourseRecommendations({
        courseName: formData.courseName,
        utmeScore: formData.utmeScore,
        postUtmeScore: formData.postUtmeScore,
        grades: formData.grades,
        universityName: formData.universityName
      });
      
      setRecommendations(data);
      setError("");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to load course recommendations");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecommendations();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Post-UTME Recommendations
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find out what Post-UTME score you need and get course recommendations based on your academic credentials.
          </p>
        </div>

        {/* Form Toggle */}
        {!showForm && (
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Change Details
            </button>
          </div>
        )}

        {/* Input Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="courseName" className="block text-gray-700 font-medium mb-2">
                    Course Name*
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    placeholder="e.g. Computer Science"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="universityName" className="block text-gray-700 font-medium mb-2">
                    University Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="universityName"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleInputChange}
                    placeholder="e.g. University of Lagos"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="utmeScore" className="block text-gray-700 font-medium mb-2">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="postUtmeScore" className="block text-gray-700 font-medium mb-2">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Get Recommendations"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Results */}
        {recommendations && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Required Post-UTME Score */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-blue-600 p-6 text-white">
                <h2 className="text-2xl font-bold">Required Post-UTME Score</h2>
                <p className="mt-1 text-blue-100">
                  For {recommendations.course} at {recommendations.university_name || "selected university"}
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-100 text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">Required Post-UTME Score</h3>
                    <div className="text-blue-600 font-bold text-4xl">
                      {recommendations["required score"] || "Not Available"}
                    </div>
                    <p className="text-gray-600 mt-2">Minimum score needed</p>
                  </div>
                  
                  <div className="p-5 bg-gray-50 rounded-lg text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">Your UTME Score</h3>
                    <div className="text-gray-700 font-bold text-4xl">
                      {formData.utmeScore}
                    </div>
                    <p className="text-gray-600 mt-2">Out of 400</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Important Notes</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Post-UTME cutoff mark: {recommendations["postutme_passmark"] || "Varies by university"}</li>
                    <li>Maximum Post-UTME score: {recommendations["post utme mark"] || 100}</li>
                    <li>Achieving the minimum score does not guarantee admission as it depends on competition.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Course Recommendations */}
            {recommendations["other courses qualified for"] && Object.keys(recommendations["other courses qualified for"]).length > 0 && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-indigo-600 p-6 text-white">
                  <h2 className="text-2xl font-bold">Other Recommended Courses</h2>
                  <p className="mt-1 text-indigo-100">
                    Courses you might qualify for based on your credentials
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Required Aggregate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(recommendations["other courses qualified for"]).map(([course, aggregate], index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {course}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {aggregate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Link
                                to={`/service/course-faculty?course_name=${encodeURIComponent(course)}`}
                                className="text-blue-600 hover:text-blue-900"
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
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg text-white text-center">
              <h2 className="text-2xl font-bold mb-3">
                Want a More Detailed Assessment?
              </h2>
              <p className="mb-6">
                Use our Aggregate Calculator for a comprehensive eligibility check for your chosen course.
              </p>
              <Link
                to={`/service/aggregate-calculator?course=${encodeURIComponent(recommendations.course)}&university=${encodeURIComponent(recommendations.university_name || "")}&utme_score=${formData.utmeScore}`}
                className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
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