import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [universityName, setUniversityName] = useState(""); // State for university name

  // Use useLocation to get the current URL
  const location = useLocation();

  // Function to parse the query parameters
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  useEffect(() => {
    const university_name = getQueryParam("university_name");
    if (university_name) {
      setUniversityName(university_name); // Set the university name state
      fetchCourses(university_name); // Fetch courses using the university name
    }
  }, [location.search]); // Run effect when the search parameters change

  const fetchCourses = async (university_name) => {
    setLoading(true);
    const BASE_URL = "http://127.0.0.1:5000";

    try {
      const response = await fetch(
        `${BASE_URL}/universities/list/courses?university_name=${encodeURIComponent(
          university_name
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const result = await response.json();
      setCourses(result["List of courses"] || []); // Update state with courses
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Courses Offered by {universityName}
      </h1>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && courses.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">
                Course Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200">
                Course Code
              </th>
              {/* Add more columns as necessary */}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{course}</td>
                <td className="py-2 px-4 border-b border-gray-200">{"N/A "}</td>
                {/* Add more cells based on the course data structure */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No courses available for this university.</p>
      )}
    </div>
  );
};

export default CoursesList;
