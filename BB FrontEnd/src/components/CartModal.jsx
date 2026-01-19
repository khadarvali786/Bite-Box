import { useNavigate } from 'react-router-dom';
import { X, Trash2, Minus, Plus, CreditCard, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  console.log("cartItems : "+JSON.stringify(cartItems));
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-t-2xl sm:rounded-3xl w-full max-w-md md:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Your Cart</h2>
            <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all press-effect">
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Add items from restaurants to get started</p>
              <button 
                onClick={onClose}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all press-effect"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <>
              {cartItems.map(cart => (
                <div key={cart.restaurantId} className="border-b border-gray-100 pb-4 sm:pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h4 className="font-bold text-sm sm:text-lg text-gray-900 truncate max-w-[200px] sm:max-w-none">{cart.restaurantName}</h4>
                  </div>
                  {cart.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2.5 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl mb-2 last:mb-0">
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                        <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <h5 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.name}</h5>
                          <p className="text-orange-600 font-bold text-sm sm:text-base">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
                        <div className="flex items-center space-x-1 sm:space-x-2 bg-white p-1 sm:p-2 rounded-lg sm:rounded-xl border">
                          <button 
                            onClick={() => updateQuantity(cart.restaurantId, item.id, item.quantity - 1)}
                            className="p-0.5 sm:p-1 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="font-bold w-5 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(cart.restaurantId, item.id, item.quantity + 1)}
                            className="p-0.5 sm:p-1 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(cart.restaurantId, item.id)}
                          className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 rounded-b-2xl sm:rounded-b-3xl">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between text-lg sm:text-xl font-bold">
                <span>Total:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-5 sm:py-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 press-effect flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Proceed to Checkout
              </button>
              <button 
                onClick={clearCart}
                className="w-full border-2 border-gray-300 text-gray-700 py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all press-effect"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
