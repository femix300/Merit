import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Universities', path: '/universities-list' },
    { name: 'About', path: '/about' },
  ];

  const serviceLinks = [
    { name: 'Aggregate Calculator', path: '/service/aggregate-calculator' },
    { name: 'Course Faculty', path: '/service/course-faculty' },
    { name: 'Aggregate Requirements', path: '/service/aggregate-requirements' },
    { name: 'Post UTME', path: '/service/post-utme' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-md backdrop-blur-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span 
              className={`text-2xl font-bold ${
                isScrolled ? 'text-primary-600' : 'text-white'
              }`}
            >
              MERIT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesDropdown(!servicesDropdown)}
                className={`font-medium transition-colors flex items-center ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                }`}
              >
                Services
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>

              {servicesDropdown && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {serviceLinks.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setServicesDropdown(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/merit-ai"
              className={`px-5 py-2 rounded-lg font-medium transition-all ${
                isScrolled 
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-white text-primary-600 hover:bg-white/90'
              }`}
            >
              Merit AI
            </Link>
          </div>

          {/* Mobile Menu Button */}
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? (
              <span className="text-2xl">×</span>
            ) : (
              <span className="text-2xl">≡</span>
            )}
            </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`font-medium py-2 ${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-white/80'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Services Section */}
              <div className="py-2">
                <button
                  onClick={() => setServicesDropdown(!servicesDropdown)}
                  className={`font-medium flex items-center ${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-white/80'
                  }`}
                >
                  Services
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d={servicesDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                    />
                  </svg>
                </button>
                
                {servicesDropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {serviceLinks.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        className={`block py-1 ${
                          isScrolled ? 'text-gray-600 hover:text-primary-600' : 'text-white/80 hover:text-white'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                to="/merit-ai"
                className={`px-5 py-2 rounded-lg font-medium text-center transition-all ${
                  isScrolled 
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white text-primary-600 hover:bg-white/90'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Merit AI
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
