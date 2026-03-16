import React, { useState } from 'react';
import { ShoppingCart, Facebook, Twitter, Linkedin, Instagram, Smartphone, ChevronDown, ChevronRight } from 'lucide-react';

const Footer = ({ onNavigateHome, onNavigateListing, onNavigateCart, onNavigateProfile }) => {
  const [lang, setLang] = useState('English');

  const handleLinkClick = (link) => {
    switch (link) {
      case 'Categories':
        onNavigateListing();
        break;
      case 'Login':
      case 'Register':
      case 'Settings':
      case 'My Orders':
        onNavigateProfile();
        break;
      case 'About Us':
      case 'Find store':
      case 'Blogs':
      case 'Help Center':
      case 'Money Refund':
      case 'Shipping':
      case 'Contact us':
      default:
        // For other links, we can scroll to top or just keep as is for now
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
    }
  };

  return (
    <footer className="bg-white pt-12 overflow-hidden">
      <div className="container-wide border-b pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={onNavigateHome}>
              <div className="bg-primary p-2 rounded-lg">
                <ShoppingCart className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-primary">Brand</span>
            </div>
            <p className="text-secondary text-sm mb-6 max-w-xs leading-relaxed">
              Best information about the company goes here but now lorem ipsum is dummy text used by designers.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <div key={i} className="bg-secondary/10 p-2.5 rounded-full cursor-pointer hover:bg-primary hover:text-white text-secondary transition-all shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
          
          {[
            { title: 'About', links: ['About Us', 'Find store', 'Categories', 'Blogs'] },
            { title: 'Partnership', links: ['About Us', 'Find store', 'Categories', 'Blogs'] },
            { title: 'Information', links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'] },
            { title: 'For users', links: ['Login', 'Register', 'Settings', 'My Orders'] }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold mb-6 text-dark uppercase text-[12px] tracking-wider">{section.title}</h4>
              <ul className="space-y-4 text-sm text-secondary">
                {section.links.map(link => (
                  <li 
                    key={link} 
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-primary cursor-pointer transition-colors hover:translate-x-1 duration-200"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-1">
            <h4 className="font-bold mb-6 text-dark uppercase text-[12px] tracking-wider">Get App</h4>
            <div className="space-y-3">
              <button className="w-full bg-dark text-white p-2 px-3 rounded-lg flex items-center gap-2 text-[10px] hover:brightness-125 transition-all shadow-lg text-left group">
                <Smartphone className="w-5 h-5 flex-shrink-0" />
                <span>
                  <span className="block opacity-60">Download on the</span>
                  <span className="block font-bold text-sm">App Store</span>
                </span>
              </button>
              <button className="w-full bg-dark text-white p-2 px-3 rounded-lg flex items-center gap-2 text-[10px] hover:brightness-125 transition-all shadow-lg text-left group">
                <div className="bg-white/20 p-1 rounded">
                  <ChevronRight className="w-4 h-4 fill-white" />
                </div>
                <span>
                  <span className="block opacity-60">Available on</span>
                  <span className="block font-bold text-sm">Google Play</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-bg py-5">
        <div className="container-wide flex flex-col md:flex-row justify-between items-center text-secondary text-sm gap-4 font-medium">
          <span>© 2023 Ecommerce Marketplace. All Rights Reserved.</span>
          <div className="flex items-center gap-4 relative group">
            <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
              <img src="https://placehold.co/24x16?text=USA" alt="flag" className="rounded-sm shadow-sm" />
              <span>{lang}</span>
              <ChevronDown className="w-4 h-4" />
              
              {/* Language Switcher Simulation */}
              <div className="absolute bottom-full right-0 mb-2 bg-white border border-border shadow-2xl rounded-lg hidden group-hover:block min-w-[120px] overflow-hidden">
                {['English', 'Spanish', 'French', 'German'].map(l => (
                  <div key={l} className="p-3 hover:bg-primary-light cursor-pointer text-dark text-xs" onClick={() => setLang(l)}>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
