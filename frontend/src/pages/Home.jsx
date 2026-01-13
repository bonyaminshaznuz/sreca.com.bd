import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaHeart,
    FaShoppingCart,
    FaStar,
    FaStarHalfAlt,
    FaTshirt,
    FaLaptop,
    FaHome,
    FaHeartbeat,
    FaBook,
    FaSpa,
    FaChevronLeft,
    FaChevronRight,
    FaArrowRight,
} from "react-icons/fa";
import slider1 from "../images/slider.png";
import slider2 from "../images/slider-2.png";
import captcha from "../images/captcha.png";
import productImg from "../images/product.png";

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // ===== Carousel Data =====
    const slides = [
        {
            src: slider1,
            alt: "Banner 1",
            placeholder:
                "https://via.placeholder.com/1200x400/667eea/ffffff?text=Welcome+to+Sreca",
        },
        {
            src: slider2,
            alt: "Banner 2",
            placeholder:
                "https://via.placeholder.com/1200x400/f093fb/ffffff?text=Special+Offers",
        },
        {
            src: captcha,
            alt: "Banner 3",
            placeholder:
                "https://via.placeholder.com/1200x400/4facfe/ffffff?text=New+Arrivals",
        },
    ];

    const showSlide = (index) => {
        if (index >= slides.length) setCurrentSlide(0);
        else if (index < 0) setCurrentSlide(slides.length - 1);
        else setCurrentSlide(index);
    };

    const changeSlide = (direction) => {
        showSlide(currentSlide + direction);
    };

    const goToSlide = (index) => {
        showSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    // ===== Flash Sales Products =====
    const flashSales = [
        {
            title: "Premium T-Shirt",
            price: 450,
            oldPrice: 500,
            discount: 10,
            rating: 4.5,
            reviews: 125,
            img: productImg,
        },
        {
            title: "Running Shoes",
            price: 1500,
            oldPrice: 2000,
            discount: 25,
            rating: 4,
            reviews: 89,
            img: productImg,
        },
        {
            title: "Smart Watch",
            price: 3400,
            oldPrice: 4000,
            discount: 15,
            rating: 5,
            reviews: 245,
            img: productImg,
        },
        {
            title: "Backpack",
            price: 700,
            oldPrice: 1000,
            discount: 30,
            rating: 4,
            reviews: 67,
            img: productImg,
        },
        {
            title: "Sunglasses",
            price: 800,
            oldPrice: 1000,
            discount: 20,
            rating: 3.5,
            reviews: 43,
            img: productImg,
        },
    ];

    // ===== Categories =====
    const categories = [
        { name: "Fashion", icon: <FaTshirt className="text-2xl text-primary-600" />, bg: "bg-primary-100", hoverBg: "hover:bg-primary-50" },
        { name: "Electronics", icon: <FaLaptop className="text-2xl text-primary-600" />, bg: "bg-primary-100", hoverBg: "hover:bg-primary-50" },
        { name: "Home", icon: <FaHome className="text-2xl text-primary-600" />, bg: "bg-primary-100", hoverBg: "hover:bg-primary-50" },
        { name: "Health", icon: <FaHeartbeat className="text-2xl text-primary-600" />, bg: "bg-primary-100", hoverBg: "hover:bg-primary-50" },
        { name: "Books", icon: <FaBook className="text-2xl text-primary-600" />, bg: "bg-primary-100", hoverBg: "hover:bg-primary-50" },
        { name: "Beauty", icon: <FaSpa className="text-2xl text-primary-600" />, bg: "bg-primary-100", hoverBg: "hover:bg-primary-50" },
    ];

    // ===== Featured Products =====
    const featuredProducts = [
        { title: "Wireless Earbuds", price: 2500, tag: "New", rating: 5, reviews: 312, img: productImg },
        { title: "Leather Wallet", price: 850, rating: 4, reviews: 156, img: productImg },
        { title: "Coffee Maker", price: 5500, rating: 4.5, reviews: 89, img: productImg },
        { title: "Gaming Mouse", price: 1200, tag: "Popular", rating: 5, reviews: 567, img: productImg },
    ];

    // ===== Helper: Render Stars =====
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) stars.push(<FaStar key={i} />);
            else if (rating + 0.5 >= i) stars.push(<FaStarHalfAlt key={i} />);
            else stars.push(<FaStar key={i} className="text-gray-300" />);
        }
        return stars;
    };

    return (
        <main className="flex-1 pt-14 lg:pt-[56px] pb-20 lg:pb-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-8">

                {/* Hero Carousel */}
                <section className="animate-fade-in">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <div id="carousel" className="relative">
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`carousel-slide ${currentSlide === index ? "block" : "hidden"}`}
                                >
                                    <img
                                        src={slide.src}
                                        alt={slide.alt}
                                        className="w-full h-64 lg:h-96 object-cover"
                                        onError={(e) => (e.target.src = slide.placeholder)}
                                    />
                                </div>
                            ))}

                            {/* Arrows */}
                            <button
                                onClick={() => changeSlide(-1)}
                                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full flex items-center justify-center shadow-lg transition"
                            >
                                <FaChevronLeft className="text-gray-800 dark:text-white text-sm lg:text-base" />
                            </button>
                            <button
                                onClick={() => changeSlide(1)}
                                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full flex items-center justify-center shadow-lg transition"
                            >
                                <FaChevronRight className="text-gray-800 dark:text-white text-sm lg:text-base" />
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white opacity-100" : "bg-white/50 opacity-50"
                                            }`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Flash Sales */}
                <section className="animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50 p-4 lg:p-6 transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-2">
                            <div>
                                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">Flash Sales</h2>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Ends in <span className="font-semibold text-red-500 dark:text-red-400">12:02:03</span>
                                </p>
                            </div>
                            <Link to="/shop" className="text-xs sm:text-sm font-medium text-primary-600 hover:text-primary-700 transition flex items-center gap-1">
                                Shop More <FaArrowRight className="text-xs" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
                            {flashSales.map((product, idx) => (
                                <div key={idx} className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-2 sm:p-3 lg:p-4 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all cursor-pointer">
                                    <div className="relative mb-2 sm:mb-3">
                                        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                            -{product.discount}%
                                        </div>
                                        <img src={product.img} alt={product.title} className="w-full h-28 sm:h-32 lg:h-40 object-cover rounded-lg" />
                                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 space-y-1 sm:space-y-2">
                                            <button className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white dark:bg-gray-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition">
                                                <FaHeart className="text-red-500 text-[10px] sm:text-xs lg:text-sm" />
                                            </button>
                                            <button className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white dark:bg-gray-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition">
                                                <FaShoppingCart className="text-gray-600 dark:text-gray-200 text-[10px] sm:text-xs lg:text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-medium text-gray-800 dark:text-white text-xs sm:text-sm mb-1 truncate">{product.title}</h3>
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">৳{product.price}</span>
                                        <span className="text-[10px] sm:text-xs lg:text-sm text-gray-400 dark:text-gray-500 line-through">৳{product.oldPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 sm:gap-1 mt-1 text-yellow-400 text-[10px] sm:text-xs">
                                        {renderStars(product.rating)}
                                        <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs ml-0.5 sm:ml-1">({product.reviews})</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Categories */}
                <section className="animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50 p-4 lg:p-6 transition-colors duration-300">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 lg:mb-6">Shop by Category</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
                            {categories.map((cat, idx) => (
                                <Link
                                    key={idx}
                                    to="/shop"
                                    className={`flex flex-col items-center p-2 sm:p-3 lg:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md dark:hover:shadow-gray-900/50 transition-all ${cat.hoverBg}`}
                                >
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${cat.bg} dark:bg-opacity-20 rounded-full flex items-center justify-center mb-2 lg:mb-3`}>
                                        {cat.icon}
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Featured Products */}
                <section className="animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50 p-4 lg:p-6 transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-2">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">Featured Products</h2>
                            <Link to="/shop" className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition flex items-center gap-1">
                                View All <FaArrowRight className="text-xs" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
                            {featuredProducts.map((product, idx) => (
                                <div key={idx} className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-2 sm:p-3 lg:p-4 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all cursor-pointer">
                                    <div className="relative mb-2 sm:mb-3">
                                        {product.tag && (
                                            <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-primary-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                                {product.tag}
                                            </div>
                                        )}
                                        <img src={product.img} alt={product.title} className="w-full h-28 sm:h-32 lg:h-40 object-cover rounded-lg" />
                                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 space-y-1 sm:space-y-2">
                                            <button className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white dark:bg-gray-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition">
                                                <FaHeart className="text-red-500 text-[10px] sm:text-xs lg:text-sm" />
                                            </button>
                                            <button className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white dark:bg-gray-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition">
                                                <FaShoppingCart className="text-gray-600 dark:text-gray-200 text-[10px] sm:text-xs lg:text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-medium text-gray-800 dark:text-white text-xs sm:text-sm mb-1 truncate">{product.title}</h3>
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">৳{product.price}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 sm:gap-1 mt-1 text-yellow-400 text-[10px] sm:text-xs">
                                        {renderStars(product.rating)}
                                        <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs ml-0.5 sm:ml-1">({product.reviews})</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Promo Banner */}
                <section className="animate-fade-in">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-900 rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 text-white text-center sm:text-left">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Special Offer!</h2>
                            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-white/90">
                                Get up to 50% off on selected items. Limited time only!
                            </p>
                            <Link
                                to="/shop"
                                className="inline-block bg-white text-primary-600 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-gray-100 transition text-sm sm:text-base"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
        </main>
    );
}
