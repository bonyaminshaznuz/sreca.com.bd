import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaCheck,
    FaShippingFast,
    FaCreditCard,
    FaMobileAlt,
    FaLock,
    FaArrowLeft,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal
} from 'react-icons/fa';
import productPlaceholder from '../images/product.png';

const ROUTES = {
    cart: '/cart',
    checkout: '/checkout',
    payment: '/checkout/payment'
};

const DEFAULT_CART_ITEMS = [
    {
        id: 'premium-tshirt',
        name: 'Premium T-Shirt',
        variant: 'Size: L, Color: Blue',
        price: 450,
        quantity: 1,
        image: productPlaceholder,
        href: '/product/premium-t-shirt'
    },
    {
        id: 'running-shoes',
        name: 'Running Shoes',
        variant: 'Size: 42, Color: Black',
        price: 1500,
        quantity: 1,
        image: productPlaceholder,
        href: '/product/running-shoes'
    },
    {
        id: 'smart-watch',
        name: 'Smart Watch',
        variant: 'Color: Silver',
        price: 3400,
        quantity: 1,
        image: productPlaceholder,
        href: '/product/smart-watch'
    }
];

const PRICING = {
    discount: 750,
    shipping: 50
};

const DEFAULT_STEP_KEY = 'checkout';

const PAYMENT_OPTIONS = [
    {
        value: 'cod',
        label: 'Cash on Delivery',
        description: 'Pay when you receive your order',
        renderIcon: () => (
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">COD</span>
            </div>
        ),
        descriptionMarginClass: 'ml-15'
    },
    {
        value: 'card',
        label: 'Credit/Debit Card',
        description: 'Pay securely with your card',
        renderIcon: () => (
            <div className="flex gap-1">
                <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <FaCcVisa className="text-primary-600" />
                </div>
                <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <FaCcMastercard className="text-red-600" />
                </div>
            </div>
        ),
        descriptionMarginClass: 'ml-17'
    },
    {
        value: 'mobile',
        label: 'Mobile Banking',
        description: 'bKash, Nagad, Rocket',
        renderIcon: () => (
            <div className="w-12 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded flex items-center justify-center">
                <FaMobileAlt className="text-white text-xs" />
            </div>
        ),
        descriptionMarginClass: 'ml-15'
    },
    {
        value: 'paypal',
        label: 'PayPal',
        description: 'The safer, easier way to pay',
        renderIcon: () => (
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <FaCcPaypal className="text-blue-500 text-lg" />
            </div>
        ),
        descriptionMarginClass: 'ml-15'
    }
];

const formatCurrency = (amount) => `৳${amount.toLocaleString('en-US')}`;

