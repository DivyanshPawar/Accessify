import React, { useState, useEffect } from 'react';
import { Binary, Play, RefreshCw, Zap, ShieldAlert, Cpu, Leaf, Hammer } from 'lucide-react';
import { LAB_MATERIALS } from '../data/products';

export default function BuildLab() {
  const [selectedMat, setSelectedMat] = useState(LAB_MATERIALS[0]);
  const [activeTest, setActiveTest] = useState<'drop' | 'thermal' | 'tension' | null>(null);
  const [testLog, setTestLog] = useState<string[]>([
    'SYSTEM: READY FOR ASSEMBLY INSPECTION',
    'INFO: Choose a premium material and execute stress simulations.'
  ]);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({ strength: 0, conduct: 0, eco: 0, weight: 0 });

  // Staggered animate metrics on selectedMat change
  useEffect(() => {
    setMetrics({ strength: 0, conduct: 0, eco: 0, weight: 0 });
    const timer = setTimeout(() => {
      setMetrics({
        strength: selectedMat.metrics.strength,
        conduct: selectedMat.metrics.conduct,
        eco: selectedMat.metrics.eco,
        weight: selectedMat.metrics.weight
      });
    }, 120);
    return () => clearTimeout(timer);
  }, [selectedMat]);

  const runSimulation = (testType: 'drop' | 'thermal' | 'tension') => {
    setActiveTest(testType);
    setLoading(true);
    
    // Clear log and prepare loading log cycles
    setTestLog(prev => [
      `Initializing: ${testType.toUpperCase()} SIMULATOR ON [${selectedMat.name.toUpperCase()}]`,
      `SYS: Calibrating robotic actuators and load arrays...`,
      ...prev
    ]);

    setTimeout(() => {
      let finalResults: string[] = [];
      if (testType === 'drop') {
        const structuralScore = Math.round(selectedMat.metrics.strength * 0.95);
        finalResults = [
          `✓ Gravity Fall Test complete. Velocity reached: 17.5 m/s.`,
          `✓ Structural rating: ${structuralScore}/100.`,
          structuralScore > 75 
            ? 'SYS: EXCELLENT SHIELD REVOLUTION. Material sustained ZERO dimensional fatigue.'
            : 'SYS: WARNING. Crystalline shear fracture lines observed. Pad cushioning required.'
        ];
      } else if (testType === 'thermal') {
        const temp = Math.round(150 - (selectedMat.metrics.conduct * 1.1));
        finalResults = [
          `✓ Laser Thermal Charge active. Wave intensity: 450nm.`,
          `✓ Dissipation stability quotient: ${selectedMat.metrics.conduct}/100.`,
          `✓ Core Internal temp reading: ${temp}°C`,
          selectedMat.metrics.conduct > 80
            ? 'SYS: PERFECT HEAT GATEWAY. Thermal energy uniformly dissolved.'
            : 'SYS: MODERATE RETENTION. Aluminum thermal vents required in shell module.'
        ];
      } else if (testType === 'tension') {
        const yieldLimit = Math.round(selectedMat.metrics.strength * 12.4);
        finalResults = [
          `✓ Hydraulic Tension Grippers locked. Exerting pull rate.`,
          `✓ Material mechanical yield threshold: ${yieldLimit} MegaPascals (MPa).`,
          selectedMat.metrics.strength > 70
            ? 'SYS: HIGHEST SOLID RUGGED PATTERN. Substantive alloy holds structure.'
            : 'SYS: STRUCTURAL FAILURE. Stress limit reached. Compound split after plastic deformation.'
        ];
      }

      setTestLog(prev => [
        `[COMPLETE] ${testType.toUpperCase()} LAB PROTOCOL SUCCESSFULLY TERMINATED.`,
        ...finalResults,
        `══════════════════════════════════════════════`,
        ...prev
      ]);
      setLoading(false);
      setActiveTest(null);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10" id="build-lab-dashboard">
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#d97706] font-bold">MINIMA DESIGN STUDIO</span>
        <h2 className="font-sans text-3xl font-extrabold tracking-tight text-neutral-900 mt-1">Sandbox Build Lab</h2>
        <p className="font-sans text-xs text-neutral-500 mt-1">
          Deconstruct metallurgical compounds, stress test alloys, and evaluate physical property variables before queuing final mill fabrication.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Material Picker & Interactive Gauges */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight block mb-4">Select Raw Material Matrix</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {LAB_MATERIALS.map((mat) => {
                const isSelected = selectedMat.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => {
                      if (!loading) setSelectedMat(mat);
                    }}
                    disabled={loading}
                    className={`rounded-xl border p-4 text-left transition-all outline-none cursor-pointer ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm scale-102'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 disabled:opacity-50'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-wider block opacity-60 leading-none">{mat.category}</span>
                    <span className="font-sans text-xs font-extrabold block mt-2 leading-tight">{mat.name.split(' ').slice(-1)[0]}</span>
                    <span className="font-mono text-[9px] block mt-1 py-0.5 border-t border-dashed border-neutral-300 text-neutral-400 font-bold">
                      {mat.density}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Metric Meter Panels */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight">Inspected Mechanical Properties</h4>
              <span className="font-mono text-[9px] bg-neutral-150 rounded-full border border-neutral-200/50 px-2 py-0.5 text-neutral-500">
                Calibrated Metrics
              </span>
            </div>

            <div className="space-y-4">
              {/* Metric 1 */}
              <div>
                <div className="flex items-center justify-between font-sans text-xs mb-1">
                  <span className="flex items-center gap-1.5 font-semibold text-neutral-600">
                    <Hammer className="h-3.5 w-3.5 text-neutral-500" /> Toughness &amp; Hardness
                  </span>
                  <span className="font-mono font-bold text-neutral-900">{metrics.strength}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-neutral-900 transition-all duration-700 ease-out" 
                    style={{ width: `${metrics.strength}%` }}
                  />
                </div>
                <p className="font-sans text-[10px] text-neutral-400 mt-1">Yield limit: {selectedMat.hardness}. High hardness resists metal abrasiveness and localized shear strain.</p>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="flex items-center justify-between font-sans text-xs mb-1">
                  <span className="flex items-center gap-1.5 font-semibold text-neutral-600">
                    <Zap className="h-3.5 w-3.5 text-neutral-500" /> Thermal Dissipation
                  </span>
                  <span className="font-mono font-bold text-neutral-900">{metrics.conduct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-cyan-500 transition-all duration-700 ease-out" 
                    style={{ width: `${metrics.conduct}%` }}
                  />
                </div>
                <p className="font-sans text-[10px] text-neutral-400 mt-1">Heat dissipation: {selectedMat.thermalConductivity}. Crucial for rapid GaN thermal stability and cool device touch.</p>
              </div>

              {/* Metric 3 */}
              <div>
                <div className="flex items-center justify-between font-sans text-xs mb-1">
                  <span className="flex items-center gap-1.5 font-semibold text-neutral-600">
                    <Leaf className="h-3.5 w-3.5 text-neutral-500" /> Circular Ecology Index
                  </span>
                  <span className="font-mono font-bold text-neutral-900">{metrics.eco}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700 ease-out" 
                    style={{ width: `${metrics.eco}%` }}
                  />
                </div>
                <p className="font-sans text-[10px] text-neutral-400 mt-1">Carbon cost profile: {selectedMat.carbonFootprint}. Calculated sourcing chain tracking and lifetime recyclability.</p>
              </div>

              {/* Metric 4 */}
              <div>
                <div className="flex items-center justify-between font-sans text-xs mb-1">
                  <span className="flex items-center gap-1.5 font-semibold text-neutral-600">
                    <Cpu className="h-3.5 w-3.5 text-neutral-500" /> Mass-to-Strength (Lightweight)
                  </span>
                  <span className="font-mono font-bold text-neutral-900">{metrics.weight}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber-500 transition-all duration-700 ease-out" 
                    style={{ width: `${metrics.weight}%` }}
                  />
                </div>
                <p className="font-sans text-[10px] text-neutral-400 mt-1">Physical density: {selectedMat.density}. Lower density grants ultra-featherweight user configurations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Stress Sandbox Simulator Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-900 p-6 text-[#fbfbfb] shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h4 className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-neutral-300">
                <Binary className="h-4 w-4 text-cyan-400" /> Physical stress sandbox
              </h4>
              <span className="font-mono text-[9px] text-[#22c55e] uppercase font-bold tracking-tight bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded-full">
                Active Link
              </span>
            </div>

            {/* Simulated Action Stress Controls */}
            <div className="space-y-3">
              <button
                id="stress-drop-btn"
                onClick={() => runSimulation('drop')}
                disabled={loading}
                className="w-full flex items-center justify-between rounded-xl border border-neutral-800 bg-[#1e1e1e] p-3 text-left transition-all hover:bg-neutral-800 hover:border-neutral-700 disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-red-950 text-red-400 border border-red-900/50">
                    <Hammer className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold text-white block">15-Meter Gravity Fall Test</span>
                    <span className="font-sans text-[10px] text-neutral-400 leading-none">Drop stress collision simulation diagnostics</span>
                  </div>
                </div>
                <Play className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              <button
                id="stress-thermal-btn"
                onClick={() => runSimulation('thermal')}
                disabled={loading}
                className="w-full flex items-center justify-between rounded-xl border border-neutral-800 bg-[#1e1e1e] p-3 text-left transition-all hover:bg-neutral-800 hover:border-neutral-700 disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-cyan-950 text-cyan-400 border border-cyan-900/50">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold text-white block">Concentrated Thermal Flow Test</span>
                    <span className="font-sans text-[10px] text-neutral-400 leading-none">Assesses core heat conduction under power draw</span>
                  </div>
                </div>
                <Play className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              <button
                id="stress-tension-btn"
                onClick={() => runSimulation('tension')}
                disabled={loading}
                className="w-full flex items-center justify-between rounded-xl border border-neutral-800 bg-[#1e1e1e] p-3 text-left transition-all hover:bg-neutral-800 hover:border-neutral-700 disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-950 text-amber-400 border border-amber-900/50">
                    <RefreshCw className="h-4 w-4 animate-spin-slow" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold text-white block">Tension Limit Tensile Pull</span>
                    <span className="font-sans text-[10px] text-neutral-400 leading-none">Exerts up to 1,500 kg pulling force</span>
                  </div>
                </div>
                <Play className="h-3.5 w-3.5 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* JetBrains Mono Diagnostic Terminal Block */}
          <div className="mt-8 flex flex-col h-48 rounded-xl bg-black p-4 border border-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-2 text-[10px] font-mono font-bold text-neutral-400 select-none">
              <span> inspected telemetry feedback logger</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[10px] leading-relaxed text-[#00ffcc] scrollbar-none space-y-1 pr-1">
              {loading && (
                <div className="flex items-center gap-1.5 italic animate-pulse text-amber-500 font-bold mb-2">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span>CRITICAL EXERTION SIMULATION UNDERWAY - STAND BY</span>
                </div>
              )}
              {testLog.map((log, idx) => (
                <div 
                  key={idx} 
                  className={
                    log.includes('[SYS:') || log.includes('WARNING')
                      ? 'text-amber-500' 
                      : log.includes('COMPLETE') 
                      ? 'text-emerald-400 font-bold border-t border-neutral-900 pt-1.5' 
                      : 'text-neutral-300'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
