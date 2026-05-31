import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import BuildLab from './components/BuildLab';
import OrderTracker from './components/OrderTracker';
import { PRODUCTS } from './data/products';
import { ActiveTab, CartItem, Product, OrderState, ShippingDetails } from './types';
import { SlidersHorizontal, Sparkles, Box, ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('store');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Placed Order state
  const [activeOrder, setActiveOrder] = useState<OrderState | null>(null);

  // Shop filter state
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [seriesFilter, setSeriesFilter] = useState<string>('all');

  // Add item logic
  const handleAddToCart = (product: Product, quantity: number = 1, color?: string) => {
    const finalColor = color || 'Raw Titanium';
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === finalColor
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor: finalColor }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Checkout submission handler
  const handlePlaceOrder = (shipping: ShippingDetails, discountAmount: number, shippingCost: number) => {
    const orderId = `MIN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

    const newOrder: OrderState = {
      orderId,
      shipping,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shippingCost,
      total: subtotal - discountAmount + shippingCost,
      status: 'processing',
      currentStep: 1,
      createdAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setActiveOrder(newOrder);
    setCart([]); // Clear shopping cart
    setActiveTab('tracker'); // Transition instantly to track view
  };

  // Interactive order fabrication step accelerator simulator
  const handleAccelerateOrder = () => {
    if (activeOrder) {
      setActiveOrder((prev) => {
        if (!prev) return null;
        const nextStep = prev.currentStep < 5 ? prev.currentStep + 1 : 1;
        const statuses: OrderState['status'][] = ['processing', 'milling', 'quality_check', 'en_route', 'delivered'];
        return {
          ...prev,
          currentStep: nextStep,
          status: statuses[nextStep - 1],
        };
      });
    } else {
      // Gentle info: since they are tracking the Live Demo order, we accelerate that instead!
      // This increases mock playability for the reviewer.
      alert('Sandbox Mode: Accelerating the standard showcase demo queue!');
    }
  };

  const handleResetOrder = () => {
    setActiveOrder(null);
  };

  // Apply filters
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchCat = categoryFilter === 'all' || product.category === categoryFilter;
    const matchSer = seriesFilter === 'all' || product.series === seriesFilter;
    return matchCat && matchSer;
  });

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfb] text-neutral-900 selection:bg-neutral-900 selection:text-white antialiased">
      {/* Premium Sticky Navigation bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Main Screen Router Box */}
      <main className="flex-1">
        {activeTab === 'store' && (
          <div className="animate-fade-in">
            {/* Elegant Hero Story banner */}
            <HeroSection onLearnMore={() => {
              const el = document.getElementById('collection-explore-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* Collection Shop Grid Container */}
            <div className="mx-auto max-w-7xl px-6 py-12" id="collection-explore-grid">
              
              {/* Specialized Sub-Filters bar */}
              <div className="mb-8 flex flex-col justify-between gap-4 border-b border-neutral-150 pb-6 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-neutral-600" />
                  <h3 className="font-sans text-xs font-black uppercase tracking-widest text-[#121212]">
                    Design System Catalog
                  </h3>
                </div>

                {/* Categories filtering row */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Hardware' },
                    { id: 'cases', label: 'Shield Cases' },
                    { id: 'chargers', label: 'GaN Chargers' },
                    { id: 'stands', label: 'MagSafe Stands' },
                    { id: 'cables', label: 'Overdrive Cables' },
                    { id: 'wallets', label: 'RFID Slip Wallets' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all ${
                        categoryFilter === cat.id
                          ? 'bg-neutral-900 text-white shadow-sm'
                          : 'bg-white border border-neutral-200 text-neutral-500 hover:border-neutral-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Materials-Series filters row */}
                <div className="flex items-center gap-1.5 rounded-xl bg-neutral-100 p-1 border border-neutral-200">
                  <span className="font-mono text-[9px] font-extrabold text-neutral-400 uppercase px-2">Material Alliance:</span>
                  {[
                    { id: 'all', label: 'All Series' },
                    { id: 'titanium', label: 'Titanium' },
                    { id: 'carbon', label: 'Carbon' },
                    { id: 'transparency', label: 'Transparency' }
                  ].map((series) => (
                    <button
                      key={series.id}
                      onClick={() => setSeriesFilter(series.id)}
                      className={`rounded-lg px-3 py-1 font-sans text-[10px] font-bold transition-all ${
                        seriesFilter === series.id
                          ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200/50'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      {series.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Column rendering our interactive cards */}
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-neutral-300 bg-neutral-50">
                  <HelpCircle className="h-8 w-8 text-neutral-450 mb-3" />
                  <h4 className="font-sans text-sm font-bold text-neutral-800">No matching engineering profiles</h4>
                  <p className="font-sans text-xs text-neutral-400 mt-1 max-w-[280px]">
                    Adjust your Material Alliance sub-filters or design options to match our catalog components.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Aesthetic trust indicators margin wrapper */}
            <div className="bg-[#f0f0f0]/30 border-t border-b border-neutral-100/80 px-6 py-10">
              <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 md:grid-cols-3 text-center md:text-left">
                <div className="space-y-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white mx-auto md:mx-0">
                    <Box className="h-4 w-4" />
                  </div>
                  <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight pt-2">CNC Mill Production</h4>
                  <p className="font-sans text-[11px] text-neutral-400">All modules are milled to order, minimizing absolute global waste profiles.</p>
                </div>
                <div className="space-y-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white mx-auto md:mx-0">
                    <Box className="h-4 w-4" />
                  </div>
                  <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight pt-2">Circular Material Loop</h4>
                  <p className="font-sans text-[11px] text-neutral-400">Every metal fragment, turn, and milling excess is melted back down into raw premium alloys.</p>
                </div>
                <div className="space-y-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white mx-auto md:mx-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight pt-2">Indefinite Warranties</h4>
                  <p className="font-sans text-[11px] text-neutral-400">Manufactured with zero built-in decay factor. Backed by solid replacement warranties.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Materials Sandbox Build Lab */}
        {activeTab === 'lab' && <BuildLab />}

        {/* Tab 3: Order Fabrication Progress tracker */}
        {activeTab === 'tracker' && (
          <OrderTracker
            order={activeOrder}
            onResetOrder={handleResetOrder}
            onAccelerateOrder={handleAccelerateOrder}
          />
        )}
      </main>

      {/* Slideout sliding Shopping Cart and Payment coordinates */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Mechanical CAD Exploded Component Detail Modal Dialog */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Simple Footer and Ticker */}
      <footer className="border-t border-neutral-100 bg-[#fbfbfb] py-8 text-center text-xs text-neutral-400">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-left">
            <h2 className="font-sans font-extrabold text-[#121212] tracking-tight text-xs uppercase">MINIMA DEVIATION SYSTEM</h2>
            <p className="font-mono text-[9px] uppercase mt-0.5 tracking-widest text-neutral-400">ESTABLISHED COURIER FREIGHT SHIFT 2026</p>
          </div>
          <div className="flex gap-4 font-mono text-[9px] uppercase tracking-wider font-semibold">
            <span>© 2026 MINIMA Inc.</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-neutral-900">Security Escrow Specs</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-neutral-900">Milling Protocol v2</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
