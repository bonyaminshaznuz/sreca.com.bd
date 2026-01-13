import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaShippingFast, 
  FaFileAlt, 
  FaClock, 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaHeadset,
  FaCheckCircle
} from 'react-icons/fa';
import productImage from '../images/product.png';
import orderProcessing from '../images/order-processing.jpg';
import truckLoading from '../images/truck-loading.jpg';
import truckRunning from '../images/truck-running.jpg';
import destinationReached from '../images/destination-reached.jpg';
import orderDelivered from '../images/order-delivered.jpg';

function Order() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(2); // 0-4 for 5 stages

  const stages = [
    { 
      id: 0, 
      name: 'Order Processed', 
      image: orderProcessing,
      description: 'Your order has been confirmed and is being processed'
    },
    { 
      id: 1, 
      name: 'Product Loaded', 
      image: truckLoading,
      description: 'Your product has been loaded onto the delivery vehicle'
    },
    { 
      id: 2, 
      name: 'On the Way', 
      image: truckRunning,
      description: 'Product is being delivered to your address'
    },
    { 
      id: 3, 
      name: 'Reached Destination', 
      image: destinationReached,
      description: 'Product has reached your delivery area'
    },
    { 
      id: 4, 
      name: 'Delivered', 
      image: orderDelivered,
      description: 'Order successfully delivered to you'
    }
  ];

  const progressPercentage = (currentStage / (stages.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="pt-20 lg:pt-24 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          
          {/* Header with Order ID */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg lg:flex hidden"
                >
                  <FaArrowLeft className="text-gray-700 dark:text-gray-300" />
                </button>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Order ID</p>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    #3K5KKDF446646K4H4
                  </h1>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg animate-pulse flex items-center gap-2">
                  <FaShippingFast />
                  In Transit
                </span>
              </div>
            </div>
          </div>

          {/* Product Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Order Items
            </h2>
            <div className="flex gap-4">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-600 shadow-lg group">
                <img 
                  src={productImage} 
                  alt="Product" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Green flower tree with free pot included
                </h3>
                <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  ৳1,200
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link 
                    to="/product"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg gap-2"
                  >
                    <FaFileAlt />
                    View Product
                  </Link>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Order placed on:</span>
                    <span className="ml-2 text-gray-800 dark:text-white bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                      02/07/2021
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
                Order Tracking
              </h2>
              <span className="text-sm text-gray-600 dark:text-gray-400 bg-orange-50 dark:bg-orange-900/30 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                <FaClock className="text-orange-500" />
                Est. delivery: <span className="text-orange-600 dark:text-orange-400">2 Days</span>
              </span>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-12 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                {/* Stages */}
                <div className="grid grid-cols-5 gap-4 relative">
                  {stages.map((stage) => (
                    <div key={stage.id} className="flex flex-col items-center">
                      <div className={`w-24 h-24 rounded-xl overflow-hidden mb-3 relative z-10 border-4 transition-all duration-300 ${
                        stage.id <= currentStage
                          ? 'border-green-500 bg-green-100 dark:bg-green-900 shadow-xl transform scale-105'
                          : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 shadow-md'
                      }`}>
                        <img 
                          src={stage.image} 
                          alt={stage.name}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            stage.id <= currentStage ? '' : 'opacity-50 grayscale'
                          }`}
                        />
                        {stage.id <= currentStage && (
                          <div className="absolute top-1 right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <FaCheckCircle className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full mb-2 relative z-10 shadow-lg transition-all duration-300 ${
                        stage.id <= currentStage 
                          ? 'bg-green-500 ring-4 ring-green-200 dark:ring-green-900 animate-pulse' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                      <p className={`text-sm font-bold text-center transition-colors ${
                        stage.id <= currentStage 
                          ? 'text-green-700 dark:text-green-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {stage.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-4">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-xl overflow-hidden border-4 relative transition-all duration-300 ${
                      stage.id <= currentStage
                        ? 'border-green-500 bg-green-100 dark:bg-green-900 shadow-xl'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <img 
                        src={stage.image} 
                        alt={stage.name}
                        className={`w-full h-full object-cover ${
                          stage.id <= currentStage ? '' : 'opacity-50 grayscale'
                        }`}
                      />
                      {stage.id <= currentStage && (
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-[10px]" />
                        </div>
                      )}
                    </div>
                    {index < stages.length - 1 && (
                      <div className={`w-1 h-8 transition-colors ${
                        stage.id < currentStage ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pt-3">
                    <p className={`font-bold mb-1 ${
                      stage.id <= currentStage 
                        ? 'text-green-700 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {stage.name}
                    </p>
                    <p className={`text-xs ${
                      stage.id <= currentStage 
                        ? 'text-gray-600 dark:text-gray-400' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 group hover:bg-primary-50 dark:hover:bg-primary-900/20 p-3 rounded-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <FaUser className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Recipient</p>
                  <p className="font-bold text-gray-800 dark:text-white">Forhad Hossain</p>
                </div>
              </div>
              <div className="flex gap-3 group hover:bg-green-50 dark:hover:bg-green-900/20 p-3 rounded-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <FaPhone className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Phone</p>
                  <p className="font-bold text-gray-800 dark:text-white">+880 1712345678</p>
                </div>
              </div>
              <div className="flex gap-3 md:col-span-2 group hover:bg-primary-50 dark:hover:bg-primary-900/20 p-3 rounded-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Delivery Address</p>
                  <p className="font-bold text-gray-800 dark:text-white">
                    69/1 Salam Mansion, Lalkhan Bazar, Chittagong
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              Back to Orders
            </button>
            <Link
              to="/chat"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-black via-gray-900 to-black dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 text-white text-center rounded-xl font-bold hover:from-gray-900 hover:via-black hover:to-gray-900 dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              <FaHeadset />
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Order;
