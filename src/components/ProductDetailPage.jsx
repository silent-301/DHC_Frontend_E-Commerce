import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { Star, MessageSquare, ShoppingBag, ShieldCheck, Globe, Check, Heart, Send, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { allProducts } from '../data';

// Default fallback product
const defaultProduct = {
  id: 101,
  title: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
  rating: 4.8,
  reviews: 32,
  sold: 154,
  price: 98.00,
  category: "Clothes and wear",
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  ],
  type: "Classic shoes",
  material: "Plastic material",
  design: "Modern nice",
  customization: "Customized logo and design custom packages",
  protection: "Refund Policy",
  warranty: "2 years full warranty",
  supplier: {
    name: "Guanjui Trading LLC",
    initials: "R",
    location: "Germany, Berlin",
    verified: true,
    shipping: "Worldwide shipping"
  }
};

const ProductDetailPage = ({ product: selectedProduct, onNavigateDetail, onBack, onNavigateHome }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart, showToast } = useCart();
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Use the passed product or fallback
  const displayProduct = selectedProduct || defaultProduct;

  // Dynamic related products
  const relatedProducts = React.useMemo(() => {
    return allProducts
      .filter(p => p.category === displayProduct.category && p.id !== displayProduct.id)
      .slice(0, 6);
  }, [displayProduct]);

  // Handle images
  const images = Array.isArray(displayProduct.images) 
    ? displayProduct.images 
    : [displayProduct.image || displayProduct.images];
  
  const currentImage = images[activeImage] || images[0];

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast('Please login first!', 'error');
      return;
    }
    for(let i = 0; i < qty; i++) {
        addToCart({
            ...displayProduct,
            image: Array.isArray(displayProduct.images) ? displayProduct.images[0] : displayProduct.image
        });
    }
  };

  const handleBreadcrumbClick = (path) => {
    if (path === 'Home') onBack();
  };

  return (
    <main className="container-wide py-4 animate-in fade-in duration-700">
      <Breadcrumb 
        paths={['Home', displayProduct.category || 'Clothings', displayProduct.title]} 
        onPathClick={handleBreadcrumbClick}
      />
      
      <div className="bg-white border border-gray-200 rounded-lg p-5 mt-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4 mb-4">
              <img 
                src={currentImage} 
                alt={displayProduct.title} 
                className="w-full h-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-14 h-14 shrink-0 rounded border p-1 transition-all ${activeImage === idx ? 'border-primary shadow-sm bg-blue-50' : 'border-gray-200 hover:border-primary'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-1 text-green-500 text-sm mb-2">
              <Check size={16} />
              <span>In stock</span>
            </div>
            
            <h1 className="text-xl font-bold text-dark mb-4 max-w-2xl">{displayProduct.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className={s <= (displayProduct.rating || 4) ? "fill-orange-400 text-orange-400" : "text-gray-300"} />
                ))}
                <span className="text-orange-400 ml-1 font-medium">{displayProduct.rating || 4.5}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <MessageSquare size={16} />
                <span>{displayProduct.reviews || 32} reviews</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <ShoppingBag size={16} />
                <span>{displayProduct.sold || 154} sold</span>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded flex gap-8 mb-6 border-l-4 border-orange-200">
              {displayProduct.priceRange ? (
                displayProduct.priceRange.steps.map((step, idx) => (
                  <div key={idx} className={`${idx !== 0 ? 'border-l border-orange-200 pl-8' : ''}`}>
                    <p className="text-xl font-bold text-dark">${step.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{step.qty}</p>
                  </div>
                ))
              ) : (
                <div>
                  <p className="text-2xl font-bold text-dark">{displayProduct.price}</p>
                  <p className="text-xs text-secondary">Price per item</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-12">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 border-r border-gray-200 font-bold">-</button>
                  <span className="px-6 font-bold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-12 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 border-l border-gray-200 font-bold">+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="px-10 h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to cart
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2">
                <span className="text-gray-400">Price:</span>
                <span className="sm:col-span-2 text-dark font-medium">Negotiable</span>
                
                <span className="text-gray-400">Type:</span>
                <span className="sm:col-span-2 text-dark font-medium">{displayProduct.type || "Classic items"}</span>
                
                <span className="text-gray-400">Material:</span>
                <span className="sm:col-span-2 text-dark font-medium">{displayProduct.material || "Plastic material"}</span>
                
                <span className="text-gray-400">Design:</span>
                <span className="sm:col-span-2 text-dark font-medium">{displayProduct.design || "Modern nice"}</span>
              </div>
            </div>
            
            <div className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2">
                <span className="text-gray-400">Customization:</span>
                <span className="sm:col-span-2 text-dark font-medium">{displayProduct.customization || "Customized logo"}</span>
                
                <span className="text-gray-400">Protection:</span>
                <span className="sm:col-span-2 text-dark font-medium">{displayProduct.protection || "Refund Policy"}</span>
                
                <span className="text-gray-400">Warranty:</span>
                <span className="sm:col-span-2 text-dark font-medium">{displayProduct.warranty || "2 years full warranty"}</span>
              </div>
            </div>
          </div>
          
          {/* Supplier Sidebar */}
          <div className="w-full lg:w-72 shrink-0 space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded flex items-center justify-center font-bold text-xl">
                  {displayProduct.supplier?.initials || "R"}
                </div>
                <div>
                  <h4 className="font-medium text-dark">Supplier</h4>
                  <p className="text-sm text-gray-400">{displayProduct.supplier?.name || "Guanjui Trading LLC"}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <img src="https://flagcdn.com/de.svg" alt="Germany" className="w-5 h-4 object-cover" />
                  <span>{displayProduct.supplier?.location || "Germany, Berlin"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <ShieldCheck size={18} className="text-gray-300" />
                  <span>Verified Seller</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Globe size={18} className="text-gray-300" />
                  <span>{displayProduct.supplier?.shipping || "Worldwide shipping"}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                  Send inquiry
                </button>
                <button className="w-full py-2.5 bg-white border border-gray-200 text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Seller's profile
                </button>
              </div>
              
              <button 
                onClick={() => toggleFavorite(displayProduct)}
                className={`flex items-center justify-center gap-2 w-full mt-4 text-sm font-medium hover:underline transition-all py-2 rounded-lg ${
                  isFavorite(displayProduct.id) ? 'bg-red-50 text-red-500 hover:text-red-600' : 'text-primary'
                }`}
              >
                <Heart size={16} className={isFavorite(displayProduct.id) ? 'fill-current' : ''} />
                {isFavorite(displayProduct.id) ? 'Remove from favorites' : 'Save for later'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs and More Content */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-grow bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button className="px-6 py-4 font-bold text-primary border-b-2 border-primary">Description</button>
            <button className="px-6 py-4 font-medium text-gray-400 hover:text-dark">Reviews</button>
            <button className="px-6 py-4 font-medium text-gray-400 hover:text-dark">Shipping</button>
            <button className="px-6 py-4 font-medium text-gray-400 hover:text-dark">About seller</button>
          </div>
          <div className="p-6 space-y-6">
            <div className="text-gray-500 leading-relaxed max-w-4xl">
              <p>{displayProduct.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}</p>
            </div>
            
            <table className="w-full max-w-2xl text-sm">
              <tbody className="divide-y divide-gray-100 border border-gray-100">
                <tr>
                  <td className="p-3 bg-gray-50 text-gray-500 w-1/3">Model</td>
                  <td className="p-3 text-gray-500">#5785667</td>
                </tr>
                <tr>
                  <td className="p-3 bg-gray-50 text-gray-500">Style</td>
                  <td className="p-3 text-gray-500">Classic style</td>
                </tr>
                <tr>
                  <td className="p-3 bg-gray-50 text-gray-500">Certificate</td>
                  <td className="p-3 text-gray-500">ISO-885921212</td>
                </tr>
                <tr>
                  <td className="p-3 bg-gray-50 text-gray-500">Size</td>
                  <td className="p-3 text-gray-500">34mm x 450mm x 19mm</td>
                </tr>
                <tr>
                  <td className="p-3 bg-gray-50 text-gray-500">Memory</td>
                  <td className="p-3 text-gray-500">36GB RAM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-dark mb-4">You may like</h3>
            <div className="space-y-4">
              {relatedProducts.slice(0, 5).map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-3 cursor-pointer group"
                  onClick={() => onNavigateDetail(item)}
                >
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded p-1 shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover rounded group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-sm text-dark font-medium line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      <section className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-dark">Related products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {relatedProducts.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNavigateDetail(item)}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 border border-gray-100 flex items-center justify-center p-4">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-gray-500 text-sm line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-gray-400 text-xs">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
