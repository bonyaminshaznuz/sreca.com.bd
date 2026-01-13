import React from "react";
import {
  FaClock,
  FaCheck,
  FaSpinner,
  FaEnvelope,
  FaInfoCircle,
  FaArrowLeft,
  FaHome,
  FaPercentage,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";

function AffilatePending() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <main className="pt-20 sm:pt-24 lg:pt-28 pb-20 lg:pb-8">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6">

          {/* Pending Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 sm:p-8 lg:p-12 text-center transition-colors">

            {/* Icon */}
            <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaClock className="text-5xl text-yellow-500" />
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Your Affiliate Request Is Pending
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8">
              Thank you for your interest in joining Sreca's Affiliate Program!
              We are currently reviewing your application and will notify you via email
              once your account is approved.
            </p>

            {/* Status Timeline */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-800 mb-4">
                Application Status
              </h3>

              <div className="space-y-4">

                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Application Submitted
                    </p>
                    <p className="text-sm text-gray-500">
                      Your request has been received
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                    <FaSpinner className="text-white text-sm animate-spin" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Under Review</p>
                    <p className="text-sm text-gray-500">
                      Our team is reviewing your profile
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">
                      Approval Notification
                    </p>
                    <p className="text-sm text-gray-400">
                      You'll receive an email once approved
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Expected Timeline */}
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-primary-600 mt-1" />
                <div className="text-left">
                  <p className="font-medium text-primary-900 mb-1">
                    Expected Review Time
                  </p>
                  <p className="text-sm text-primary-700">
                    Applications are typically reviewed within 2-3 business days.
                    You'll receive an email notification once your status changes.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                <FaArrowLeft className="inline mr-2" />
                Go Back
              </button>

              <a
                href="/dashboard"
                className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
              >
                <FaHome className="inline mr-2" />
                Go to Dashboard
              </a>
            </div>

            {/* Contact Support */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Have questions about your application?
                <a
                  href="/chat"
                  className="text-primary-600 hover:underline font-medium ml-1"
                >
                  Contact Support
                </a>
              </p>
            </div>

          </div>

          {/* Benefits Preview */}
          <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
              What You'll Get as an Affiliate
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaPercentage className="text-3xl" />
                </div>
                <h3 className="font-semibold mb-2">High Commissions</h3>
                <p className="text-sm text-primary-100">
                  Earn up to 18% on every sale
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaChartLine className="text-3xl" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Tracking</h3>
                <p className="text-sm text-primary-100">
                  Monitor your sales and earnings
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaWallet className="text-3xl" />
                </div>
                <h3 className="font-semibold mb-2">Easy Withdrawals</h3>
                <p className="text-sm text-primary-100">
                  Withdraw funds anytime
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AffilatePending;
