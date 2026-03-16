import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import SidebarFilter from './SidebarFilter';
import ProductList from './ProductList';

const ProductListingPage = ({ 
  onProductClick, 
  selectedCategory, 
  onCategorySelect, 
  searchQuery, 
  onSearch, 
  onBack,
  filters,
  onFilterChange,
  onClearFilters
}) => {
  const handleBreadcrumbClick = (path, index) => {
    if (path === 'Home') {
      onBack();
    } else if (index === 1) {
      // Category index - if it's "All Categories", set to null
      onCategorySelect(path === 'All Categories' ? null : path);
    }
  };

  return (
    <main className="container-wide py-4 animate-in fade-in duration-700">
      <Breadcrumb 
        paths={['Home', selectedCategory || 'All Categories']} 
        onPathClick={handleBreadcrumbClick}
      />
      
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Sidebar */}
        <div className="w-full lg:w-60 shrink-0">
          <SidebarFilter 
            onCategorySelect={onCategorySelect} 
            selectedCategory={selectedCategory} 
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-grow min-w-0">
          <ProductList 
            onProductClick={onProductClick} 
            selectedCategory={selectedCategory} 
            searchQuery={searchQuery}
            onSearch={onSearch}
            filters={filters}
          />
        </div>
      </div>
    </main>
  );
};

export default ProductListingPage;
