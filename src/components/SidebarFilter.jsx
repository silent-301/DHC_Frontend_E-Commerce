import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';
import { categories } from '../data';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-border py-4 first:border-0 first:pt-0">
      <div 
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-bold text-dark text-sm">{title}</h4>
        {isOpen ? <ChevronUp className="w-4 h-4 text-secondary" /> : <ChevronDown className="w-4 h-4 text-secondary" />}
      </div>
      {isOpen && <div className="space-y-2.5 text-sm">{children}</div>}
    </div>
  );
};

const SidebarFilter = ({ onCategorySelect, selectedCategory, filters, onFilterChange, onClearFilters }) => {
  return (
    <aside className="w-full lg:w-60 shrink-0 bg-transparent lg:pr-4">
      <FilterSection title="Category">
        <div className="space-y-2 text-secondary">
          <p 
            onClick={() => onCategorySelect(null)}
            className={`hover:text-primary cursor-pointer transition-colors ${!selectedCategory ? 'text-primary font-bold' : ''}`}
          >
            All Categories
          </p>
          {categories.slice(0, 5).map(cat => (
            <p 
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`hover:text-primary cursor-pointer transition-colors ${selectedCategory === cat ? 'text-primary font-bold' : ''}`}
            >
              {cat}
            </p>
          ))}
          <p 
            onClick={onClearFilters}
            className="text-primary font-medium cursor-pointer mt-2 text-[13px] hover:underline"
          >
            Clear filters
          </p>
        </div>
      </FilterSection>

      <FilterSection title="Brands">
        {[
          { id: 'Samsung', label: 'Samsung' },
          { id: 'Apple', label: 'Apple' },
          { id: 'Huawei', label: 'Huawei' },
          { id: 'Pocco', label: 'Pocco' },
          { id: 'Lenovo', label: 'Lenovo' },
        ].map(brand => (
          <div key={brand.id} className="flex items-center gap-3">
            <input 
                type="checkbox" 
                id={brand.id} 
                checked={filters.brands.includes(brand.id)}
                onChange={() => onFilterChange('brands', brand.id)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer" 
            />
            <label htmlFor={brand.id} className="text-dark cursor-pointer select-none">{brand.label}</label>
          </div>
        ))}
        <p className="text-primary font-medium cursor-pointer mt-3 text-[13px]">See all</p>
      </FilterSection>

      <FilterSection title="Features">
        {[
          { id: 'Metallic', label: 'Metallic' },
          { id: 'Plastic cover', label: 'Plastic cover' },
          { id: '8GB Ram', label: '8GB Ram' },
          { id: 'Super power', label: 'Super power' },
          { id: 'Large Memory', label: 'Large Memory' },
        ].map(feature => (
          <div key={feature.id} className="flex items-center gap-3">
            <input 
                type="checkbox" 
                id={feature.id} 
                checked={filters.features.includes(feature.id)}
                onChange={() => onFilterChange('features', feature.id)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer" 
            />
            <label htmlFor={feature.id} className="text-dark cursor-pointer select-none">{feature.label}</label>
          </div>
        ))}
        <p className="text-primary font-medium cursor-pointer mt-3 text-[13px]">See all</p>
      </FilterSection>

      <FilterSection title="Price range">
        <div className="mb-4 pt-2 relative">
          <div className="h-1 bg-border rounded-full w-full relative">
            <div className="absolute left-0 right-0 h-full bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <label className="text-[12px] text-dark mb-1 block">Min</label>
            <input 
                type="number" 
                placeholder="0" 
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                className="w-full border border-border rounded p-2 text-sm outline-none focus:border-primary transition-colors" 
            />
          </div>
          <div className="flex-1">
            <label className="text-[12px] text-dark mb-1 block">Max</label>
            <input 
                type="number" 
                placeholder="9999" 
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                className="w-full border border-border rounded p-2 text-sm outline-none focus:border-primary transition-colors" 
            />
          </div>
        </div>
        <button 
            className="w-full border border-border rounded py-2 text-primary font-medium hover:bg-gray-50 transition-colors shadow-sm bg-white"
        >
          Apply
        </button>
      </FilterSection>

      <FilterSection title="Condition">
        {[
          { id: 'any', label: 'Any' },
          { id: 'refurbished', label: 'Refurbished' },
          { id: 'new', label: 'Brand new' },
          { id: 'old', label: 'Old items' },
        ].map(condition => (
          <div key={condition.id} className="flex items-center gap-3">
            <input 
              type="radio" 
              name="condition" 
              id={condition.id} 
              checked={filters.condition === condition.id}
              onChange={() => onFilterChange('condition', condition.id)}
              className="w-4 h-4 border-border text-primary focus:ring-primary accent-primary cursor-pointer" 
            />
            <label htmlFor={condition.id} className="text-dark cursor-pointer select-none">{condition.label}</label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Ratings">
        {[5, 4, 3, 2].map(rating => (
          <div key={rating} className="flex items-center gap-3">
            <input 
                type="checkbox" 
                id={`rating-${rating}`} 
                checked={filters.ratings.includes(rating)}
                onChange={() => onFilterChange('ratings', rating)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer" 
            />
            <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer select-none">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-[#FF9017] text-[#FF9017]' : 'fill-[#D1D5DB] text-[#D1D5DB]'}`} />
              ))}
            </label>
          </div>
        ))}
      </FilterSection>

    </aside>
  );
};

export default SidebarFilter;
