import { Link } from "react-router-dom";
import { Menu, Users, Truck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./home.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      {/* Navbar - Already working */}

      {/* Hero Section - FIXED */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-pink-400/20 animate-pulse blur-3xl -z-10"></div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
              Order Food
            </span>
            <br />
            <span className="text-6xl md:text-7xl text-gray-900 drop-shadow-xl">
              Lightning Fast
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-3xl mx-auto text-gray-700 font-light leading-relaxed opacity-90">
            Discover amazing restaurants near you. Order delicious food with
            real-time tracking and lightning-fast delivery.
          </p>

          <div className="hero-buttons mb-20">
            {/* Order Now */}
            <Link to="/customer" className="btn-order group press-effect">
              <span className="flex items-center">
                <span className="btn-icon" aria-hidden="true"/>
                <span>Order Now</span>
                <svg
                  className="w-6 h-6 btn-order-arrow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>

            {/* Restaurant Login */}
            <Link to="/restaurant" className="btn-restaurant press-effect">
              <span className="flex items-center">
                <span className="btn-icon" aria-hidden="true"/>
                <span>Restaurant Login</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-10 rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 cursor-pointer backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <Menu className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6 text-center">
                200+ Restaurants
              </h3>
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                From local favorites to global cuisines near you
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 cursor-pointer backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6 text-center">
                Lightning Delivery
              </h3>
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                30 minutes or less - guaranteed
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 cursor-pointer backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6 text-center">
                50K+ Happy Customers
              </h3>
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                Join thousands who love our service daily
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="text-center p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">UPI</span>
            </div>
            <p className="font-semibold text-gray-900">UPI Payments</p>
          </div>
          <div className="text-center p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">🚚</span>
            </div>
            <p className="font-semibold text-gray-900">Fast Delivery</p>
          </div>
          <div className="text-center p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">📱</span>
            </div>
            <p className="font-semibold text-gray-900">Live Tracking</p>
          </div>
          <div className="text-center p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">★</span>
            </div>
            <p className="font-semibold text-gray-900">Top Ratings</p>
          </div>
        </div>
      </section>
    </div>
  );
}
