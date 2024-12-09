import { motion } from "framer-motion";
import { useState } from "react";
import abstract_1 from "../assets/abstract_1.png";
import abstract_2 from "../assets/abstract_2.png";

const LandingPage = () => {
  const [course, setCourse] = useState("");

  return (
    <main>
      {/* Hero Section */}
    
      <section className="relative hero_section h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      <div className="w-[110%] mx-auto h-96 absolute -bottom-6 -right-6 bg-gray-100 clipped__div"></div>
        <div className="text-center space-y-6">
          <motion.h1
            className="text-6xl font-extrabold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover Your Path <br /> with <span className="text-yellow-300">Merit AI</span>
          </motion.h1>
          <motion.p
            className="text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Your guide to seamless university admissions and career success.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <button className="px-6 py-3 bg-yellow-300 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400">
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-4 relative py-16 bg-gray-100">
  {/* Decorative Abstract Images */}
  <img src={abstract_1} className="w-8 z-10 left-44 -top-20 absolute" />
  <img src={abstract_1} className="w-8 z-10 right-24 -top-60 absolute" />
  <img src={abstract_2} className="w-8 z-10 right-4 bottom-60 absolute" />

  <div className="max-w-7xl mx-auto px-6">
    {/* Section Header */}
    <h2 className="text-5xl font-bold text-gray-950 text-start mb-12">
      <span className="font-bold">OUR</span> <span > SERVICES</span>
    </h2>

    {/* Cards Container */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        className="p-6 bg-gray-800 text-white shadow-md rounded-lg flex flex-col items-start gap-4 transition duration-300"
      >
        <div className="flex items-center gap-3">
          <span className="text-indigo-500 text-3xl">
            <i className="fas fa-brain"></i>
          </span>
          <h3 className="text-2xl font-bold">Merit AI</h3>
        </div>
        <p className="text-gray-300">
          Merit AI simplifies your admission process with personalized recommendations and AI-powered insights.
        </p>
      </motion.a>


      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        className="p-6 bg-gray-800 text-white shadow-md rounded-lg flex flex-col items-start gap-4 transition duration-300"
      >
        <div className="flex items-center gap-3">
          <span className="text-green-500 text-3xl">
            <i className="fas fa-chart-line"></i>
          </span>
          <h3 className="text-2xl font-bold">University Cutoff Marks</h3>
        </div>
        <p className="text-gray-300">
          Discover cutoff marks for Nigerian universities and make informed decisions.
        </p>
      </motion.a>

      {/* Card: Aggregate Score Calculator */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        className="p-6 bg-gray-800 text-white shadow-md rounded-lg flex flex-col items-start gap-4 transition duration-300"
      >
        <div className="flex items-center gap-3">
          <span className="text-yellow-500 text-3xl">
            <i className="fas fa-calculator"></i>
          </span>
          <h3 className="text-2xl font-bold">Aggregate Score Calculator</h3>
        </div>
        <p className="text-gray-300">
          Calculate your aggregate score with ease and determine your eligibility for admission.
        </p>
      </motion.a>

      {/* Card: Search Nigerian Universities */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        className="p-6 bg-gray-800 text-white shadow-md rounded-lg flex flex-col items-start gap-4 transition duration-300"
      >
        <div className="flex items-center gap-3">
          <span className="text-red-500 text-3xl">
            <i className="fas fa-university"></i>
          </span>
          <h3 className="text-2xl font-bold">Search Nigerian Universities</h3>
        </div>
        <p className="text-gray-300">
          Browse through universities in Nigeria and explore their programs.
        </p>
      </motion.a>

      {/* Card: Why We Are the Best */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        className="p-6 bg-gray-800 text-white shadow-md rounded-lg flex flex-col items-start gap-4 transition duration-300"
      >
        <div className="flex items-center gap-3">
          <span className="text-blue-500 text-3xl">
            <i className="fas fa-trophy"></i>
          </span>
          <h3 className="text-2xl font-bold">Why We Are the Best</h3>
        </div>
        <p className="text-gray-300">
          With advanced AI tools, seamless navigation, and a student-first approach, we redefine admissions.
        </p>
      </motion.a>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <div className="bg-gray-100 my-0 py-4">
      <section className="py-16  testimonial__bg max-w-[90%] mx-auto my-6  rounded-3xl shadow-md bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
  <div className="max-w-7xl  mx-auto px-6 text-center">
    {/* Section Header */}
    <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>

    {/* Testimonials Container */}
    <div className="flex gap-8 justify-between flex-wrap flex-col xl:flex-row items-center max-w-screen-lg mx-auto px-4">
      {[
        {
          feedback: "Merit helped me achieve my dream!",
          name: "Jane Doe",
          photo: "https://randomuser.me/api/portraits/men/75.jpg",
        },
        {
          feedback: "The guidance was seamless and efficient.",
          name: "John Smith",
          photo: "https://randomuser.me/api/portraits/men/76.jpg",
        },
        {
          feedback: "I got into my preferred university effortlessly!",
          name: "Mary Johnson",
          photo: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      ].map((testimonial, i) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          key={i}
          className="w-72 bg-gray-100  text-gray-800 p-6 shadow-xl rounded-lg flex flex-col items-center"
        >
          {/* Testimonial Photo */}
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-20 h-20 object-cover rounded-full mb-4"
          />
          {/* Feedback */}
          <p className="italic text-gray-600 mb-4">"{testimonial.feedback}"</p>
          {/* User Name */}
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      </div>


      {/* Call to Action */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <button className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-600">
           Get Started
          </button>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
