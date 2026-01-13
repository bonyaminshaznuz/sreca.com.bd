import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaTrash, FaShoppingCart, FaMinus, FaPlus, FaHeart, FaArrowLeft 
} from "react-icons/fa";
import productImg from "../images/product.png";

// Sample cart items data
const initialCartItems = [
  {
    id: 1,
    name: "Premium T-Shirt",
    size: "L",
    color: "Blue",
    price: 450,
    originalPrice: 500,
    quantity: 1,
    img: productImg,
  },
  {
    id: 2,
    name: "Running Shoes",
    size: "42",
    color: "Black",
    price: 1500,
    originalPrice: 2000,
    quantity: 1,
    img: productImg,
  },
  {
    id: 3,
    name: "Smart Watch",
    color: "Silver",
    price: 3400,
    originalPrice: 4000,
    quantity: 1,
    img: productImg,
  },
];

// Sample recommended products
const recommendedProducts = [
  { id: 1, name: "Wireless Earbuds", price: 2500, img: productImg },
  { id: 2, name: "Leather Wallet", price: 850, img: productImg },
  { id: 3, name: "Backpack", price: 1200, img: productImg },
  { id: 4, name: "Sunglasses", price: 800, img: productImg },
  { id: 5, name: "Phone Case", price: 350, img: productImg },
  { id: 6, name: "Water Bottle", price: 450, img: productImg },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Quantity controls
  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item => item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 750;
  const shipping = 50;
  const total = subtotal - discount + shipping;

  return (
    <main className="flex-1 pt-14 lg:pt-[56px] pb-20 lg:pb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">Shopping Cart</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            You have {cartItems.length} item{cartItems.length !== 1 && "s"} in your cart
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
            <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mb-6 sm:mb-8 flex items-center justify-center">
              <FaShoppingCart className="text-gray-300 dark:text-gray-600 text-6xl sm:text-8xl lg:text-9xl mb-4" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 text-center">Your Cart is Empty</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-center max-w-md px-4">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
              <Link to="/shop" className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-800 flex items-center justify-center gap-2 text-sm sm:text-base">
                <FaShoppingCart /> Continue Shopping
              </Link>
              <Link to="/wishlist" className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                <FaHeart /> View Wishlist
              </Link>
            </div>
          </div>
        )}

        {/* Cart Content */}
        {cartItems.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map((item, idx) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900/50 p-3 sm:p-4 lg:p-6 animate-fade-in transition-colors duration-300" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1 sm:mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1 truncate">{item.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {item.size && <>Size: {item.size}, </>}
                            {item.color && <>Color: {item.color}</>}
                          </p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-1.5 sm:p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition flex-shrink-0">
                          <FaTrash className="text-xs sm:text-sm" />
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button onClick={() => decreaseQty(item.id)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition">
                            <FaMinus className="text-[10px] sm:text-xs dark:text-gray-300" />
                          </button>
                          <span className="font-medium w-6 sm:w-8 text-center text-sm sm:text-base dark:text-white">{item.quantity}</span>
                          <button onClick={() => increaseQty(item.id)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition">
                            <FaPlus className="text-[10px] sm:text-xs dark:text-gray-300" />
                          </button>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">৳{item.price * item.quantity}</p>
                          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 line-through">৳{item.originalPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900/50 p-4 sm:p-6 lg:sticky lg:top-20 animate-fade-in transition-colors duration-300">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Order Summary</h2>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium dark:text-gray-300">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <span>Discount</span>
                    <span className="font-medium text-green-600 dark:text-green-400">-৳{discount}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="font-medium dark:text-gray-300">৳{shipping}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2 sm:pt-3 mt-2 sm:mt-3">
                    <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800 dark:text-white">
                      <span>Total</span>
                      <span>৳{total}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6 flex gap-2">
                  <input type="text" placeholder="Promo code" className="flex-1 px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500 text-xs sm:text-sm transition-colors duration-300"/>
                  <button className="px-3 sm:px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition text-xs sm:text-sm font-medium whitespace-nowrap">Apply</button>
                </div>

                <button className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-800 transition mb-3 text-sm sm:text-base">
                  Proceed to Checkout
                </button>
                <Link to="/shop" className="block text-center text-xs sm:text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition">
                  <FaArrowLeft className="inline mr-2 text-xs" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        <section className="mt-8 sm:mt-12 animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {recommendedProducts.map(product => (
              <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 cursor-pointer">
                <div className="relative mb-2 sm:mb-3">
                  <img src={product.img} alt={product.name} className="w-full h-28 sm:h-32 lg:h-40 object-cover rounded-lg" />
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 space-y-1 sm:space-y-2">
                    <button className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white dark:bg-gray-700 rounded-full shadow-md dark:shadow-gray-900/50 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                      <FaHeart className="text-red-500 dark:text-red-400 text-[10px] sm:text-xs lg:text-sm" />
                    </button>
                    <button className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white dark:bg-gray-700 rounded-full shadow-md dark:shadow-gray-900/50 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                      <FaShoppingCart className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs lg:text-sm" />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white text-xs sm:text-sm mb-1 truncate">{product.name}</h3>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">৳{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Cart;
