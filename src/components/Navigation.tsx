import React from 'react';
import { ShoppingBag, Sparkles, Binary, Compass, Activity } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  openCart: () => void;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
}: NavigationProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-[#fbfbfb]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand Identity Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <span className="font-mono text-sm font-bold tracking-widest text-neutral-900">M</span>
          </div>
          <div>
            <h1 className="font-sans text-lg font-bold tracking-[-0.03em] text-neutral-900">MINIMA</h1>
            <p className="font-mono text-[9px] font-semibold tracking-widest text-neutral-400 uppercase">Precision . Transparency</p>
          </div>
        </div>

        {/* Global Structural Tab Switching System */}
        <nav className="hidden items-center gap-1 md:flex">
          <button
            id="nav-store-btn"
            onClick={() => setActiveTab('store')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-300 ${
              activeTab === 'store'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Collection
          </button>
          <button
            id="nav-lab-btn"
            onClick={() => setActiveTab('lab')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-300 ${
              activeTab === 'lab'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Binary className="h-3.5 w-3.5" />
            Build Lab
          </button>
          <button
            id="nav-tracker-btn"
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-300 ${
              activeTab === 'tracker'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Order Track
          </button>
        </nav>

        {/* Action Controls & Interactive Cart Trigger */}
        <div className="flex items-center gap-4">
          <button
            id="cart-trigger"
            onClick={openCart}
            className="group relative flex h-10 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 transition-all duration-200 hover:border-neutral-400 active:scale-95 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
          >
            <ShoppingBag className="h-4 w-4 text-neutral-600 transition-colors group-hover:text-neutral-900" />
            <span className="font-sans text-xs font-semibold text-neutral-800 group-hover:text-neutral-900">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-neutral-950 font-mono text-[9px] font-bold text-white ring-2 ring-[#fbfbfb] animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sticky Navigation Rail */}
      <div className="flex border-t border-neutral-100 bg-[#fbfbfb] md:hidden">
        <button
          onClick={() => setActiveTab('store')}
          className={`flex flex-1 flex-col items-center gap-1 py-2 transition-all ${
            activeTab === 'store' ? 'text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          <Compass className="h-4.5 w-4.5" />
          <span className="text-[10px] font-semibold">Collection</span>
        </button>
        <button
          onClick={() => setActiveTab('lab')}
          className={`flex flex-1 flex-col items-center gap-1 py-2 transition-all ${
            activeTab === 'lab' ? 'text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          <Binary className="h-4.5 w-4.5" />
          <span className="text-[10px] font-semibold">Build Lab</span>
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex flex-1 flex-col items-center gap-1 py-2 transition-all ${
            activeTab === 'tracker' ? 'text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          <Activity className="h-4.5 w-4.5" />
          <span className="text-[10px] font-semibold">Track</span>
        </button>
      </div>
    </header>
  );
}
