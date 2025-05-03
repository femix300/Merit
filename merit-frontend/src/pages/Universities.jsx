import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Aggregator from "./Services/Aggregator";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const BASE_URL = "https://merit-uc58.onrender.com"; // Production API base URL

  useEffect(() => {
    const courseName = searchParams.get("course_name");
    if (courseName) {
      fetchUniversities(courseName);
    }
  }, [searchParams]);

  const fetchUniversities = async (courseName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/universities/courses?course_name=${encodeURIComponent(
          courseName
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch universities");
      }
      const result = await response.json();

      setUniversities(result["Universities offering the course"]); // Extracting the universities array
      setCourse(result.course); // Set the course name if needed
    } catch (error) {
      console.error("Error fetching universities:", error);
      setError("Failed to load universities");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && universities.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Universities offering {course}</h2>
          <ul className="list-disc pl-5">
            {universities.map((university, index) => (
              <li key={index}>{university}</li> // Map through universities
            ))}
          </ul>
        </div>
      )}
      {!loading && universities.length === 0 && (
        <p>No universities found for the selected course.</p>
      )}
      {/* <a
        href={`uni?university_name=${encodeURIComponent(
          "University of Lagos (UNILAG)"
        )}`}
      >
        Obafemi Awolowo University (OAU)
      </a> */}
      <div>
        <h2 className="mt-9 mb-3 font-semibold">
          USE OUR AGGREGATOR APP TO SEE YOUR CHANCES OF ADMISSION
        </h2>
        <a href="/service/aggregate-calculator">click here</a>
      </div>
    </div>
  );
};

export default Universities;
