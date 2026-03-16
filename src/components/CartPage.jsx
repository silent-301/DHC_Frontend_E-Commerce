import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../context/useCart';
import { ShoppingCart, ArrowLeft, ShieldCheck, MessageSquare, Truck, Heart } from 'lucide-react';
import { recommended } from '../data';

const cartItems = [
  {
    id: 1,
    title: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    price: 78.99,
    qty: 9,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    title: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Best factory LLC",
    price: 39.00,
    qty: 3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    title: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    price: 170.50,
    qty: 1,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop"
  }
];

const savedItems = [
  { id: 1, title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop" }, // Tablet
  { id: 2, title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop" }, // Phone
  { id: 3, title: "GoPro HERO6 4K Action Camera - Black", price: "$89.50", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" }, // Watch
  { id: 4, title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop" }, // Laptop
];

const CartPage = ({ onNavigateHome }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  
  const discount = cart.length > 0 ? 60.00 : 0;
  const tax = cart.length > 0 ? 14.00 : 0;
  const total = Math.max(0, cartTotal - discount + tax);

  return (
    <main className="container-wide py-8 animate-in fade-in duration-700">
      <h1 className="text-2xl font-bold mb-6">My cart ({cart.length})</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <ShoppingCart size={40} />
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Your cart is empty</h2>
          <p className="text-secondary mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our categories and find something you love!</p>
          <button 
            onClick={onNavigateHome}
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items List */}
          <div className="flex-grow">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded flex items-center justify-center overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-dark max-w-md">{item.title}</h3>
                        <span className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <div className="text-sm text-gray-400 space-y-1 mb-4">
                        <p>Unit Price: ${item.price.toFixed(2)}</p>
                        {item.seller && <p>Seller: {item.seller}</p>}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="px-3 py-1.5 text-sm text-red-500 font-medium border border-gray-200 rounded-md hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                        <button className="px-3 py-1.5 text-sm text-primary font-medium border border-gray-200 rounded-md hover:bg-blue-50 transition-colors">
                          Save for later
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full sm:w-32">
                      <div className="relative">
                        <label className="block text-xs text-gray-400 mb-1">Qty:</label>
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-500 font-bold border-r"
                          >
                            -
                          </button>
                          <span className="flex-grow text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-500 font-bold border-l"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center">
                <button 
                  onClick={onNavigateHome}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Back to shop
                </button>
                <button 
                  onClick={clearCart}
                  className="text-primary font-medium hover:underline"
                >
                  Clear cart
                </button>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Secure payment</h4>
                  <p className="text-sm text-gray-400">Have you ever finally just</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Customer support</h4>
                  <p className="text-sm text-gray-400">Have you ever finally just</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Free delivery</h4>
                  <p className="text-sm text-gray-400">Have you ever finally just</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Summary Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-3">Have a coupon?</p>
              <div className="flex gap-0 overflow-hidden rounded-md border border-gray-200">
                <input 
                  type="text" 
                  placeholder="Add coupon" 
                  className="flex-grow p-2 text-sm outline-none"
                />
                <button className="bg-white text-primary font-semibold px-4 py-2 text-sm border-l border-gray-200 hover:bg-gray-50 transition-colors">
                  Apply
                </button>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount:</span>
                  <span className="text-red-500">- ${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span className="text-green-500">+ ${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-3 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg text-dark">Total:</span>
                  <span className="font-bold text-xl text-dark">${total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                
                <button className="w-full py-3 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors">
                  Checkout
                </button>
              </div>
              
              <div className="flex justify-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1000px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 object-contain grayscale opacity-60" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 object-contain grayscale opacity-60" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-4 object-contain grayscale opacity-60" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" alt="Mastercard" className="h-4 object-contain grayscale opacity-60" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-4 object-contain grayscale opacity-60" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Saved for later section (Mocked for now) */}
      <section className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-dark flex items-center justify-between">
          <span>Saved for later</span>
          <span className="text-sm font-normal text-gray-400">0 items</span>
        </h2>
        <div className="text-center py-10 text-gray-400 italic">
          No items saved for later yet.
        </div>
      </section>
      
      {/* Discount Banner */}
      <div className="mt-8 bg-blue-600 rounded-lg p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1">Super discount on more than 100 USD</h3>
          <p className="text-blue-100 text-sm opacity-80">Have you ever finally just write dummy info</p>
        </div>
        <button className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shrink-0">
          Shop now
        </button>
      </div>
    </main>
  );
};

export default CartPage;
