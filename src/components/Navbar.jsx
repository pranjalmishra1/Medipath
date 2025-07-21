import { NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import MediPathLogo from "../Images/MediPath_Logo.png";
import { useState, useEffect, useRef } from "react";

function Navbar({ darkMode, toggleDarkMode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative w-full top-0 border-b border-gray-300 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always on the Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-shrink-0" >
            <NavLink to="/" className="text-2xl font-bold">
              <img src={MediPathLogo} className={`logoName relative h-10 object-contain ${darkMode ? "invert" : ""}`} alt="MediPath" />
            </NavLink>
          </motion.div>

          <div className="flex items-center space-x-6 ">
            {/* Navigation Links (Always visible on larger screens) */}
            <div className="hidden md:flex space-x-6">
              <NavLink to="/" className={`text-lg font-semibold transition-all border-b-2 border-transparent ${darkMode ? "text-white hover:border-b-2 hover:border-white" : "text-gray-900 hover:border-b-2 hover:border-black"}`} >
                Home
              </NavLink>
              <NavLink to="/treatment" className={`text-lg font-semibold border-b-2 border-transparent ${darkMode ? "text-white hover:border-b-2 hover:border-white" : "text-gray-900 hover:border-b-2 hover:border-black"}`} >
                Treatment
              </NavLink>
              <NavLink to="/team" className={`text-lg font-semibold border-b-2 border-transparent ${darkMode ? "text-white hover:border-b-2 hover:border-white" : "text-gray-900 hover:border-b-2 hover:border-black"}`} >
                {/* Our Team */}
                About Us
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            {isMobile && (
              <button ref={buttonRef} onClick={toggleDropdown} className="text-lg font-semibold md:hidden rounded" >
                Menu
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className={`text-lg p-2 rounded-full ${darkMode ? "hover:bg-gray-700 text-white " : "hover:bg-gray-200 text-gray-900"} `} >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobile && dropdownOpen && (
        <div ref={dropdownRef} className={`absolute right-0 w-40 rounded-md z-10 ${darkMode ? "bg-gray-900" : "bg-white"}`} >
          <NavLink to="/" onClick={() => setDropdownOpen(false)} className={`block px-4 py-2 text-lg font-semibold transition-colors ${darkMode ? "text-white bg-gray-900" : "text-black bg-gray-100"}`}>
            Home
          </NavLink>
          <NavLink to="/treatment" onClick={() => setDropdownOpen(false)} className={`block px-4 py-2 text-lg font-semibold ${darkMode ? "text-white bg-gray-900" : "text-black bg-gray-100"}`}>
            Treatment
          </NavLink>
          <NavLink to="/team" onClick={() => setDropdownOpen(false)} className={`block px-4 py-2 text-lg font-semibold ${darkMode ? "text-white bg-gray-900" : "text-black bg-gray-100"}`}>
            {/* Our Team */}
            About Us
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
