import { useState } from 'react';
import { Search, MapPin, Clock, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const mockRestaurants = [
  {
    id: 1,
    name: "Spice Villa",
    cuisine: "Indian",
    rating: 4.8,
    time: "25 min",
    image: "https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=scseGeDCjSghwD2RELSaaT2Pn2NQz0gflEQ4BuiTSjs=",
    distance: "1.2 km",
    menu: [
      { id: 101, name: 'Chicken Biryani', price: 250, image: 'https://images.unsplash.com/photo-1575397777362-f2f758246bd5?w=200', description: 'Aromatic basmati rice with tender chicken' },
      { id: 102, name: 'Butter Chicken', price: 300, image: 'https://images.unsplash.com/photo-1603484778550-0cf06d803b35?w=200', description: 'Creamy tomato gravy with tandoori chicken' },
      { id: 103, name: 'Naan Bread', price: 80, image: 'https://images.unsplash.com/photo-1595946326546-e5df6fe4d779?w=200', description: 'Soft tandoor baked flatbread' }
    ]
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    time: "18 min",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    distance: "0.8 km",
    menu: [
      { id: 201, name: 'Margherita Pizza', price: 350, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=481&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Classic tomato & mozzarella pizza' },
      { id: 202, name: 'Pepperoni Pizza', price: 400, image: 'https://images.unsplash.com/photo-1574074070931-4727caa99c4e?w=200', description: 'Spicy pepperoni with double cheese' },
      { id: 203, name: 'Garlic Bread', price: 120, image: 'https://images.unsplash.com/photo-1611680875298-3d6c5e7f574b?w=200', description: 'Crispy garlic butter bread sticks' }
    ]
  },
  {
    id: 3,
    name: "Burger Haven",
    cuisine: "American",
    rating: 4.7,
    time: "22 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    distance: "1.5 km",
    menu: [
      { id: 301, name: 'Classic Beef Burger', price: 280, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', description: 'Juicy beef patty with cheddar cheese' },
      { id: 302, name: 'Crispy Chicken Burger', price: 260, image: 'https://images.unsplash.com/photo-1590751706381-e362e7598434?w=200', description: 'Crispy fried chicken fillet' },
      { id: 303, name: 'Veggie Delight', price: 220, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200', description: 'Fresh veggie patty burger' }
    ]
  }
];

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { addToCart, cartItems } = useCart(); 
  const [search, setSearch] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(''); // ✅ NOW DEFINED

  const filteredRestaurants = mockRestaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

    // ✅ FIXED: Robust add to cart with duplicate handling + feedback
const handleAddToCart = (restaurantId, item) => {
  // ✅ CORRECT: Send INDIVIDUAL restaurant cart structure
  const restaurantCartData = {
    restaurantId: restaurantId,
    restaurantName: selectedRestaurant.name,
    items: [{
      id: item.id,           // 101, 102, 201, etc.
      name: item.name,       // "Chicken Biryani"
      price: Number(item.price),  // ✅ FIX NaN - Convert to number
      image: item.image,
      description: item.description,
      quantity: 1
    }]
  };

  console.log("🛒 FIXED DATA:", restaurantCartData);
  addToCart(restaurantCartData);

  setAddedFeedback(`${item.name} added! 🛒`);
  setTimeout(() => setAddedFeedback(''), 2000);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 pt-8 md:pt-12">
      {/* Header - Mobile Responsive */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white p-4 md:p-8 rounded-b-2xl md:rounded-b-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-1/2 animate-pulse"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center px-2">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-4 drop-shadow-2xl leading-tight">
            Hey <span className="text-yellow-200 inline-block max-w-[120px] sm:max-w-[180px] md:max-w-none truncate align-bottom">{user?.name || 'Foodie'}</span>! 
          </h1>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-medium drop-shadow-lg leading-snug">
            Order ahead & pick up fresh - No delivery fees!
          </p>
        </div>
      </div>
      
      {/* Feedback Toast - Mobile Responsive */}
      {addedFeedback && (
        <div className="max-w-md mx-auto mb-4 md:mb-6 mx-2 md:mx-auto p-3 md:p-4 bg-green-100 border border-green-400 text-green-800 rounded-xl md:rounded-2xl shadow-lg animate-pulse text-sm md:text-base">
          ✅ {addedFeedback}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 md:py-12">
        {/* Search Bar - Mobile Responsive */}
        <div className="mb-6 md:mb-12">
          <div className="relative max-w-2xl mx-auto px-1">
            <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 text-orange-400 w-4 h-4 md:w-5 md:h-5" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 sm:pl-14 pr-4 md:pr-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all bg-white shadow-lg"
            />
          </div>
        </div>

        {/* Restaurants List OR Menu View */}
        {!showMenu ? (
          /* Restaurants Grid - Mobile Responsive */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id}
                className="group bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl hover:shadow-3xl hover:-translate-y-1 md:hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-white/60 cursor-pointer"
                onClick={() => {
                  setSelectedRestaurant(restaurant);
                  setShowMenu(true);
                }}
              >
                <div className="h-36 sm:h-48 md:h-60 overflow-hidden relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-2xl text-xs md:text-sm font-bold shadow-2xl">
                    ★ {restaurant.rating}
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors truncate">{restaurant.name}</h3>
                  <p className="text-orange-600 font-bold text-sm sm:text-base md:text-xl mb-1 md:mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center justify-between mb-3 md:mb-6 text-gray-600 text-xs sm:text-sm md:text-base">
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-500" />
                      <span>{restaurant.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-500" />
                      <span className="hidden sm:inline">Ready in </span><span>{restaurant.time}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white py-2.5 px-4 sm:py-3 sm:px-5 md:py-5 md:px-8 rounded-xl md:rounded-3xl font-bold text-xs sm:text-sm md:text-base shadow-xl md:shadow-2xl hover:shadow-3xl hover:-translate-y-1 md:hover:-translate-y-2 hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 group flex items-center justify-center space-x-2 md:space-x-3 press-effect">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                    <span>View Menu ({restaurant.menu.length})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Restaurant Menu View - Mobile Responsive */
          <div>
            {/* Menu Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 md:mb-16 p-4 md:p-8 bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-white/50 gap-3 md:gap-0">
              <button
                onClick={() => setShowMenu(false)}
                className="flex items-center space-x-2 md:space-x-3 text-gray-800 hover:text-orange-600 font-bold text-sm md:text-xl p-2 md:p-4 rounded-xl md:rounded-2xl hover:bg-orange-50 transition-all sm:mr-4 md:mr-8 shadow-md press-effect"
              >
                <ArrowLeft className="w-5 h-5 md:w-7 md:h-7" />
                <span>Back</span>
              </button>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-gray-900 mb-1 md:mb-2 truncate">{selectedRestaurant.name}</h2>
                <p className="text-sm sm:text-base md:text-2xl text-orange-600 font-bold">{selectedRestaurant.cuisine} • {selectedRestaurant.menu.length} items</p>
              </div>
            </div>

            {/* Menu Items Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {selectedRestaurant.menu.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl hover:shadow-3xl hover:-translate-y-1 md:hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-pointer">
                  <div className="h-36 sm:h-48 md:h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 sm:p-5 md:p-8">
                    <h4 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-3 truncate">{item.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-lg mb-3 md:mb-6 leading-relaxed line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xl sm:text-2xl md:text-3xl font-black text-orange-600">₹{item.price}</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(selectedRestaurant.id,item);
                        }}
                        className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-500 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-xs sm:text-sm md:text-xl shadow-lg md:shadow-2xl hover:shadow-3xl hover:-translate-y-1 md:hover:-translate-y-2 hover:from-green-600 hover:to-teal-600 transition-all duration-300 flex items-center space-x-1 sm:space-x-2 md:space-x-3 group-hover:scale-105 press-effect whitespace-nowrap"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Add</span>
                        <span className="sm:hidden">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
