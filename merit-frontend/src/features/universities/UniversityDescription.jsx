import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const UniversityDescription = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    if (id) {
      fetchUniversityData(decodeURIComponent(id));
    }
  }, [id]);

  const fetchUniversityData = async (universityName) => {
    try {
      setLoading(true);
      
      // Fetch university description
      const descriptionData = await api.fetchUniversityDescription(universityName);
      setUniversity(descriptionData);
      
      // Fetch courses
      const coursesData = await api.fetchCoursesByUniversity(universityName);
      setCourses(coursesData["List of courses"] || []);
      
      // Fetch faculties and their courses
      const facultiesData = await api.fetchFacultiesAndCourses(universityName);
      setFaculties(facultiesData["Faculties and their courses"] || {});
      
    } catch (error) {
      console.error("Error fetching university data:", error);
      setError("Failed to load university information");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="p-6 bg-red-50 text-red-700 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error || "University information not found"}</p>
          <Link 
            to="/universities-list" 
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Universities List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {university.name || id}
            </h1>
            <p className="text-gray-600">
              {university.location || "Location information not available"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/universities-list"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to List
            </Link>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "about"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "courses"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab("faculties")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "faculties"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Faculties
            </button>
          </nav>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* About Tab */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About {university.name}</h2>
            <div className="space-y-6">
              {university.description ? (
                <p className="text-gray-600 leading-relaxed">{university.description}</p>
              ) : (
                <p className="text-gray-500 italic">No description available for this university.</p>
              )}
              
              {/* University Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Founded</h3>
                  <p className="text-gray-600">{university.founded || "Information not available"}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Type</h3>
                  <p className="text-gray-600">{university.type || "Information not available"}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Website</h3>
                  {university.website ? (
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {university.website}
                    </a>
                  ) : (
                    <p className="text-gray-600">Information not available</p>
                  )}
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
                  <p className="text-gray-600">{university.contact || "Information not available"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Courses Tab */}
        {activeTab === "courses" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Courses</h2>
            
            {courses.length > 0 ? (
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-800">{course}</div>
                      <div className="mt-2">
                        <Link
                          to={`/service/aggregate-calculator?course=${encodeURIComponent(course)}&university=${encodeURIComponent(university.name || id)}`}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Check eligibility
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No courses available for this university.</p>
            )}
          </motion.div>
        )}
        
        {/* Faculties Tab */}
        {activeTab === "faculties" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Faculties and Departments</h2>
            
            {Object.keys(faculties).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(faculties).map(([faculty, courses], index) => (
                  <motion.div
                    key={faculty}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-blue-50 p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-blue-800">{faculty}</h3>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Courses</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Array.isArray(courses) && courses.length > 0 ? (
                          courses.map((course, courseIndex) => (
                            <div 
                              key={courseIndex} 
                              className="text-gray-700 py-2 px-3 bg-gray-50 rounded-md"
                            >
                              {course}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">No courses listed for this faculty.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No faculty information available for this university.</p>
            )}
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg text-white text-center">
        <h2 className="text-2xl font-bold mb-3">
          Want to know your chances of admission?
        </h2>
        <p className="mb-6">
          Use our Aggregator app to calculate your scores and see if you qualify for your dream course.
        </p>
        <Link
          to={`/service/aggregate-calculator?university=${encodeURIComponent(university.name || id)}`}
          className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Try Aggregator Calculator
        </Link>
      </div>
    </div>
  );
};

export default UniversityDescription; 