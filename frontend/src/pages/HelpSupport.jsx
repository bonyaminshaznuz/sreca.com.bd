import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaPaperPlane,
  FaBraille,
  FaTruckLoading,
  FaBox,
  FaUser,
  FaTruck,
  FaMoneyBill,
  FaChevronDown,
  FaComments,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

import avatar from "../images/avatar.png";
import supportLogo from "../images/mi.png";

function HelpSupport() {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [question, setQuestion] = useState("");

  const askQuestion = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      alert("Please enter a question!");
      return;
    }
    alert(
      "Thank you for your question! Our support team will respond within 2 hours."
    );
    setQuestion("");
  };

  const filterQuestions = (category) => {
    setActiveFilter(category);
  };

  const questions = [
    {
      name: "Forhad Khan",
      question: "How to order something?",
      category: "order",
      badge: "Order",
      answer:
        "Click on the add to cart button then checkout the product with additional information, select your payment method and continue to the payment process to complete your order.",
    },
    {
      name: "Rahima Akter",
      question: "What payment methods do you accept?",
      category: "payment",
      badge: "Payment",
      answer:
        "We accept multiple payment methods including bKash, Nagad, Rocket, and Cash on Delivery.",
    },
    {
      name: "Karim Ahmed",
      question: "How long does delivery take?",
      category: "delivery",
      badge: "Delivery",
      answer:
        "Standard delivery typically takes 2-5 business days depending on your location.",
    },
    {
      name: "Nasrin Sultana",
      question: "Can I return a product if I'm not satisfied?",
      category: "product",
      badge: "Product",
      answer:
        "Yes! We offer a 7-day return policy. The product must be in original condition.",
    },
    {
      name: "Sabbir Rahman",
      question: "How do I reset my password?",
      category: "account",
      badge: "Account",
      answer:
        "Click on 'Forgot Password' on the login page and follow the email instructions.",
    },
  ];

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <main className="pt-20 lg:pt-24 pb-20 lg:pb-8 bg-white dark:bg-gray-900 min-h-screen transition-colors">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">

          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl shadow-xl p-8 lg:p-10 text-white mb-8">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <div className="w-16 h-16 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaQuestionCircle className="text-3xl" />
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Help & Support
              </h1>
              <p className="text-primary-100 dark:text-primary-50 mb-6">
                Find answers to your questions or ask us anything
              </p>

              <form onSubmit={askQuestion} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-800 border-2 border-white/30 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-primary-400 focus:border-transparent"
                />
                <button type="submit" className="px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition">
                  <FaPaperPlane className="inline mr-2" />
                  Ask
                </button>
              </form>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 transition-colors">
            <div className="flex flex-wrap gap-2">
              {[
                ["all", <FaBraille />],
                ["order", <FaTruckLoading />],
                ["product", <FaBox />],
                ["account", <FaUser />],
                ["delivery", <FaTruck />],
                ["payment", <FaMoneyBill />],
              ].map(([key, icon]) => (
                <button
                  key={key}
                  onClick={() => filterQuestions(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                    activeFilter === key
                      ? "bg-black dark:bg-primary-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {icon}
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {questions
              .filter(
                (q) => activeFilter === "all" || q.category === activeFilter
              )
              .map((q, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors">
                  <div className="flex gap-3 mb-3">
                    <img src={avatar} alt="" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{q.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{q.question}</p>
                    </div>
                    <span className="self-center px-3 py-1.5 bg-primary-500 dark:bg-primary-600 text-white text-xs font-semibold rounded shadow-sm hover:shadow-md transition-shadow whitespace-nowrap">
                      {q.badge}
                    </span>
                  </div>

                  <div className="bg-primary-50 dark:bg-gray-700 rounded-xl p-4 border-l-4 border-primary-600 dark:border-primary-500 flex gap-3 transition-colors">
                    <img
                      src={supportLogo}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-primary-900 dark:text-primary-300">
                        Sreca Support
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{q.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Show More */}
          <div className="text-center mt-6">
            <button
              onClick={() => alert("More questions coming soon!")}
              className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FaChevronDown className="inline mr-2" />
              Show More Questions
            </button>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mt-8 grid md:grid-cols-3 gap-4 text-center transition-colors">
            <a href="/chat" className="p-6 bg-primary-50 dark:bg-primary-900/30 rounded-xl transition-all hover:shadow-xl hover:scale-105 hover:bg-primary-100 dark:hover:bg-primary-900/50 cursor-pointer block">
              <FaComments className="text-3xl mx-auto mb-2 text-primary-600 dark:text-primary-400 transition-transform hover:scale-110" />
              <p className="font-semibold text-gray-900 dark:text-white">Live Chat</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Chat with us now</p>
            </a>
            <a href="mailto:support@sreca.com.bd" className="p-6 bg-green-50 dark:bg-green-900/30 rounded-xl transition-all hover:shadow-xl hover:scale-105 hover:bg-green-100 dark:hover:bg-green-900/50 cursor-pointer block">
              <FaEnvelope className="text-3xl mx-auto mb-2 text-green-600 dark:text-green-400 transition-transform hover:scale-110" />
              <p className="font-semibold text-gray-900 dark:text-white">Email Support</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">support@sreca.com.bd</p>
            </a>
            <a href="tel:+8801234567890" className="p-6 bg-primary-50 dark:bg-primary-900/30 rounded-xl transition-all hover:shadow-xl hover:scale-105 hover:bg-primary-100 dark:hover:bg-primary-900/50 cursor-pointer block">
              <FaPhone className="text-3xl mx-auto mb-2 text-primary-600 dark:text-primary-400 transition-transform hover:scale-110" />
              <p className="font-semibold text-gray-900 dark:text-white">Call Us</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">+880 123 456 7890</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HelpSupport;
