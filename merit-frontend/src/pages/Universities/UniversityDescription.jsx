import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    fetchUniversityDescription,
    fetchFacultiesAndCourses,
    fetchCoursesByUniversity,
} from "../../services/api";

const UniversityDescription = () => {
    const { id } = useParams();
    const [universityDetails, setUniversityDetails] = useState(null);
    const [facultiesAndCourses, setFacultiesAndCourses] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchUniversityDetailsData = async () => {
            try {
                const universityData = await fetchUniversityDescription(id);
                setUniversityDetails(universityData);

                const facultiesData = await fetchFacultiesAndCourses(id);
                setFacultiesAndCourses(facultiesData);

                const coursesData = await fetchCoursesByUniversity(id);
                setCourses(coursesData.courses);
            } catch (error) {
                console.error("Error fetching university details:", error);
            }
        };

        fetchUniversityDetailsData();
    }, [id]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">University Details</h1>
            {universityDetails ? (
                <>
                    <h2 className="text-xl font-semibold">{universityDetails.name}</h2>
                    <p className="mt-2 text-gray-600">{universityDetails.description}</p>

                    <h3 className="text-lg font-semibold mt-6">Faculties and Courses</h3>
                    <ul className="list-disc pl-6 mt-2">
                        {facultiesAndCourses.map((faculty) => (
                            <li key={faculty.id} className="mt-2">
                                <strong>{faculty.name}</strong>
                                <ul className="list-disc pl-4">
                                    {faculty.courses.map((course) => (
                                        <li key={course.id}>{course.name}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-lg font-semibold mt-6">List of Courses</h3>
                    <ul className="list-disc pl-6 mt-2">
                        {courses.map((course) => (
                            <li key={course.id} className="mt-2">
                                {course.name}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UniversityDescription;
