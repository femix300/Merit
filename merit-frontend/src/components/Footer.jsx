import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold font-display text-white mb-4">MERIT</h3>
            <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
              Empowering students to make informed decisions about their academic future through 
              intelligent tools and resources.
            </p>
            <div className="flex space-x-5">
              {/* Social Media Icons */}
              {[
                { name: 'twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { name: 'instagram', icon: 'M17.5 6.5a1 1 0 11-2 0 1 1 0 012 0zm-9.5 9a4 4 0 100-8 4 4 0 000 8zm0-10a6 6 0 110 12 6 6 0 010-12zm10-2a.5.5 0 00-.5-.5h-13a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-13z' },
                { name: 'linkedin', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zm-9 6v7H3v-7h4zm-4-5a2 2 0 114 0 2 2 0 01-4 0z' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="text-neutral-500 hover:text-accent-400 transition-colors"
                  aria-label={`MERIT on ${social.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Universities', path: '/universities-list' },
                { name: 'University Details', path: '/uni-details' },
                { name: 'About Us', path: '/about' },
                { name: 'Merit AI', path: '/merit-ai' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-base font-semibold text-white mb-5">Our Services</h3>
            <ul className="space-y-3">
              {[
                { name: 'Aggregate Calculator', path: '/service/aggregate-calculator' },
                { name: 'Course Faculty', path: '/service/course-faculty' },
                { name: 'Aggregate Requirements', path: '/service/aggregate-requirements' },
                { name: 'Post UTME', path: '/service/post-utme' },
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path}
                    className="text-neutral-400 hover:text-accent-400 transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-base font-semibold text-white mb-5">Contact Us</h3>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contact@meritassistant.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+234 810 145 7299</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-xs">
              &copy; {new Date().getFullYear()} MERIT. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-xs text-neutral-500">
                <li><a href="#" className="hover:text-accent-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
