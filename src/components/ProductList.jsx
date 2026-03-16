import React, { useState, useMemo } from 'react';
import { Star, Heart, LayoutGrid, List, ShoppingCart, Info } from 'lucide-react';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { allProducts } from '../data';

const ProductCardList = ({ product, onClick }) => {
  const { addToCart, showToast } = useCart();
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please login first!', 'error');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white border border-border rounded-lg p-4 gap-4 hover:shadow-lg transition-shadow bg-white relative group">
      <div 
        className="w-full sm:w-48 h-48 shrink-0 flex items-center justify-center p-2 rounded-lg bg-gray-50/50 cursor-pointer"
        onClick={onClick}
      >
        <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
      </div>
      
      <div className="flex-grow flex flex-col pt-1">
        <div className="flex justify-between items-start gap-4 pr-8">
          <h3 
            className="font-bold text-dark text-lg hover:text-primary cursor-pointer transition-colors leading-tight line-clamp-2"
            onClick={onClick}
          >
            {product.title}
          </h3>
        </div>
        
        <div className="flex items-end gap-2 mt-2">
          <span className="font-bold text-xl text-dark leading-none">{typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}</span>
        </div>
        
        <div className="flex items-center gap-4 mt-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
             <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-[#FF9017] text-[#FF9017]' : 'fill-[#D1D5DB] text-[#D1D5DB]'}`} />
              ))}
            </div>
            <span className="text-[#FF9017] font-bold text-sm ml-1">4.5</span>
          </div>
          <span className="text-secondary text-sm flex items-center gap-1.5"><span className="w-1 h-1 bg-border rounded-full"></span>154 orders</span>
          <span className="text-[#00B517] font-medium text-sm flex items-center gap-1.5"><span className="w-1 h-1 bg-border rounded-full"></span>Free Shipping</span>
        </div>

        <p className="text-secondary text-sm leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3 mb-2">{product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</p>
        
        <div className="mt-auto pt-2 flex items-center gap-6">
          <button 
            className="text-primary font-medium text-sm hover:underline hover:text-primary-dark cursor-pointer transition-all"
            onClick={onClick}
          >
            View details
          </button>
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-primary-dark transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </button>
        </div>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product);
        }}
        className={`absolute top-4 right-4 p-2 rounded-md border bg-white shadow-sm transition-all focus:outline-none ${
          isFavorite(product.id) ? 'text-primary border-primary bg-blue-50' : 'text-secondary border-border hover:bg-gray-50'
        }`}
      >
        <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};

const ProductCardGrid = ({ product, onClick }) => {
  const { addToCart, showToast } = useCart();
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please login first!', 'error');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="bg-white border border-border rounded-lg p-3 hover:shadow-lg transition-shadow relative group h-full flex flex-col">
      <div 
        className="aspect-square flex items-center justify-center p-4 mb-3 rounded-lg bg-gray-50/50 overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
      </div>
      
      <div className="space-y-1 flex-grow flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-dark">{product.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className={`p-1.5 rounded-md border shadow-sm transition-all focus:outline-none ${
              isFavorite(product.id) ? 'text-primary border-primary bg-blue-50' : 'text-secondary border-border hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-[#FF9017] text-[#FF9017]' : 'fill-[#D1D5DB] text-[#D1D5DB]'}`} />
            ))}
          </div>
          <span className="text-[#FF9017] font-bold text-xs">4.5</span>
        </div>
        
        <h3 
          className="text-secondary text-sm hover:text-primary cursor-pointer transition-colors line-clamp-2 min-h-[40px] leading-tight mb-2"
          onClick={onClick}
        >
          {product.title}
        </h3>

        <button 
          onClick={handleAddToCart}
          className="mt-auto w-full flex items-center justify-center gap-2 py-2 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary-dark transition-all opacity-0 group-hover:opacity-100"
        >
          <ShoppingCart className="w-3 h-3" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

