/* eslint-disable no-unused-vars */
import { useState } from "react";
import { fetchCourseRecommendations } from "../../services/api";

const CourseRecommendations = () => {
    const [courseName, setCourseName] = useState("");
    const [utmeScore, setUtmeScore] = useState("");
    const [postUtmeScore, setPostUtmeScore] = useState("");
    const [grades, setGrades] = useState("");
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCourseRecommendations(courseName, utmeScore, postUtmeScore, grades);
            setRecommendations(data);
        } catch (err) {
            setError("Error fetching recommendations. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Course Recommendations</h1>
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
                placeholder="Post-UTME Score"
                value={postUtmeScore}
                onChange={(e) => setPostUtmeScore(e.target.value)}
            />
            <input
                type="text"
                placeholder="Grades"
                value={grades}
                onChange={(e) => setGrades(e.target.value)}
            />
            <button onClick={fetchRecommendations}>Fetch Recommendations</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {recommendations && <pre>{JSON.stringify(recommendations, null, 2)}</pre>}
        </div>
    );
};

export default CourseRecommendations;
