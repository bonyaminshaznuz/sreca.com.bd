import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaShoppingCart, 
  FaTruck, 
  FaShieldAlt, 
  FaUndo, 
  FaHeadset, 
  FaStar, 
  FaStarHalfAlt,
  FaRegStar,
  FaMinus,
  FaPlus,
  FaThumbsUp,
  FaArrowRight
} from 'react-icons/fa';
import productImage from '../images/product.png';

function ProductDetails() {
  const [mainImage, setMainImage] = useState(productImage);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const thumbnails = [productImage, productImage, productImage, productImage];
  const colors = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'black', class: 'bg-black' },
    { name: 'white', class: 'bg-white border-gray-300' },
    { name: 'red', class: 'bg-red-500' }
  ];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => Math.min(prev + 1, 156));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const relatedProducts = [
    { name: 'Premium Polo Shirt', price: 650, rating: 4.6 },
    { name: 'Casual Denim Jacket', price: 1200, rating: 4.7 },
    { name: 'Sports Hoodie', price: 950, rating: 4.5 },
    { name: 'Slim Fit Jeans', price: 1400, rating: 4.8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 pt-14 lg:pt-[56px] pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">

            {/* Breadcrumb */}
          <div className="mb-4 lg:mb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link>
            <span className="mx-1 sm:mx-2">/</span>
            <Link to="/shop" className="hover:text-gray-900 dark:hover:text-white">Shop</Link>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-gray-900 dark:text-white truncate inline-block max-w-[200px] align-bottom">
              Premium Cotton T-Shirt
            </span>
          </div>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="relative group">
                  <img
                    src={mainImage}
                    alt="Product"
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                  >
                    <FaHeart className={`text-lg sm:text-xl ${isWishlisted ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                  </button>
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    -20% OFF
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(thumb)}
                    className={`cursor-pointer bg-white dark:bg-gray-800 rounded-lg p-1.5 sm:p-2 border-2 transition ${
                      mainImage === thumb
                        ? 'border-primary-500'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <img src={thumb} alt="Thumbnail" className="w-full h-16 sm:h-20 object-cover rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full">
                    Fashion
                  </span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Premium Cotton T-Shirt
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <div className="flex text-sm sm:text-base">
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStarHalfAlt className="text-yellow-400" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">(4.5)</span>
                  </div>
                  <span className="text-gray-400 dark:text-gray-500 hidden sm:inline">|</span>
                  <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">156 Reviews</span>
                  <span className="text-gray-400 dark:text-gray-500 hidden sm:inline">|</span>
                  <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">245 Sold</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">৳450</span>
                  <span className="text-xl sm:text-2xl text-gray-400 dark:text-gray-500 line-through">৳560</span>
                  <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-full">
                    Save 20%
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Experience ultimate comfort with our Premium Cotton T-Shirt. Made from 100% organic cotton,
                  this shirt offers breathability and softness that lasts. Perfect for everyday wear with a
                  modern fit.
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Color</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${color.class} border-2 border-gray-200 dark:border-gray-600 hover:scale-110 transition ${
                        selectedColor === color.name ? 'ring-2 ring-primary-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Size</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 border-2 rounded-lg text-sm sm:text-base font-medium transition ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Quantity</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition"
                    >
                      <FaMinus className="text-sm text-gray-700 dark:text-gray-300" />
                    </button>
                    <span className="text-lg sm:text-xl font-bold w-10 sm:w-12 text-center text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition"
                    >
                      <FaPlus className="text-sm text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Available: <span className="font-semibold text-gray-900 dark:text-white">156</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center gap-2">
                  <FaShoppingCart className="text-sm sm:text-base" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition flex items-center justify-center"
                >
                  <FaHeart className={`text-lg sm:text-xl ${isWishlisted ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button className="w-full bg-black dark:bg-gray-700 text-white py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                Buy Now
              </button>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaTruck className="text-primary-600 dark:text-primary-300 text-sm sm:text-base" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Free Delivery</p>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Orders over ৳500</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt className="text-green-600 dark:text-green-300 text-sm sm:text-base" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Secure Payment</p>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">100% Protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaUndo className="text-primary-600 dark:text-primary-300 text-sm sm:text-base" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Easy Returns</p>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">7 Days Return</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaHeadset className="text-yellow-600 dark:text-yellow-300 text-sm sm:text-base" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">24/7 Support</p>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Dedicated Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-sm mb-8 lg:mb-12">
            <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              <div className="flex min-w-max">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold border-b-2 whitespace-nowrap transition ${
                    activeTab === 'description'
                      ? 'text-gray-900 dark:text-white border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold border-b-2 whitespace-nowrap transition ${
                    activeTab === 'specifications'
                      ? 'text-gray-900 dark:text-white border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold border-b-2 whitespace-nowrap transition ${
                    activeTab === 'reviews'
                      ? 'text-gray-900 dark:text-white border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Reviews (156)
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Product Description
                  </h3>
                  <div className="prose max-w-none text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <p className="mb-4">
                      Our Premium Cotton T-Shirt is crafted from the finest 100% organic cotton, ensuring
                      maximum comfort and durability. The fabric is soft, breathable, and gets even more
                      comfortable with each wash.
                    </p>
                    <p className="mb-4">Features include:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>100% Organic Cotton for superior comfort</li>
                      <li>Pre-shrunk fabric maintains size and shape</li>
                      <li>Reinforced shoulder seams for durability</li>
                      <li>Classic fit suitable for all body types</li>
                      <li>Machine washable for easy care</li>
                      <li>Available in multiple colors</li>
                    </ul>
                    <p>
                      Perfect for casual wear, workouts, or layering. This versatile t-shirt pairs well with
                      jeans, shorts, or can be dressed up with a blazer for a smart-casual look.
                    </p>
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Product Specifications
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">General</h4>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-400">Brand</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Sreca Premium</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-400">Material</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">100% Organic Cotton</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-400">Pattern</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Solid</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-400">Sleeve</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Short Sleeve</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 dark:text-gray-400">Fit</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Regular Fit</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Care Instructions</h4>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-400">Wash Care</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Machine Wash</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-400">Temperature</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Cold (30°C)</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-400">Bleach</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Do Not Bleach</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-400">Dry</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Tumble Dry Low</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 dark:text-gray-400">Iron</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Medium Heat</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                      <div className="sm:w-1/3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 text-center">
                        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">4.5</div>
                        <div className="flex justify-center mb-2 gap-1">
                          <FaStar className="text-yellow-400" />
                          <FaStar className="text-yellow-400" />
                          <FaStar className="text-yellow-400" />
                          <FaStar className="text-yellow-400" />
                          <FaStarHalfAlt className="text-yellow-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">Based on 156 reviews</p>
                      </div>
                      <div className="md:w-2/3 space-y-2">
                        {[
                          { stars: 5, count: 109, width: '70%' },
                          { stars: 4, count: 31, width: '20%' },
                          { stars: 3, count: 11, width: '7%' },
                          { stars: 2, count: 3, width: '2%' },
                          { stars: 1, count: 2, width: '1%' }
                        ].map((rating) => (
                          <div key={rating.stars} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{rating.stars}★</span>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: rating.width }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{rating.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {[
                      {
                        name: 'John Doe',
                        time: '2 days ago',
                        rating: 5,
                        text: 'Amazing quality! The fabric is so soft and comfortable. Fits perfectly and looks great. Definitely worth the price. Will buy more colors!',
                        helpful: 23
                      },
                      {
                        name: 'Sarah Smith',
                        time: '1 week ago',
                        rating: 4,
                        text: 'Good quality t-shirt. Material is nice and breathable. True to size. Only minor issue is it wrinkles easily but overall happy with the purchase.',
                        helpful: 12
                      },
                      {
                        name: 'Mike Johnson',
                        time: '2 weeks ago',
                        rating: 5,
                        text: 'Excellent product! Very comfortable and the color is exactly as shown. Fast delivery too. Highly recommend this to everyone looking for quality cotton t-shirts.',
                        helpful: 8
                      }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <img
                            src={productImage}
                            alt="User"
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{review.time}</p>
                              </div>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) =>
                                  i < review.rating ? (
                                    <FaStar key={i} className="text-yellow-400 text-sm" />
                                  ) : (
                                    <FaRegStar key={i} className="text-yellow-400 text-sm" />
                                  )
                                )}
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{review.text}</p>
                            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
                              <FaThumbsUp className="text-xs" />
                              Helpful ({review.helpful})
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <button className="px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition text-gray-900 dark:text-white">
                      Load More Reviews
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Related Products</h2>
              <Link
                to="/shop"
                className="text-sm sm:text-base text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center gap-1"
              >
                View All <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img src={productImage} alt="Product" className="w-full h-48 object-cover" />
                    <button className="absolute top-3 right-3 w-9 h-9 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 dark:hover:bg-red-900 transition">
                      <FaHeart className="text-gray-600 dark:text-gray-400 text-sm" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 dark:text-white font-medium mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">৳{product.price}</span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                      </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;