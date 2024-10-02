import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UniversitiesList from "./UniversitiesList";
import CoursesList from "../../components/CoursesList";
function Unipage() {
  const [description, setDescription] = useState("");
  const [university_name, setUniversity_name] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const BASE_URL = "http://127.0.0.1:5000";

  // Use useLocation to get the current URL
  const location = useLocation();

  // Function to parse the query parameters
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  useEffect(() => {
    const university_name = getQueryParam("university_name");
    setUniversity_name(university_name);
    const fetchUniversityDescription = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/universities/description?university_name=${encodeURIComponent(
            university_name
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch university description");
        }

        const result = await response.json();
        console.log(result);
        setDescription(result["university description"]); // Assuming the response has a 'description' field
      } catch (error) {
        console.error("Error fetching university description:", error);
        setError("Failed to load university description");
      } finally {
        setLoading(false);
      }
    };

    if (getQueryParam("university_name")) {
      fetchUniversityDescription();
    }
  }, [location.search]); // Fetch when the location changes

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && description && (
        <div>
          <h2 className="text-xl font-bold">{university_name}</h2>
          <p>{description}</p>
        </div>
      )}
      {!loading && !description && (
        <p>No description available for this university.</p>
      )}
      <CoursesList />
      <UniversitiesList />
    </div>
  );
}

export default Unipage;
