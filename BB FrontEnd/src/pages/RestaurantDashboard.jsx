import { Plus, Package, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const mockOrders = [
  { id: '#1234', customer: 'Rahul S.', items: 3, status: 'Preparing', time: '15 min ago' },
  { id: '#1235', customer: 'Priya K.', items: 2, status: 'Out for delivery', time: '8 min ago' },
  { id: '#1236', customer: 'Amit R.', items: 4, status: 'Delivered', time: '2 min ago' }
];

export default function RestaurantDashboard() {
  const { user } = useAuth();

  return (
    <div className="pt-4">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Header */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-400 to-green-500 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">₹2,450</p>
                <p className="text-green-100">Today's Sales</p>
              </div>
              <Package className="w-12 h-12 opacity-75" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-blue-100">Pending Orders</p>
              </div>
              <Package className="w-12 h-12 opacity-75" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-purple-100">Happy Customers</p>
              </div>
              <Users className="w-12 h-12 opacity-75" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <button className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all border-2 border-transparent hover:border-primary">
            <Plus className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Add Menu Item</h3>
            <p className="text-gray-600">Upload new dishes</p>
          </button>
          
          <button className="bg-white from-primary to-secondary text-black p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">View Orders</h3>
            <p>New orders waiting</p>
          </button>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {mockOrders.map((order) => (
              <div key={order.id} className="p-8 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{order.id}</p>
                    <p className="text-gray-600">{order.customer} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Out for delivery' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
