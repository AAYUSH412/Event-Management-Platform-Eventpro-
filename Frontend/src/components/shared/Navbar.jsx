import { useState, useEffect, useMemo, useRef } from "react";
import { 
  Menu, 
  X, 
  Calendar, 
  User,
  Ticket,
  ChevronDown,
  LogOut,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const userName = user?.user_metadata?.full_name;

  // Check if current route is an auth page
  const isAuthPage = useMemo(() => {
    return ["/signin", "/signup"].includes(location.pathname);
  }, [location.pathname]);

  // Navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/event" },
    { name: "Contact", href: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || isAuthPage
            ? "py-2 bg-indigo-900 shadow-lg"
            : "py-4 bg-indigo-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className={`h-8 w-8 ${
                isScrolled || isAuthPage ? "text-indigo-600" : "text-white"
              }`} />
              <span className="text-2xl font-bold text-white">
                EventPro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-md font-medium transition-colors duration-300 ${
                    isScrolled || isAuthPage
                      ? "text-gray-100 hover:text-indigo-600"
                      : "text-white hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 text-gray-100 hover:text-indigo-600 transition-colors duration-300"
                    >
                      <User className="h-5 w-5" />
                      <span>{userName || "User"}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Link
                            to="/my-tickets"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <Ticket className="h-4 w-4 mr-2" />
                            My Tickets
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Link>
                          <button
                            onClick={() => {
                              signOut();
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-300"
                    >
                      <User className="h-5 w-5" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${
                  isScrolled || isAuthPage ? "text-gray-600" : "text-white"
                }`} />
              ) : (
                <Menu className={`h-6 w-6 ${
                  isScrolled || isAuthPage ? "text-gray-600" : "text-white"
                }`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] p-4 bg-white/90 backdrop-blur-lg z-40 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {user && (
                <div className="text-gray-800 font-medium">
                  Hi, {userName || "User"}
                </div>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-800 hover:text-indigo-600 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    to="/my-tickets"
                    className="text-gray-800 hover:text-indigo-600 transition-colors duration-300 flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    My Tickets
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-800 hover:text-indigo-600 transition-colors duration-300 flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </>
              )}
              <div className="pt-4 border-t border-gray-200 space-y-4">
                {user ? (
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="block text-gray-800 hover:text-indigo-600 transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 text-center transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;