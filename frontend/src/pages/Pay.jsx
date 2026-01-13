import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaCheck,
  FaCreditCard,
  FaMobileAlt,
  FaMoneyBillWave,
  FaCcVisa,
  FaCcMastercard,
  FaLock,
  FaShieldAlt,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

// Import images
import bkashImg from "../images/payments/bkash.png";
import nagadImg from "../images/payments/nogod.png"; // Note: file is named nogod.png
import rocketImg from "../images/payments/rocket.png";
import upayImg from "../images/payments/upay.png";
import nexusImg from "../images/payments/nexus-pay.jpg";
import cardImg from "../images/payments/card.png";
import codImg from "../images/payments/cod.png";
import productImg from "../images/product.png";

function Pay() {
  const { method } = useParams();
  const navigate = useNavigate();
  const [selectedMobileProvider, setSelectedMobileProvider] = useState(null);

  // Default to card if no method or invalid method
  useEffect(() => {
    if (!method || !["card", "mobile", "cod"].includes(method)) {
      navigate("/pay/card", { replace: true });
    }
  }, [method, navigate]);

  const activeMethod = method || "card";

  const handleMethodChange = (newMethod) => {
    navigate(`/pay/${newMethod}`);
    setSelectedMobileProvider(null); // Reset mobile provider when switching tabs
  };

  const confirmOrder = () => {
    alert("Order confirmed! Thank you for your purchase.");
    // In a real app, you would handle the order processing here
  };

  return (
    <main className="flex-1 pt-14 lg:pt-[56px] pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Progress Steps */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  <FaCheck />
                </div>
                <span className="text-xs mt-2 font-medium text-gray-700 dark:text-gray-300">Cart</span>
              </div>
              <div className="w-20 lg:w-32 h-1 bg-primary-600"></div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  <FaCheck />
                </div>
                <span className="text-xs mt-2 font-medium text-gray-700 dark:text-gray-300">Checkout</span>
              </div>
              <div className="w-20 lg:w-32 h-1 bg-primary-600"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                3
              </div>
              <span className="text-xs mt-2 font-semibold text-gray-900 dark:text-white">Payment</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Payment Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 lg:p-8 animate-fade-in transition-colors">
            {/* Selected Payment Method Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b dark:border-gray-700 gap-4">
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">Payment Details</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Complete your purchase securely</p>
              </div>
              <div className="text-left sm:text-right bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 px-4 py-3 rounded-xl border border-primary-100 dark:border-primary-800">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Total Amount</p>
                <p className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">৳4,650</p>
              </div>
            </div>

            <div className="flex gap-3 mb-6 overflow-x-auto p-2 scrollbar-hide">
              <button
                onClick={() => handleMethodChange("card")}
                className={`flex-1 min-w-[100px] px-4 py-3.5 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm ${
                  activeMethod === "card"
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-[1.02] border-2 border-primary-400 dark:border-primary-600"
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500"
                }`}
              >
                <FaCreditCard className="mr-2" />
                Card
              </button>
              <button
                onClick={() => handleMethodChange("mobile")}
                className={`flex-1 min-w-[100px] px-4 py-3.5 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm ${
                  activeMethod === "mobile"
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-[1.02] border-2 border-primary-400 dark:border-primary-600"
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500"
                }`}
              >
                <FaMobileAlt className="mr-2" />
                Mobile
              </button>
              <button
                onClick={() => handleMethodChange("cod")}
                className={`flex-1 min-w-[100px] px-4 py-3.5 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm ${
                  activeMethod === "cod"
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 scale-[1.02] border-2 border-green-400 dark:border-green-600"
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500"
                }`}
              >
                <FaMoneyBillWave className="mr-2" />
                COD
              </button>
            </div>

            {/* Card Payment Form */}
            {activeMethod === "card" && (
              <div className="space-y-4 animate-fade-in">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number *</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <FaCcVisa className="text-2xl text-primary-600" />
                        <FaCcMastercard className="text-2xl text-red-600" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV *</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength="3"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" id="save-card" className="w-4 h-4 text-primary-600 rounded" />
                    <label htmlFor="save-card" className="text-sm text-gray-600 dark:text-gray-400">
                      Save card for future purchases
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={confirmOrder}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-900 text-white py-3.5 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-800 transition mt-6 flex items-center justify-center"
                  >
                    <FaLock className="mr-2" />
                    Pay ৳4,650
                  </button>
                </form>
              </div>
            )}

            {/* Mobile Banking Payment Form */}
            {activeMethod === "mobile" && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {[
                    { id: "bkash", name: "bKash", img: bkashImg },
                    { id: "nagad", name: "Nagad", img: nagadImg },
                    { id: "rocket", name: "Rocket", img: rocketImg },
                    { id: "upay", name: "Upay", img: upayImg },
                    { id: "nexus", name: "Nexus", img: nexusImg },
                  ].map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => setSelectedMobileProvider(provider.id)}
                      className={`p-2 border-2 rounded-lg transition text-center flex flex-col items-center justify-center bg-white dark:bg-gray-700 ${
                        selectedMobileProvider === provider.id
                          ? "border-primary-500 ring-2 ring-primary-500/20"
                          : "border-gray-100 dark:border-gray-600 hover:border-primary-300"
                      }`}
                    >
                      <img src={provider.img} alt={provider.name} className="h-8 w-auto mb-2 object-contain" />
                      <p className="font-semibold text-[10px] text-gray-800 dark:text-gray-200 uppercase">{provider.name}</p>
                    </button>
                  ))}
                </div>

                {selectedMobileProvider && (
                  <div className="animate-fade-in-up">
                    <form className="space-y-4 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {selectedMobileProvider.charAt(0).toUpperCase() + selectedMobileProvider.slice(1)} Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          maxLength="11"
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                        />
                      </div>
                      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
                        <p className="text-sm text-gray-700 dark:text-primary-300 mb-2">
                          <strong>Instructions:</strong>
                        </p>
                        <ol className="text-sm text-gray-600 dark:text-primary-400 space-y-1 list-decimal list-inside">
                          <li>Enter your mobile number</li>
                          <li>You will receive a payment request</li>
                          <li>Enter your PIN to confirm payment</li>
                        </ol>
                      </div>
                      <button
                        type="button"
                        onClick={confirmOrder}
                        className="w-full bg-gradient-to-r from-primary-500 to-secondary-900 text-white py-3.5 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-800 transition mt-6 flex items-center justify-center"
                      >
                        <FaMobileAlt className="mr-2" />
                        Send Payment Request
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* Cash on Delivery */}
            {activeMethod === "cod" && (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMoneyBillWave className="text-3xl text-green-600 dark:text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Cash on Delivery</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Pay when you receive your order</p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-700 dark:text-yellow-300 mb-2">
                    <strong>
                      <FaInfoCircle className="inline mr-2 text-yellow-600 dark:text-yellow-500" />
                      Important:
                    </strong>
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-yellow-400 space-y-1 list-disc list-inside">
                    <li>Have exact change ready</li>
                    <li>Inspect products before payment</li>
                    <li>Additional COD fee: ৳20</li>
                  </ul>
                </div>

                <div className="space-y-2 text-left mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Order Total</span>
                    <span>৳4,650</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>COD Fee</span>
                    <span>৳20</span>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-2 flex justify-between text-lg font-bold text-gray-800 dark:text-white">
                    <span>Total Amount</span>
                    <span>৳4,670</span>
                  </div>
                </div>

                <button
                  onClick={confirmOrder}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-900 text-white py-3.5 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-800 transition flex items-center justify-center"
                >
                  <FaCheckCircle className="mr-2" />
                  Confirm Order
                </button>
              </div>
            )}

            {/* Security Info */}
            <div className="mt-6 pt-6 border-t dark:border-gray-700">
              <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <FaLock />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt />
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mt-6 animate-fade-in transition-colors" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Order Summary</h2>
            <div className="space-y-3">
              {[
                { name: "Premium T-Shirt", desc: "Size: L × 1", price: "৳450" },
                { name: "Running Shoes", desc: "Size: 42 × 1", price: "৳1,500" },
                { name: "Smart Watch", desc: "Color: Silver × 1", price: "৳3,400" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 pb-3 border-b dark:border-gray-700 last:border-0 last:pb-0">
                  <img src={productImg} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-800 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    <span className="font-semibold text-sm dark:text-gray-200">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Pay;
