import React, { useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { recommended } from '../data';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

const Recommended = ({ onProductClick }) => {
  const { addToCart, showToast } = useCart();
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please login first!', 'error');
      return;
    }
    addToCart(item);
  };

  return (
    <section className="py-6">
      <div className="container-wide">
        <h3 className="text-2xl font-bold mb-6 text-dark border-b-2 border-primary/10 pb-2 inline-block">Recommended items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {recommended.map(item => (
            <div 
              key={item.id} 
              onClick={() => onProductClick(item)}
              className="bg-white border border-border rounded-xl p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group flex flex-col h-full"
            >
              {/* Like Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
                className={`absolute top-3 right-3 p-2 rounded-full border bg-white shadow-sm z-10 transition-all ${
                  isFavorite(item.id) ? 'text-[#EB001B] border-[#EB001B] bg-red-50' : 'text-secondary border-border hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite(item.id) ? 'fill-current' : ''}`} />
              </button>

              <div className="aspect-square mb-4 flex items-center justify-center overflow-hidden rounded-lg relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-4/5 h-4/5 object-contain transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Quick Add Overlay */}
                <button 
                  onClick={(e) => handleAddToCart(e, item)}
                  className="absolute bottom-0 left-0 right-0 bg-primary/95 text-white py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-full group-hover:translate-y-0"
                >
                  <ShoppingCart size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Add to cart</span>
                </button>
              </div>
              
              <p className="text-dark font-bold text-lg mb-1">{item.price}</p>
              <div className="flex mb-2 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FF9017] text-[#FF9017]" />
                ))}
              </div>
              <p className="text-secondary text-sm line-clamp-2 group-hover:text-primary transition-colors flex-grow">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommended;
