import React from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaWallet,
  FaHeadset,
  FaBox,
  FaLink,
  FaArrowLeft,
  FaPaperPlane,
  FaInfoCircle,
} from "react-icons/fa";

function AffilateRequest() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <main className="pt-20 sm:pt-24 lg:pt-28 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">

          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 text-white mb-6 sm:mb-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-4xl" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Want to be an Affiliate?
              </h1>
              <p className="text-lg text-primary-100 max-w-2xl mx-auto">
                Sreca provides their users an affiliate program to earn money by advertising products on
                social media platforms and other channels. Join our affiliate program to start earning today!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-3xl font-bold mb-1">10-18%</p>
                <p className="text-sm text-primary-100">Commission Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-3xl font-bold mb-1">৳500</p>
                <p className="text-sm text-primary-100">Min. Withdrawal</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-3xl font-bold mb-1">24/7</p>
                <p className="text-sm text-primary-100">Support Available</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 p-6 sm:p-8 mb-6 sm:mb-8 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
              Why Join Our Affiliate Program?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FaMoneyBillWave className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    High Commission Rates
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Earn up to 18% commission on every sale you refer
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FaChartLine className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Real-Time Tracking
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitor your sales and earnings in real-time
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaWallet className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Easy Withdrawals
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Withdraw anytime via bKash, Nagad, or Rocket
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FaHeadset className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Dedicated Support
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get 24/7 support from our affiliate team
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FaBox className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Wide Product Range
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Promote hundreds of quality products
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FaLink className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Custom Links
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Unique affiliate links for every product
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              How It Works
            </h2>

            <div className="space-y-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {[
                        "Request to Join",
                        "Get Approved",
                        "Promote Products",
                        "Earn Commission",
                      ][step - 1]}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {[
                        "Submit your request and we’ll review it within 2-3 business days",
                        "Access your affiliate dashboard after approval",
                        "Share your links on social media or websites",
                        "Earn commission on every successful sale",
                      ][step - 1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Ready to Start Earning?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of affiliates who are already earning with Sreca.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                <FaArrowLeft className="inline mr-2" />
                Go Back
              </button>

              <a
                href="/affiliate-pending"
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition shadow-lg"
              >
                <FaPaperPlane className="inline mr-2" />
                Request Affiliate Access
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <FaInfoCircle className="inline mr-1" />
                By requesting affiliate access, you agree to our{" "}
                <a href="#" className="text-primary-600 hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AffilateRequest;
