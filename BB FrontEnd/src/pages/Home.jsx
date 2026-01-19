import { Link } from "react-router-dom";
import { Menu, Users, Clock, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import "./home.css";

export default function Home() {
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
            Skip the delivery fees! Order ahead, pick up fresh food from your favorite restaurants. <span className="text-orange-600 font-semibold">Save money, eat better.</span>
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
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6 text-center">
                Self Pickup
              </h3>
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                No delivery fees - pick up fresh food yourself
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-3xl font-black mb-4">
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  🍽️ BiteBox
                </span>
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Order ahead, skip the wait. Fresh food ready when you arrive. No delivery fees, just great food.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-all press-effect">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-all press-effect">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-all press-effect">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-orange-400">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/customer" className="text-gray-400 hover:text-white transition-colors">Browse Restaurants</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login / Sign Up</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner with Us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-orange-400">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-orange-400">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-gray-400">
                  <MapPin size={18} className="text-orange-400" />
                  <span>Hyderabad, Telangana, India</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone size={18} className="text-orange-400" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Mail size={18} className="text-orange-400" />
                  <span>support@bitebox.in</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} BiteBox. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Made with ❤️ in India
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
