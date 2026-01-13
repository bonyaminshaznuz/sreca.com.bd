import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaAt, FaWallet, FaHandHoldingUsd, FaCheck, FaClock, FaPaperPlane, FaInfoCircle } from 'react-icons/fa';

// Import payment images
import bkashImg from "../images/payments/bkash.png";
import nagadImg from "../images/payments/nogod.png";
import rocketImg from "../images/payments/rocket.png";

function Withdraw() {
  const [selectedMethod, setSelectedMethod] = useState('nagad');
  const [amount, setAmount] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', img: bkashImg },
    { id: 'nagad', name: 'Nagad', img: nagadImg },
    { id: 'rocket', name: 'Rocket', img: rocketImg }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ amount, mobileNumber, method: selectedMethod });
    alert('Withdrawal request submitted successfully!');
  };

  return (
    <div className="flex-1 px-4 py-20 lg:py-24 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Withdraw Funds</h1>
          <p className="text-gray-600 dark:text-gray-400">Request a withdrawal to your mobile wallet</p>
        </div>

        {/* User Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-black dark:bg-gray-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Name</p>
                <p className="text-gray-900 dark:text-white font-medium">User details</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-black dark:bg-gray-600 rounded-full flex items-center justify-center">
                <FaAt className="text-white text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
                <p className="text-gray-900 dark:text-white font-medium text-sm">Userdetails60@outlook.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <FaWallet className="text-white text-sm" />
              </div>
              <div>
                <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide font-semibold">Available Balance</p>
                <p className="text-gray-900 dark:text-white font-bold text-xl">৳15,500</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <FaHandHoldingUsd className="text-white text-sm" />
              </div>
              <div>
                <p className="text-xs text-primary-600 dark:text-primary-400 uppercase tracking-wide font-semibold">Total Withdrawn</p>
                <p className="text-gray-900 dark:text-white font-bold text-xl">৳8,200</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Withdrawal Method</h2>
          <div className="grid grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                className={`p-6 border-2 rounded-xl transition-all ${
                  selectedMethod === method.id
                    ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-700 shadow-md'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <img src={method.img} alt={method.name} className="w-full h-16 object-contain mb-2" />
                <p className={`text-sm font-medium ${
                  selectedMethod === method.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>{method.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Withdraw Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Withdrawal Form</h2>

          {/* Amount Input */}
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Withdrawal Amount (৳)
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="500"
              max="15500"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition"
              placeholder="Enter amount (Min: ৳500, Max: ৳15,500)"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Minimum withdrawal: ৳500 | Maximum: ৳15,500</p>
          </div>

          {/* Mobile Number Input */}
          <div className="space-y-2">
            <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {paymentMethods.find(m => m.id === selectedMethod)?.name} Mobile Number
            </label>
            <input
              id="mobile-number"
              name="mobileNumber"
              type="tel"
              required
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition"
              placeholder="01XXXXXXXXX"
              pattern="[0-9]{11}"
              maxLength="11"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Enter your 11-digit mobile wallet number</p>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex gap-3">
              <FaInfoCircle className="text-yellow-600 dark:text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-1">Important Notice</h3>
                <ul className="text-xs text-yellow-800 dark:text-yellow-400 space-y-1">
                  <li>• Processing time: 24-48 hours on business days</li>
                  <li>• Make sure the mobile number is correct and active</li>
                  <li>• Withdrawal fee: 2% of the amount</li>
                  <li>• Contact support if you face any issues</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <FaPaperPlane className="mr-2" />
              Submit Withdrawal Request
            </button>
            <Link
              to="/dashboard"
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Recent Withdrawals */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mt-6 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Withdrawals</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 dark:text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">৳5,000</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">bKash - 01712345678</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600 dark:text-green-500">Completed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dec 28, 2025</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <FaClock className="text-yellow-600 dark:text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">৳3,200</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Nagad - 01887654321</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">Pending</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Jan 2, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;