import React from 'react';
import { FaRocket, FaEye, FaHeart, FaCheckCircle, FaUsers } from 'react-icons/fa';

export default function About() {
    const team = [
        {
            name: 'Kazi Bony Amin',
            role: 'CEO & Founder',
            image: 'https://ui-avatars.com/api/?name=Kazi+Bony+Amin&background=667eea&color=fff&size=200',
        },
        {
            name: 'Michael Khan',
            role: 'Head of Operations',
            image: 'https://ui-avatars.com/api/?name=Michael+Khan&background=f093fb&color=fff&size=200',
        },
        {
            name: 'Fatima Rahman',
            role: 'Marketing Director',
            image: 'https://ui-avatars.com/api/?name=Fatima+Rahman&background=4facfe&color=fff&size=200',
        },
        {
            name: 'Arif Hossain',
            role: 'Tech Lead',
            image: 'https://ui-avatars.com/api/?name=Arif+Hossain&background=00f2fe&color=fff&size=200',
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
            <main className="pt-20 lg:pt-24 pb-20 lg:pb-8">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-3">
                            About Sreca
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            The Name Of Happiness
                        </p>
                    </div>

                    {/* Story */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaRocket className="text-3xl text-primary-600 dark:text-primary-400" />
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Story</h2>
                        </div>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>
                                Founded in 2020, Sreca started with a simple mission: to bring happiness through quality products and exceptional service. What began as a small online store has grown into a trusted marketplace serving thousands of customers.
                            </p>
                            <p>
                                Our name "Sreca" means happiness in several languages, and that's exactly what we aim to deliver. We believe shopping should be enjoyable, convenient, and trustworthy.
                            </p>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <FaRocket className="text-2xl text-green-600 dark:text-green-400" />
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Mission</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                To provide an exceptional online shopping experience by offering high-quality products, competitive prices, and outstanding customer service.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <FaEye className="text-2xl text-primary-600 dark:text-primary-400" />
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Vision</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                To become the most trusted and loved e-commerce platform, known for bringing joy to millions of customers worldwide.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <FaHeart className="text-2xl text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Customer First</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Our customers are at the heart of everything we do.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <FaCheckCircle className="text-2xl text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Quality Assurance</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        We guarantee the highest quality in every purchase.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <FaRocket className="text-2xl text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Innovation</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        We continuously innovate for the best experience.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <FaEye className="text-2xl text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Transparency</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        We believe in honest and open communication.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meet the Team */}
                    <div className="mt-8">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <FaUsers className="text-3xl text-primary-600 dark:text-primary-400" />
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Meet the Team</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                The passionate people behind Sreca
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {team.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-lg transition"
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-primary-100 dark:border-primary-900"
                                    />
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {member.role}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
