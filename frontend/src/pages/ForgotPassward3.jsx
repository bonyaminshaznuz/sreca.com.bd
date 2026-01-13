import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaCheck } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { resetPassword } from '../api/auth';
import logoBlack from '../images/branding-black.png';
import logoWhite from '../images/branding-white.png';

function ForgotPassward3() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [matchError, setMatchError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Get email and OTP from localStorage
    const savedEmail = localStorage.getItem('resetPasswordEmail');
    const savedOTP = localStorage.getItem('resetPasswordOTP');
    
    if (savedEmail && savedOTP) {
      setEmail(savedEmail);
      setOtp(savedOTP);
    } else {
      // Redirect to step 1 if data not found
      navigate('/forgot-password-1');
    }
  }, [navigate]);

  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('Password strength');
  const [strengthColor, setStrengthColor] = useState('text-gray-500 dark:text-gray-400');

  useEffect(() => {
    // Check password requirements
    const newRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
    setRequirements(newRequirements);

    // Calculate strength
    const count = Object.values(newRequirements).filter(Boolean).length;
    setStrength(count);

    // Update strength text and color
    if (count === 0) {
      setStrengthText('Password strength');
      setStrengthColor('text-gray-500 dark:text-gray-400');
    } else if (count === 1) {
      setStrengthText('Weak');
      setStrengthColor('text-red-600 dark:text-red-400');
    } else if (count === 2) {
      setStrengthText('Fair');
      setStrengthColor('text-orange-600 dark:text-orange-400');
    } else if (count === 3) {
      setStrengthText('Good');
      setStrengthColor('text-yellow-600 dark:text-yellow-400');
    } else {
      setStrengthText('Strong');
      setStrengthColor('text-green-600 dark:text-green-400');
    }

    // Check password match
    if (confirmPassword && password !== confirmPassword) {
      setMatchError(true);
    } else {
      setMatchError(false);
    }
  }, [password, confirmPassword]);

  const getStrengthBarColor = (index) => {
    if (index >= strength) return 'bg-gray-200 dark:bg-gray-700';
    if (strength === 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMatchError(false);

    if (password !== confirmPassword) {
      setMatchError(true);
      setError('Passwords do not match');
      return;
    }

    if (!Object.values(requirements).every(Boolean)) {
      setError('Please meet all password requirements');
      return;
    }

    if (!email || !otp) {
      setError('Session expired. Please start again.');
      setTimeout(() => {
        navigate('/forgot-password-1');
      }, 2000);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPassword(email, otp, password, confirmPassword);
      
      if (response.success) {
        setSuccess(true);
        // Clear localStorage
        localStorage.removeItem('resetPasswordEmail');
        localStorage.removeItem('resetPasswordOTP');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md animate-fade-in">
        {/* Back Button */}
        <Link
          to="/forgot-password-2"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6 sm:mb-8 transition-all group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-sm sm:text-base" />
          <span className="font-medium text-sm sm:text-base">Back</span>
        </Link>

        {/* Form Card */}
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

          {/* Title */}
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              Set New Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Create a strong password for
            </p>
            <p className="text-gray-900 dark:text-white font-semibold mt-1 text-sm sm:text-base">
              {email || 'your account'}
            </p>
          </div>

          {/* New Password Field */}
          <div className="mb-6 relative z-10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 sm:py-3.5 pr-12 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-500 focus:border-transparent transition text-sm sm:text-base"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer"
              >
                {showPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            <div className="mt-3">
              <div className="flex gap-1 mb-2">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all ${getStrengthBarColor(index)}`}
                  />
                ))}
              </div>
              <p className={`text-xs font-medium ${strengthColor}`}>{strengthText}</p>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6 relative z-10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 sm:py-3.5 pr-12 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-500 focus:border-transparent transition text-sm sm:text-base"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
              </button>
            </div>
            {matchError && (
              <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 animate-shake">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl relative z-10">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl relative z-10">
              <p className="text-sm text-green-600 dark:text-green-400">Password reset successfully! Redirecting to login...</p>
            </div>
          )}

          {/* Password Requirements */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl relative z-10">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password must contain:
            </p>
            <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <li className={`flex items-center gap-2 transition ${requirements.length ? 'text-green-600 dark:text-green-400' : ''}`}>
                <FaCheckCircle className={`w-4 h-4 ${requirements.length ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`} />
                At least 8 characters
              </li>
              <li className={`flex items-center gap-2 transition ${requirements.uppercase ? 'text-green-600 dark:text-green-400' : ''}`}>
                <FaCheckCircle className={`w-4 h-4 ${requirements.uppercase ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`} />
                One uppercase letter
              </li>
              <li className={`flex items-center gap-2 transition ${requirements.lowercase ? 'text-green-600 dark:text-green-400' : ''}`}>
                <FaCheckCircle className={`w-4 h-4 ${requirements.lowercase ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`} />
                One lowercase letter
              </li>
              <li className={`flex items-center gap-2 transition ${requirements.number ? 'text-green-600 dark:text-green-400' : ''}`}>
                <FaCheckCircle className={`w-4 h-4 ${requirements.number ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`} />
                One number
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !Object.values(requirements).every(Boolean) || matchError}
            className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 text-white py-3 sm:py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/40 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 relative z-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm sm:text-base"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>Resetting...</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <FaCheck className="text-sm sm:text-base" />
              </>
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-medium transition hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassward3;