import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AOS from 'aos';

const LandingContent = () => {
  const [course, setCourse] = useState("");
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 to-primary-800/90 z-0"></div>
        
        {/* Animated Blob */}
        <div className="absolute -right-32 top-20 w-96 h-96 opacity-20 blob">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M42.8,-68.9C54.9,-62.1,63.6,-48.5,69.1,-34.3C74.6,-20.1,76.9,-5.4,73.5,7.7C70.1,20.8,61,32.2,49.9,39.6C38.8,47,25.7,50.4,12.8,54.9C-0.2,59.5,-13,65.1,-24.7,63C-36.4,60.9,-46.9,51.2,-57.1,39.9C-67.3,28.6,-77,15.7,-78.2,1.5C-79.3,-12.7,-71.8,-28.1,-61.1,-38.3C-50.4,-48.4,-36.4,-53.3,-23.7,-59.9C-11,-66.5,0.6,-74.8,14.1,-75.5C27.6,-76.1,42.9,-69.2,42.8,-68.9Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Your Path to <span className="text-secondary-400">University Success</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              MERIT helps JAMB students calculate their chances of admission with precise aggregate score calculations and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Check Eligibility
              </button>
              <button className="btn-outline text-white border-white hover:bg-white/10 text-lg px-8 py-4">
                Explore Universities
            </button>
            </div>
          </motion.div>
          
          {/* Stats Section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            {[
              { number: "10+", label: "Universities" },
              { number: "1000+", label: "Courses" },
              { number: "98%", label: "Accuracy" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl font-bold text-secondary-400">{stat.number}</span>
                <span className="text-sm md:text-base mt-2">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#FFFFFF" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,48C384,43,480,21,576,10.7C672,0,768,0,864,16C960,32,1056,64,1152,74.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to navigate your university admission journey with confidence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "AI-Powered Eligibility Check",
                description: "Get instant evaluation of your chances of admission based on your JAMB score and O-level results.",
                color: "primary"
              },
              {
                icon: "📊",
                title: "Aggregate Score Calculator",
                description: "Calculate your precise aggregate scores for different universities with our advanced algorithm.",
                color: "secondary"
              },
              {
                icon: "🎯",
                title: "Course Recommendations",
                description: "Discover alternative courses you qualify for based on your academic profile.",
                color: "accent"
              },
              {
                icon: "🏫",
                title: "University Database",
                description: "Explore comprehensive information about Nigerian universities and their admission requirements.",
                color: "primary"
              },
              {
                icon: "📝",
                title: "Post-UTME Requirements",
                description: "Learn the exact Post-UTME scores you need to secure admission to your desired course.",
                color: "secondary"
              },
              {
                icon: "💬",
                title: "24/7 AI Assistance",
                description: "Get answers to all your admission-related questions from our intelligent chatbot.",
                color: "accent"
              }
            ].map((service, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`feature-card border-t-4 border-${service.color}-500 hover:shadow-xl transition-all`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three simple steps to determine your university admission eligibility
            </p>
        </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Scores",
                description: "Provide your JAMB UTME score, O-level grades, and university preferences."
              },
              {
                step: "02",
                title: "Calculate Aggregate",
                description: "Our system instantly calculates your aggregate score based on the university's formula."
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive your eligibility status, recommendations, and next steps."
              }
            ].map((step, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className="text-9xl font-bold text-gray-100 absolute -right-4 -top-8 opacity-50">
                  {step.step}
        </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
        </div>
        </div>
            ))}
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-accent-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg max-w-3xl mx-auto opacity-90">
              Join thousands of students who achieved their academic goals with MERIT
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "MERIT helped me get into Medicine at UNILAG despite my average JAMB score. The aggregate calculator was spot on!",
                name: "Chioma Okonkwo",
                uni: "University of Lagos",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "I was confused about which university to choose. MERIT's recommendation system led me to the perfect course for my career goals.",
                name: "Adekunle Johnson",
                uni: "Obafemi Awolowo University",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "The Post-UTME calculator saved me! I knew exactly what score I needed to aim for and ended up getting admitted to Engineering.",
                name: "Fatima Ibrahim",
                uni: "Ahmadu Bello University",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
            alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm opacity-80">{testimonial.uni}</p>
                  </div>
                </div>
                <p className="italic opacity-90">"{testimonial.quote}"</p>
              </div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-aos="fade-up"
            className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-center">
              <div className="p-8 lg:p-12 lg:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your University Journey?</h2>
                <p className="text-lg opacity-90 mb-8">
                  Calculate your chances of admission and get personalized recommendations for your academic future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-secondary text-lg px-8 py-4">
                    Check Eligibility Now
                  </button>
                  <button className="btn-outline text-white border-white hover:bg-white/10 text-lg px-8 py-4">
                    Explore Universities
          </button>
                </div>
              </div>
              <div className="hidden lg:block lg:w-1/3 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Student Success"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingContent;
