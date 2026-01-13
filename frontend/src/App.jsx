import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileTopNav from "./components/MobileTopNav";
import MobileBottomNav from "./components/MobileBottomNav";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import MessageNotification from "./pages/Message-Notification";
import Chat from "./pages/Chat";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import HelpSupport from "./pages/HelpSupport";
import Wishlist from "./pages/Wishlist";
import Affilate from "./pages/Affilate";
import AffilatePending from "./pages/AffilatePending";
import AffilateRequest from "./pages/AffilateRequest";
import Checkout from "./pages/Checkout";
import Pay from "./pages/Pay";
import Withdraw from "./pages/Withdraw";
import ForgotPassward1 from "./pages/ForgotPassward1";
import ForgotPassward2 from "./pages/ForgotPassward2";
import ForgotPassward3 from "./pages/ForgotPassward3";
import PasswardReset from "./pages/PasswardReset";
import ProductDetails from "./pages/ProductDetails";
import Order from "./pages/OrderTrack";
import Orders from "./Orders";
import EditProfile from "./pages/EditProfile";
function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <ScrollToTop />
      <Navbar />
      <MobileTopNav />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/notifications" element={<MessageNotification />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<HelpSupport />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/affiliate" element={<Affilate />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/affiliate-pending" element={<AffilatePending />} />
        <Route path="/affiliate-request" element={<AffilateRequest />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/pay/:method" element={<Pay />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/forgot-password-1" element={<ForgotPassward1 />} />
        <Route path="/forgot-password-2" element={<ForgotPassward2 />} />
        <Route path="/forgot-password-3" element={<ForgotPassward3 />} />
        <Route path="/password-reset" element={<PasswardReset />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile/:id" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

        {/* Additional routes from Footer */}
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/faqs" element={<HelpSupport />} />
        <Route path="/terms" element={<About />} />
        <Route path="/privacy" element={<About />} />

      </Routes>
      <MobileBottomNav />
      <Footer />
    </div>
  );
}

export default App;
