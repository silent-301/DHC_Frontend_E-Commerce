import React, { useState } from 'react';
import { User } from 'lucide-react';
import { categories } from '../data';
import heroBanner from '../assets/hero-banner-clean.png';
import { useAuth } from '../context/AuthContext';

const Hero = ({ onNavigateListing, onNavigateProfile }) => {
  const [activeCategory, setActiveCategory] = useState(1);
  const { user, isAuthenticated } = useAuth();

  return (
    <section className="py-6">
      <div className="container-wide bg-white border border-border rounded-lg p-5 flex flex-col lg:flex-row gap-5">
        {/* Categories Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <ul className="space-y-1">
            {categories.map((cat, i) => (
              <li 
                key={i} 
                onClick={() => {
                  setActiveCategory(i);
                  onNavigateListing(cat);
                }}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeCategory === i 
                    ? 'bg-primary-light font-medium text-dark translate-x-1' 
                    : 'text-secondary hover:bg-bg hover:translate-x-1'
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Banner */}
        <div 
          className="flex-grow relative h-[400px] rounded-lg overflow-hidden bg-cover bg-center p-10 flex flex-col justify-center text-white group shadow-inner"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          {/* Enhanced Gradient Overlay - pointer-events-none ensures it doesn't block button clicks */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-900/30 to-transparent z-0 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-lg">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-4 animate-fade-in">
              Technovate Selection
            </span>
            <h3 className="text-2xl mb-1 font-light tracking-wide opacity-90">Latest trending</h3>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 leading-tight drop-shadow-2xl">
              Electronic <span className="text-blue-200">items</span>
            </h2>
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigateListing('Computer and tech')}
                className="bg-white text-dark px-10 py-3.5 rounded-xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                Learn more
              </button>
              <button 
                onClick={() => onNavigateListing(null)}
                className="bg-transparent border-2 border-white/50 backdrop-blur-sm text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                Explore All
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-64 shrink-0 space-y-3">
          <div className="bg-primary-light p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-full border border-primary/20">
                <User className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm leading-tight text-dark">
                Hi, {isAuthenticated ? <span className="font-bold">{user?.name}</span> : 'user'}<br/>
                <span className="text-secondary">Welcome back!</span>
              </p>
            </div>
            
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => onNavigateProfile()}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-bold mb-2 hover:bg-primary-dark transition-all shadow-md active:scale-95"
                >
                  Join now
                </button>
                <button 
                  onClick={() => onNavigateProfile()}
                  className="w-full bg-white border border-border text-primary py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all active:scale-95"
                >
                  Log in
                </button>
              </>
            ) : (
              <button 
                onClick={() => onNavigateProfile()}
                className="w-full bg-primary text-white py-2 rounded-lg text-sm font-bold mb-2 hover:bg-primary-dark transition-all shadow-md active:scale-95"
              >
                My Profile
              </button>
            )}
          </div>
          <div className="bg-[#F38332] p-4 rounded-lg text-white shadow-md cursor-pointer hover:brightness-110 transition-all">
            <p className="text-sm">Get <span className="font-bold">US $10 off</span> with a new supplier</p>
          </div>
          <div className="bg-[#55BDC3] p-4 rounded-lg text-white shadow-md cursor-pointer hover:brightness-110 transition-all">
            <p className="text-sm">Send quotes with supplier inquiry</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
