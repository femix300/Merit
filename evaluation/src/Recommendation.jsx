import { useState } from "react";
import "./recommendation.css";

const BASE_URL = "http://127.0.0.1:5000";

function Recommendation() {
    const [university, setUniversity] = useState("");
    const [utme_score, setUtme_score] = useState();
    const [postUtme_score, setPostUtme_score] = useState();
    const [olevel, setOlevel] = useState("");
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error state

    const updateUniversity = (event) => {
        setUniversity(event.target.value);
    };
    const updateUtme_score = (event) => {
        setUtme_score(event.target.value);
    };
    const updatePostUtme_score = (event) => {
        setPostUtme_score(event.target.value);
    };
    const updateOlevel = (event) => {
        setOlevel(event.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true); // Start loading when fetching begins
        setError(""); // Reset error before the fetch starts

        try {
            // Construct the query parameters
            const queryParams = new URLSearchParams({
                course_name: "MEDICINE", // Assuming MEDICINE is the course
                utme_score: utme_score,
                post_utme_score: postUtme_score,
                grades: olevel,
            }).toString();

            // Fetch data using query parameters
            const response = await fetch(`${BASE_URL}/evaluations/recommendations?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            // Process the response data
            const result = await response.json();
            setData(result); // Store the fetched data in state
        } catch (error) {
            setError("Something went wrong, please try again."); // Set error message on failure
        } finally {
            setLoading(false); // Stop loading when the fetch is complete
        }
    };

    return (
        <>
            <div className="form-wrap">
                <div className="university-course-input">
                    <div className="university-select">
                        <select onChange={updateUniversity}>
                            <option value="">select university</option>
                            <option value="oau">Obafemi Awolowo University</option>
                            <option value="unilag">University of Lagos</option>
                            <option value="unn">University of Nigeria Nsukka</option>
                            <option value="futa">Federal University of Technology Akure</option>
                            <option value="uniben">University of Benin</option>
                            <option value="unizik">unizik</option>
                            <option value="ui">University of Ibadan</option>
                        </select>
                    </div>
                    <div className="course-select">
                        <select>
                            <option value="SOFTWARE ENGINEERING">SOFTWARE ENGINEERING</option>
                        </select>
                    </div>
                </div>
                <div className="score-inputs">
                    <label>
                        UTME score<br />
                        <input type="number" onChange={updateUtme_score} />
                    </label>

                    <label>
                        Post UTME score<br />
                        <input type="number" onChange={updatePostUtme_score} />
                    </label>
                    <label className="olevel-input">
                        Olevel grade separated by commas (e.g A1,B2,B3,C4,A1)<br />
                        <input type="text" onChange={updateOlevel} />
                    </label>
                </div>
                <div className="submit-btn">
                    <button className="submit" onClick={handleSubmit}>Evaluate</button>
                </div>
            </div>

            <div className="evaluation">
                {/* Loading state */}
                {loading && <p>Loading...</p>}

                {/* Error state */}
                {error && <p>{error}</p>}

                {/* Evaluation results */}
                {data && !loading && !error && (
                    <div>
                        <h2>Evaluation Results</h2>
                        <div className="scroll-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>Course Aggregate</th>
                                        <th>Student's Aggregate</th>
                                        <th>Faculty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{data.course}</td>
                                        <td>{data["course aggregate"]}</td>
                                        <td>{data["student's aggregate"]}</td>
                                        <td>{data.faculty}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Conditionally render other recommended courses */}
                        {Object.keys(data["other courses qualified for"]).length > 0 ? (
                            <div>
                                <h3>Other Courses Qualified For:</h3>
                                <div className="scroll-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Course</th>
                                                <th>Aggregate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(data["other courses qualified for"]).map((course) => (
                                                <tr key={course}>
                                                    <td>{course}</td>
                                                    <td>{data["other courses qualified for"][course]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <p>No other courses qualified for</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Recommendation;
