import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';
import { login } from '../api/auth';
import logoBlack from "../images/branding-black.png";
import logoWhite from "../images/branding-white.png";
import googleLogo from "../images/google-logo.png";
import facebookLogo from "../images/facebook-logo.png";

function Login() {
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
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
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
        // Clear errors when user types
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        if (error) setError('');
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        
        // Validate on blur
        if (name === 'email') {
            if (!value.trim()) {
                setFormErrors(prev => ({ ...prev, email: 'Email is required' }));
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            }
        } else if (name === 'password') {
            if (!value) {
                setFormErrors(prev => ({ ...prev, password: 'Password is required' }));
            }
        }
    };

    const validateForm = () => {
        const errors = {
            email: '',
            password: ''
        };
        let isValid = true;

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
            const response = await login(formData.email, formData.password);

            if (response.success) {
                setSuccess(response.message || 'Login successful!');
                // Store user data in localStorage
                if (response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                }
                // Redirect to dashboard after 1 second
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                setError(response.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            const errorMessage = err.message || 'An error occurred. Please try again.';
            setError(errorMessage);
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <>
            {/* ================= LOGIN CARD ================= */}
            <div className="flex-1 flex items-center justify-center mt-16 sm:mt-20 lg:mt-24 mb-20 sm:mb-24 lg:mb-10 px-4">
                <form 
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl dark:shadow-gray-900/50 p-6 sm:p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
                >
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <img src={isDarkMode ? logoWhite : logoBlack} className="h-10 sm:h-12 mx-auto mb-3 sm:mb-4" alt="Brand" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Login to your account</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">Welcome back!</p>
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
                                autoComplete="current-password"
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
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 sm:mt-6 space-y-5 sm:space-y-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black dark:bg-gray-700 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 transition text-sm sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <Link
                            to="/forgot-password-1"
                            className="block w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                        >
                            Forgot password?
                        </Link>

                        {/* Divider */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
                            <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">or</span>
                            <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
                        </div>

                        {/* Social Login */}
                        <div className="flex gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={() => alert('Google login coming soon!')}
                                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-2 flex justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                <img src={googleLogo} className="h-5 sm:h-6" alt="Google" />
                            </button>
                            <button
                                type="button"
                                onClick={() => alert('Facebook login coming soon!')}
                                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-2 flex justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                <img src={facebookLogo} className="h-5 sm:h-6" alt="Facebook" />
                            </button>
                        </div>

                        {/* Signup */}
                        <div className="text-center">
                            <Link
                                to="/signup"
                                className="inline-block mt-2 text-sm font-medium text-black dark:text-white hover:underline transition"
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
