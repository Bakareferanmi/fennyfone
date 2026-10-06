import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, Shield, Truck, Zap, Smartphone, Headphones, 
  BatteryCharging, SmartphoneNfc, Watch, Filter, X, Plus, Minus, 
  Trash2, ArrowRight, Star, CheckCircle, MessageSquare, Menu, ChevronRight,
  Sparkles, ExternalLink, RefreshCw, Send, Tag, Phone
} from 'lucide-react';

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Aether X Pro 5G',
    category: 'Smartphones',
    price: 999,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 128,
    badge: '15% OFF',
    badgeType: 'sale',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
    specs: ['6.7" Dynamic AMOLED 120Hz', 'Snapdragon 8 Gen 3', '200MP Main Camera', '5000mAh + 100W Charging'],
    colors: ['#0f172a', '#38bdf8', '#e2e8f0'],
    description: 'The pinnacle of mobile engineering. Ultra-fast performance paired with incredible multi-lens camera innovation.',
    isTrending: true
  },
  {
    id: 'p2',
    name: 'Fenny SoundBuds Elite',
    category: 'Audio',
    price: 189,
    originalPrice: 220,
    rating: 4.8,
    reviewsCount: 94,
    badge: 'Best Seller',
    badgeType: 'bestseller',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    specs: ['Active Noise Cancellation', '36h Total Playtime', 'Hi-Res Wireless Audio', 'IPX5 Water Resistant'],
    colors: ['#09090b', '#f8fafc', '#818cf8'],
    description: 'Immersive spatial audio with dynamic noise cancellation engineered for true music lovers.',
    isTrending: true
  },
  {
    id: 'p3',
    name: 'GaN Ultra Charge 120W',
    category: 'Charging & Power',
    price: 59,
    originalPrice: 75,
    rating: 4.7,
    reviewsCount: 210,
    badge: 'Hot',
    badgeType: 'hot',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    specs: ['3x USB-C + 1x USB-A', 'GaN Fast Tech', 'Universal Laptop & Phone Support', 'Foldable Plug'],
    colors: ['#1e293b', '#f1f5f9'],
    description: 'Pocket-sized power powerhouse capable of fast charging up to four power-hungry devices simultaneously.',
    isTrending: false
  },
  {
    id: 'p4',
    name: 'ArmorShield MagSafe Case',
    category: 'Cases & Protection',
    price: 39,
    originalPrice: 45,
    rating: 4.9,
    reviewsCount: 312,
    badge: 'New',
    badgeType: 'new',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
    specs: ['12ft Drop Protection', 'Built-in Strong Mag Ring', 'Anti-Yellowing Tech', 'Tactile Buttons'],
    colors: ['#0f172a', '#3b82f6', '#10b981', '#f43f5e'],
    description: 'Sleek military-grade protection designed with precise magnetic alignments for seamless accessory attachment.',
    isTrending: true
  },
  {
    id: 'p5',
    name: 'Fenny Chrono Watch v3',
    category: 'Smart Wearables',
    price: 279,
    originalPrice: 320,
    rating: 4.6,
    reviewsCount: 88,
    badge: '12% OFF',
    badgeType: 'sale',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    specs: ['1.4" Sapphire Glass AMOLED', 'Heart Rate & ECG Monitor', 'GPS & Outdoor Altitude', '7-Day Battery Life'],
    colors: ['#1e293b', '#d97706'],
    description: 'Track health, continuous vitals, and workouts with a premium titanium frame engineered for life in motion.',
    isTrending: true
  },
  {
    id: 'p6',
    name: 'Horizon Pad Pro 11"',
    category: 'Smartphones',
    price: 649,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 56,
    badge: 'Popular',
    badgeType: 'bestseller',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    specs: ['120Hz Ultra Vision Display', 'Stylus & Keyboard Ready', 'Quad Speaker Array', '10,000mAh Battery'],
    colors: ['#334155', '#e2e8f0'],
    description: 'Ultra-thin creator tablet bringing desktop-class creative power and smooth media enjoyment.',
    isTrending: false
  },
  {
    id: 'p7',
    name: 'AcousticPulse Studio Headphone',
    category: 'Audio',
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 164,
    badge: 'Top Rated',
    badgeType: 'hot',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    specs: ['Custom 40mm Titanium Drivers', 'Lossless USB-C Audio', '60-Hour Playtime', 'Plush Memory Foam'],
    colors: ['#0f172a', '#94a3b8'],
    description: 'Studio-grade sound accuracy with ergonomic cloud-like padding and ultra-low latency wireless streaming.',
    isTrending: false
  },
  {
    id: 'p8',
    name: 'MagPower Wireless Bank 10K',
    category: 'Charging & Power',
    price: 69,
    originalPrice: 85,
    rating: 4.7,
    reviewsCount: 143,
    badge: 'New',
    badgeType: 'new',
    image: 'https://images.unsplash.com/photo-1622445268465-843d31221b21?auto=format&fit=crop&w=800&q=80',
    specs: ['15W Magnetic Fast Wireless', '20W PD Output Port', 'Foldable Kickstand', 'Slim Pocket Profile'],
    colors: ['#0f172a', '#38bdf8', '#f43f5e'],
    description: 'Snap on and charge wirelessly everywhere you go with an integrated kickstand for hands-free video view.',
    isTrending: true
  }
];

