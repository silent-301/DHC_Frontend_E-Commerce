import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Deals from './components/Deals';
import SectionBlock from './components/SectionBlock';
import Recommended from './components/Recommended';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductListingPage from './components/ProductListingPage';
import CartPage from './components/CartPage';
import ProductDetailPage from './components/ProductDetailPage';
import ProfilePage from './components/ProfilePage';
import SuppliersByRegion from './components/SuppliersByRegion';
import { homeItems, techItems } from './data';
import { useCart } from './context/useCart';

// Import local assets for banners
import homeBanner from './assets/home-banner.png';
import techBanner from './assets/tech-banner.png';

const HomePage = ({ navigateToDetail, onNavigateListing, onNavigateProfile }) => (
  <main className="pb-10 animate-in fade-in duration-700">
    <Hero onNavigateListing={onNavigateListing} onNavigateProfile={onNavigateProfile} />
    <Deals onNavigateListing={onNavigateListing} />
    
    <SectionBlock 
      items={homeItems} 
      bannerTitle="Home and outdoor"
      bannerImage={homeBanner}
      category="Home interiors"
      onProductClick={navigateToDetail}
      onNavigateListing={onNavigateListing}
    />
    
    <SectionBlock 
      items={techItems} 
      bannerTitle="Consumer electronics"
      bannerImage={techBanner}
      category="Computer and tech"
      onProductClick={navigateToDetail}
      onNavigateListing={onNavigateListing}
    />
    
    <Recommended onProductClick={navigateToDetail} />
    <SuppliersByRegion />
  </main>
);

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState(['home']);
  const [filters, setFilters] = useState({
    brands: [],
    features: [],
    minPrice: '',
    maxPrice: '',
    condition: 'any',
    ratings: []
  });
  const { cartCount } = useCart();

  const navigateTo = (page, category = null, search = '', product = null) => {
    setHistory(prev => [...prev, activePage]);
    setActivePage(page);
    if (category !== undefined) setSelectedCategory(category);
    if (search !== undefined) setSearchQuery(search);
    if (product !== undefined) setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (['brands', 'features', 'ratings'].includes(type)) {
        const current = prev[type];
        const updated = current.includes(value) 
          ? current.filter(item => item !== value)
          : [...current, value];
        return { ...prev, [type]: updated };
      }
      return { ...prev, [type]: value };
    });
  };

  const navigateBack = () => {
    if (history.length > 0) {
      const prevPage = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setActivePage(prevPage);
    } else {
      navigateToHome();
    }
  };

  const navigateToHome = () => {
    setActivePage('home');
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSearchQuery('');
    setFilters({
      brands: [],
      features: [],
      minPrice: '',
      maxPrice: '',
      condition: 'any',
      ratings: []
    });
    setHistory(['home']);
  };

  const navigateToListing = (category = null, search = '') => {
    navigateTo('listing', category, search);
  };

  const navigateToCart = () => navigateTo('cart');

  const navigateToDetail = (product) => {
    navigateTo('detail', undefined, undefined, product);
  };

  const navigateToProfile = () => navigateTo('profile');

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage navigateToDetail={navigateToDetail} onNavigateListing={navigateToListing} onNavigateProfile={navigateToProfile} />;
      case 'listing': return (
        <ProductListingPage 
          onProductClick={navigateToDetail} 
          selectedCategory={selectedCategory} 
          onCategorySelect={setSelectedCategory} 
          searchQuery={searchQuery} 
          onSearch={setSearchQuery} 
          onBack={navigateBack}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={() => setFilters({
            brands: [],
            features: [],
            minPrice: '',
            maxPrice: '',
            condition: 'any',
            ratings: []
          })}
        />
      );
      case 'cart': return <CartPage onNavigateHome={navigateToHome} />;
      case 'detail': return <ProductDetailPage product={selectedProduct} onNavigateDetail={navigateToDetail} onBack={navigateBack} onNavigateHome={navigateToHome} />;
      case 'profile': return <ProfilePage onNavigateHome={navigateToHome} />;
      default: return <HomePage navigateToDetail={navigateToDetail} onNavigateListing={navigateToListing} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-primary selection:text-white flex flex-col">
      <Navbar 
        activePage={activePage}
        onNavigateHome={navigateToHome}
        onNavigateListing={navigateToListing}
        onNavigateCart={navigateToCart}
        onNavigateProfile={navigateToProfile}
        cartCount={cartCount}
        currentCategory={selectedCategory}
        currentSearchQuery={searchQuery}
      />
      
      <div className="flex-grow">
        {renderPage()}
      </div>

      <Newsletter />
      <Footer 
        onNavigateHome={navigateToHome}
        onNavigateListing={navigateToListing}
        onNavigateCart={navigateToCart}
        onNavigateProfile={navigateToProfile}
      />
    </div>
  );
}

export default App;
