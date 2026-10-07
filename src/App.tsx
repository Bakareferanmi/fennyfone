import React, { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react';
import {
  ShoppingBag, ShoppingCart, Search, ShieldCheck, Truck, Smartphone, Headphones,
  BatteryCharging, Watch, Filter, X, Plus, Minus, Trash2, ArrowRight, Star,
  CheckCircle, Menu, LayoutGrid, Send
} from 'lucide-react';
import { LegalModal, CookieBanner, loadConsent, saveConsent } from './LegalModal';

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Aether X Pro 5G',
    category: 'Phones & Tablets',
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
    category: 'Phones & Tablets',
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
    image: 'https://images.unsplash.com/photo-1566554738544-d962991c3fee?auto=format&fit=crop&w=800&q=80',
    specs: ['15W Magnetic Fast Wireless', '20W PD Output Port', 'Foldable Kickstand', 'Slim Pocket Profile'],
    colors: ['#0f172a', '#38bdf8', '#f43f5e'],
    description: 'Snap on and charge wirelessly everywhere you go with an integrated kickstand for hands-free video view.',
    isTrending: true
  }
];

const CATEGORIES = [
  { name: 'All Products', icon: LayoutGrid },
  { name: 'Phones & Tablets', icon: Smartphone },
  { name: 'Audio', icon: Headphones },
  { name: 'Charging & Power', icon: BatteryCharging },
  { name: 'Cases & Protection', icon: ShieldCheck },
  { name: 'Smart Wearables', icon: Watch }
];

// Resize an Unsplash URL to the width a slot actually needs (smaller downloads, faster page)
const sized = (url, w) => url.replace(/([?&])w=\d+/, `$1w=${w}`);

// Official WhatsApp glyph (lucide has no brand icons). Inherits colour from the parent text colour.
function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// Image that never shows a broken-image icon: falls back to a branded tile if the URL fails
function SafeImage({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`${className} flex items-center justify-center bg-gradient-to-br from-slate-800 to-blue-950`}>
        <img src="/logo.png" alt="" className="w-1/3 max-w-[64px] h-auto opacity-70" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} decoding="async" onError={() => setFailed(true)} {...rest} />;
}

// Rotating hero ads. Each slide: text on the left, a 4:3 "stage" of product cards on the right.
// Image `pos` classes are positioned in % of the stage so the collage scales on every screen.
const HERO_SLIDE_MS = 5000;

