import React, { useState } from "react";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaEye,
  FaHeartBroken,
  FaShoppingBag,
  FaCheck,
} from "react-icons/fa";

import productImg from "../images/product.png";

function Wishlist() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Green Flower tree with free tob included.",
      price: "৳1200",
      rating: "4.5",
    },
    {
      id: 2,
      title: "Luxury Watch Collection 2026",
      price: "৳2500",
      rating: "4.8",
    },
    {
      id: 3,
      title: "Premium Headphones with Noise Cancellation",
      price: "৳3200",
      rating: "4.7",
    },
    {
      id: 4,
      title: "Designer Handbag - Premium Quality",
      price: "৳4500",
      rating: "4.9",
    },
  ]);

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* ================= WISHLIST CONTENT ================= */}
      <div className="flex-1 px-4 py-20 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          {items.length > 0 && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Save your favorite items for later
              </p>
            </div>
          )}

          {/* Wishlist Grid */}
          {items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={productImg}
                      alt="Product"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-9 h-9 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <FaHeart className="text-red-500 dark:text-red-400 text-lg" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-gray-900 dark:text-white font-medium mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-black dark:bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-primary-700 transition-colors flex items-center justify-center gap-1">
                        <FaShoppingCart /> Add to Cart
                      </button>
                      <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <FaEye className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty Wishlist */}
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 lg:py-20">
              <FaHeartBroken className="text-gray-300 dark:text-gray-600 text-8xl lg:text-9xl mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Your Wishlist is Empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
                Save items you love by clicking the heart icon. Start exploring
                and add your favorites!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 dark:hover:from-primary-700 dark:hover:to-primary-800 transition flex items-center gap-2"
                >
                  <FaShoppingBag />
                  Browse Products
                </a>
                <a
                  href="/cart"
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
                >
                  <FaShoppingCart />
                  View Cart
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
