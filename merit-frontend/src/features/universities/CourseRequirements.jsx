import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const CourseRequirements = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseName = searchParams.get("course_name");
  
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (courseName) {
      fetchCourseRequirements(courseName);
    } else {
      setLoading(false);
      setError("Course name is required");
    }
  }, [courseName]);

  const fetchCourseRequirements = async (name) => {
    try {
      setLoading(true);
      // Fetch course faculty data - this might need to be updated based on your actual API
      const data = await api.fetchCourseAggregate(name);
      setCourseData(data);
    } catch (error) {
      console.error("Error fetching course requirements:", error);
      setError("Failed to load course requirements");
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

  if (error || !courseData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="p-6 bg-red-50 text-red-700 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error || "Course requirements not found"}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link 
              to="/universities-list" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Universities
            </Link>
            <Link 
              to="/service/aggregate-calculator" 
              className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Calculate Aggregate
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {courseData.course || courseName}
            </h1>
            <p className="text-gray-600">
              Faculty and Requirements
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
              Back to Universities
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Course Header */}
          <div className="bg-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold">{courseData.course || courseName}</h2>
            <p className="mt-1 text-blue-100">
              {courseData.university_name || "University Information"}
            </p>
          </div>

          {/* Course Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Faculty</h3>
                <p className="text-gray-700">{courseData.faculty || "Information not available"}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Required Aggregate</h3>
                <p className="text-gray-700 font-bold text-lg">{courseData["course aggregate"] || "Information not available"}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Duration</h3>
                <p className="text-gray-700">{courseData.duration || "4-5 years (typically)"}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Degree Awarded</h3>
                <p className="text-gray-700">{courseData.degree || "Bachelor's Degree"}</p>
              </div>
            </div>

            {/* Required Subjects */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Required O'level Subjects</h3>
              
              {courseData.required_subjects ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {courseData.required_subjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                  <p>The specific O'level subject requirements for this course may include Mathematics, English, and at least three other relevant subjects. Please check the university's official website for detailed requirements.</p>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h3>
              
              <div className="p-4 bg-blue-50 text-blue-800 rounded-lg">
                <p>Please note that admission requirements may vary by university and academic year. It's recommended to confirm the specific requirements with the university's admission office.</p>
              </div>
            </div>
          </div>

          {/* Career Prospects */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Career Prospects</h3>
            
            <p className="text-gray-600 mb-4">
              Graduates of {courseData.course || courseName} can pursue careers in various sectors including:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["Research", "Industry", "Academia", "Consulting", "Government", "Entrepreneurship"].map((career, index) => (
                <div 
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg text-gray-700 text-center"
                >
                  {career}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            Want to know your chances of admission?
          </h2>
          <p className="mb-6">
            Use our Aggregator app to calculate your scores and see if you qualify for this course.
          </p>
          <Link
            to={`/service/aggregate-calculator?course=${encodeURIComponent(courseData.course || courseName)}`}
            className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Calculate Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseRequirements; 