import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaChevronRight,
  FaLink,
  FaHeadset,
  FaShareAlt,
} from "react-icons/fa";
import logo from "../images/branding-white.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-auto pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand Section */}
          <div className="text-center md:text-left">
            <img
              src={logo}
              className="h-12 mb-4 mx-auto md:mx-0"
              alt="Sreca"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <h2 className="text-2xl font-bold mb-3 hidden">Sreca</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              The Name Of Happiness
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Your trusted marketplace for quality products and amazing deals. Shop with confidence!
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
              <FaLink className="text-primary-400" />
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "Shop", path: "/shop" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center justify-center md:justify-start gap-2"
                  >
                    <FaChevronRight className="text-xs" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
              <FaHeadset className="text-green-400" />
              Support
            </h3>
            <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">
              {[
                { label: "Help Center", path: "/help" },
                { label: "FAQs", path: "/faqs" },
                { label: "Terms of Service", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    <FaChevronRight className="text-xs" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
              <FaShareAlt className="text-primary-400" />
              Connect With Us
            </h3>
            <div className="flex gap-3 justify-center md:justify-start mb-6">
              <button
                onClick={(e) => e.preventDefault()}
                className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                <FaFacebookF className="text-white" />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="w-11 h-11 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-sky-500/50 transition-all duration-300"
              >
                <FaTwitter className="text-white" />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="w-11 h-11 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
              >
                <FaInstagram className="text-white" />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="w-11 h-11 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
              >
                <FaYoutube className="text-white" />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="text-primary-400" />
                <a href="mailto:support@sreca.com.bd" className="hover:text-primary-400 transition">
                  support@sreca.com.bd
                </a>
              </p>
              <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
                <FaPhone className="text-primary-400" />
                <a href="tel:+8801234567890" className="hover:text-primary-400 transition">
                  +880 123-456-7890
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2026 <span className="font-semibold text-white">Sreca</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-400">
              <button onClick={(e) => e.preventDefault()} className="hover:text-white transition">Terms</button>
              <span>•</span>
              <button onClick={(e) => e.preventDefault()} className="hover:text-white transition">Privacy</button>
              <span>•</span>
              <button onClick={(e) => e.preventDefault()} className="hover:text-white transition">Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
