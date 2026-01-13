import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import avatar from "../images/avatar.png";
import { getProfile } from "../api/auth";
import {
  FaUser,
  FaStore,
  FaHeart,
  FaBox,
  FaUsers,
  FaHeadset,
  FaInfoCircle,
  FaEnvelope,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  // Immediate check on mount - redirect if not logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login', { replace: true });
      setIsChecking(false);
      return;
    }

    // Validate user data
    try {
      const parsedUser = JSON.parse(userData);
      if (!parsedUser || !parsedUser.id || !parsedUser.email) {
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
        setIsChecking(false);
        return;
      }
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
      setIsChecking(false);
      return;
    }

    setIsChecking(false);
  }, [navigate]);

  // Load user data from database via API
  useEffect(() => {
    // Don't load if still checking authentication
    if (isChecking) {
      return;
    }

    const loadUserData = async () => {
      // Get user ID from localStorage (already validated above)
      const userData = localStorage.getItem('user');
      if (!userData) {
        return;
      }

      let parsedUser;
      try {
        parsedUser = JSON.parse(userData);
        if (!parsedUser || !parsedUser.id || !parsedUser.email) {
          return;
        }
      } catch (error) {
        return;
      }

      const userId = parsedUser.id;

      // Set user data from localStorage as fallback (will be updated from API if successful)
      setUser({
        id: userId,
        full_name: parsedUser.name || parsedUser.full_name || parsedUser.first_name || '',
        email: parsedUser.email || ''
      });

      // Fetch user data from database
      try {
        const response = await getProfile(userId);
        if (response.success && response.profile) {
          // Set user data from API response (database)
          setUser({
            id: userId,
            full_name: response.profile.full_name || parsedUser.name || '',
            email: response.profile.email || parsedUser.email || ''
          });

          // Set profile image from database
          if (response.profile.profile_image) {
            setProfileImage(response.profile.profile_image);
          }
        }
      } catch (error) {
        console.error('Error loading user data from database:', error);
        // If user not found in backend (404) or unauthorized (401/403), clear localStorage and redirect
        if (error.response?.status === 404 || error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('user');
          navigate('/login', { replace: true });
        }
        // For other errors (network issues, etc.), keep using localStorage data
      }
    };

    loadUserData();
  }, [location.pathname, isChecking, navigate]); // Reload when route changes or checking status changes

  // Show nothing while checking authentication
  if (isChecking) {
    return null;
  }

  // Logout handler
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  const dashboardItems = [
    { title: "Profile", desc: "Manage account", icon: <FaUser className="text-2xl text-primary-600" />, route: "/profile" },
    { title: "Shop", desc: "Followed shops", icon: <FaStore className="text-2xl text-primary-600" />, route: "/shop" },
    { title: "Wishlist", desc: "Saved items", icon: <FaHeart className="text-2xl text-red-600" />, route: "/wishlist" },
    { title: "Orders", desc: "Track purchases", icon: <FaBox className="text-2xl text-green-600" />, route: "/orders" },
    { title: "Refer & Earn", desc: "Get rewards", icon: <FaUsers className="text-2xl text-yellow-600" />, route: "/affiliate" },
    { title: "Support", desc: "Get assistance", icon: <FaHeadset className="text-2xl text-primary-600" />, route: "/support" },
    { title: "About", desc: "Learn more", icon: <FaInfoCircle className="text-2xl text-primary-600" />, route: "/about" },
    { title: "Contact", desc: "Reach out", icon: <FaEnvelope className="text-2xl text-primary-600" />, route: "/contact" },
  ];

  return (
    <main className="flex-1 px-3 sm:px-4 py-4 sm:py-6 mt-14 sm:mt-16 mb-20 lg:mb-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 mb-4 sm:mb-6 relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-50 -z-0" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Dark Mode Toggle Switch - Above User Image */}
            <button
              onClick={toggleTheme}
              className="mb-4 relative w-16 h-8 sm:w-[72px] sm:h-9 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 shadow-lg"
              aria-label="Toggle dark mode"
            >
              {/* Toggle Circle with Icon */}
              <div className={`absolute top-1 ${isDarkMode ? 'right-1' : 'left-1'} w-6 h-6 sm:w-7 sm:h-7 bg-white dark:bg-gray-800 rounded-full shadow-md transition-all duration-300 flex items-center justify-center`}>
                {isDarkMode ? (
                  <FaSun className="text-yellow-500 text-sm sm:text-base" />
                ) : (
                  <FaMoon className="text-gray-700 text-sm sm:text-base" />
                )}
              </div>
            </button>

            <div className="relative group">
              <div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-full border-4 border-white dark:border-gray-700 shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden transition-colors duration-300">
                <img src={profileImage || avatar} className="w-full h-full object-cover" alt="Avatar" />
              </div>
            </div>
            <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {user ? (user.full_name || user.email?.split('@')[0] || 'User') : 'Guest User'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
              {user ? (user.email || 'Welcome back!') : 'Join Sreca to unlock all features'}
            </p>

            {!user && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 w-full sm:w-auto px-4 sm:px-0">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 sm:px-8 py-2 sm:py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-md hover:shadow-lg cursor-pointer text-center text-sm sm:text-base dark:text-gray-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 sm:px-8 py-2 sm:py-2.5 rounded-xl bg-black dark:bg-gray-700 text-white font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition shadow-md hover:shadow-lg cursor-pointer text-center text-sm sm:text-base"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {dashboardItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-md dark:shadow-gray-900/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 cursor-pointer"
              onClick={() => {
                if (item.title === "Profile" && user) {
                  navigate(`/profile/${user.id}`)
                } else {
                  navigate(item.route)
                }
              }}
            >
              <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                <div className="h-12 w-12 sm:h-13 sm:w-13 lg:h-14 lg:w-14 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 transition-colors duration-300">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logout - Only show if user is logged in */}
        {user && (
          <button 
            onClick={handleLogout}
            className="w-full mt-4 sm:mt-6 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-all py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium border-2 border-transparent flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
