import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing! We've sent a confirmation to ${email}`);
    setEmail('');
  };

  return (
    <section className="py-16 bg-[#EFF2F4] mt-10">
      <div className="container-wide text-center">
        <h3 className="text-3xl font-bold mb-3 text-dark">Subscribe on our newsletter</h3>
        <p className="text-secondary mb-8 text-lg">Get daily news on upcoming offers from many suppliers all over the world</p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-2">
          <div className="relative flex-grow">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email address" 
              required
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
