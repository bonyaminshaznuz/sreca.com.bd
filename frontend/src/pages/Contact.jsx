import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
            <main className="pt-20 lg:pt-24 pb-20 lg:pb-8">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-3">
                            Contact Us
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Get in touch with us. We'd love to hear from you.
                        </p>
                    </div>

                    {submitted && (
                        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-center">
                            Message sent successfully! We'll get back to you soon.
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {/* Contact Info */}
                        <a href="mailto:support@sreca.com.bd" className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-lg transition">
                            <FaEnvelope className="text-3xl text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Email</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">support@sreca.com.bd</p>
                        </a>

                        <a href="tel:+8801234567890" className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-lg transition">
                            <FaPhone className="text-3xl text-green-600 dark:text-green-400 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Phone</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">+880 123-456-7890</p>
                        </a>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                            <FaMapMarkerAlt className="text-3xl text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Address</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Dhaka, Bangladesh</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Send Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-colors"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
                            >
                                <FaPaperPlane />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
