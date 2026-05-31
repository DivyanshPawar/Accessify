import React from 'react';
import { Eye, Plus, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  // Determine Series Color Badge
  const getSeriesBadge = (series: Product['series']) => {
    switch (series) {
      case 'titanium':
        return 'bg-amber-50 text-amber-800 border-amber-200/50';
      case 'carbon':
        return 'bg-neutral-800 text-neutral-100 border-neutral-700';
      case 'transparency':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200/50';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-neutral-400 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      {/* Product Image Stack with Interactive Overlays */}
      <div 
        onClick={() => onSelect(product)}
        className="relative aspect-4/3 w-full cursor-pointer overflow-hidden rounded-xl bg-[#f7f7f7]"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Floating Series Badge */}
        <span className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${getSeriesBadge(product.series)}`}>
          {product.series} series
        </span>

        {/* Low Stock Warning */}
        {product.inStock <= 8 && (
          <span className="absolute top-3 right-3 rounded-full bg-red-50 border border-red-200 px-2.5 py-0.5 font-mono text-[9px] font-bold text-red-600 uppercase tracking-tight animate-pulse">
            Only {product.inStock} Left
          </span>
        )}

        {/* Hover View Blueprint Trigger */}
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-sans text-xs font-bold text-neutral-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-neutral-50 active:scale-95"
          >
            <Eye className="h-4 w-4" />
            Deconstruct Build
          </button>
        </div>
      </div>

      {/* Info Block */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">{product.category}</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span className="font-mono text-[10px] font-bold text-neutral-600">{product.rating}</span>
          </div>
        </div>

        <h3 
          onClick={() => onSelect(product)}
          className="mt-1.5 cursor-pointer font-sans text-base font-bold tracking-tight text-neutral-900 hover:text-neutral-600"
        >
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 flex-1 font-sans text-xs text-neutral-400">
          {product.tagline}
        </p>

        {/* Bottom Price/Buy Row */}
        <div className="mt-4 border-t border-neutral-100 pt-3 flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] text-neutral-400 uppercase leading-none">Price USD</span>
            <div className="font-sans text-lg font-extrabold text-neutral-900">${product.price}.00</div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-900 hover:bg-neutral-950 hover:text-white active:scale-90"
            title="Add to cart"
            id={`add-${product.id}`}
          >
            <Plus className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
