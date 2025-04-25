import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const Unipage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const universityName = searchParams.get("university_name");
  
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (universityName) {
      fetchUniversityDetails(universityName);
    } else {
      setLoading(false);
      setError("University name is required");
    }
  }, [universityName]);

  const fetchUniversityDetails = async (name) => {
    try {
      setLoading(true);
      const data = await api.fetchUniversityDescription(name);
      setUniversity(data);
    } catch (error) {
      console.error("Error fetching university details:", error);
      setError("Failed to load university details");
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
          <p>{error || "University details not found"}</p>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {university.name}
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* University Header with Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative flex items-end">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">{university.name}</h2>
              <p>{university.type || "Nigerian University"}</p>
            </div>
          </div>

          {/* University Details */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About University</h3>
            
            {university.description ? (
              <p className="text-gray-600 mb-6 leading-relaxed">{university.description}</p>
            ) : (
              <p className="text-gray-500 italic mb-6">No description available for this university.</p>
            )}

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

          {/* Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Link
                to={`/universities/${encodeURIComponent(university.name)}`}
                className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center"
              >
                View Detailed Information
              </Link>
              
              <Link
                to={`/service/aggregate-calculator?university=${encodeURIComponent(university.name)}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Check Course Eligibility
              </Link>
            </div>
          </div>
        </div>

        {/* Related Information */}
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
      </motion.div>
    </div>
  );
};

export default Unipage; 