/* eslint-disable no-unused-vars */
import { useState } from "react";
import { fetchPostUtmeRequirements } from "../../services/api";

const CourseRequirements = () => {
    const [courseName, setCourseName] = useState("");
    const [utmeScore, setUtmeScore] = useState("");
    const [grades, setGrades] = useState("");
    const [requirements, setRequirements] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRequirements = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPostUtmeRequirements(courseName, utmeScore, grades);
            setRequirements(data);
        } catch (err) {
            setError("Error fetching requirements. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Course Requirements</h1>
            <input
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
            />
            <input
                type="text"
                placeholder="UTME Score"
                value={utmeScore}
                onChange={(e) => setUtmeScore(e.target.value)}
            />
            <input
                type="text"
                placeholder="Grades"
                value={grades}
                onChange={(e) => setGrades(e.target.value)}
            />
            <button onClick={fetchRequirements}>Fetch Requirements</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {requirements && <pre>{JSON.stringify(requirements, null, 2)}</pre>}
        </div>
    );
};

export default CourseRequirements;
