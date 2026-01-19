import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Clock, 
  CheckCircle2,
  ShoppingBag,
  MapPinned,
  Gift,
  Store
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart, totalItems } = useCart();
  const { user } = useAuth();
  
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    phone: ''
  });

  // Order success screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-16 sm:pt-24 px-3 sm:px-4">
        <div className="max-w-md mx-auto text-center py-8 sm:py-16">
          <div className="w-20 h-20 sm:w-32 sm:h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10 sm:w-16 sm:h-16 text-green-500" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Order Placed! 🎉</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">Your food will be ready for pickup</p>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-8">Order ID: #{orderId}</p>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6">
            <div className="flex items-center justify-center space-x-2 text-orange-600 mb-2 sm:mb-4">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-semibold text-sm sm:text-base">Pickup Time</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">Ready in 20-30 minutes</p>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
              <MapPinned className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-semibold text-sm sm:text-base">Pickup Location</span>
            </div>
            <p className="text-white/90 text-sm sm:text-base">Visit the restaurant to collect your order</p>
          </div>

          <button
            onClick={() => navigate('/customer')}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 sm:py-4 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 press-effect"
          >
            Continue Ordering
          </button>
        </div>
      </div>
    );
  }

  // Empty cart check - redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 pt-16 sm:pt-24 px-3 sm:px-4">
        <div className="max-w-md mx-auto text-center py-8 sm:py-16">
          <div className="w-20 h-20 sm:w-32 sm:h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
            <ShoppingBag className="w-10 h-10 sm:w-16 sm:h-16 text-orange-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Your Cart is Empty!</h2>
          <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-8">Add some delicious items from restaurants</p>
          <button
            onClick={() => navigate('/customer')}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 sm:py-4 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 press-effect"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  const taxes = Math.round(totalPrice * 0.05);
  const discount = totalPrice > 500 ? 50 : 0;
  const grandTotal = totalPrice + taxes - discount;

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Wallet, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'cod', name: 'Pay at Pickup', icon: Banknote, description: 'Pay when you collect' },
  ];

  const handlePlaceOrder = async () => {
    if (!customerInfo.phone) {
      alert('Please enter your phone number');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and show success
    clearCart();
    setIsProcessing(false);
    setOrderId(`BBox${Date.now().toString().slice(-8)}`);
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 pt-14 sm:pt-20 pb-24 sm:pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-12 sm:top-16 z-40">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all press-effect"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900">Checkout</h1>
              <p className="text-xs sm:text-sm text-gray-500">{totalItems} items • Self Pickup</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Customer Info & Payment */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Store className="text-orange-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Pickup Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setCustomerInfo({...customerInfo, phone: value});
                    }}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-50 rounded-lg sm:rounded-xl border border-orange-200">
                <p className="text-xs sm:text-sm text-orange-800">
                  <span className="font-semibold">📍 Self Pickup:</span> You'll receive a notification when your order is ready. Visit the restaurant to collect it.
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <CreditCard className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all press-effect ${
                      selectedPayment === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-4 transition-all flex-shrink-0 ${
                      selectedPayment === method.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <method.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{method.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{method.description}</p>
                    </div>
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      selectedPayment === method.id ? 'border-orange-500' : 'border-gray-300'
                    }`}>
                      {selectedPayment === method.id && (
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-4 sm:space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-64 overflow-y-auto">
                {cartItems.map(cart => (
                  <div key={cart.restaurantId}>
                    <p className="font-semibold text-orange-600 text-xs sm:text-sm mb-2 truncate">{cart.restaurantName}</p>
                    {cart.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{item.name}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base flex-shrink-0 ml-2">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Bill Details</h2>
              
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center space-x-1">
                    <Store className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Delivery Fee</span>
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">FREE (Self Pickup)</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Charges</span>
                  <span>₹{taxes}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center space-x-1">
                      <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Discount</span>
                    </span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 sm:pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900">
                    <span>To Pay</span>
                    <span>₹{grandTotal}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-green-600 mt-1">You're saving ₹40+ on delivery!</p>
                </div>
              </div>
            </div>

            {/* Pickup Time */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Estimated Pickup Time</p>
                  <p className="text-white/80 text-xs sm:text-sm">Ready in 20-30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 shadow-2xl z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-gray-500">Total Amount</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">₹{grandTotal}</p>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className={`px-4 py-2.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-xl transition-all duration-300 press-effect flex-shrink-0 ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-2xl hover:-translate-y-1'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="hidden sm:inline">Processing...</span>
                <span className="sm:hidden">Wait...</span>
              </span>
            ) : (
              <span><span className="hidden sm:inline">Place Order • </span><span className="sm:hidden">Order </span>₹{grandTotal}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
