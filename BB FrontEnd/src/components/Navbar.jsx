import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
   const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false); // ← ADD THIS STATE

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 sm:py-3 md:py-4">
            <Link
              to="/"
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
            >
              🍽️ <span className="hidden xs:inline">BiteBox</span><span className="xs:hidden">BB</span>
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
              {!user ? (
                <Link
                  to="/login"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#ff5722] text-white font-semibold hover:bg-[#e64a19] rounded-lg transition-all login-btn press-effect text-sm sm:text-base"
                >
                  Login
                </Link>
              ) : (
                <>
                  {/* CART BUTTON ← CLICK OPENS MODAL */}
                  <button
                    onClick={() => setIsCartOpen(true)} // ← TOGGLE MODAL
                    className="relative p-1.5 sm:p-2 hover:bg-orange-50 rounded-lg sm:rounded-xl transition-all group"
                  >
                    <ShoppingCart
                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-orange-500"
                    />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center font-bold shadow-lg">
                        {totalItems}
                      </span>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  <div className="relative group">
                    <button className="p-1.5 sm:p-2 hover:bg-orange-50 rounded-lg sm:rounded-xl transition-all press-effect">
                      <UserCircle className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 group-hover:text-orange-500" />
                    </button>
                    <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-3 sm:p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">{user.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="p-1.5 sm:p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:px-4 sm:py-3 text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all press-effect text-sm sm:text-base"
                        >
                          <LogOut className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
