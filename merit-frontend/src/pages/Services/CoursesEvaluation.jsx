/* eslint-disable no-unused-vars */
import { useState } from "react";
import { fetchCourseRecommendations } from "../../services/api";

const CoursesEvaluation = () => {
    const [courseName, setCourseName] = useState("");
    const [utmeScore, setUtmeScore] = useState("");
    const [postUtmeScore, setPostUtmeScore] = useState("");
    const [grades, setGrades] = useState("");
    const [evaluationResult, setEvaluationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const evaluateCourse = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCourseRecommendations(courseName, utmeScore, postUtmeScore, grades);
            setEvaluationResult(data);
        } catch (err) {
            setError("Error fetching course evaluation. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Course Evaluation</h1>
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
            <button onClick={evaluateCourse}>Evaluate</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {evaluationResult && <pre>{JSON.stringify(evaluationResult, null, 2)}</pre>}
        </div>
    );
};

export default CoursesEvaluation;