const CATEGORIES = [
  { name: 'All Products', icon: Sparkles },
  { name: 'Smartphones', icon: Smartphone },
  { name: 'Audio', icon: Headphones },
  { name: 'Charging & Power', icon: BatteryCharging },
  { name: 'Cases & Protection', icon: SmartphoneNfc },
  { name: 'Smart Wearables', icon: Watch }
];

export default function App() {
  // Navigation & View States
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Checkout form state
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'details'
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const addToCart = (product, selectedColor = null, qty = 1) => {
    const chosenColor = selectedColor || product.colors[0];
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.color === chosenColor);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { ...product, color: chosenColor, quantity: qty }];
    });
    triggerToast(`Added ${product.name} to cart!`);
  };

  const updateQuantity = (id, color, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id && item.color === color) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeItem = (id, color) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.color === color)));
  };

  // Filtered Products Memo
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Calculations
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const applyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'FENNY10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      setPromoSuccess('20% VIP Discount applied!');
    } else {
      setPromoError('Invalid coupon code. Try "FENNY10"');
    }
  };

  const generateWhatsAppOrder = (e) => {
    e.preventDefault();
    if (!customerData.name || !customerData.phone || !customerData.address) {
      alert('Please fill out all required fields.');
      return;
    }

    let message = `🚀 *NEW ORDER ON FENNYFONE*\n`;
    message += `----------------------------\n`;
    message += `👤 *Customer:* ${customerData.name}\n`;
    message += `📞 *Phone:* ${customerData.phone}\n`;
    message += `📍 *Delivery Address:* ${customerData.address}, ${customerData.city}\n`;
    if (customerData.notes) message += `📝 *Notes:* ${customerData.notes}\n`;
    message += `----------------------------\n`;
    message += `📦 *ITEMS ORDERED:*\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.color}) x${item.quantity} - $${item.price * item.quantity}\n`;
    });

    message += `----------------------------\n`;
    if (discountPercent > 0) {
      message += `🎟️ Discount (${discountPercent}%): -$${discountAmount.toFixed(2)}\n`;
    }
    message += `💰 *TOTAL PAYABLE:* $${cartTotal.toFixed(2)}\n\n`;
    message += `Please confirm my order and send payment instructions!`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348123456789?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased overflow-x-hidden">
      
      {}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-slate-950 px-5 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-slate-950 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              fennyfone<span className="text-cyan-400">.</span>
            </span>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
            <a href="#store" className="hover:text-cyan-400 transition-colors">Store Catalog</a>
            <a href="#trending" className="hover:text-cyan-400 transition-colors">Trending</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Why Us</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          {/* Cart Trigger & Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 transition-all text-slate-200"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-md shadow-cyan-400/30">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4 mt-3 space-y-3">
            <a href="#store" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400">Store Catalog</a>
            <a href="#trending" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400">Trending</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400">Why Us</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400">Contact Support</a>
          </div>
        )}
      </header>
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-[#2028f5] min-h-[300px] sm:min-h-[340px] flex items-center">

            {/* Hero Content */}
            <div className="relative z-20 w-full lg:w-1/2 px-7 sm:px-10 lg:px-12 py-12">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                2-in-1 Laptops
              </h1>

              <p className="mt-3 max-w-md text-sm sm:text-base text-white/90 leading-relaxed">
                Robust laptop, powerful tablet, and portable studio
                that adapts to the ways you work and create best.
              </p>

              <a
                href="#store"
                className="inline-flex items-center mt-7 px-5 py-2.5 rounded-md bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Shop Now
              </a>
            </div>

            {/* Hero Products */}
            <div className="absolute right-0 top-0 h-full w-full lg:w-[58%] pointer-events-none">

              {/* Laptop */}
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85"
                alt="2-in-1 laptop"
                className="absolute w-[48%] sm:w-[44%] lg:w-[48%] right-[25%] top-[18%] rotate-[-2deg] object-contain drop-shadow-2xl"
              />

              {/* Tablet */}
              <img
                src={PRODUCTS[5].image}
                alt="2-in-1 tablet"
                className="absolute w-[25%] sm:w-[23%] lg:w-[27%] right-[15%] top-[13%] rotate-[8deg] object-contain drop-shadow-2xl"
              />

              {/* Second Device */}
              <img
                src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=85"
                alt="portable laptop"
                className="absolute w-[30%] sm:w-[28%] lg:w-[32%] right-[-2%] bottom-[7%] rotate-[3deg] object-contain drop-shadow-2xl"
              />

            </div>

            {/* Decorative glow */}
            <div className="absolute -right-20 -bottom-32 w-96 h-96 rounded-full bg-indigo-400/30 blur-3xl" />
            <div className="absolute -left-20 -top-32 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl" />

          </div>
        </div>
      </section>
      <section id="store" className="py-16 bg-slate-900/50 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Store Catalog</h2>
              <p className="text-slate-400 mt-1">Browse our latest collection of premium smartphones & tech accessories.</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search accessories or phones..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none border-b border-slate-800/60 mb-10">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold' 
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-950 rounded-2xl border border-slate-800/50">
              <Filter className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-300">No products found</h3>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your search or category filter.</p>
              <button 
                onClick={() => { setActiveCategory('All Products'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group relative bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                      {product.badge}
                    </div>
                  )}

                  {/* Image Container */}
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="relative aspect-square overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-white font-bold text-xs shadow-xl backdrop-blur-sm">
                        View Specs
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>{product.category}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-slate-300">{product.rating}</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => setSelectedProduct(product)}
                        className="font-bold text-white text-base hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      
                      <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-900 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500 line-through">${product.originalPrice}</div>
                        <div className="text-lg font-black text-white">${product.price}</div>
                      </div>

                      <button 
                        onClick={() => addToCart(product)}
                        className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 border border-slate-800 hover:border-cyan-500 transition-all"
                        aria-label="Add to cart"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {}
      <section id="trending" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Special Selection</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Elevate Your Audio Experience</h2>
              <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
                Discover Fenny SoundBuds Elite with active spatial noise cancellation, ultra-low latency mode, and custom-tuned bass response.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <button 
                  onClick={() => addToCart(PRODUCTS[1])}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Quick Buy - $189
                </button>
                <button 
                  onClick={() => setSelectedProduct(PRODUCTS[1])}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="features" className="py-16 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">Authentic Guarantee</h3>
              <p className="text-slate-400 text-sm mt-2">Every gadget is 100% genuine with official brand manufacturer warranty included.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">Express Doorstep Shipping</h3>
              <p className="text-slate-400 text-sm mt-2">Fast, trackable door-to-door delivery with secure protective packaging.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">Instant WhatsApp Order</h3>
              <p className="text-slate-400 text-sm mt-2">No complicated checkouts. Confirm orders directly on WhatsApp with live support.</p>
            </div>
          </div>
        </div>
      </section>

      {}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Product Image */}
              <div className="bg-slate-950 p-8 flex items-center justify-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="max-h-80 object-contain rounded-2xl"
                />
              </div>

              {/* Specs & Buy Details */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{selectedProduct.category}</span>
                  <h2 className="text-2xl font-bold text-white mt-1">{selectedProduct.name}</h2>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-2xl font-black text-white">${selectedProduct.price}</span>
                    <span className="text-sm text-slate-500 line-through">${selectedProduct.originalPrice}</span>
                  </div>

                  <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Highlights Specs List */}
                  <div className="mt-5 space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Key Specifications</h4>
                    <ul className="space-y-1.5">
                      {selectedProduct.specs.map((spec, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex gap-3">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Add To Cart
                  </button>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setIsCartOpen(false)} 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white">Your Cart ({totalItemCount})</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List or Checkout Form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {checkoutStep === 'cart' ? (
                  cartItems.length === 0 ? (
                    <div className="text-center py-20">
                      <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                      <p className="text-slate-400 font-medium">Your cart is currently empty</p>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-slate-900" />
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                            <div className="text-xs text-slate-400 mt-0.5">${item.price}</div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs">
                                <button onClick={() => updateQuantity(item.id, item.color, -1)} className="text-slate-400 hover:text-white">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-bold text-slate-200 w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.color, 1)} className="text-slate-400 hover:text-white">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button onClick={() => removeItem(item.id, item.color)} className="text-slate-500 hover:text-rose-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Promo Code Input */}
                      <form onSubmit={applyPromo} className="pt-4 border-t border-slate-800/80">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Have a promo code?</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Try FENNY10" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 uppercase"
                          />
                          <button type="submit" className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200">
                            Apply
                          </button>
                        </div>
                        {promoError && <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>}
                        {promoSuccess && <p className="text-[11px] text-emerald-400 mt-1">{promoSuccess}</p>}
                      </form>
                    </div>
                  )
                ) : (
                  /* Checkout Customer Form */
                  <form id="whatsapp-form" onSubmit={generateWhatsAppOrder} className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Delivery Details</h3>
                      <button 
                        type="button" 
                        onClick={() => setCheckoutStep('cart')}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        Back to Cart
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Full Name *</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Phone Number (WhatsApp) *</label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="+234 800 000 0000"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Delivery Address *</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Street Address, Building, Suite"
                        value={customerData.address}
                        onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">City / State</label>
                      <input 
                        type="text" 
                        placeholder="Lagos, Nigeria"
                        value={customerData.city}
                        onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Order Notes (Optional)</label>
                      <textarea 
                        rows="2"
                        placeholder="Special delivery instructions..."
                        value={customerData.notes}
                        onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Drawer Footer Summary & Actions */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-800 bg-slate-950/60 space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-slate-200">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                      <span>Total Amount</span>
                      <span className="text-cyan-400">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {checkoutStep === 'cart' ? (
                    <button 
                      onClick={() => setCheckoutStep('details')}
                      className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      Proceed to Delivery Details <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      form="whatsapp-form"
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" /> Order via WhatsApp
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {}
      <footer id="contact" className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-slate-950 fill-current" />
                </div>
                <span className="text-xl font-black text-white">fennyfone<span className="text-cyan-400">.</span></span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your premier destination for high-performance mobile devices, chargers, wireless audio, and protection accessories.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#store" className="hover:text-cyan-400 transition-colors">Flagship Phones</a></li>
                <li><a href="#store" className="hover:text-cyan-400 transition-colors">Wireless Audio</a></li>
                <li><a href="#store" className="hover:text-cyan-400 transition-colors">Fast Charging</a></li>
                <li><a href="#store" className="hover:text-cyan-400 transition-colors">Cases & Covers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Customer Support</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="https://wa.me/2348123456789" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> WhatsApp Live Support</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Track Order Status</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Warranty & Returns</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Stay Updated</h4>
              <p className="text-xs text-slate-500 mb-3">Subscribe to receive exclusive gadget launch discounts.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 flex-1"
                />
                <button className="px-3 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-cyan-400 transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
            <p>© 2026 fennyfone. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Refund Terms</a>
              <a href="#" className="hover:text-slate-400">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}




