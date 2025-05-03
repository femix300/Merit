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
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900 to-primary-800 z-0"></div>
        
        {/* Animated Blob */}
        <div className="absolute -right-32 top-20 w-96 h-96 opacity-20 blob">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M42.8,-68.9C54.9,-62.1,63.6,-48.5,69.1,-34.3C74.6,-20.1,76.9,-5.4,73.5,7.7C70.1,20.8,61,32.2,49.9,39.6C38.8,47,25.7,50.4,12.8,54.9C-0.2,59.5,-13,65.1,-24.7,63C-36.4,60.9,-46.9,51.2,-57.1,39.9C-67.3,28.6,-77,15.7,-78.2,1.5C-79.3,-12.7,-71.8,-28.1,-61.1,-38.3C-50.4,-48.4,-36.4,-53.3,-23.7,-59.9C-11,-66.5,0.6,-74.8,14.1,-75.5C27.6,-76.1,42.9,-69.2,42.8,-68.9Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        {/* Floating Images */}
        <div className="absolute left-10 top-[20%] w-32 h-32 animate-float opacity-80 z-10 hidden md:block">
          <img
            src="/src/assets/header-2.jpg"
            alt="Student"
            className="w-full h-full object-cover rounded-lg shadow-lg transform rotate-3"
          />
        </div>
        
        <div className="absolute right-24 top-[30%] w-40 h-40 animate-float delay-700 opacity-80 z-10 hidden md:block">
          <img
            src="/src/assets/header-3.jpg"
            alt="University"
            className="w-full h-full object-cover rounded-lg shadow-lg transform -rotate-6"
          />
        </div>
        
        <div className="absolute left-[15%] bottom-[25%] w-36 h-36 animate-float delay-1000 opacity-80 z-10 hidden md:block">
          <img
            src="/src/assets/header-1.png"
            alt="Graduates"
            className="w-full h-full object-cover rounded-lg shadow-lg transform rotate-6"
          />
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-[15%] left-[10%] w-16 h-16 bg-accent-500 rounded-full opacity-20 animate-pulse-slow hidden md:block"></div>
        <div className="absolute bottom-[20%] right-[10%] w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-pulse-slow hidden md:block"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Your Path to <span className="text-accent-400">University Success</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              MERIT helps JAMB students calculate their chances of admission with precise aggregate score calculations and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Check Eligibility
              </button>
              <button className="bg-transparent text-white border-2 border-white hover:bg-white/10 text-lg px-8 py-4 rounded-lg transition-colors font-semibold">
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
                <span className="text-4xl md:text-5xl font-bold text-accent-400">{stat.number}</span>
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
                colorClass: "border-primary-500"
              },
              {
                icon: "📊",
                title: "Aggregate Score Calculator",
                description: "Calculate your precise aggregate scores for different universities with our advanced algorithm.",
                colorClass: "border-accent-500"
              },
              {
                icon: "🎯",
                title: "Course Recommendations",
                description: "Discover alternative courses you qualify for based on your academic profile.",
                colorClass: "border-primary-500"
              },
              {
                icon: "🏫",
                title: "University Database",
                description: "Explore comprehensive information about Nigerian universities and their admission requirements.",
                colorClass: "border-accent-500"
              },
              {
                icon: "📝",
                title: "Post-UTME Requirements",
                description: "Learn the exact Post-UTME scores you need to secure admission to your desired course.",
                colorClass: "border-primary-500"
              },
              {
                icon: "💬",
                title: "24/7 AI Assistance",
                description: "Get answers to all your admission-related questions from our intelligent chatbot.",
                colorClass: "border-accent-500"
              }
            ].map((service, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`feature-card border-t-4 ${service.colorClass} hover:shadow-xl transition-all`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Showcase Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Universities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover leading Nigerian universities with comprehensive information about admission requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "University of Lagos",
                image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                programs: "150+ Programs",
                description: "One of Nigeria's premier institutions known for excellence in research and teaching."
              },
              {
                name: "University of Ibadan",
                image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                programs: "200+ Programs",
                description: "Nigeria's first university with a strong tradition of academic excellence and research."
              },
              {
                name: "Covenant University",
                image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                programs: "100+ Programs",
                description: "A leading private university known for innovation and entrepreneurial development."
              },
              {
                name: "Obafemi Awolowo University",
                image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                programs: "180+ Programs",
                description: "Renowned for its beautiful campus and strong engineering and medical programs."
              },
              {
                name: "Ahmadu Bello University",
                image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                programs: "250+ Programs",
                description: "One of the largest universities in Sub-Saharan Africa with diverse academic offerings."
              },
              {
                name: "University of Nigeria",
                image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                programs: "170+ Programs",
                description: "A prestigious institution with a strong focus on research and community development."
              }
            ].map((university, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="overflow-hidden rounded-xl shadow-lg group hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <img 
                    src={university.image} 
                    alt={university.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-xl font-bold text-white">{university.name}</h3>
                    <span className="inline-block bg-accent-500 text-white text-xs px-2 py-1 rounded-full mt-1">{university.programs}</span>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-600 text-sm">{university.description}</p>
                  <button className="mt-4 text-primary-600 font-medium text-sm flex items-center group-hover:text-primary-700">
                    View Details
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/universities-list" 
              className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors text-lg font-medium"
              data-aos="fade-up"
            >
              Explore All Universities
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
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
                description: "Provide your JAMB UTME score, O-level grades, and university preferences.",
                bgColor: "text-primary-50",
                textColor: "text-primary-700"
              },
              {
                step: "02",
                title: "Calculate Aggregate",
                description: "Our system instantly calculates your aggregate score based on the university's formula.",
                bgColor: "text-accent-50",
                textColor: "text-accent-700"
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive your eligibility status, recommendations, and next steps.",
                bgColor: "text-primary-50",
                textColor: "text-primary-700"
              }
            ].map((step, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className={`text-9xl font-bold ${step.bgColor} absolute -right-4 -top-8 opacity-50`}>
                  {step.step}
                </div>
                <div className="relative z-10">
                  <h3 className={`text-xl font-bold mb-3 ${step.textColor}`}>{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feature 1: Score Calculator */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="md:w-1/2" data-aos="fade-right">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-50 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-accent-50 rounded-full z-0"></div>
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Student calculating scores"
                  className="rounded-xl shadow-xl relative z-10 w-full object-cover h-[400px]"
                />
              </div>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Precise Aggregate Score Calculator</h2>
              <p className="text-gray-600 mb-6">
                Our advanced algorithm takes into account your JAMB UTME score, O-level results, 
                and university-specific requirements to calculate your exact aggregate score for different institutions.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "University-specific calculation formulas",
                  "Instant results for multiple courses",
                  "Personalized score breakdown",
                  "Admission probability prediction"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-accent-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary inline-flex items-center">
                Try Score Calculator
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Feature 2: Course Recommendations */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
            <div className="md:w-1/2" data-aos="fade-left">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-50 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary-50 rounded-full z-0"></div>
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Course selection and planning"
                  className="rounded-xl shadow-xl relative z-10 w-full object-cover h-[400px]"
                />
              </div>
            </div>
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Smart Course Recommendations</h2>
              <p className="text-gray-600 mb-6">
                Not sure which course to choose? Our intelligent recommendation engine suggests 
                alternative courses that match your academic profile and career interests.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Personalized course suggestions based on your scores",
                  "Career path alignment for better decision-making",
                  "Discover courses with higher admission chances",
                  "Compare requirements across multiple programs"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-accent inline-flex items-center">
                Get Course Recommendations
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Feature 3: AI Chat Assistant */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2" data-aos="fade-right">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-50 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-accent-50 rounded-full z-0"></div>
                <img
                  src="https://images.unsplash.com/photo-1518082593638-b6e73b35d107?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="AI chat assistant"
                  className="rounded-xl shadow-xl relative z-10 w-full object-cover h-[400px]"
                />
              </div>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">24/7 AI Admission Assistant</h2>
              <p className="text-gray-600 mb-6">
                Have questions about admissions? Our AI-powered chat assistant is available 
                round-the-clock to provide instant, accurate answers to all your admission-related queries.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Instant answers to admission questions",
                  "University-specific admission guidance",
                  "Real-time updates on admission timelines",
                  "Documentation and application help"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-accent-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all inline-flex items-center shadow-md">
                Chat with Merit AI
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary-800 to-primary-900 text-white">
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
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-accent-400"
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

      {/* Statistics Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-50 rounded-full opacity-70 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-50 rounded-full opacity-70 transform translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">MERIT by the Numbers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how we've been helping Nigerian students achieve their academic dreams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "50,000+",
                label: "Students Helped",
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                color: "primary"
              },
              {
                number: "95%",
                label: "Accuracy Rate",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "accent"
              },
              {
                number: "200+",
                label: "Universities",
                icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
                color: "primary"
              },
              {
                number: "24/7",
                label: "AI Support",
                icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
                color: "accent"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden border border-gray-100"
              >
                <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-gray-50 rounded-full opacity-80"></div>
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${stat.color === 'primary' ? 'bg-primary-50 text-primary-500' : 'bg-accent-50 text-accent-500'}`}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                </div>
                <h3 className={`text-4xl font-bold mb-2 ${stat.color === 'primary' ? 'text-primary-600' : 'text-accent-600'}`}>{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2" data-aos="fade-right">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Students Choose MERIT</h3>
                <p className="text-gray-700 mb-6">
                  MERIT has become the go-to platform for Nigerian students seeking reliable information about university
                  admissions. Our comprehensive database and advanced algorithms provide students with accurate,
                  personalized guidance throughout their academic journey.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Real-time Updates",
                      description: "Stay informed with the latest admission requirements and deadlines"
                    },
                    {
                      title: "Personalized Guidance",
                      description: "Get tailored recommendations based on your academic profile"
                    },
                    {
                      title: "Comprehensive Database",
                      description: "Access information on all accredited Nigerian universities"
                    },
                    {
                      title: "AI-Powered Tools",
                      description: "Leverage intelligent algorithms for better decision-making"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Happy Nigerian students"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xl font-bold">Join 50,000+ satisfied students</p>
                  <p className="text-sm opacity-90">Who have found their path to academic success with MERIT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-aos="fade-up"
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-center">
              <div className="p-8 lg:p-12 lg:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your University Journey?</h2>
                <p className="text-lg opacity-90 mb-8">
                  Calculate your chances of admission and get personalized recommendations for your academic future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-accent-500 text-white hover:bg-accent-600 font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-sm">
                    Check Eligibility Now
                  </button>
                  <button className="bg-transparent text-white border-2 border-white hover:bg-white/10 text-lg px-8 py-4 rounded-lg transition-colors font-semibold">
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
