import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, ChevronDown, User, MessageSquare, Heart, Globe, Menu 
} from 'lucide-react';
import { categories } from '../data';

const Navbar = ({ activePage, onNavigateHome, onNavigateListing, onNavigateCart, onNavigateProfile, cartCount, currentCategory, currentSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || 'All category');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync with global state changes
  useEffect(() => {
    setSearchQuery(currentSearchQuery || '');
  }, [currentSearchQuery]);

  useEffect(() => {
    setSelectedCategory(currentCategory || 'All category');
  }, [currentCategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onNavigateListing(selectedCategory === 'All category' ? null : selectedCategory, searchQuery);
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container-wide flex flex-wrap items-center justify-between py-4">
        {/* Logo */}
        <div className="flex w-full items-center justify-between mb-4 md:mb-0 md:w-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
            <div className="bg-primary p-2 rounded-lg">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-primary">Brand</span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full md:w-[600px] border-2 border-primary rounded-lg h-11 relative">
          <input 
            type="text" 
            placeholder="Search" 
            className="flex-grow px-4 outline-none text-dark rounded-l-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div 
            ref={dropdownRef}
            className="flex items-center border-l px-3 bg-white cursor-pointer hidden sm:flex hover:bg-bg transition-colors relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-sm select-none">{selectedCategory}</span>
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            {/* Simple Dropdown simulation */}
            <div className={`absolute top-[calc(100%+8px)] right-0 bg-white border border-border shadow-2xl rounded-xl ${isOpen ? 'show block' : 'hide hidden'} min-w-[220px] z-[100] py-2 overflow-hidden`}>
              <div 
                className={`px-4 py-3 text-sm hover:bg-primary-light cursor-pointer transition-colors ${selectedCategory === 'All category' ? 'text-primary font-bold bg-blue-50/50' : 'text-dark'}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory('All category');
                    setIsOpen(false);
                    onNavigateListing(null, searchQuery);
                }}
              >
                All categories
              </div>
              {categories.map(cat => (
                <div 
                  key={cat} 
                  className={`px-4 py-3 text-sm hover:bg-primary-light cursor-pointer transition-colors ${selectedCategory === cat ? 'text-primary font-bold bg-blue-50/50' : 'text-dark'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(cat);
                    setIsOpen(false);
                    onNavigateListing(cat, searchQuery);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
            <button type="submit" className="bg-primary text-white px-8 font-medium hover:bg-primary-dark transition-colors shrink-0 rounded-r-md">
            Search
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div 
            className={`flex flex-col items-center cursor-pointer transition-colors ${activePage === 'profile' ? 'text-primary' : 'text-secondary hover:text-primary'}`}
            onClick={onNavigateProfile}
          >
            <User className="w-5 h-5" />
            <span className="text-[12px] mt-1">Profile</span>
          </div>
          <div 
            className={`flex flex-col items-center cursor-pointer transition-colors ${activePage === 'profile' ? 'text-primary' : 'text-secondary hover:text-primary'}`}
            onClick={onNavigateProfile}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[12px] mt-1">Message</span>
          </div>
          <div 
            className={`flex flex-col items-center cursor-pointer transition-colors ${activePage === 'profile' ? 'text-primary' : 'text-secondary hover:text-primary'}`}
            onClick={onNavigateProfile}
          >
            <Heart className="w-5 h-5" />
            <span className="text-[12px] mt-1">Orders</span>
          </div>
          <div 
            className={`flex flex-col items-center cursor-pointer transition-colors ${activePage === 'cart' ? 'text-primary' : 'text-secondary hover:text-primary'}`}
            onClick={onNavigateCart}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[12px] mt-1 relative">
              My cart
              <span className="absolute -top-2 -right-2 bg-[#EB001B] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Subnav */}
      <div className="border-t hidden sm:block">
        <div className="container-wide py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 whitespace-nowrap">
            {activePage !== 'home' && (
              <div 
                className="cursor-pointer hover:text-primary transition-colors font-medium flex items-center gap-1"
                onClick={onNavigateHome}
              >
                <span>Home</span>
              </div>
            )}
            <div className="flex items-center gap-1 cursor-pointer font-medium hover:text-primary transition-colors active:scale-95" onClick={() => onNavigateListing(null)}>
              <Menu className="w-5 h-5" />
              <span>All categories</span>
            </div>
            <span className="cursor-pointer hover:text-primary transition-colors active:scale-95" onClick={() => onNavigateListing(null, 'hot')}>Hot offers</span>
            <span className="cursor-pointer hover:text-primary transition-colors active:scale-95" onClick={() => onNavigateListing(null, 'gift')}>Gift boxes</span>
            <span className="cursor-pointer hover:text-primary transition-colors active:scale-95" onClick={() => onNavigateListing(null, 'projects')}>Projects</span>
            <span className="cursor-pointer hover:text-primary transition-colors active:scale-95" onClick={() => onNavigateListing(null, 'item')}>Menu item</span>
          </div>
          <div className="flex items-center gap-6 whitespace-nowrap">
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
              <span>English, USD</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
              <span>Ship to</span>
              <Globe className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
