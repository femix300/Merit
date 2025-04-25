import { Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Universities
import Universities from './pages/Universities';
import UniversitiesList from './features/universities/UniversitiesList';
import UniversityDescription from './features/universities/UniversityDescription';
import Unipage from './features/universities/Unipage';

// Services
import Aggregator from './features/aggregate/Aggregator';
import CourseRequirements from './features/universities/CourseRequirements';
import AggregateRequirements from './features/aggregate/AggregateRequirements';
import CourseRecommendations from './features/aggregate/CourseRecommendations';

// AI
import MeritAI from './features/ai/MeritAI';

const routes = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/universities',
    element: <Universities />
  },
  {
    path: '/universities-list',
    element: <UniversitiesList />
  },
  {
    path: '/universities/:id',
    element: <UniversityDescription />
  },
  {
    path: '/uni-details',
    element: <Unipage />
  },
  {
    path: '/service/aggregate-calculator',
    element: <Aggregator />
  },
  {
    path: '/service/course-faculty',
    element: <CourseRequirements />
  },
  {
    path: '/service/aggregate-requirements',
    element: <AggregateRequirements />
  },
  {
    path: '/service/post-utme',
    element: <CourseRecommendations />
  },
  {
    path: '/merit-ai',
    element: <MeritAI />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
];

export default routes;
