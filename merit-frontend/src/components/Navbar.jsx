// Navbar.jsx
import { useState } from "react";
import DropdownMenu from "./DropDownMenu";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto p-4 h-24 flex items-center justify-between">
      <div className="text-3xl font-bold text-[#0f1e6a]">
        <a href="#">MERIT</a>
      </div>
      <ul className="flex items-center space-x-4">
        <li className="text-base font-medium text-gray-800 hover:text-[#5c48ee] transition duration-300">
          <a href="#">Home</a>
        </li>
        <li className="text-base font-medium text-gray-800 hover:text-[#5c48ee] transition duration-300">
          <a href="#">About us</a>
        </li>
        {/* Services with Dropdown */}
        <li
          className="text-base font-medium text-gray-800 hover:text-[#5c48ee] transition duration-300 relative"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <a href="#">Services</a>
          {isDropdownOpen && <DropdownMenu />}
        </li>
        {/* Universities link */}
        <li className="text-base font-medium text-gray-800 hover:text-[#5c48ee] transition duration-300">
          <a href="/universities">Universities</a>
        </li>
        <li className="text-base font-medium text-gray-800 hover:text-[#5c48ee] transition duration-300">
          <a href="#">Blog</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
