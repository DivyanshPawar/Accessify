import React, { useState } from 'react';
import { Activity, Clock, MapPin, CheckCircle2, ShieldAlert, Cpu, Hammer, Send, ExternalLink } from 'lucide-react';
import { OrderState } from '../types';

interface OrderTrackerProps {
  order: OrderState | null;
  onResetOrder: () => void;
  onAccelerateOrder: () => void;
}

export default function OrderTracker({
  order,
  onResetOrder,
  onAccelerateOrder,
}: OrderTrackerProps) {
  
  // Default fallback mock order for immediate sandbox playability
  const demoOrder: OrderState = {
    orderId: 'MIN-9583-0284',
    createdAt: 'May 31, 2026',
    items: [
      {
        product: {
          id: 'case-cryo-armor',
          name: 'MINIMA Shell I: Cryo-Armor',
          tagline: 'Titanium Bumper, Polycarbonate Shield',
          description: '',
          price: 95,
          category: 'cases',
          series: 'titanium',
          inStock: 14,
          rating: 4.9,
          imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=120&q=80',
          features: [],
          specs: [],
          layers: [],
          environmental: { carbonScore: 1.8, recycledPercentage: 84, biodegradable: false, durabilityRating: 'Grade A+++' }
        },
        quantity: 1,
        selectedColor: 'Raw Titanium'
      },
      {
        product: {
          id: 'charger-gan-prism',
          name: 'MINIMA Prism Charge: 120W GaN',
          tagline: 'Visible hardware block',
          description: '',
          price: 135,
          category: 'chargers',
          series: 'transparency',
          inStock: 8,
          rating: 5.0,
          imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=120&q=80',
          features: [],
          specs: [],
          layers: [],
          environmental: { carbonScore: 3.2, recycledPercentage: 62, biodegradable: false, durabilityRating: 'Grade A+' }
        },
        quantity: 1,
        selectedColor: 'Frosted Quartz'
      }
    ],
    shipping: {
      fullName: 'Dr. Gregory Thorne',
      email: 'thorne@aero-research.com',
      address: '742 Helix Way, Hangar 4',
      city: 'Palo Alto',
      postalCode: '94301',
      country: 'United States',
      deliveryMethod: 'white-glove'
    },
    subtotal: 230,
    discount: 23,
    shippingCost: 35,
    total: 242,
    status: 'milling',
    currentStep: 2,
  };

  const activeOrder = order || demoOrder;
  const isDemo = !order;

  // Track stages configuration
  const stages = [
    { label: 'Escrow Validated', desc: 'Crypto / Card escrow signatures authorized and locked.', icon: CheckCircle2 },
    { label: 'CNC Bumper Milling', desc: 'Grade 5 metals laser cut and machined to 0.05mm tolerances.', icon: Hammer },
    { label: 'MagSafe Layer Embed', desc: 'High-density Neodymium magnetic ring stacked and sintered.', icon: Cpu },
    { label: '9H Scratch Check', desc: 'Optical transparency calibration and scratch inspections.', icon: Clock },
    { label: 'Courier Fleet Transit', desc: 'Escorted inside specialized briefcase for premium handoff.', icon: Send },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10" id="order-tracker-view">
      {/* Tracker Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#d97706] font-bold">
            {isDemo ? 'PRESETS SIMULATION STREAMING' : 'SECURE HARDWARE REAL-TIME PROTOCOL'}
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-neutral-900 mt-1">Order Fabrication Track</h2>
          <p className="font-sans text-xs text-neutral-500 mt-1">
            {isDemo 
              ? 'Displaying sandbox simulation. Fill your configuration in the main collection store to track your actual fabricated elements.'
              : 'Your personalized hardware modules are inside the active fabrication queue. Watch the process live.'
            }
          </p>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap gap-2.5">
          <button
            id="tracker-accelerate-btn"
            onClick={onAccelerateOrder}
            className="rounded-xl border border-neutral-300 bg-white px-4 py-2 font-sans text-xs font-bold text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50 shadow-sm active:scale-95"
          >
            Fast-Track Manufacturing Step
          </button>
          {!isDemo && (
            <button
              onClick={onResetOrder}
              className="rounded-xl bg-red-50 border border-red-200 px-4 py-2 font-sans text-xs font-bold text-red-650 hover:bg-neutral-900 hover:text-white"
            >
              Clear Order
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Live Progress Stream Cards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="border-b border-neutral-100 pb-4 mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase">Fabrication Identifier</span>
                <h4 className="font-mono text-sm font-black text-neutral-900 uppercase">{activeOrder.orderId}</h4>
              </div>
              <div className="text-right sm:text-right">
                <span className="font-mono text-[9px] text-neutral-400 block uppercase">Transit Hub Mode</span>
                <span className="inline-block rounded-full bg-amber-50 border border-amber-250 px-2.5 py-0.5 font-sans text-[10px] font-bold text-amber-700 capitalize">
                  {activeOrder.shipping.deliveryMethod.replace('-', ' ')} shipping
                </span>
              </div>
            </div>

            {/* Stepper Timeline Stream */}
            <div className="relative pl-8 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-[1px] before:bg-neutral-200">
              {stages.map((stage, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < activeOrder.currentStep;
                const isActive = stepNum === activeOrder.currentStep;
                const Icon = stage.icon;

                return (
                  <div key={idx} className="relative flex flex-col gap-1 sm:flex-row sm:gap-6">
                    {/* Floating Pulse Indicator Node */}
                    <div className={`absolute -left-8 flex h-7 w-7 items-center justify-center rounded-full border bg-white transition-all shadow-sm ${
                      isCompleted 
                        ? 'border-[#22c55e] bg-emerald-50 text-emerald-600'
                        : isActive
                        ? 'border-neutral-900 bg-neutral-900 text-white ring-4 ring-neutral-100 animate-pulse'
                        : 'border-neutral-200 text-neutral-400'
                    }`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    {/* Stage Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className={`font-sans text-xs font-extrabold ${isActive ? 'text-neutral-900 text-sm' : 'text-neutral-600'}`}>
                          {stage.label}
                        </h4>
                        {isActive && (
                          <span className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-[8px] font-bold text-white uppercase animate-pulse">
                            Active Queue
                          </span>
                        )}
                        {isCompleted && (
                          <span className="font-mono text-[9px] text-[#22c55e] font-bold">✓ Milling Complete</span>
                        )}
                      </div>
                      <p className="font-sans text-xs text-neutral-400 mt-0.5 max-w-xl">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Billing & Shipping Spec Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Shipping Manifest Coordinates Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4">
            <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight flex items-center gap-1.5 pb-2 border-b border-neutral-100">
              <MapPin className="h-4 w-4 text-neutral-500" /> Dispatch Coordinates
            </h4>
            <div className="space-y-3 font-sans text-xs text-neutral-600">
              <div>
                <span className="font-mono text-[9px] text-neutral-400 block uppercase">Recipient</span>
                <span className="font-semibold text-neutral-900 block">{activeOrder.shipping.fullName}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-neutral-400 block uppercase">Address Target</span>
                <span className="font-semibold text-neutral-900 block leading-tight">{activeOrder.shipping.address}</span>
                <span className="text-neutral-500 block">{activeOrder.shipping.city}, {activeOrder.shipping.postalCode}</span>
                <span className="text-neutral-400 block">{activeOrder.shipping.country}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-neutral-400 block uppercase">Secure Email Gateway</span>
                <span className="font-mono text-[10px] text-neutral-500">{activeOrder.shipping.email}</span>
              </div>
            </div>
          </div>

          {/* Secure Receipt Element */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4">
            <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight flex items-center gap-1.5 pb-2 border-b border-neutral-100">
              <Activity className="h-4 w-4 text-neutral-500" /> Specified Components Receipt
            </h4>
            
            <div className="space-y-3 divide-y divide-neutral-100 max-h-48 overflow-y-auto pr-1">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className={`flex items-start justify-between gap-3 text-xs ${idx > 0 ? 'pt-2.5' : ''}`}>
                  <div className="min-w-0">
                    <span className="font-bold text-neutral-900 block truncate">{item.product.name}</span>
                    <span className="font-mono text-[9px] text-neutral-400 block">Finish: {item.selectedColor}</span>
                    <span className="font-mono text-[9px] text-neutral-400 block">Quantity: {item.quantity} units</span>
                  </div>
                  <span className="font-mono font-bold text-neutral-800 shrink-0">${item.product.price * item.quantity}.00</span>
                </div>
              ))}
            </div>

            {/* Total Block */}
            <div className="pt-3 border-t border-neutral-100 space-y-2 font-sans text-xs text-neutral-500">
              <div className="flex justify-between">
                <span>Components Subtotal</span>
                <span className="font-mono font-bold text-neutral-800">${activeOrder.subtotal}.00</span>
              </div>
              {activeOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Reduction</span>
                  <span className="font-mono font-bold">-${activeOrder.discount}.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Transit Charge</span>
                <span className="font-mono font-bold text-neutral-800">${activeOrder.shippingCost}.00</span>
              </div>
              <div className="flex justify-between border-t border-neutral-150 pt-2 font-extrabold text-neutral-900 text-sm">
                <span>Hardware Escrow Totaled</span>
                <span className="font-mono text-base font-black">${activeOrder.total}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
