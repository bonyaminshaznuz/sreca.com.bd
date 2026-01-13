import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaArrowRight, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { sendPasswordResetOTP } from '../api/auth';
import logoBlack from '../images/branding-black.png';
import logoWhite from '../images/branding-white.png';

function ForgotPassward1() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setShowSuccess(false);

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendPasswordResetOTP(email.toLowerCase());
      
      if (response.success) {
        setShowSuccess(true);
        // Store email in localStorage for next steps
        localStorage.setItem('resetPasswordEmail', email.toLowerCase());
        
        // Navigate to next step after 2 seconds
        setTimeout(() => {
          navigate('/forgot-password-2');
        }, 2000);
      } else {
        setEmailError(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setEmailError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 sm:mb-8 transition-all group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-sm sm:text-base" />
          <span className="font-medium text-sm sm:text-base">Back to Login</span>
        </Link>

        <form onSubmit={handleSubmit} className="w-full bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-colors border border-gray-100 dark:border-gray-700">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-primary-400/20 to-primary-500/20 dark:from-primary-600/10 dark:to-primary-700/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-primary-400/20 to-gray-400/20 dark:from-primary-600/10 dark:to-gray-600/10 rounded-full blur-3xl opacity-60"></div>

          {/* Icon */}
          <div className="relative z-10 flex justify-center mb-6 sm:mb-8">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center shadow-xl shadow-primary-500/30 transform hover:scale-105 transition-transform">
              <FaEnvelope className="text-2xl sm:text-3xl text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
              Forgot your password?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed px-2">
              Enter your email to receive a verification code to reset your password.
            </p>
          </div>

          {/* Input */}
          <div className="space-y-4 sm:space-y-6 mb-6 relative z-10">
            <div className="relative">
              <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 text-sm sm:text-base" />
                </div>
                <input
                  type="email"
                  id="emailInput"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 transition-all placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500"
                  placeholder="you@example.com"
                />
              </div>
              {emailError && (
                <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center gap-1 animate-shake">
                  <FaExclamationCircle className="flex-shrink-0" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="mt-6 sm:mt-8 relative z-10">
            {!isLoading ? (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 sm:py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>Send Verification Code</span>
                <FaArrowRight className="text-sm sm:text-base" />
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="w-full bg-gray-400 text-white py-3 sm:py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed text-sm sm:text-base"
              >
                <FaSpinner className="animate-spin text-sm sm:text-base" />
                <span>Sending...</span>
              </button>
            )}
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl animate-fade-in shadow-lg relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 text-green-800 dark:text-green-400">
                <FaCheckCircle className="text-lg sm:text-xl flex-shrink-0" />
                <span className="font-medium text-xs sm:text-sm">Email sent successfully! Check your inbox.</span>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="mt-6 sm:mt-8 text-center relative z-10">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Need help?{' '}
            <Link 
              to="/contact" 
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-6 sm:mt-8 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-800">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <FaCheckCircle className="text-primary-600 dark:text-primary-400 text-sm" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Security Notice</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                For your security, the verification code will expire in 15 minutes. If you don't receive the email, please check your spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassward1;