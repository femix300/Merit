/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFacultiesAndCourses, fetchUniversitiesByCourse } from "../../services/api";

const UniversitiesList = () => {
    const [universities, setUniversities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUniversities, setFilteredUniversities] = useState([]);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const data = await fetchUniversitiesByCourse(searchQuery);
                setUniversities(data.universities);
                setFilteredUniversities(data.universities);
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        };

        fetchUniversities();
    }, [searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">List of Universities</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by course"
                className="border p-2 mb-4 w-full"
            />
            {filteredUniversities.length > 0 ? (
                <ul className="bg-white shadow-md rounded p-4">
                    {filteredUniversities.map((university) => (
                        <li
                            key={university.id}
                            className="px-4 py-2 text-gray-700 hover:bg-[#f5f5f5] transition duration-200"
                        >
                            <Link to={`/universities/${university.id}`}>{university.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No universities found.</p>
            )}
        </div>
    );
};

export default UniversitiesList;
