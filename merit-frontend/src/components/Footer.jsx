const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex max-xl:flex-wrap  justify-between items-center ">
          <div className="w-full  mb-6 md:mb-0">
            <h3 className="text-lg font-bold">MERIT</h3>
            <p className="text-gray-400">
              Admission Process made seamless with Merit. Helping students make
              the right choices when it comes to matters pertaining to course
              and institution.
            </p>
          </div>
          <div className="w-full  md:text-center  mb-6 md:mb-0">
            <h4 className="font-semibold mb-2 mt-6">Quick Links</h4>
            <ul className="text-gray-400">
              <li className="hover:text-white">
                <a href="/">Home</a>
              </li>
              <li className="hover:text-white">
                <a href="/about">About Us</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Services</a>
              </li>
              <div className="block py-2 px-4  hover:text-gray-100">
                <div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-0 space-y-2"
                >
                  <a
                    href="/service/aggregate-calculator"
                    className="block text-gray-400 hover:text-gray-100"
                  >
                    Aggregate calculator
                  </a>

                  <a
                    href="/universities-list"
                    className="block text-gray-400 hover:text-gray-100 "
                  >
                    Find dream school
                  </a>
                </div>
              </div>
            </ul>
          </div>
          <div className="w-full  mb-6 md:mb-0">
            <h4 className="font-semibold mb-2">Subscribe to Our Newsletter</h4>
            <form className="flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md md:mr-2 mb-2 md:mb-0 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md"
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