const ProductList = ({ onProductClick, selectedCategory, searchQuery, filters }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Featured');

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    const matches = String(priceStr).replace(/,/g, '').match(/[\d.]+/);
    return matches ? parseFloat(matches[0]) : 0;
  };

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    
    // Filter by Category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        (p.category && p.category.toLowerCase().includes(query))
      );
    }

    // Filter by Brands
    if (filters?.brands?.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }

    // Filter by Features
    if (filters?.features?.length > 0) {
      result = result.filter(p => 
        p.features && filters.features.some(f => p.features.includes(f))
      );
    }

    // Filter by Price Range
    if (filters?.minPrice) {
      result = result.filter(p => parsePrice(p.price) >= parseFloat(filters.minPrice));
    }
    if (filters?.maxPrice) {
      result = result.filter(p => parsePrice(p.price) <= parseFloat(filters.maxPrice));
    }

    // Filter by Condition
    if (filters?.condition && filters.condition !== 'any') {
      result = result.filter(p => p.condition === filters.condition);
    }

    // Filter by Ratings
    if (filters?.ratings?.length > 0) {
      result = result.filter(p => filters.ratings.includes(Math.floor(p.rating || 4)));
    }

    // Sorting
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'Price: High to Low':
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'Highly Rated':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery, filters]);

  return (
    <div className="flex-grow">
      {/* Top Filter Bar */}
      <div className="bg-white border border-border rounded-lg p-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-dark font-medium">
            <span className="font-bold">{filteredProducts.length}</span> items in <span className="font-bold text-primary">{selectedCategory || 'All Categories'}</span>
        </p>
        
        <div className="flex items-center gap-4 text-sm w-full sm:w-auto">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer shrink-0" />
            <span className="text-dark whitespace-nowrap">Verified only</span>
          </label>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-border rounded-lg px-3 py-1.5 outline-none focus:border-primary text-dark bg-white cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highly Rated</option>
          </select>
          
          <div className="flex border border-border rounded-lg overflow-hidden shrink-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`} 
              title="Grid View"
            >
               <LayoutGrid className="w-5 h-5 text-dark" />
            </button>
             <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 border-l border-border transition-colors ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`} 
              title="List View"
            >
               <List className="w-5 h-5 text-dark" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, idx) => (
                <ProductCardGrid 
                  key={`${product.id}-${idx}`} 
                  product={product} 
                  onClick={() => onProductClick(product)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <ProductCardList 
                  key={product.id} 
                  product={product} 
                  onClick={() => onProductClick(product)}
                />
              ))}
            </div>
          )
      ) : (
          <div className="bg-white border border-border rounded-lg p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <Info size={32} />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">No products found</h3>
            <p className="text-secondary max-w-sm mx-auto">We couldn't find any products in the "{selectedCategory}" category at the moment.</p>
          </div>
      )}

      {/* Pagination (Only show if products exist) */}
      {filteredProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-end items-center mt-8 gap-4">
             <div className="flex items-center">
               <select className="border border-border rounded-lg px-3 py-1.5 outline-none focus:border-primary text-dark bg-white cursor-pointer hover:bg-gray-50 transition-colors text-sm">
                  <option>Show 10</option>
                  <option>Show 20</option>
                  <option>Show 50</option>
                </select>
             </div>
             <div className="flex items-center text-sm font-medium border border-border rounded-lg overflow-hidden bg-white">
                <button className="px-3 py-2 text-secondary hover:bg-gray-50 border-r border-border cursor-pointer transition-colors">&lt;</button>
                <button className="px-3 py-2 bg-gray-100 text-dark border-r border-border cursor-default">1</button>
                <button className="px-3 py-2 text-dark hover:bg-gray-50 border-r border-border cursor-pointer transition-colors">2</button>
                <button className="px-3 py-2 text-dark hover:bg-gray-50 border-r border-border cursor-pointer transition-colors">3</button>
                <button className="px-3 py-2 text-secondary hover:bg-gray-50 cursor-pointer transition-colors">&gt;</button>
             </div>
          </div>
      )}
    </div>
  );
};

export default ProductList;
