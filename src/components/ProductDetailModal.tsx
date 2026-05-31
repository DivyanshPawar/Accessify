import React, { useState } from 'react';
import { X, Layers, ShoppingCart, Leaf, Shield, Check, Info } from 'lucide-react';
import { Product, ProductLayer } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [exploded, setExploded] = useState<boolean>(true);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(product.layers[0]?.id || null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('Titanium Grey');

  const activeLayer = product.layers.find((l) => l.id === activeLayerId) || product.layers[0];

  const colors = ['Titanium Grey', 'Satin Obsidian', 'Raw Titanium', 'Frosted Quartz'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-950/45 p-4 backdrop-blur-sm">
      {/* Modal Card */}
      <div 
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-[#fbfbfb] shadow-[0_24px_60px_rgba(0,0,0,0.15)] md:flex-row"
        id="detail-modal"
      >
        {/* Close Button Trigger */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:border-neutral-400 active:scale-90"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Column 1: Exploded Structural Engineering Studio */}
        <div className="relative flex flex-1 flex-col justify-between border-b border-neutral-100 bg-neutral-900/5 p-6 md:border-b-0 md:border-r md:p-8">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">precision lab cad model</span>
              <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.01)] text-[10px] font-mono font-semibold text-neutral-600">
                <Layers className="h-3.5 w-3.5 text-neutral-500" />
                <span>{product.layers.length} Active Modules</span>
              </div>
            </div>

            {/* Interactive Snap-Exploding Stage Area */}
            <div className="relative my-8 flex h-[320px] items-center justify-center rounded-2xl bg-white/70 border border-neutral-200/50 shadow-inner overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

              {/* Stack Structure Simulation */}
              <div className="relative flex flex-col items-center justify-center pt-8">
                {product.layers.map((layer, index) => {
                  const isActive = activeLayerId === layer.id;
                  
                  // Compute vertical exploding displacement offsets
                  const baseTranslateY = exploded 
                    ? (index - (product.layers.length - 1) / 2) * -52
                    : 0;
                  
                  // Highlight visual elements
                  const dynamicStyles = isActive
                    ? 'border-2 scale-105 z-30 shadow-[0_8px_30px_rgba(30,41,59,0.12)] border-neutral-800 bg-white/95 translate-x-1 duration-200'
                    : 'border border-neutral-200 bg-white/60 hover:border-neutral-400 hover:bg-white/80 scale-100 duration-300';

                  return (
                    <button
                      key={layer.id}
                      onClick={() => setActiveLayerId(layer.id)}
                      className={`absolute w-64 rounded-xl px-4 py-2.5 text-left font-sans transition-all ease-out cursor-pointer ${dynamicStyles}`}
                      style={{
                        transform: `translateY(${baseTranslateY}px) rotateX(15deg) rotateY(-8deg)`,
                        perspective: '800px'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] font-extrabold text-neutral-400 uppercase tracking-wider">Layer 0{index + 1}</span>
                        {isActive && <Check className="h-3 w-3 text-emerald-500" />}
                      </div>
                      <h4 className="font-sans text-xs font-bold leading-tight text-neutral-900 mt-0.5">{layer.name}</h4>
                      <p className="font-mono text-[9px] text-neutral-400 truncate mt-0.5">{layer.material}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Hover Layer Detail Callout Card */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.01)] transition-all">
            <span className="font-mono text-[9px] font-bold text-amber-600 uppercase tracking-widest leading-none">Component Diagnostics</span>
            <h4 className="font-sans text-sm font-bold text-neutral-900 mt-1">{activeLayer.name}</h4>
            <div className="mt-1 font-mono text-[10px] text-neutral-400 font-semibold italic uppercase">Alloy composition: {activeLayer.material}</div>
            <p className="mt-2 font-sans text-xs text-neutral-500 leading-relaxed">{activeLayer.description}</p>
          </div>

          {/* Assembly Mode Action Switcher */}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-neutral-200/50 p-2 border border-neutral-300/40">
            <span className="font-mono text-[10px] text-neutral-500 font-bold uppercase ml-2">Mechanical View</span>
            <div className="flex bg-white rounded-lg p-0.5 border border-neutral-200">
              <button
                onClick={() => setExploded(false)}
                className={`rounded-md px-3 py-1 font-sans text-[10px] font-bold transition-all ${
                  !exploded ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Assembled (Snap)
              </button>
              <button
                onClick={() => setExploded(true)}
                className={`rounded-md px-3 py-1 font-sans text-[10px] font-bold transition-all ${
                  exploded ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Deconstructed (CAD)
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Specs & Luxury Transaction Layout */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">{product.series} series</span>
              <h3 className="font-sans text-2xl font-extrabold tracking-tight text-neutral-900 mt-0.5">{product.name}</h3>
              <p className="mt-1 font-sans text-xs italic text-neutral-400 font-semibold">{product.tagline}</p>
              <p className="mt-3 font-sans text-xs leading-relaxed text-neutral-500">{product.description}</p>
            </div>

            {/* Price & Selection */}
            <div className="border-t border-b border-neutral-100 py-4 grid grid-cols-2 gap-4">
              <div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block">Retail Price</span>
                <span className="font-sans text-2xl font-black text-neutral-900">${product.price}.00</span>
                <span className="block font-mono text-[9px] text-[#22c55e] font-bold mt-1 uppercase">✓ In Stock &amp; Ready to Mill</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block">Warranty Shield</span>
                <span className="font-sans text-xs font-bold text-neutral-800 italic block mt-1.5">Free Premium Courier Ship</span>
                <span className="font-sans text-[11px] text-neutral-400 leading-none">Complete hardware replacement coverage</span>
              </div>
            </div>

            {/* Finishes */}
            <div>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-2">Architectural Finish</span>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-lg border px-3 py-1.5 font-sans text-xs font-semibold transition-all ${
                      selectedColor === color
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Environmental Metric Cards */}
            <div className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="h-4 w-4 text-emerald-500" />
                <h4 className="font-sans text-[11px] font-bold text-neutral-850 uppercase tracking-tight">Transparency Materials Disclosure</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-neutral-200/50 bg-white p-2.5 text-center">
                  <span className="font-mono text-[8px] text-neutral-400 block uppercase">Carbon Score</span>
                  <span className="font-sans text-sm font-bold text-neutral-900 block mt-0.5">{product.environmental.carbonScore} kg</span>
                  <span className="font-mono text-[8px] text-emerald-600 font-bold block">Low Impact</span>
                </div>
                <div className="rounded-xl border border-neutral-200/50 bg-white p-2.5 text-center">
                  <span className="font-mono text-[8px] text-neutral-400 block uppercase">Recycled Content</span>
                  <span className="font-sans text-sm font-bold text-neutral-900 block mt-0.5">{product.environmental.recycledPercentage}%</span>
                  <span className="font-mono text-[8px] text-emerald-600 font-bold block">Certified Circular</span>
                </div>
                <div className="rounded-xl border border-neutral-200/50 bg-white p-2.5 text-center">
                  <span className="font-mono text-[8px] text-neutral-400 block uppercase">Build Index</span>
                  <span className="font-sans text-sm font-bold text-neutral-900 block mt-0.5">{product.environmental.durabilityRating.split(' ')[0]}</span>
                  <span className="font-mono text-[8px] text-neutral-400 font-bold block">Grade Rating</span>
                </div>
              </div>
            </div>

            {/* Features & Technical Specs */}
            <div>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-2">Engineering Specs</span>
              <table className="w-full font-sans text-xs text-neutral-600 divide-y divide-neutral-100">
                <tbody>
                  {product.specs.map((spec, sIdx) => (
                    <tr key={sIdx} className="py-2 inline-flex w-full items-center justify-between border-b border-neutral-100/50">
                      <td className="font-medium text-neutral-400">{spec.label}</td>
                      <td className="font-bold text-neutral-800">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Footer Drawer */}
          <div className="mt-8 border-t border-neutral-100 pt-6 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 font-bold"
              >
                -
              </button>
              <span className="w-10 text-center font-mono text-xs font-bold text-neutral-800">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 font-bold"
              >
                +
              </button>
            </div>

            <button
              id="add-to-cart-cta"
              onClick={() => {
                onAddToCart(product, quantity, selectedColor);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              Configure &amp; Add (${product.price * quantity}.00)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
