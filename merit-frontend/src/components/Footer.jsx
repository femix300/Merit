
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold">MERIT</h3>
            <p className="text-gray-400">
              Admission Process made seamless with Merit. Helping students make
              the right choices when it comes to matters pertaining to course
              and institution.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-gray-400">
              <li className="hover:text-white">
                <a href="#">Home</a>
              </li>
              <li className="hover:text-white">
                <a href="#">About Us</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Services</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Universities</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="font-semibold mb-2">Subscribe to Our Newsletter</h4>
            <form className="flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md md:mr-2 mb-2 md:mb-0 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-400">
          &copy; {new Date().getFullYear()} Merit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