const HERO_SLIDES = [
  {
    id: 'laptops',
    eyebrow: 'New Arrivals',
    title: '2-in-1 Laptops',
    text: 'Robust laptop, powerful tablet, and portable studio that adapts to the ways you work and create best.',
    cta: 'Shop Now',
    href: '#store',
    bg: 'bg-gradient-to-br from-[#2028f5] via-[#1d2fd9] to-[#141a9e]',
    images: [
      { src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85', alt: '2-in-1 laptop', pos: 'left-[2%] top-[12%] w-[62%] aspect-[4/3] -rotate-3' },
      { src: PRODUCTS[5].image, alt: 'Horizon Pad Pro tablet', pos: 'right-[2%] top-[4%] w-[32%] aspect-[3/4] rotate-6' },
      { src: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=85', alt: 'Portable laptop', pos: 'right-[8%] bottom-[4%] w-[40%] aspect-[4/3] rotate-3' }
    ],
    chip: null
  },
  {
    id: 'phones',
    eyebrow: 'Flagship Phones',
    title: 'Aether X Pro 5G',
    text: '200MP camera, 120Hz AMOLED and 100W charging. Now 15% off, with the ArmorShield case to match.',
    cta: 'Shop Phones',
    href: '#store',
    productIndex: 0,
    bg: 'bg-gradient-to-br from-sky-700 via-blue-800 to-indigo-900',
    images: [
      { src: PRODUCTS[0].image, alt: 'Aether X Pro 5G', pos: 'right-[8%] top-[4%] w-[46%] aspect-[3/4] rotate-3' },
      { src: PRODUCTS[3].image, alt: 'ArmorShield MagSafe Case', pos: 'left-[6%] bottom-[6%] w-[36%] aspect-square -rotate-6' }
    ],
    chip: { top: 'From $999', bottom: '15% OFF', pos: 'left-[4%] top-[10%]' }
  },
  {
    id: 'audio',
    eyebrow: 'Weekend Deal',
    title: 'Sound That Moves',
    text: 'Fenny SoundBuds Elite and AcousticPulse Studio. Use code FENNY10 at checkout for an extra 10% off.',
    cta: 'Shop Audio',
    href: '#store',
    productIndex: 1,
    bg: 'bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900',
    images: [
      { src: PRODUCTS[1].image, alt: 'Fenny SoundBuds Elite', pos: 'left-[4%] top-[10%] w-[46%] aspect-square -rotate-4' },
      { src: PRODUCTS[6].image, alt: 'AcousticPulse Studio Headphone', pos: 'right-[4%] bottom-[6%] w-[42%] aspect-[4/5] rotate-5' }
    ],
    chip: { top: 'Use code', bottom: 'FENNY10', pos: 'right-[6%] top-[8%]' }
  }
];

// Hero ads. Own state so the 5s timer only re-renders the banner, not the whole page.
function HeroCarousel({ onViewProduct }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [paused, activeSlide]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative isolate overflow-hidden bg-slate-950 rounded-2xl sm:rounded-3xl h-[250px] sm:h-[390px] lg:h-[440px] shadow-2xl shadow-black/40"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured offers"
        >
          {HERO_SLIDES.map((slide, i) => {
            const isActive = i === activeSlide;
            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:grid-cols-2 items-center transition-opacity duration-700 ease-in-out ${slide.bg} ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                {/* Soft light: plain gradients (no blur filters, which can leave hairlines while scrolling) */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_100%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_0%_0%,rgba(103,232,249,0.12),transparent_40%)]" />

                {/* Text */}
                <div className="relative z-20 pl-5 pr-2 sm:pl-10 sm:pr-4 lg:pl-14 pb-5 sm:pb-6">
                  <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-200">
                    {slide.eyebrow}
                  </span>
                  <h2 className="mt-1 sm:mt-2 text-[22px] leading-[1.15] sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                    {slide.title}
                  </h2>
                  <p className="hidden sm:block mt-3 max-w-md text-base text-white/90 leading-relaxed">
                    {slide.text}
                  </p>
                  <div className="mt-3 sm:mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href={slide.href}
                      tabIndex={isActive ? 0 : -1}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-white text-slate-900 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors"
                    >
                      {slide.cta} <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                    {slide.productIndex !== undefined && (
                      <button
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => onViewProduct(PRODUCTS[slide.productIndex])}
                        className="hidden sm:inline-flex px-5 py-2.5 rounded-lg border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>

                {/* Visual */}
                <div className="relative z-10 h-full min-h-0 flex items-center justify-center p-3 pb-6 sm:p-6 lg:p-8">
                  {/* Phones: one product card keeps the banner short */}
                  <SafeImage
                    src={sized(slide.images[0].src, 400)}
                    alt={slide.images[0].alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="sm:hidden h-[82%] w-full object-cover rounded-xl rotate-3 shadow-xl shadow-black/40"
                  />

                  {/* Tablet and up: product collage on a 4:3 stage */}
                  <div className="hidden sm:block relative w-full lg:w-auto lg:h-full aspect-[4/3]">
                    {slide.images.map(img => (
                      <SafeImage
                        key={img.alt}
                        src={sized(img.src, 600)}
                        alt={img.alt}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        className={`absolute object-cover rounded-2xl shadow-2xl shadow-black/40 ${img.pos}`}
                      />
                    ))}
                    {slide.chip && (
                      <div className={`absolute z-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 text-white shadow-xl ${slide.chip.pos}`}>
                        <div className="text-xs uppercase tracking-wider text-white/80">{slide.chip.top}</div>
                        <div className="text-xl font-black leading-tight">{slide.chip.bottom}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Slide dots, aligned with the text column */}
          <div className="absolute z-20 bottom-3 sm:bottom-5 left-5 sm:left-10 lg:left-14 flex items-center gap-2">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(i)}
                aria-label={`Show offer ${i + 1}: ${slide.title}`}
                aria-current={i === activeSlide}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Product card is memoised so rotating the hero or typing in the cart never re-renders the grid
const ProductCard = memo(function ProductCard({ product, onSelect, onAdd }) {
  return (
    <div className="group relative bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg">
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
          {product.badge}
        </div>
      )}

      <div
        onClick={() => onSelect(product)}
        className="relative aspect-square overflow-hidden bg-slate-900 cursor-pointer"
      >
        <SafeImage
          src={sized(product.image, 500)}
          alt={product.name}
          width="500"
          height="500"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-white font-bold text-xs shadow-xl backdrop-blur-sm">
            View Specs
          </span>
        </div>
      </div>

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
            onClick={() => onSelect(product)}
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
            onClick={() => onAdd(product)}
            className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 border border-slate-800 hover:border-cyan-500 transition-all"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

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

  // Legal pages ('privacy' | 'refund' | 'cookies') and cookie consent (null until the visitor chooses)
  const [legalPage, setLegalPage] = useState(null);
  const [consent, setConsent] = useState(loadConsent);
  const chooseConsent = useCallback((choices) => {
    setConsent(saveConsent(choices));
    setLegalPage(null);
  }, []);

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toastTimer = useRef(null);
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(''), 2500);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const addToCart = useCallback((product, selectedColor = null, qty = 1) => {
    const chosenColor = selectedColor || product.colors[0];
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.color === chosenColor);
      if (existing) {
        return prev.map(item =>
          item === existing ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, color: chosenColor, quantity: qty }];
    });
    triggerToast(`Added ${product.name} to cart!`);
  }, [triggerToast]);

  // Lock page scroll behind modals; Escape closes whatever is open
  useEffect(() => {
    document.body.style.overflow = (isCartOpen || selectedProduct || legalPage) ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setSelectedProduct(null);
        setMobileMenuOpen(false);
        setLegalPage(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, selectedProduct, legalPage]);

  // An empty cart can't be on the delivery step
  useEffect(() => {
    if (cartItems.length === 0) setCheckoutStep('cart');
  }, [cartItems.length]);

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
        <div role="status" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[80] sm:max-w-sm bg-cyan-500 text-slate-950 px-5 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-slate-950 py-3 shadow-lg shadow-black/40' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <button
            type="button"
            aria-label="fennyfone, back to top"
            className="group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo.png"
              alt="fennyfone"
              width="34"
              height="40"
              className="h-10 w-auto group-hover:scale-105 transition-transform"
            />
          </button>

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
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 mt-3 space-y-3">
            <a href="#store" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400">Store Catalog</a>
            <a href="#trending" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400">Trending</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400">Why Us</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400">Contact Support</a>
          </div>
        )}
      </header>
      <HeroCarousel onViewProduct={setSelectedProduct} />

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
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} onAdd={addToCart} />
              ))}
            </div>
          )}

        </div>
      </section>

      {}
      <section id="trending" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 relative overflow-hidden grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="relative z-10">
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

            {/* Product visual */}
            <div className="relative z-10 mx-auto w-full max-w-md aspect-[4/3]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(6,182,212,0.22),transparent_65%)]" />
              <SafeImage
                src={sized(PRODUCTS[1].image, 700)}
                alt={PRODUCTS[1].name}
                loading="lazy"
                className="absolute left-0 top-[4%] w-[68%] aspect-square object-cover rounded-2xl shadow-2xl shadow-black/50 -rotate-3"
              />
              <SafeImage
                src={sized(PRODUCTS[6].image, 500)}
                alt={PRODUCTS[6].name}
                loading="lazy"
                className="absolute right-0 bottom-0 w-[46%] aspect-[4/5] object-cover rounded-2xl shadow-2xl shadow-black/50 rotate-4"
              />
              <div className="absolute right-[4%] top-[6%] rounded-xl bg-cyan-500 text-slate-950 px-3.5 py-1.5 shadow-lg shadow-cyan-500/30">
                <div className="text-[10px] font-bold uppercase tracking-wider leading-none">Only</div>
                <div className="text-lg font-black leading-tight">${PRODUCTS[1].price}</div>
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
                <ShieldCheck className="w-6 h-6" />
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
                <WhatsAppIcon className="w-6 h-6" />
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
                <SafeImage
                  src={sized(selectedProduct.image, 800)}
                  alt={selectedProduct.name}
                  className="w-full max-w-xs max-h-80 aspect-square object-cover rounded-2xl"
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
                          <SafeImage src={sized(item.image, 160)} alt={item.name} width="64" height="64" className="w-16 h-16 object-cover rounded-lg bg-slate-900 shrink-0" />
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
                      <WhatsAppIcon className="w-5 h-5" /> Order via WhatsApp
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
              <img src="/logo.png" alt="fennyfone" width="40" height="48" loading="lazy" className="h-12 w-auto" />
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
                <li><a href="https://wa.me/2348123456789" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><WhatsAppIcon className="w-4 h-4" /> WhatsApp Live Support</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Track Order Status</a></li>
                <li><button type="button" onClick={() => setLegalPage('refund')} className="hover:text-cyan-400 transition-colors text-left">Warranty & Returns</button></li>
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
              <button type="button" onClick={() => setLegalPage('privacy')} className="hover:text-slate-400 transition-colors">Privacy Policy</button>
              <button type="button" onClick={() => setLegalPage('refund')} className="hover:text-slate-400 transition-colors">Refund Terms</button>
              <button type="button" onClick={() => setLegalPage('cookies')} className="hover:text-slate-400 transition-colors">Cookie Settings</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy, Refund Terms and Cookie Settings */}
      {legalPage && (
        <LegalModal
          page={legalPage}
          consent={consent}
          onClose={() => setLegalPage(null)}
          onOpenPage={setLegalPage}
          onSaveConsent={chooseConsent}
        />
      )}

      {/* First-visit cookie banner: shown until the visitor makes a choice */}
      {!consent && !legalPage && (
        <CookieBanner
          onAcceptAll={() => chooseConsent({ analytics: true, marketing: true })}
          onReject={() => chooseConsent({ analytics: false, marketing: false })}
          onCustomize={() => setLegalPage('cookies')}
          onOpenPrivacy={() => setLegalPage('privacy')}
        />
      )}

    </div>
  );
}




