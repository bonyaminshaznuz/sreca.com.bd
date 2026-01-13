import React, { useState, useEffect } from "react";
import {
  FaLink,
  FaShareAlt,
  FaMoneyBillWave,
  FaCheck,
} from "react-icons/fa";
import avatarImg from "../images/avatar.png";
import productImg from "../images/product.png";

function Affilate() {
  const [copiedId, setCopiedId] = useState(null);
  const [affiliateData, setAffiliateData] = useState({
    affiliateId: "affiliate123",
    userName: "User details",
    userRole: "Affiliate Partner",
    avatarUrl: avatarImg,
    totalSales: 7,
    totalEarned: 2300,
    withdrawalLimit: 3500,
    minWithdrawal: 500,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchAffiliateData();
    // fetchProducts();
    
    // Mock data - replace with API call
    setProducts([
      { 
        id: "p1", 
        name: "Premium Wireless Headphones", 
        price: 3500, 
        commission: 350,
        imageUrl: productImg
      },
      { 
        id: "p2", 
        name: "Smart Fitness Watch", 
        price: 2800, 
        commission: 420,
        imageUrl: productImg
      },
      { 
        id: "p3", 
        name: "Bluetooth Speaker", 
        price: 1800, 
        commission: 216,
        imageUrl: productImg
      },
      { 
        id: "p4", 
        name: "4K Action Camera", 
        price: 5500, 
        commission: 990,
        imageUrl: productImg
      },
    ]);
  }, []);

  const copyAffiliateLink = (productId) => {
    const affiliateLink = `${window.location.origin}/product?ref=${affiliateData.affiliateId}&product=${productId}`;

    navigator.clipboard.writeText(affiliateLink).then(() => {
      setCopiedId(productId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <main className="pt-20 sm:pt-24 lg:pt-28 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">

          {/* Affiliate Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-xl p-6 lg:p-8 text-white mb-8">

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={affiliateData.avatarUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold">{affiliateData.userName}</h1>
                  <p className="text-primary-100">{affiliateData.userRole}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm">Total Sales</p>
                  <p className="text-3xl font-bold">{affiliateData.totalSales.toString().padStart(2, '0')}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm">Total Earned</p>
                  <p className="text-3xl font-bold">৳{affiliateData.totalEarned.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-6 bg-white/10 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Withdrawal Progress</span>
                <span>৳{affiliateData.totalEarned.toLocaleString()} / ৳{affiliateData.withdrawalLimit.toLocaleString()}</span>
              </div>

              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(affiliateData.totalEarned / affiliateData.withdrawalLimit * 100).toFixed(1)}%` }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs">
                <span>Minimum withdrawal: ৳{affiliateData.minWithdrawal}</span>
                <span>{(affiliateData.totalEarned / affiliateData.withdrawalLimit * 100).toFixed(1)}%</span>
              </div>

              <a
                href="/withdraw"
                className="mt-4 block bg-white text-primary-600 text-center font-semibold py-2 rounded-lg hover:bg-gray-100"
              >
                Withdraw Now
              </a>
            </div>
          </div>

          {/* Products */}
          <h2 className="text-2xl font-bold mb-6">Products You Can Sell</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold mb-2">{p.name}</h3>

                  <p className="text-sm mb-3">
                    Your Commission:{" "}
                    <span className="font-semibold text-green-600">
                      ৳{p.commission}
                    </span>
                  </p>

                  <button
                    onClick={() => copyAffiliateLink(p.id)}
                    className={`w-full py-2 rounded-lg text-sm font-medium transition ${
                      copiedId === p.id
                        ? "bg-green-500 text-white"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {copiedId === p.id ? (
                      <>
                        <FaCheck className="inline mr-2" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <FaLink className="inline mr-2" />
                        Copy Affiliate Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 p-6 sm:p-8 mt-8 sm:mt-10 transition-colors">
            <h2 className="text-2xl font-bold mb-6">
              How Affiliate Program Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLink className="text-primary-600 text-2xl" />
                </div>
                <h3 className="font-semibold mb-2">1. Copy Link</h3>
                <p className="text-sm text-gray-600">
                  Copy your unique affiliate link
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShareAlt className="text-primary-600 text-2xl" />
                </div>
                <h3 className="font-semibold mb-2">2. Share</h3>
                <p className="text-sm text-gray-600">
                  Share on social media or websites
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMoneyBillWave className="text-green-600 text-2xl" />
                </div>
                <h3 className="font-semibold mb-2">3. Earn</h3>
                <p className="text-sm text-gray-600">
                  Earn commission from sales
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Affilate;
