import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaSearch,
  FaHome,
  FaStore,
  FaShoppingCart,
  FaUser,
  FaBell,
} from "react-icons/fa";

import logoBlack from "../images/branding-black.png";
import logoWhite from "../images/branding-white.png";

function Navbar() {
  const searchRef = useRef(null);
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="hidden lg:flex fixed top-0 inset-x-0 z-50 h-[56px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-gray-900/50 px-6 xl:px-20 items-center justify-between transition-colors duration-300">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <Link to="/" className="transform hover:scale-105 transition">
          <img src={isDarkMode ? logoWhite : logoBlack} className="h-10" alt="Brand" />
        </Link>

        {/* SEARCH */}
        <div className="relative">
          <input
            ref={searchRef}
            type="search"
            placeholder="Search products"
            className="w-60 h-9 rounded-full bg-gray-50 dark:bg-gray-800 dark:text-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-gray-600 transition-colors duration-300"
          />

          <button
            type="button"
            onClick={() => searchRef.current.focus()}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            <FaSearch size={14} />
          </button>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            isActive('/') 
              ? 'bg-primary-100 dark:bg-primary-900/30 shadow-sm' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FaHome className={`text-lg ${
            isActive('/') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
          }`} />
          <span className={`text-sm font-medium ${
            isActive('/') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>Home</span>
        </Link>

        <Link 
          to="/shop" 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            isActive('/shop') 
              ? 'bg-primary-100 dark:bg-primary-900/30 shadow-sm' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FaStore className={`text-lg ${
            isActive('/shop') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
          }`} />
          <span className={`text-sm font-medium ${
            isActive('/shop') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>Shop</span>
        </Link>

        <Link
          to="/cart"
          className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            isActive('/cart') 
              ? 'bg-primary-100 dark:bg-primary-900/30 shadow-sm' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FaShoppingCart className={`text-lg ${
            isActive('/cart') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
          }`} />
          <span className={`text-sm font-medium ${
            isActive('/cart') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>Cart</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            isActive('/dashboard') 
              ? 'bg-primary-100 dark:bg-primary-900/30 shadow-sm' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FaUser className={`text-lg ${
            isActive('/dashboard') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
          }`} />
          <span className={`text-sm font-medium ${
            isActive('/dashboard') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>Dashboard</span>
        </Link>

        <Link
          to="/notifications"
          className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            isActive('/notifications') 
              ? 'bg-primary-100 dark:bg-primary-900/30 shadow-sm' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FaBell className={`text-lg ${
            isActive('/notifications') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
          }`} />
          <span className={`text-sm font-medium ${
            isActive('/notifications') 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>Notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
