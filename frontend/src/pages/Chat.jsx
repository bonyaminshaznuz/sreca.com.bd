import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaEllipsisV, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import miLogo from "../images/mi.png";
import avatarImg from "../images/avatar.png";

const ChatMain = () => {
  const [messages, setMessages] = useState([
    {
      type: "received",
      text: "Hello sir, How can I help you?",
      time: "10:30 AM",
      avatar: miLogo,
    },
    {
      type: "sent",
      text: "I need a Flower tob from your shop. Is this available right now?",
      time: "10:31 AM",
      avatar: avatarImg,
    },
    {
      type: "received",
      text: "Yes, sure. We have it in stock.",
      time: "10:32 AM",
      avatar: miLogo,
    },
    {
      type: "received",
      text: "Give me your address details",
      time: "10:32 AM",
      avatar: miLogo,
    },
    {
      type: "sent",
      text: "Is it possible??",
      time: "10:33 AM",
      avatar: avatarImg,
    },
    {
      type: "sent",
      text: "My Budget is 50 euro",
      time: "10:33 AM",
      avatar: avatarImg,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const newMsg = {
      type: "sent",
      text: newMessage,
      time,
      avatar: avatarImg,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
      {/* Chat Header */}
      <div className="fixed top-14 lg:top-[56px] left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 z-40 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
          <button className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
            <FaArrowLeft className="text-gray-600 dark:text-gray-300 text-sm sm:text-base" />
          </button>

          <div className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 rounded-full overflow-hidden border-2 border-primary-500 dark:border-primary-400 shadow-sm flex-shrink-0">
            <img src={miLogo} alt="Mi Electronics" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">Mi Electronics Limited</h2>
            <p className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 flex items-center gap-1 sm:gap-1.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span> Online
            </p>
          </div>

          <button className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition flex-shrink-0">
            <FaEllipsisV className="text-gray-600 dark:text-gray-300 text-sm sm:text-base" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 pt-28 sm:pt-32 lg:pt-28 pb-32 sm:pb-40 lg:pb-24 space-y-3 sm:space-y-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      >
        {/* Date Divider */}
        <div className="flex items-center justify-center my-3 sm:my-4">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-gray-600 font-medium shadow-sm">
            Today
          </span>
        </div>

        {/* Messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 sm:gap-2.5 ${msg.type === "sent" ? "flex-row-reverse" : ""} animate-[slideUp_0.3s_ease-out]`}
          >
            <div className={`h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 rounded-full overflow-hidden border-2 shadow-sm flex-shrink-0 ${msg.type === "sent" ? "border-primary-500" : "border-gray-200"}`}>
              <img src={msg.avatar} className="w-full h-full object-cover" />
            </div>
            <div className={`flex flex-col gap-0.5 sm:gap-1 max-w-[80%] sm:max-w-[75%] ${msg.type === "sent" ? "items-end" : ""}`}>
              <div
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm ${
                  msg.type === "sent" ? "rounded-tr-md bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md" : "rounded-tl-md bg-white shadow-md text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 px-1 sm:px-2">{msg.time}</span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        <div className="flex items-start gap-2 sm:gap-2.5">
          <div className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm flex-shrink-0">
            <img src={miLogo} className="w-full h-full object-cover" />
          </div>
          <div className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl rounded-tl-md bg-white shadow-md">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input Form */}
      <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
          >
            <FaPaperclip className="text-gray-600 text-xs sm:text-sm" />
          </button>
          <input type="file" id="fileInput" className="hidden" accept="image/*,video/*,application/pdf" />
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full h-9 sm:h-10 lg:h-11 px-3 sm:px-4 pr-10 sm:pr-12 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm transition"
            />
            <button type="button" className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-base sm:text-lg hover:scale-110 transition">
              😊
            </button>
          </div>
          <button
            type="submit"
            className="flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center transition shadow-md hover:shadow-lg"
          >
            <FaPaperPlane className="text-white text-xs sm:text-sm" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChatMain;
