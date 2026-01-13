import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaBox, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaTimes, 
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaStar,
  FaRedo,
  FaBoxOpen,
  FaShoppingBag
} from 'react-icons/fa';
import productImage from './images/product.png';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    {
      id: '#3K5KKJS6646K4H4',
      name: 'Green flower tree with free pot included',
      image: productImage,
      date: '27/06/2021',
      status: 'packaging',
      statusLabel: 'Packaging',
      statusColor: 'blue',
      canCancel: true
    },
    {
      id: '#5H8MMPP3567L9M2',
      name: 'Premium Wireless Headphones',
      image: productImage,
      date: '25/06/2021',
      status: 'shipping',
      statusLabel: 'Shipping',
      statusColor: 'yellow',
      canCancel: true
    },
    {
      id: '#2K9BBVV4498R7X3',
      name: 'Smart Fitness Watch',
      image: productImage,
      date: '23/06/2021',
      status: 'delivered',
      statusLabel: 'Delivered',
      statusColor: 'green',
      canCancel: false,
      canReview: true
    },
    {
      id: '#7L3DDXX9876P5N1',
      name: 'Portable Bluetooth Speaker',
      image: productImage,
      date: '20/06/2021',
      status: 'processing',
      statusLabel: 'Processing',
      statusColor: 'purple',
      canCancel: true
    },
    {
      id: '#9M6FFYY2234Q8K5',
      name: '4K Action Camera',
      image: productImage,
      date: '18/06/2021',
      status: 'cancelled',
      statusLabel: 'Cancelled',
      statusColor: 'red',
      canCancel: false,
      canReorder: true
    }
  ]);

  const activeOrdersCount = orders.filter(order => 
    !['delivered', 'cancelled'].includes(order.status)
  ).length;

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled', statusLabel: 'Cancelled', statusColor: 'red', canCancel: false }
          : order
      ));
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'packaging': return <FaBox />;
      case 'shipping': return <FaShippingFast />;
      case 'delivered': return <FaCheckCircle />;
      case 'processing': return <FaClock />;
      case 'cancelled': return <FaTimesCircle />;
      default: return <FaBox />;
    }
  };

  const getStatusBgColor = (color) => {
    const colors = {
      blue: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      yellow: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      green: 'bg-gradient-to-r from-green-500 to-emerald-500',
      purple: 'bg-gradient-to-r from-purple-500 to-pink-500',
      red: 'bg-gradient-to-r from-red-500 to-pink-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="pt-20 lg:pt-24 pb-20 lg:pb-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          
          {/* Header */}
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
                  <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    My Orders
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Track and manage your orders</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg flex items-center gap-2">
                  <FaBox />
                  {activeOrdersCount} Active Orders
                </span>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 lg:p-6 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Product Info */}
                    <div className="flex gap-4 flex-1">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-600 shadow-md group">
                        <img 
                          src={order.image} 
                          alt="Product" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-1 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {order.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Order ID: <span className="font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{order.id}</span>
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-lg">
                            <FaCalendarAlt />
                            Placed on {order.date}
                          </span>
                          <span className={`px-3 py-1.5 ${getStatusBgColor(order.statusColor)} text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 ${order.status === 'shipping' ? 'animate-pulse' : ''}`}>
                            {getStatusIcon(order.status)}
                            {order.statusLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:min-w-[160px]">
                      <Link 
                        to="/order"
                        className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-black via-gray-900 to-black dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 text-white rounded-xl text-sm font-bold hover:from-gray-900 hover:via-black hover:to-gray-900 dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
                      >
                        <FaFileAlt />
                        View Details
                      </Link>
                      
                      {order.canCancel && (
                        <button 
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl text-sm font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      )}
                      
                      {order.canReview && (
                        <button 
                          className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <FaStar />
                          Review
                        </button>
                      )}
                      
                      {order.canReorder && (
                        <button 
                          className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white rounded-xl text-sm font-bold hover:from-gray-800 hover:to-black dark:hover:from-gray-500 dark:hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <FaRedo />
                          Re-order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-100 dark:border-gray-700">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FaBoxOpen className="text-6xl text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-3">No Orders Yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link 
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-black via-gray-900 to-black dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 text-white rounded-xl font-bold hover:from-gray-900 hover:via-black hover:to-gray-900 dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <FaShoppingBag />
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;
