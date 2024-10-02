import headerImage from "../assets/header-1.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingContent = () => {
  const [course, setCourse] = useState("");
  const [error, setError] = useState(""); // State for error
  const [loading, setLoading] = useState(false); // State for loading
  const BASE_URL = "http://127.0.0.1:5000";
  const navigate = useNavigate(); // Moved to the top level

  const handleInputChange = (e) => {
    setCourse(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Searching for university:", course);
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch(
        `${BASE_URL}/universities/courses?course_name=${encodeURIComponent(
          course.toUpperCase()
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch universities");
      }

      const result = await response.json();

      localStorage.setItem("universities", JSON.stringify(result));

      navigate(`/universities?course_name=${course.toUpperCase()}`);
    } catch (error) {
      console.error("Error fetching universities:", error);
      setError("Failed to load universities");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-4 max-lg:pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-normal text-[#0f1e6a] mb-4">
          Admission Process
          <br />
          <span className="font-bold">Made Seamless</span>
          <br />
          <span className="font-bold text-[#5c48ee]">with Merit</span>
        </h1>
        <p className="text-gray-700 mb-6">
          Merit was built to aid students in their admission process into
          tertiary institutions. It helps students make the right choices when
          it comes to matters pertaining to courses and institutions. Not only
          does it do this in a very short time, but it also makes the whole
          process far easier and less stressful.
        </p>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter your desired course"
            value={course}
            onChange={handleInputChange}
            className="px-4 py-2 w-full max-w-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5c48ee]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#5c48ee] text-white rounded-md hover:bg-[#0f1e6a] transition duration-300"
          >
            Search <span className="hidden sm:inline-block">University</span>
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
        {/* Display error message */}
        {loading && <p className="text-gray-500 mt-2">Loading...</p>}{" "}
        {/* Display loading message */}
      </div>
      <div className="relative">
        <img
          src={headerImage}
          alt="header"
          className="w-4/5 h-auto mx-auto mb-4 object-cover max-h-[80svh] rounded-md"
        />
        <div className="absolute bottom-8 left-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
          <ul className="list-disc pl-5 space-y-1">
            <li>Determine Eligibility</li>
            <li>Predict Required Score</li>
            <li>Study at your dream University</li>
            <li>Shape your Future</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LandingContent;
