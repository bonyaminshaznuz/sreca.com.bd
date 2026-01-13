import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaCheckCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { verifyPasswordResetOTP, resendPasswordResetOTP } from '../api/auth';
import logoBlack from '../images/branding-black.png';
import logoWhite from '../images/branding-white.png';

function ForgotPassward2() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('');
  const { isDarkMode } = useTheme();
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage
    const savedEmail = localStorage.getItem('resetPasswordEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // Redirect to step 1 if no email found
      navigate('/forgot-password-1');
    }
  }, [navigate]);

  useEffect(() => {
    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    setOtpError('');

    if (otpValue.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }

    if (!email) {
      setOtpError('Email not found. Please start again.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyPasswordResetOTP(email, otpValue);
      
      if (response.success) {
        // Store OTP in localStorage for next step
        localStorage.setItem('resetPasswordOTP', otpValue);
        navigate('/forgot-password-3');
      } else {
        setOtpError(response.message || 'Invalid code. Please try again.');
      }
    } catch (err) {
      setOtpError(err.message || 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || !email) return;
    
    setIsResending(true);
    setOtpError('');

    try {
      const response = await resendPasswordResetOTP(email);
      
      if (response.success) {
        setTimer(900); // Reset to 15 minutes
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        setOtpError(response.message || 'Failed to resend code. Please try again.');
      }
    } catch (err) {
      setOtpError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md animate-fade-in">
        {/* Back Button */}
        <Link
          to="/forgot-password-1"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 mb-6 sm:mb-8 transition-all group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-sm sm:text-base" />
          <span className="font-medium text-sm sm:text-base">Back</span>
        </Link>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 transition-colors border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-green-400/20 to-teal-400/20 dark:from-green-600/10 dark:to-teal-600/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-teal-400/20 to-emerald-400/20 dark:from-teal-600/10 dark:to-emerald-600/10 rounded-full blur-3xl opacity-60"></div>

          {/* Icon */}
          <div className="flex justify-center mb-6 sm:mb-8 relative z-10">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-teal-600 flex items-center justify-center shadow-xl shadow-green-500/30 transform hover:scale-105 transition-transform">
              <FaCheckCircle className="text-2xl sm:text-3xl text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              Verify Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              We've sent a 6-digit code to
            </p>
            <p className="text-gray-900 dark:text-white font-semibold mt-1 text-sm sm:text-base">
              {email || 'your email'}
            </p>
          </div>

          {/* OTP Input Boxes */}
          <div className="mb-6 sm:mb-8 relative z-10">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-xl sm:text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400 transition hover:border-gray-400 dark:hover:border-gray-500"
                />
              ))}
            </div>
            {otpError && (
              <p className="mt-3 text-xs sm:text-sm text-red-600 dark:text-red-400 text-center animate-shake">
                {otpError}
              </p>
            )}
          </div>

          {/* Timer */}
          <div className="text-center mb-6 relative z-10">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Code expires in{' '}
              <span className={`font-semibold ${timer < 60 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                {formatTime(timer)}
              </span>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 sm:py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 relative z-10 text-sm sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Verify Code</span>
                <FaCheck className="text-sm sm:text-base" />
              </>
            )}
          </button>

          {/* Resend */}
          <div className="mt-6 text-center relative z-10">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || isResending}
                className={`font-semibold transition hover:underline ${
                  canResend && !isResending
                    ? 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 cursor-pointer'
                    : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                {isResending ? 'Resending...' : 'Resend Code'}
              </button>
            </p>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Having trouble?{' '}
            <Link
              to="/contact"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-6 sm:mt-8 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <FaCheckCircle className="text-green-600 dark:text-green-400 text-sm" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Verification Tips</h3>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Check your spam folder if you don't see the email</li>
                <li>• The code is valid for 5 minutes only</li>
                <li>• You can paste the entire 6-digit code at once</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassward2;