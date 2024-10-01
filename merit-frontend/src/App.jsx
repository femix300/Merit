import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CoursesEvaluation from './pages/Services/CoursesEvaluation';
import CourseRequirements from './pages/Services/CourseRequirements';
import AggregateRequirements from './pages/Services/AggregateRequirements';
import CourseRecommendations from './pages/Services/CourseRecommendations';
import UniversitiesList from './pages/Universities/UniversitiesList';
import UniversityDescription from './pages/Universities/UniversityDescription';

const App = () => {
    return (
        <div className="bg-[#f9fafe] min-h-screen">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/service/evaluate-course" element={<CoursesEvaluation />} />
                    <Route path="/service/course-faculty" element={<CourseRequirements />} />
                    <Route path="/service/aggregate-requirements" element={<AggregateRequirements />} />
                    <Route path="/service/post-utme" element={<CourseRecommendations />} />
                    <Route path="/universities" element={<UniversitiesList />} />
                    <Route path="/universities/:id" element={<UniversityDescription />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
