import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import routes from "./routes.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Content wrapper component that conditionally adds padding based on route
const ContentWrapper = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <main 
      className={`flex-grow ${
        isHomePage 
          ? '' 
          : 'pt-24 md:pt-28'
      }`}
    >
      <div className={`
        ${isHomePage ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'}
      `}>
        {children}
      </div>
    </main>
  );
};

const App = () => {
  return (
    <div className="bg-neutral-50 text-neutral-800 min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <Routes>
          {routes.map((route) => (
            <Route 
              key={route.path} 
              path={route.path}
              element={
                <ContentWrapper>
                  {route.element}
                </ContentWrapper>
              }
            />
          ))}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