function Checkout({
    cartItems = DEFAULT_CART_ITEMS,
    routes = ROUTES,
    currentStepKey = DEFAULT_STEP_KEY,
    pricing = PRICING,
    paymentOptions = PAYMENT_OPTIONS
}) {
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const steps = [
        { key: 'cart', label: 'Cart', route: routes.cart },
        { key: 'checkout', label: 'Checkout', route: routes.checkout },
        { key: 'payment', label: 'Payment', route: routes.payment }
    ];

    const stepIndex = steps.findIndex((step) => step.key === currentStepKey);
    const activeStepIndex = stepIndex === -1 ? 0 : stepIndex;
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const total = Math.max(subtotal - pricing.discount + pricing.shipping, 0);

    return (
        <div>
            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1 pt-14 lg:pt-[56px] pb-20 lg:pb-8">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">

                    {/* Progress Steps */}
                    <div className="mb-8 animate-fade-in">
                        <div className="flex items-center justify-center max-w-3xl mx-auto">
                            {steps.map((step, index) => {
                                const isComplete = index < activeStepIndex;
                                const isActive = index === activeStepIndex;
                                const circleClassName = [
                                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                                    isComplete || isActive ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                                ].join(' ');
                                const labelClassName = [
                                    'text-xs mt-2',
                                    isActive ? 'font-semibold text-gray-900' : isComplete ? 'font-medium text-gray-700' : 'font-medium text-gray-500'
                                ].join(' ');
                                const connectorClassName = index < activeStepIndex ? 'bg-primary-600' : 'bg-gray-300';

                                return (
                                    <div key={step.key} className="flex items-center">
                                        <div className="flex flex-col items-center">
                                            <div className={circleClassName}>
                                                {isComplete ? <FaCheck /> : index + 1}
                                            </div>
                                            <Link to={step.route ?? '#'} className={labelClassName}>
                                                {step.label}
                                            </Link>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`w-20 lg:w-32 h-1 ${connectorClassName}`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Page Title */}
                    <div className="mb-6 animate-fade-in">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">Checkout</h1>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-colors">Complete your order details</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* Checkout Form */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Delivery Information */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50 p-4 sm:p-6 animate-fade-in transition-colors">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <FaShippingFast className="text-primary-600 dark:text-primary-400" />
                                    Delivery Information
                                </h2>

                                <form className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street Address *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State/Division *</label>
                                            <select
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                            >
                                                <option value="">Select</option>
                                                <option>Dhaka</option>
                                                <option>Chittagong</option>
                                                <option>Rajshahi</option>
                                                <option>Khulna</option>
                                                <option>Barishal</option>
                                                <option>Sylhet</option>
                                                <option>Rangpur</option>
                                                <option>Mymensingh</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Postal Code *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Notes (Optional)</label>
                                        <textarea
                                            rows={3}
                                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                            placeholder="Notes about your order, e.g. special notes for delivery"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50 p-4 sm:p-6 animate-fade-in transition-colors" style={{ animationDelay: '0.1s' }}>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <FaCreditCard className="text-primary-600 dark:text-primary-400" />
                                    Payment Method
                                </h2>

                                <div className="space-y-3">
                                    {paymentOptions.map((option) => {
                                        const IconSlot = option.renderIcon;
                                        const descriptionMarginClass = option.descriptionMarginClass ?? 'ml-15';

                                        return (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 transition"
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value={option.value}
                                                    checked={paymentMethod === option.value}
                                                    onChange={(event) => setPaymentMethod(event.target.value)}
                                                    className="w-5 h-5 text-primary-600"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        {IconSlot ? <IconSlot /> : null}
                                                        <span className="font-semibold text-gray-800">{option.label}</span>
                                                    </div>
                                                    <p className={`text-sm text-gray-500 mt-1 ${descriptionMarginClass}`}>
                                                        {option.description}
                                                    </p>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50 p-4 sm:p-6 lg:sticky lg:top-20 animate-fade-in transition-colors">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b dark:border-gray-700">
                                    {cartItems.map((item) => {
                                        const itemHref = item.href ?? '#';
                                        const lineTotal = item.price * item.quantity;

                                        return (
                                            <div key={item.id} className="flex gap-3">
                                                <Link to={itemHref} className="flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                        loading="lazy"
                                                    />
                                                </Link>
                                                <div className="flex-1">
                                                    <Link to={itemHref} className="font-medium text-sm text-gray-800 hover:text-primary-600 transition">
                                                        {item.name}
                                                    </Link>
                                                    {item.variant ? (
                                                        <p className="text-xs text-gray-500">{item.variant}</p>
                                                    ) : null}
                                                    <div className="flex justify-between mt-1">
                                                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                                        <span className="font-semibold text-sm">{formatCurrency(lineTotal)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Price Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Discount</span>
                                        <span className="font-medium text-green-600">-{formatCurrency(pricing.discount)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-medium">{formatCurrency(pricing.shipping)}</span>
                                    </div>
                                    <div className="border-t pt-3 mt-3">
                                        <div className="flex justify-between text-lg font-bold text-gray-800">
                                            <span>Total</span>
                                            <span>{formatCurrency(total)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-800 transition mb-3">
                                    Place Order
                                </button>
                                <Link
                                    to={routes.cart}
                                    className="block text-center text-sm text-primary-600 hover:text-primary-700 transition"
                                >
                                    <FaArrowLeft className="inline mr-2" />
                                    Back to Cart
                                </Link>

                                {/* Security Badge */}
                                <div className="mt-6 pt-6 border-t">
                                    <div className="flex items-center justify-center gap-2 text-gray-500">
                                        <FaLock />
                                        <span className="text-xs">Secure Checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}

export default Checkout;