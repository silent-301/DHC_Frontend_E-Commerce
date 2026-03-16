import React, { useState, useEffect } from 'react';
import { deals } from '../data';

const Deals = ({ onNavigateListing }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 13,
    mins: 34,
    secs: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-2">
      <div className="container-wide bg-white border border-border rounded-lg flex flex-col md:flex-row overflow-hidden shadow-sm">
        {/* Countdown Card */}
        <div className="p-5 md:w-72 shrink-0 border-b md:border-b-0 md:border-r bg-white">
          <h3 className="text-lg font-bold mb-1 text-dark">Deals and offers</h3>
          <p className="text-secondary mb-5">Hygiene equipments</p>
          <div className="flex gap-2">
            {[
              {v: timeLeft.days, label: 'Days'}, 
              {v: timeLeft.hours, label: 'Hour'}, 
              {v: timeLeft.mins, label: 'Min'}, 
              {v: timeLeft.secs, label: 'Sec'}
            ].map((item, i) => (
              <div key={i} className="bg-dark p-2 rounded flex flex-col items-center w-14 shadow-md transition-all hover:scale-105">
                <span className="text-white font-bold leading-none">{String(item.v).padStart(2, '0')}</span>
                <span className="text-white text-[10px] opacity-60 uppercase mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Deals Grid */}
        <div className="flex-grow flex overflow-x-auto scrollbar-hide">
          {deals.map(deal => (
            <div 
              key={deal.id} 
              onClick={() => onNavigateListing(deal.category)}
              className="p-5 border-r last:border-r-0 min-w-[180px] flex flex-col items-center text-center cursor-pointer hover:bg-bg transition-all group"
            >
              <div className="relative overflow-hidden mb-4">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
              <p className="text-sm font-medium mb-2 group-hover:text-primary transition-colors">{deal.title}</p>
              <span className="bg-[#FFE3E3] text-[#EB001B] px-3 py-1 rounded-full text-[12px] font-bold shadow-sm">
                {deal.discount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deals;
