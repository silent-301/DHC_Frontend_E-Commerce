import React, { useState } from 'react';
import { User, Settings, Package, Heart, CreditCard, LogOut, ChevronRight, Mail, Lock, UserPlus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/useCart';

const ProfilePage = ({ onNavigateHome }) => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [isLoginView, setIsLoginView] = useState(true);
  const [activeTab, setActiveTab] = useState('main'); // 'main' or 'favorites'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth
    login({ name: formData.name || 'User', email: formData.email });
  };

  if (!isAuthenticated) {
    return (
      <main className="container-wide py-12 flex justify-center items-center min-h-[600px]">
        <div className="bg-white border border-border rounded-2xl shadow-xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              {isLoginView ? <Lock size={32} /> : <UserPlus size={32} />}
            </div>
            <h1 className="text-2xl font-bold text-dark">{isLoginView ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-secondary mt-2">Please enter your details to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-dark">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg outline-none focus:border-primary transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  required 
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg outline-none focus:border-primary transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg outline-none focus:border-primary transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark shadow-lg transition-all transform active:scale-[0.98] mt-2">
              {isLoginView ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-secondary text-sm">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLoginView(!isLoginView)}
                className="ml-2 text-primary font-bold hover:underline"
              >
                {isLoginView ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </main>
    );
  }

  const menuItems = [
    { id: 'orders', icon: <Package size={20} />, label: 'My Orders', desc: 'Track, return or buy things again' },
    { id: 'favorites', icon: <Heart size={20} />, label: 'My Favorites', desc: 'View and manage your saved items' },
    { id: 'payments', icon: <CreditCard size={20} />, label: 'Payment Methods', desc: 'Manage your cards and saved accounts' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Account Settings', desc: 'Edit your profile, password and preferences' },
  ];

  const handleMenuClick = (id) => {
    if (id === 'favorites') {
      setActiveTab('favorites');
    }
  };

  return (
    <main className="container-wide py-8 animate-in slide-in-from-bottom duration-700">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white border border-border rounded-xl p-6 shadow-sm mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center text-primary mb-4 border-4 border-white shadow-md">
                <User size={48} />
              </div>
              <h2 className="text-xl font-bold text-dark">{user?.name}</h2>
              <p className="text-secondary text-sm">{user?.email}</p>
              <button className="mt-4 px-6 py-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary-light transition-all text-sm">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={logout}
              className="w-full p-4 flex items-center justify-between text-red-500 hover:bg-red-50 transition-all font-medium border-t border-gray-50"
            >
              <div className="flex items-center gap-3">
                <LogOut size={20} />
                <span>Sign Out</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          {activeTab === 'main' ? (
            <>
              <h1 className="text-2xl font-bold mb-6 text-dark text-center lg:text-left">Your Account</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleMenuClick(item.id)}
                    className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-bg rounded-lg flex items-center justify-center text-secondary group-hover:text-primary group-hover:bg-primary-light transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-dark">{item.label}</h3>
                          <p className="text-sm text-secondary line-clamp-1">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-6 text-dark">Recent Orders</h2>
                <div className="text-center py-12 text-secondary italic">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Package size={32} />
                  </div>
                  <p>You haven't placed any orders yet.</p>
                  <button 
                    onClick={onNavigateHome}
                    className="mt-4 text-primary font-bold hover:underline"
                  >
                    Start shopping
                  </button>
                </div>
              </div>
            </>
          ) : activeTab === 'favorites' ? (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => setActiveTab('main')}
                  className="flex items-center gap-2 text-primary font-bold hover:underline"
                >
                  <ArrowLeft size={20} />
                  Back to Account
                </button>
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-dark">My Favorites</h1>
                  <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-bold">{favorites.length} items</span>
                </div>
              </div>

              {favorites.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-end mb-2">
                    <button 
                      onClick={clearFavorites}
                      className="text-red-500 text-sm font-bold flex items-center gap-2 hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                      Clear all
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {favorites.map((product) => (
                      <div key={product.id} className="bg-white border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-all group">
                        <div className="relative aspect-square mb-4 bg-bg rounded-lg overflow-hidden p-4 flex items-center justify-center">
                          <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                          <button 
                            onClick={() => toggleFavorite(product)}
                            className="absolute top-2 right-2 p-2 bg-white/90 shadow-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <h3 className="font-bold text-dark text-sm line-clamp-2 mb-2 h-10">{product.title}</h3>
                        <p className="font-bold text-primary mb-4">{product.price}</p>
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-all"
                        >
                          <ShoppingCart size={16} />
                          Move to cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-border rounded-xl p-12 text-center shadow-sm">
                  <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                    <Heart size={40} />
                  </div>
                  <h2 className="text-xl font-bold text-dark mb-2">Your favorites list is empty</h2>
                  <p className="text-secondary max-w-sm mx-auto mb-8">Save items you like to your favorites so you can easily find them later.</p>
                  <button 
                    onClick={onNavigateHome}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg"
                  >
                    Explore Products
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
