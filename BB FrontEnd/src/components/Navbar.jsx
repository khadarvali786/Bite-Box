import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal"; // ← ADD THIS IMPORT
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/"
              className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
            >
              🍽️ BiteBox
            </Link>

            <div className="flex items-center space-x-6">
              {!user ? (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-[#ff5722] text-white font-semibold hover:bg-[#e64a19] rounded-lg transition-all login-btn press-effect"
                >
                  Login
                </Link>
              ) : (
                <>
                  {/* CART BUTTON ← CLICK OPENS MODAL */}
                  <button
                    onClick={() => setIsCartOpen(true)} // ← TOGGLE MODAL
                    className="relative p-2 hover:bg-orange-50 rounded-xl transition-all group"
                  >
                    <ShoppingCart
                      size={24}
                      className="text-gray-700 group-hover:text-orange-500"
                    />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                        {totalItems}
                      </span>
                    )}
                  </button>

                  <span className="text-sm text-gray-600 hidden md:block">
                    👋 {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 p-2 hover:bg-red-50 text-red-600 rounded-xl transition-all"
                  >
                    <LogOut size={20} />
                  </button>
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
