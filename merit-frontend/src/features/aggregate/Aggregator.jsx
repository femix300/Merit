import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

function Aggregator() {
  const [universities, setUniversities] = useState([]);
  const [university, setUniversity] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [utmeScore, setUtmeScore] = useState("");
  const [utmeError, setUtmeError] = useState("");
  const [postUtmeScore, setPostUtmeScore] = useState("");
  const [postUtmeError, setPostUtmeError] = useState("");
  const [maxPostUtmeScore, setMaxPostUtmeScore] = useState(100);
  const [formData, setFormData] = useState({
    olevelResults: {
      mathematics: "",
      english: "",
      subject1: "",
      subject2: "",
      subject3: "",
    }
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const grades = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "F9"];

  // Fetch universities when component mounts
  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const result = await api.fetchUniversitiesList();
        const universitiesList = result["Supported Universities"] || [];
        setUniversities(universitiesList);
      } catch (error) {
        console.error("Error fetching universities:", error);
        setError("Failed to load universities");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Fetch Post UTME max score when university changes
  useEffect(() => {
    if (university) {
      fetchPostUtmeRequirements(university);
    }
  }, [university]);

  // Fetch Post UTME requirements
  const fetchPostUtmeRequirements = async (selectedUniversity) => {
    try {
      const result = await api.fetchPostUtmeRequirements({
        universityName: selectedUniversity,
        courseName: selectedCourse,
        utmeScore: utmeScore
      });
      setMaxPostUtmeScore(result["post utme mark"]);
    } catch (error) {
      console.error("Error fetching Post UTME requirements:", error);
    }
  };

  // Fetch courses for selected university
  const fetchCourses = async (selectedUniversity) => {
    if (!selectedUniversity) {
      setCourses([]);
      return;
    }

    setLoading(true);
    setCourses([]);
    try {
      const result = await api.fetchCoursesByUniversity(selectedUniversity);
      setCourses(result["List of courses"] || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // Handle university selection change
  const handleUniversityChange = (event) => {
    const selectedUniversity = event.target.value;
    setUniversity(selectedUniversity);
    fetchCourses(selectedUniversity);
  };

  // Handle course selection change
  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  // Handle UTME score change
  const handleUtmeScoreChange = (event) => {
    const value = event.target.value;

    if (value === "") {
      setUtmeScore("");
      setUtmeError("");
      return;
    }

    const numberValue = Number(value);
    if (numberValue >= 0 && numberValue <= 400) {
      setUtmeScore(numberValue.toString());
      setUtmeError("");
    } else {
      setUtmeError("Score must be between 0 and 400");
    }
  };

  // Handle Post UTME score change
  const handlePostUtmeScoreChange = (event) => {
    const value = event.target.value;

    if (value === "") {
      setPostUtmeScore("");
      setPostUtmeError("");
      return;
    }

    const numberValue = Number(value);
    if (numberValue >= 0 && numberValue <= maxPostUtmeScore) {
      setPostUtmeScore(numberValue);
      setPostUtmeError("");
    } else {
      setPostUtmeError(`Score must be between 0 and ${maxPostUtmeScore}`);
    }
  };

  // Handle O'level grade change
  const handleGradeChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      olevelResults: {
        ...prevData.olevelResults,
        [name]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      // Validate inputs
      if (!university) {
        setError("Please select a university");
        setLoading(false);
        return;
      }

      if (!selectedCourse && courses.length > 0) {
        setError("Please select a course");
        setLoading(false);
        return;
      }

      if (!utmeScore) {
        setError("Please enter your UTME score");
        setLoading(false);
        return;
      }

      // Prepare the grades array
      const gradesArray = [
        formData.olevelResults.mathematics,
        formData.olevelResults.english,
        formData.olevelResults.subject1,
        formData.olevelResults.subject2,
        formData.olevelResults.subject3,
      ];

      // Use the API service for recommendations
      const result = await api.fetchCourseRecommendations({
        courseName: selectedCourse || courses[0],
        utmeScore: utmeScore,
        postUtmeScore: postUtmeScore,
        grades: gradesArray,
        universityName: university
      });

      setData(result);
    } catch (error) {
      console.error("Error calculating aggregate:", error);
      setError("Something went wrong, please try again.");
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
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Calculate Your Aggregate Score
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Easily calculate your university admission aggregate score using your
          JAMB, WAEC, and Post-UTME results. Enter your details below to get started.
        </p>
      </motion.div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* University Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select University
            </label>
            <select
              value={university}
              onChange={handleUniversityChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select University</option>
              {universities.length > 0 ? (
                universities.map((uni, index) => (
                  <option key={index} value={uni}>
                    {uni}
                  </option>
                ))
              ) : (
                <option disabled>Loading universities...</option>
              )}
            </select>
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!university}
            >
              <option value="">Select Course</option>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))
              ) : (
                <option disabled>
                  {university ? "Loading courses..." : "Select a university first"}
                </option>
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* UTME Score */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              UTME Score (0-400)
            </label>
            <input
              type="number"
              min="0"
              max="400"
              value={utmeScore}
              onChange={handleUtmeScoreChange}
              className={`w-full p-3 border ${
                utmeError ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your UTME score"
            />
            {utmeError && (
              <p className="text-red-500 text-sm mt-1">{utmeError}</p>
            )}
          </div>

          {/* Post UTME Score */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Post UTME Score (0-{maxPostUtmeScore})
            </label>
            <input
              type="number"
              min="0"
              max={maxPostUtmeScore}
              value={postUtmeScore}
              onChange={handlePostUtmeScoreChange}
              className={`w-full p-3 border ${
                postUtmeError ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your Post UTME score"
            />
            {postUtmeError && (
              <p className="text-red-500 text-sm mt-1">{postUtmeError}</p>
            )}
          </div>
        </div>

        {/* O'level Results */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            O'level Results
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Mathematics */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mathematics
              </label>
              <select
                name="mathematics"
                value={formData.olevelResults.mathematics}
                onChange={handleGradeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* English */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                English
              </label>
              <select
                name="english"
                value={formData.olevelResults.english}
                onChange={handleGradeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject 1 */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subject 1
              </label>
              <select
                name="subject1"
                value={formData.olevelResults.subject1}
                onChange={handleGradeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject 2 */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subject 2
              </label>
              <select
                name="subject2"
                value={formData.olevelResults.subject2}
                onChange={handleGradeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject 3 */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subject 3
              </label>
              <select
                name="subject3"
                value={formData.olevelResults.subject3}
                onChange={handleGradeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Calculating..." : "Calculate Aggregate"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results Section */}
        {data && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Evaluation Results
            </h2>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Aggregate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student's Aggregate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faculty
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data["course aggregate"]}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      data["student's aggregate"] >= data["course aggregate"]
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                      {data["student's aggregate"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.faculty}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Other Qualified Courses */}
            {Object.keys(data["other courses qualified for"]).length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Other Courses You Qualify For:
                </h3>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Required Aggregate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.keys(data["other courses qualified for"]).map(
                        (course) => (
                          <tr key={course}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {course}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {data["other courses qualified for"][course]}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                No other courses in this faculty that you qualify for.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Aggregator; 