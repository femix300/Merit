import Navbar from "../components/Navbar";
import LandingContent from "../components/LandingContent";
import Footer from "../components/Footer";
import { useEffect } from "react";
import apiService from "../services/apiService";

const LandingPage = () => {
  useEffect(() => {
    // Preload universities data for faster access later
    const preloadData = async () => {
      try {
        const data = await apiService.fetchUniversitiesList();
        console.log("Universities data preloaded successfully");
        console.log(data);
      } catch (error) {
        console.error("Error preloading universities data:", error);
      }
    };

    preloadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LandingContent />
   
    </div>
  );
};

export default LandingPage;
