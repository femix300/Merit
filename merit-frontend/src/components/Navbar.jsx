import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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

  // Close menus when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location]);

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

  // Get navbar background style
  const getNavbarStyle = () => {
    if (isHomePage) {
      return isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-soft py-2' 
        : 'bg-transparent py-4';
    }
    return 'bg-white/90 backdrop-blur-md shadow-soft py-2';
  };

  // Get text color style
  const getTextColor = (isActive = false) => {
    if (isHomePage) {
      if (isScrolled) {
        return isActive ? 'text-primary-600 font-medium' : 'text-neutral-700 hover:text-primary-600';
      } else {
        return isActive ? 'text-white font-medium' : 'text-white/90 hover:text-white';
      }
    }
    return isActive ? 'text-primary-600 font-medium' : 'text-neutral-700 hover:text-primary-600';
  };

  // Get button style
  const getButtonStyle = () => {
    if (isHomePage) {
      return isScrolled 
        ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm'
        : 'bg-white text-primary-600 hover:bg-white/90 shadow-sm';
    }
    return 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarStyle()}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold font-display tracking-tight ${isHomePage && !isScrolled ? 'text-white' : 'text-primary-600'}`}>
              MERIT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`text-sm font-medium transition-colors ${getTextColor(location.pathname === link.path)}`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesDropdown(!servicesDropdown)}
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${getTextColor()}`}
              >
                <span>Services</span>
                <svg 
                  className="w-4 h-4" 
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
                <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-elevated bg-white ring-1 ring-neutral-200 focus:outline-none animate-fade-in">
                  <div className="py-1 rounded-xl overflow-hidden">
                    {serviceLinks.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${getButtonStyle()}`}
            >
              Merit AI
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${isHomePage && !isScrolled ? 'text-white' : 'text-neutral-700'}`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 pb-4 rounded-xl overflow-hidden animate-slide-down">
            <div className={`flex flex-col space-y-2 p-4 ${isHomePage && !isScrolled ? 'bg-neutral-900/70 backdrop-blur-md rounded-xl text-white' : 'bg-white rounded-xl shadow-card'}`}>
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`py-2.5 px-3 rounded-lg ${location.pathname === link.path ? 'bg-primary-50 text-primary-600 font-medium' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Services Section */}
              <div className="py-2">
                <button
                  onClick={() => setServicesDropdown(!servicesDropdown)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg"
                >
                  <span>Services</span>
                  <svg 
                    className="w-4 h-4" 
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
                  <div className="mt-1 ml-3 pl-3 border-l-2 border-neutral-200 space-y-1 animate-fade-in">
                    {serviceLinks.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        className="block py-2 px-3 text-sm rounded-lg hover:bg-neutral-100"
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
                className="mt-2 bg-accent-500 text-white px-4 py-2.5 rounded-lg text-center font-medium shadow-sm"
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
