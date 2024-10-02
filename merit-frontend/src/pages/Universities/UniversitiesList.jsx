/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UniversitiesList = () => {
  const BASE_URL = "http://127.0.0.1:5000";
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/universities/list`);
        if (!response.ok) {
          throw new Error("Failed to fetch universities");
        }
        const result = await response.json();
        const universitiesList = result["Supported Universities"] || [];
        setUniversities(universitiesList); // Set the universities in state
      } catch (error) {
        console.error("Error fetching universities:", error);
        setError("Failed to load universities");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter universities based on the search query
  const filteredUniversities = universities.filter((university) =>
    university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">List of Universities</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by university name"
        className="border p-2 mb-4 w-full"
      />
      {loading && <p>Loading universities...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {filteredUniversities.length > 0 ? (
        <ul className="bg-white shadow-md rounded p-4">
          {filteredUniversities.map((university, index) => (
            <li
              key={index} // Use index as key since we're dealing with strings
              className="px-4  text-gray-700 hover:bg-[#f5f5f5] transition duration-200"
            >
              <Link
                className="min-h-8 py-3 block w-full"
                to={`/uni-details?university_name=${encodeURIComponent(
                  university
                )}`}
              >
                {university}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No universities found.</p>
      )}
    </div>
  );
};

export default UniversitiesList;
