import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { signup } from '../api/auth';
import logoBlack from "../images/branding-black.png";
import logoWhite from "../images/branding-white.png";

function Signup() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // Check if user is already logged in and redirect
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && user.id && user.email) {
          // User is already logged in, redirect to dashboard
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        // Invalid user data, clear it
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation for password fields
    if (name === 'password') {
      if (!value) {
        setFormErrors(prev => ({ ...prev, password: 'Password is required' }));
      } else if (value.length < 8) {
        setFormErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      } else {
        setFormErrors(prev => ({ ...prev, password: '' }));
        // Re-validate confirm password if it exists
        if (formData.confirmPassword) {
          if (formData.confirmPassword !== value) {
            setFormErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
          } else {
            setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
          }
        }
      }
    } else if (name === 'confirmPassword') {
      if (!value) {
        setFormErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password' }));
      } else if (formData.password !== value) {
        setFormErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    } else {
      // Clear errors when user types for other fields
      if (formErrors[name]) {
        setFormErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
    
    if (error) setError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Validate on blur
    if (name === 'name' && !value.trim()) {
      setFormErrors(prev => ({ ...prev, name: 'Name is required' }));
    } else if (name === 'email') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    } else if (name === 'password') {
      if (!value) {
        setFormErrors(prev => ({ ...prev, password: 'Password is required' }));
      } else if (value.length < 8) {
        setFormErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      }
    } else if (name === 'confirmPassword') {
      if (!value) {
        setFormErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password' }));
      } else if (formData.password !== value) {
        setFormErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      }
    }
  };

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (response.success) {
        setSuccess(response.message || 'Account created successfully!');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* ================= SIGNUP FORM ================= */}
      <div className="flex-1 flex items-center justify-center mt-16 sm:mt-20 lg:mt-24 mb-20 sm:mb-24 lg:mb-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl dark:shadow-gray-900/50 p-6 sm:p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
          autoComplete="off"
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <img
              src={isDarkMode ? logoWhite : logoBlack}
              className="h-10 sm:h-12 mx-auto mb-3 sm:mb-4"
              alt="Sreca"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Create an account
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">Welcome to Sreca.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-5 sm:space-y-6">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`peer w-full border ${formErrors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 ${formErrors.name ? 'focus:ring-red-500 dark:focus:ring-red-500' : 'focus:ring-black dark:focus:ring-gray-500'} transition`}
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white dark:peer-focus:bg-gray-700 peer-focus:px-1 peer-valid:text-xs peer-valid:-top-2 peer-valid:bg-white dark:peer-valid:bg-gray-700 peer-valid:px-1 transition-all"
              >
                Full Name
              </label>
              {formErrors.name && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                required
                className={`peer w-full border ${formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 ${formErrors.email ? 'focus:ring-red-500 dark:focus:ring-red-500' : 'focus:ring-black dark:focus:ring-gray-500'} transition`}
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white dark:peer-focus:bg-gray-700 peer-focus:px-1 peer-valid:text-xs peer-valid:-top-2 peer-valid:bg-white dark:peer-valid:bg-gray-700 peer-valid:px-1 transition-all"
              >
                Email
              </label>
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`peer w-full border ${formErrors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 ${formErrors.password ? 'focus:ring-red-500 dark:focus:ring-red-500' : 'focus:ring-black dark:focus:ring-gray-500'} transition`}
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white dark:peer-focus:bg-gray-700 peer-focus:px-1 peer-valid:text-xs peer-valid:-top-2 peer-valid:bg-white dark:peer-valid:bg-gray-700 peer-valid:px-1 transition-all"
              >
                Password
              </label>
              {formErrors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.password}</p>
              )}
              {formData.password && formData.password.length > 0 && formData.password.length < 8 && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {formData.password.length}/8 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`peer w-full border ${formErrors.confirmPassword ? 'border-red-500 dark:border-red-500' : formData.password && formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500 dark:border-green-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 ${formErrors.confirmPassword ? 'focus:ring-red-500 dark:focus:ring-red-500' : formData.password && formData.confirmPassword && formData.password === formData.confirmPassword ? 'focus:ring-green-500 dark:focus:ring-green-500' : 'focus:ring-black dark:focus:ring-gray-500'} transition`}
              />
              <label
                htmlFor="confirm-password"
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white dark:peer-focus:bg-gray-700 peer-focus:px-1 peer-valid:text-xs peer-valid:-top-2 peer-valid:bg-white dark:peer-valid:bg-gray-700 peer-valid:px-1 transition-all"
              >
                Confirm Password
              </label>
              {formErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.confirmPassword}</p>
              )}
              {formData.confirmPassword && formData.password && formData.password === formData.confirmPassword && !formErrors.confirmPassword && (
                <p className="mt-1 text-xs text-green-600 dark:text-green-400">✓ Passwords match</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-gray-700 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 transition text-sm sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-black dark:text-white font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
