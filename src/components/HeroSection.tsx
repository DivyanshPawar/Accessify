import React from 'react';
import { Shield, Sparkles, Cpu, Layers } from 'lucide-react';

interface HeroSectionProps {
  onLearnMore: () => void;
}

export default function HeroSection({ onLearnMore }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-[#fbfbfb] px-6 py-12 md:py-20 border-b border-neutral-100">
      {/* Light Mesh Ambient Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Typographic Core */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-[10px] font-bold text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.01)] uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Edition 01: Core Architecture
            </div>

            <h2 className="font-sans text-4xl font-extrabold tracking-[-0.04em] text-neutral-900 sm:text-5xl md:text-6xl lg:leading-[1.1]">
              Precision. <br />
              <span className="text-neutral-400">Transparency.</span> <br />
              Absolute Luxury.
            </h2>

            <p className="max-w-xl font-sans text-base leading-relaxed text-neutral-500">
              MINIMA is a molecular and material design house. We strip away the unnecessary, exposing premium internals, CNC-turned alloys, and woven structural composites to design the worlds most refined mobile hardware.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onLearnMore}
                className="rounded-full bg-neutral-900 px-6 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95"
              >
                Explore Collection
              </button>
              <div className="flex items-center gap-1.5 px-2 py-3 font-mono text-xs font-bold text-neutral-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Laboratory Milled 2026
              </div>
            </div>
          </div>

          {/* Interactive Bento Spec Grid Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors hover:border-neutral-300">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100/80 text-neutral-800">
                <Shield className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight">Grade 5 Alloy</h3>
              <p className="mt-1 font-mono text-[11px] text-neutral-400 uppercase">aerospace bumper</p>
              <div className="mt-4 border-t border-neutral-100 pt-3">
                <span className="font-sans text-xl font-bold text-neutral-900">349 HV</span>
                <span className="ml-1 font-mono text-[10px] text-neutral-400">Hardness index</span>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors hover:border-neutral-300">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100/80 text-neutral-800">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight">Crystallite</h3>
              <p className="mt-1 font-mono text-[11px] text-neutral-400 uppercase">9H protective back</p>
              <div className="mt-4 border-t border-neutral-100 pt-3">
                <span className="font-sans text-xl font-bold text-neutral-900">1.25mm</span>
                <span className="ml-1 font-mono text-[10px] text-neutral-400">ultra profiles</span>
              </div>
            </div>

            <div className="col-span-2 rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors hover:border-neutral-300">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100/80 text-neutral-800">
                    <Cpu className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight">GaN v5 Silicon</h3>
                  <p className="mt-1 font-mono text-[11px] text-neutral-400 uppercase">visible energy conversion</p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-600 uppercase">
                    Core Security
                  </span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
                <div>
                  <div className="font-sans text-lg font-bold text-neutral-900">120 Watts</div>
                  <div className="font-mono text-[9px] text-neutral-400 uppercase">safe variable flow</div>
                </div>
                <div>
                  <div className="font-sans text-lg font-bold text-neutral-900">95.6%</div>
                  <div className="font-mono text-[9px] text-neutral-400 uppercase">transfer ratio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
