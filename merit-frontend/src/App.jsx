import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const App = () => {

  return (
    <div className="bg-[#f9fafe] min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {routes.map((route) => (
              <Route 
                key={route.path} 
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
