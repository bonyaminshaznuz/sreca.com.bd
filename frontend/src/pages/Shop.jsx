import React, { useState } from 'react';
import {
    FaThLarge,
    FaTshirt,
    FaLaptop,
    FaHome,
    FaSpa,
    FaDumbbell,
    FaStar,
    FaHeart,
    FaShoppingCart,
    FaFilter,
    FaGem,
    FaSyncAlt,
} from 'react-icons/fa';
import productImg from '../images/product.png';

// Categories
const categories = [
    { id: 'all', name: 'All', icon: <FaThLarge /> },
    { id: 'fashion', name: 'Fashion', icon: <FaTshirt /> },
    { id: 'electronics', name: 'Electronics', icon: <FaLaptop /> },
    { id: 'accessories', name: 'Accessories', icon: <FaGem /> },
    { id: 'home', name: 'Home & Living', icon: <FaHome /> },
    { id: 'beauty', name: 'Beauty', icon: <FaSpa /> },
    { id: 'sports', name: 'Sports', icon: <FaDumbbell /> },
];

// Dummy products
const dummyProducts = [
    { id: 1, name: 'Premium Cotton T-Shirt', price: 450, oldPrice: 560, rating: 4.5, category: 'fashion', discount: '20%', img: productImg },
    { id: 2, name: 'Wireless Headphones Pro', price: 3200, rating: 4.8, category: 'electronics', img: productImg },
    { id: 3, name: 'Luxury Smart Watch', price: 2500, rating: 4.9, category: 'accessories', img: productImg, new: true },
    { id: 4, name: 'Running Shoes Premium', price: 1500, rating: 4.6, category: 'fashion', img: productImg },
    { id: 5, name: 'Decorative Table Lamp', price: 850, rating: 4.4, category: 'home', img: productImg },
    { id: 6, name: 'Luxury Perfume Set', price: 1750, oldPrice: 2500, rating: 4.7, category: 'beauty', img: productImg, discount: '30%' },
    { id: 7, name: 'Yoga Mat Premium Quality', price: 650, rating: 4.5, category: 'sports', img: productImg },
    { id: 8, name: 'Bluetooth Speaker Portable', price: 1200, rating: 4.3, category: 'electronics', img: productImg },
];

function Shop() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [minRating, setMinRating] = useState(0);

    const filteredProducts = dummyProducts
        .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
        .filter((p) => p.price <= priceRange[1])
        .filter((p) => p.rating >= minRating);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <main className="flex-1 pt-14 lg:pt-[56px] pb-20 lg:pb-8">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">

                    {/* Page Header */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">Shop</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base">Discover amazing products</p>
                    </div>

                    {/* Categories Section */}
                    <div className="mb-4 sm:mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900/50 p-3 sm:p-4 lg:p-6 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white">Categories</h2>
                                <button
                                    className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    View All
                                </button>
                            </div>

                            {/* Category Pills */}
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base transition ${selectedCategory === cat.id
                                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        <span className="text-sm sm:text-base">{cat.icon}</span>
                                        <span className="hidden sm:inline">{cat.name}</span>
                                        <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Filter & Sort Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base">
                            <span className="font-medium">{filteredProducts.length}</span> products found
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                            <select className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg text-xs sm:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500 flex-1 sm:flex-initial transition-colors duration-300">
                                <option>Sort by: Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest First</option>
                                <option>Best Selling</option>
                            </select>
                            <button 
                                onClick={() => setShowFilterModal(true)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs sm:text-sm lg:text-base hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300 flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial justify-center">
                                <FaFilter className="text-xs sm:text-sm" /> Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="relative group">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-36 sm:h-44 md:h-48 lg:h-52 xl:h-48 object-cover"
                                    />
                                    <button className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                                        <FaHeart className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 text-xs sm:text-sm lg:text-lg" />
                                    </button>
                                    {product.discount && (
                                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                            -{product.discount}
                                        </div>
                                    )}
                                    {product.new && (
                                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                            New
                                        </div>
                                    )}
                                </div>
                                <div className="p-2 sm:p-3 lg:p-4 flex flex-col flex-1">
                                    <h3 className="text-gray-900 dark:text-white font-medium mb-1.5 sm:mb-2 line-clamp-2 text-xs sm:text-sm lg:text-base leading-tight">{product.name}</h3>
                                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 dark:text-white">৳{product.price}</span>
                                            {product.oldPrice && (
                                                <span className="text-[10px] sm:text-xs lg:text-sm text-gray-400 dark:text-gray-500 line-through">৳{product.oldPrice}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-0.5 sm:gap-1">
                                            <FaStar className="text-yellow-400 text-xs sm:text-sm lg:text-base" />
                                            <span className="text-[10px] sm:text-xs lg:text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                                        </div>
                                    </div>
                                    <button className="mt-auto w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base font-medium hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center gap-1">
                                        <FaShoppingCart className="text-xs sm:text-sm" /> <span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-6 sm:mt-8 lg:mt-10">
                        <button className="px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2 mx-auto text-sm sm:text-base">
                            <FaSyncAlt className="text-xs sm:text-sm" /> Load More Products
                        </button>
                    </div>
                </div>
            </main>

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowFilterModal(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Filters</h3>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="px-4 sm:px-6 py-4 space-y-6">
                            {/* Price Range */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Price Range</h4>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="5000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>৳ 0</span>
                                        <span>৳ {priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Minimum Rating</h4>
                                <div className="flex gap-2">
                                    {[0, 3, 4, 4.5].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setMinRating(rating)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                                minRating === rating
                                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            {rating === 0 ? 'All' : `${rating}+ ⭐`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Categories</h4>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === cat.id}
                                                onChange={() => setSelectedCategory(cat.id)}
                                                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                {cat.icon} {cat.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 flex gap-3">
                            <button
                                onClick={() => {
                                    setPriceRange([0, 5000]);
                                    setMinRating(0);
                                    setSelectedCategory('all');
                                }}
                                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm font-medium"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition text-sm font-medium"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Shop;
