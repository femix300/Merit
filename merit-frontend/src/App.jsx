import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CoursesEvaluation from "./pages/Services/CoursesEvaluation";
import CourseRequirements from "./pages/Services/CourseRequirements";
import AggregateRequirements from "./pages/Services/AggregateRequirements";
import CourseRecommendations from "./pages/Services/CourseRecommendations";
import UniversitiesList from "./pages/Universities/UniversitiesList";
import UniversityDescription from "./pages/Universities/UniversityDescription";
import Aggregator from "./pages/Services/Aggregator";

import Unipage from "./pages/Universities/Unipage";
import Universities from "./pages/Universities";
import About from "./pages/About";

const App = () => {
  return (
    <div className="bg-[#f9fafe] min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/universities" element={<Universities />} />

          <Route path="/uni-details" element={<Unipage />} />
          <Route path="/about" element={<About />} />
          <Route path="/universities-list" element={<UniversitiesList />} />
          <Route
            path="/service/aggregate-calculator"
            element={<Aggregator />}
          />
          <Route path="/universities/:id" element={<UniversityDescription />} />

          {/* 
// THE ROUTES THAT ARE HERE HAVE NOT BEEN UPDATED WITH BACKEND CHANGES AND  UI

          <Route
            path="/service/course-faculty"
            element={<CourseRequirements />}
          />
          <Route
            path="/service/aggregate-requirements"
            element={<AggregateRequirements />}
          />

          <Route
            path="/service/post-utme"
            element={<CourseRecommendations />}
          />*/}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
