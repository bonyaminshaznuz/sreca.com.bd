import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaSearch, FaBell } from "react-icons/fa";
import logoBlack from "../images/branding-black.png";
import logoWhite from "../images/branding-white.png";

function MobileTopNav() {
    const location = useLocation();
    const { isDarkMode } = useTheme();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* ================= MOBILE TOP NAV ================= */}
            <nav className="lg:hidden fixed top-0 inset-x-0 z-50 h-14 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-gray-900/50 px-4 flex items-center justify-between transition-colors duration-300">

                <Link to="/">
                    <img src={isDarkMode ? logoWhite : logoBlack} className="h-9" alt="Brand" />
                </Link>

                <div className="flex gap-3">
                    <button className="p-2">
                        <FaSearch className="text-gray-600 dark:text-gray-300" />
                    </button>

                    <Link 
                        to="/notifications" 
                        className={`p-2 relative rounded-lg transition ${
                            isActive('/notifications') 
                                ? 'bg-primary-100 dark:bg-primary-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        <FaBell className={`${
                            isActive('/notifications') 
                                ? 'text-primary-600 dark:text-primary-400' 
                                : 'text-gray-600 dark:text-gray-300'
                        }`} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Link>
                </div>

            </nav>
        </>
    );
}

export default MobileTopNav;
