import React from 'react';

const regions = [
  { name: 'Arabic Emirates', domain: 'shopname.ae', flag: 'https://flagcdn.com/ae.svg' },
  { name: 'Australia', domain: 'shopname.com.au', flag: 'https://flagcdn.com/au.svg' },
  { name: 'United States', domain: 'shopname.com', flag: 'https://flagcdn.com/us.svg' },
  { name: 'Russia', domain: 'shopname.ru', flag: 'https://flagcdn.com/ru.svg' },
  { name: 'Italy', domain: 'shopname.it', flag: 'https://flagcdn.com/it.svg' },
  { name: 'Denmark', domain: 'denmark.com.dk', flag: 'https://flagcdn.com/dk.svg' },
  { name: 'France', domain: 'shopname.com.fr', flag: 'https://flagcdn.com/fr.svg' },
  { name: 'China', domain: 'shopname.cn', flag: 'https://flagcdn.com/cn.svg' },
  { name: 'Great Britain', domain: 'shopname.co.uk', flag: 'https://flagcdn.com/gb.svg' },
];

const SuppliersByRegion = () => {
  return (
    <section className="py-10">
      <div className="container-wide">
        <h3 className="text-2xl font-bold mb-8 text-dark">Suppliers by region</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-10">
          {regions.map((region, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 cursor-pointer group hover:translate-x-1 transition-all"
            >
              <div className="w-8 h-6 overflow-hidden rounded-sm shadow-sm border border-gray-100 flex-shrink-0">
                <img 
                  src={region.flag} 
                  alt={region.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-dark group-hover:text-primary transition-colors">{region.name}</span>
                <span className="text-[12px] text-gray-400">{region.domain}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuppliersByRegion;
