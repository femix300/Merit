/* eslint-disable no-unused-vars */
import { useState } from "react";
import { fetchCourseAggregate } from "../../services/api";

const AggregateRequirements = () => {
  const [courseName, setCourseName] = useState("");
  const [aggregate, setAggregate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAggregateRequirements = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCourseAggregate(courseName);
      setAggregate(data);
    } catch (err) {
      setError("Error fetching aggregate requirements. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Aggregate Requirements</h1>
      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <button onClick={fetchAggregateRequirements}>Fetch Aggregate</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {aggregate && <pre>{JSON.stringify(aggregate, null, 2)}</pre>}
    </div>
  );
};

export default AggregateRequirements;
