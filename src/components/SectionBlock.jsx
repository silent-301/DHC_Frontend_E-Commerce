import React from 'react';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart } from 'lucide-react';

const SectionBlock = ({ items, bannerTitle, bannerImage, category, onProductClick, onNavigateListing }) => {
  const { addToCart, showToast } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please login first!', 'error');
      return;
    }
    addToCart(item);
  };

  return (
    <section className="py-4">
      <div className="container-wide bg-white border border-border rounded-lg flex flex-col lg:flex-row overflow-hidden shadow-sm">
        {/* Feature Banner */}
        <div 
          className="lg:w-72 shrink-0 relative p-6 flex flex-col bg-cover bg-center text-white min-h-[250px] lg:min-h-0" 
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-6 max-w-[180px] leading-tight drop-shadow-md">{bannerTitle}</h3>
            <button 
              onClick={() => onNavigateListing(category)}
              className="bg-white text-dark px-6 py-2 rounded-lg font-bold w-fit mt-auto shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Source now
            </button>
          </div>
        </div>
        {/* Items Grid */}
        <div className="flex-grow grid grid-cols-2 md:grid-cols-4">
          {items.map((item, i) => (
            <div 
              key={i} 
              onClick={() => onProductClick(item)}
              className="p-4 border-b border-r last:border-r-0 md:[&:nth-child(4)]:border-r-0 md:[&:nth-child(8)]:border-r-0 group cursor-pointer hover:bg-primary-light/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2 h-full">
                <div className="flex flex-col h-full">
                  <p className="text-sm font-medium leading-tight mb-1 group-hover:text-primary transition-colors pr-2">{item.title}</p>
                  <p className="text-secondary text-[12px] mt-auto font-bold">{item.price}</p>
                </div>
                <div className="shrink-0 overflow-hidden rounded-md relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-contain transition-transform group-hover:scale-110" 
                  />
                  {/* Quick plus button for cart */}
                  <button 
                    onClick={(e) => handleAddToCart(e, item)}
                    className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-tl-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-full group-hover:translate-y-0 shadow-sm"
                  >
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionBlock;
