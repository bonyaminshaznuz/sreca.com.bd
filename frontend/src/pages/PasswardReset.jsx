import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowLeft, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import logoBlack from '../images/branding-black.png';
import logoWhite from '../images/branding-white.png';

function PasswardReset() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate password change
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Password changed successfully!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md animate-fade-in">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 transition-colors border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-gray-400/20 to-slate-400/20 dark:from-gray-600/10 dark:to-slate-600/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-slate-400/20 to-gray-400/20 dark:from-slate-600/10 dark:to-gray-600/10 rounded-full blur-3xl opacity-60"></div>

          {/* Icon */}
          <div className="flex justify-center mb-6 sm:mb-8 relative z-10">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center shadow-xl shadow-gray-500/30 transform hover:scale-105 transition-transform">
              <FaLock className="text-2xl sm:text-3xl text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Change Password
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Update your account security
            </p>
          </div>

          {/* Current Password */}
          <div className="mb-5 sm:mb-6 relative z-10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (errors.currentPassword) {
                    setErrors({ ...errors, currentPassword: '' });
                  }
                }}
                className="w-full px-4 py-3 sm:py-3.5 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-500 focus:border-transparent transition text-sm sm:text-base"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {showCurrentPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
              </button>
            </div>
            {errors.currentPassword ? (
              <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 animate-shake">
                {errors.currentPassword}
              </p>
            ) : (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Enter your current password to continue
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-5 sm:mb-6 relative z-10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) {
                    setErrors({ ...errors, newPassword: '' });
                  }
                }}
                className="w-full px-4 py-3 sm:py-3.5 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-500 focus:border-transparent transition text-sm sm:text-base"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {showNewPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
              </button>
            </div>
            {errors.newPassword ? (
              <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 animate-shake">
                {errors.newPassword}
              </p>
            ) : (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Must be at least 8 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6 sm:mb-8 relative z-10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: '' });
                  }
                }}
                className="w-full px-4 py-3 sm:py-3.5 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-500 focus:border-transparent transition text-sm sm:text-base"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {showConfirmPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
              </button>
            </div>
            {errors.confirmPassword ? (
              <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 animate-shake">
                {errors.confirmPassword}
              </p>
            ) : (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Retype your new password
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 text-white py-3 sm:py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/40 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm sm:text-base mb-4"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>Changing...</span>
              </>
            ) : (
              <>
                <span>Change Password</span>
                <FaCheckCircle className="text-sm sm:text-base" />
              </>
            )}
          </button>

          {/* Back Link */}
          <div className="text-center relative z-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-xs" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswardReset;