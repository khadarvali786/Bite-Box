import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, User, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from "framer-motion";

export default function Login() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'customer' 
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const mockToken = 'mock-jwt-token-123';
      const mockUser = {
        id: '1',
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        role: formData.role
      };
      
      login(mockUser, mockToken);
      navigate(formData.role === 'restaurant' ? '/restaurant' : '/customer');
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/50">
        
        {/* Header - Smaller */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-600">
            {isLogin ? 'Sign in to continue' : 'Join BiteBox today'}
          </p>
        </div>

        {/* Form - Compact */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Name Field - Register Only */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Role Selector - Compact */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">As</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all appearance-none cursor-pointer bg-white"
            >
              <option value="customer">🍕 Customer</option>
              <option value="restaurant">🏪 Restaurant</option>
            </select>
          </div>

          {/* Submit Button - Perfect Size */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center py-3 px-6 text-lg font-bold rounded-xl transition-all duration-200 ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm">Signing in...</span>
              </>
            ) : (
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Toggle - Compact */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center justify-center mx-auto space-x-1.5 py-2 px-4 hover:bg-orange-50 rounded-lg transition-all duration-200"
          >
            <UserPlus size={16} />
            <span>{isLogin ? 'Create Account' : 'Back to Sign In'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
