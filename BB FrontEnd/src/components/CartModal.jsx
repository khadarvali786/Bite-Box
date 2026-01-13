import { useState } from 'react';
import { X, Trash2, Minus, Plus, CreditCard, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  console.log("cartItems : "+JSON.stringify(cartItems));
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add items from restaurants to get started</p>
            </div>
          ) : (
            <>
              {cartItems.map(cart => (
                <div key={cart.restaurantId} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg text-gray-900">{cart.restaurantName}</h4>
                  </div>
                  {cart.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h5 className="font-semibold text-gray-900">{item.name}</h5>
                          <p className="text-orange-600 font-bold">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border">
                          <button 
                            onClick={() => updateQuantity(cart.restaurantId, item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(cart.restaurantId, item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(cart.restaurantId, item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
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
          <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-3xl">
            <div className="space-y-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <CreditCard size={20} className="inline mr-2" />
                Checkout
              </button>
              <button 
                onClick={clearCart}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
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
