import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, Tag, CreditCard, ShieldCheck } from 'lucide-react';
import { CartItem, ShippingDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (shipping: ShippingDetails, discountAmount: number, shippingCost: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState<string>('');
  const [activePromo, setActivePromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string>('');
  
  // Checkout Multi-step
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  
  // Shipping form state
  const [form, setForm] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    deliveryMethod: 'express',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.toUpperCase().trim();
    if (code === 'MINIMA10') {
      setActivePromo({ code: 'MINIMA10', percent: 10 });
    } else if (code === 'METALLURGY') {
      setActivePromo({ code: 'METALLURGY', percent: 20 });
    } else {
      setPromoError('Invalid specification code. Attempt "MINIMA10" or "METALLURGY".');
    }
  };

  // Subtotals
  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const discount = activePromo ? Math.round((subtotal * activePromo.percent) / 100) : 0;
  
  const getShippingCost = () => {
    switch (form.deliveryMethod) {
      case 'white-glove': return 35; // aluminum security box transit
      case 'priority': return 15;
      case 'express':
      default: return 7;
    }
  };
  const shippingCost = subtotal > 0 ? getShippingCost() : 0;
  const total = subtotal - discount + shippingCost;

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!form.fullName) tempErrors.fullName = 'Milling recipient is required';
    if (!form.email || !form.email.includes('@')) tempErrors.email = 'Valid telecom address is required';
    if (!form.address) tempErrors.address = 'Destination coordinates are required';
    if (!form.city) tempErrors.city = 'Postal hub city required';
    if (!form.postalCode) tempErrors.postalCode = 'Security postal code required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onPlaceOrder(form, discount, shippingCost);
      // Reset
      setStep('cart');
      onClose();
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md bg-[#fbfbfb] shadow-2xl transition-all border-l border-neutral-150 flex-col animate-slide-in">
      {/* Top Slider Header */}
      <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-6 bg-white">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-4.5 w-4.5 text-neutral-800" />
          <h3 className="font-sans text-sm font-bold uppercase tracking-tight text-neutral-900">
            {step === 'cart' ? 'Specified Cart' : 'Shipping Coordinates'}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-all hover:border-neutral-400 active:scale-95"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {step === 'cart' ? (
        /* ================= STEP 1: CART VIEW ================= */
        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-4">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-neutral-100 p-4 text-neutral-400 mb-4 border border-dashed border-neutral-300">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h4 className="font-sans text-sm font-bold text-neutral-800">Your configuration is empty</h4>
                <p className="font-sans text-xs text-neutral-400 mt-1 max-w-[240px]">
                  Select products from our premium catalog to inspect and assemble your personalized set.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedColor}`} 
                  className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-lg object-cover bg-neutral-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans text-xs font-bold text-neutral-900 truncate">{item.product.name}</h4>
                    <p className="font-mono text-[9px] text-neutral-400 font-medium uppercase mt-0.5">Finish: {item.selectedColor}</p>
                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Flex Quantity Selector */}
                      <div className="flex items-center rounded-lg border border-neutral-200 bg-white p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 text-xs font-bold text-neutral-500 hover:bg-neutral-50"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono text-[10px] font-bold text-neutral-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-neutral-500 hover:bg-neutral-50"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-neutral-900">${item.product.price * item.quantity}.00</span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pricing Subtotal Stack */}
          {cartItems.length > 0 && (
            <div className="border-t border-neutral-200 pt-4 space-y-4">
              {/* Promo Inputs */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-neutral-400">
                    <Tag className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Specification Code (e.g. MINIMA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 font-mono text-[11px] placeholder-neutral-400 outline-none focus:border-neutral-400"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="rounded-xl bg-neutral-100 border border-neutral-300 px-4 py-2 font-sans text-[11px] font-bold text-neutral-800 hover:bg-neutral-200"
                >
                  Verify
                </button>
              </div>

              {promoError && (
                <div className="font-mono text-[9px] text-red-500 font-semibold">{promoError}</div>
              )}
              
              {activePromo && (
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-250 p-2 text-emerald-800 font-mono text-[10px] font-bold">
                  <span>✓ Applied Code: {activePromo.code}</span>
                  <span>- {activePromo.percent}% Off</span>
                </div>
              )}

              {/* Specs Math Details */}
              <div className="rounded-xl border border-neutral-200/60 bg-white p-4 space-y-2">
                <div className="flex items-center justify-between font-sans text-xs text-neutral-500">
                  <span>Milled Subtotal</span>
                  <span className="font-mono font-bold text-neutral-800">${subtotal}.00</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between font-sans text-xs text-emerald-600">
                    <span>Code Reduction</span>
                    <span className="font-mono font-bold">-${discount}.00</span>
                  </div>
                )}
                <div className="flex items-center justify-between font-sans text-xs text-neutral-500 border-t border-neutral-100 pt-2">
                  <span>Shipping Hub Rate</span>
                  <span className="font-mono font-medium text-neutral-800">
                    {shippingCost > 0 ? `$${shippingCost}.00` : 'Calculated next'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-100 pt-2 font-sans text-sm font-extrabold text-neutral-900">
                  <span>Total Due</span>
                  <span className="font-mono text-base font-black">${total}.00</span>
                </div>
              </div>

              <button
                id="cart-next-btn"
                onClick={() => setStep('checkout')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95"
              >
                Proceed to Shipping Coordinates
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ================= STEP 2: SHIPPING FORM VIEW ================= */
        <form onSubmit={handleCheckoutSubmit} className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-4">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            <p className="font-sans text-xs text-neutral-400">
              Provide transit shipping coordinates. Our CNC milling system will queue your hardware upon payment approval.
            </p>

            <div className="space-y-3">
              <div>
                <label className="font-sans text-[10px] font-bold text-neutral-500 uppercase block mb-1">Milled Recipient Name</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Arthur Pendelton"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-sans text-xs placeholder-neutral-350 outline-none focus:border-neutral-400"
                />
                {errors.fullName && <p className="font-mono text-[9px] text-red-500 font-semibold mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="font-sans text-[10px] font-bold text-neutral-500 uppercase block mb-1">Telecom Destination (Email)</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. arthur@domain.com"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-sans text-xs placeholder-neutral-350 outline-none focus:border-neutral-400"
                />
                {errors.email && <p className="font-mono text-[9px] text-red-500 font-semibold mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="font-sans text-[10px] font-bold text-neutral-500 uppercase block mb-1">Delivery Address Line</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Street and suite metrics"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-sans text-xs placeholder-neutral-350 outline-none focus:border-neutral-400"
                />
                {errors.address && <p className="font-mono text-[9px] text-red-500 font-semibold mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-sans text-[10px] font-bold text-neutral-500 uppercase block mb-1">City Hub</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Cupertino"
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-sans text-xs placeholder-neutral-350 outline-none focus:border-neutral-400"
                  />
                  {errors.city && <p className="font-mono text-[9px] text-red-500 font-semibold mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="font-sans text-[10px] font-bold text-neutral-500 uppercase block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    placeholder="e.g. 95014"
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-sans text-xs placeholder-neutral-350 outline-none focus:border-neutral-400"
                  />
                  {errors.postalCode && <p className="font-mono text-[9px] text-red-500 font-semibold mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              {/* Transit Priority Options - The White glove delivery option represents raw luxury! */}
              <div>
                <label className="font-sans text-[10px] font-bold text-neutral-500 uppercase block mb-2">Transit Hub Courier Speed</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-3 cursor-pointer select-none hover:border-neutral-400 transition-all">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={form.deliveryMethod === 'express'}
                        onChange={() => setForm({ ...form, deliveryMethod: 'express' })}
                        className="h-4 w-4 text-neutral-900 border-neutral-300 focus:ring-0"
                      />
                      <div>
                        <span className="font-sans text-xs font-bold text-neutral-900 block">Express Milled Post</span>
                        <span className="font-sans text-[10px] text-neutral-400 leading-none">Delivered in 3-5 standard working shifts</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-neutral-800">$7.00</span>
                  </label>

                  <label className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-3 cursor-pointer select-none hover:border-neutral-400 transition-all">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={form.deliveryMethod === 'priority'}
                        onChange={() => setForm({ ...form, deliveryMethod: 'priority' })}
                        className="h-4 w-4 text-neutral-900 border-neutral-300 focus:ring-0"
                      />
                      <div>
                        <span className="font-sans text-xs font-bold text-neutral-900 block">Priority Cryo Transit</span>
                        <span className="font-sans text-[10px] text-neutral-400 leading-none">1-2 shift guaranteed delivery with custom tracking</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-neutral-800">$15.00</span>
                  </label>

                  <label className="flex items-center justify-between rounded-xl border border-[#d97706]/40 bg-amber-50/30 p-3 cursor-pointer select-none hover:border-[#d97706] transition-all">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={form.deliveryMethod === 'white-glove'}
                        onChange={() => setForm({ ...form, deliveryMethod: 'white-glove' })}
                        className="h-4 w-4 text-[#d97706] border-neutral-350 focus:ring-0"
                      />
                      <div>
                        <span className="font-sans text-xs font-bold text-[#d97706] block">MINIMA White-Glove Security Courier</span>
                        <span className="font-sans text-[10px] text-[#b45309] leading-none">Delivered directly inside a CNC alloy locked briefcase</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#d97706]">$35.00</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-4">
            <div className="rounded-xl border border-neutral-250/70 bg-white p-3.5 flex items-start gap-2.5">
              <ShieldCheck className="h-4.5 w-4.5 text-neutral-700 shrink-0 mt-0.5" />
              <div className="text-[10px] font-sans text-neutral-500 leading-normal">
                <span className="font-bold text-neutral-850 block mb-0.5">Secure Escrow Protection</span>
                Your transaction details are encrypted with military-grade ECDSA-256 signatures. Complete warranty certificates accompany the final metal shipment.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="rounded-xl border border-neutral-300 px-4 py-3.5 font-sans text-xs font-semibold hover:bg-neutral-50 active:scale-95"
              >
                Back
              </button>
              <button
                type="submit"
                id="place-order-btn"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95"
              >
                <CreditCard className="h-4 w-4" />
                Commit Order &amp; Queue Milling (${total}.00)
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
