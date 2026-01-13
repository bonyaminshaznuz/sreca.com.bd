import { Link, useLocation } from "react-router-dom";
import { FaHome, FaStore, FaShoppingCart, FaUser } from "react-icons/fa";

function MobileBottomNav() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-gray-900 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.5)] rounded-t-[10px] transition-colors duration-300">
        <div className="flex justify-around py-2.5">

          <Link 
            to="/" 
            className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
              isActive('/') 
                ? 'text-primary-600 dark:text-primary-400 scale-110' 
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <FaHome className={`text-[22px] ${isActive('/') ? 'drop-shadow-md' : ''}`} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>

          <Link 
            to="/shop" 
            className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
              isActive('/shop') 
                ? 'text-primary-600 dark:text-primary-400 scale-110' 
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <FaStore className={`text-[22px] ${isActive('/shop') ? 'drop-shadow-md' : ''}`} />
            <span className="text-[10px] font-medium">Store</span>
          </Link>

          <Link 
            to="/cart" 
            className={`relative flex flex-col items-center gap-0.5 transition-all duration-200 ${
              isActive('/cart') 
                ? 'text-primary-600 dark:text-primary-400 scale-110' 
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <FaShoppingCart className={`text-[22px] ${isActive('/cart') ? 'drop-shadow-md' : ''}`} />
            <span className="absolute -top-1.5 right-3 w-[18px] h-[18px] bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] rounded-full flex items-center justify-center font-semibold shadow-md">
              3
            </span>
            <span className="text-[10px] font-medium mt-0.5">Cart</span>
          </Link>

          <Link 
            to="/dashboard" 
            className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
              isActive('/dashboard') 
                ? 'text-primary-600 dark:text-primary-400 scale-110' 
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <FaUser className={`text-[22px] ${isActive('/dashboard') ? 'drop-shadow-md' : ''}`} />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>

        </div>
      </nav>
    </>
  );
}

export default MobileBottomNav;
