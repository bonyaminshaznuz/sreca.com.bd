import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatarImg from '../images/avatar.png';
import miLogo from '../images/mi.png';

function MessageNotification() {
    const [activeTab, setActiveTab] = useState('messages');

    const messages = [
        { id: 1, title: 'HovShop', text: 'Your order has been granted. You will get your product soon.', time: '10:20', avatar: avatarImg },
        { id: 2, title: 'Sreca Support', text: 'Thank you for your purchase! Your order is being processed.', time: '09:45', avatar: avatarImg },
        { id: 3, title: 'Delivery Update', text: 'Your package is out for delivery and will arrive today.', time: 'Yesterday', avatar: avatarImg },
    ];

    const notifications = [
        { id: 1, title: 'Sreca 2021 bundle has arrived.', text: 'Join us on the Sreca 2021 bundle and get exciting prices.', time: '10:08', avatar: miLogo },
        { id: 2, title: 'Sreca 2021 bundle has arrived.', text: 'Join us on the Sreca 2021 bundle and get exciting prices.', time: '10:08', avatar: miLogo },
    ];

    return (
        <div className="page-body-mess-noti max-w-md mx-auto mt-14 px-3 sm:px-4 md:px-0 mb-20 transition-colors duration-300">
            {/* Tabs */}
            <div className="sticky top-14 z-20 bg-white dark:bg-gray-800 flex border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`flex-1 py-2.5 sm:py-3 text-center font-semibold transition text-sm sm:text-base ${activeTab === 'messages' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                >
                    Messages
                </button>
                <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex-1 py-2.5 sm:py-3 text-center font-semibold transition text-sm sm:text-base ${activeTab === 'notifications' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                >
                    Notifications
                </button>
            </div>

            {/* Messages */}
            {activeTab === 'messages' && (
                <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                    {messages.map(msg => (
                        <Link
                            key={msg.id}
                            to="/chat"
                            className="block bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md dark:shadow-gray-900/50 hover:shadow-lg p-3 sm:p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 border border-transparent hover:border-primary-100 dark:hover:border-primary-800 flex items-start gap-2.5 sm:gap-3"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary-500 overflow-hidden flex-shrink-0">
                                <img src={msg.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">{msg.title}</h3>
                                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">{msg.time}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{msg.text}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
                <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                    {notifications.map(noti => (
                        <div
                            key={noti.id}
                            className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md dark:shadow-gray-900/50 hover:shadow-lg p-3 sm:p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 border border-transparent hover:border-primary-100 dark:hover:border-primary-800 flex items-start gap-2.5 sm:gap-3"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary-500 dark:border-primary-400 overflow-hidden flex-shrink-0">
                                <img src={noti.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base">{noti.title}</h4>
                                    <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0">{noti.time}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{noti.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MessageNotification;
