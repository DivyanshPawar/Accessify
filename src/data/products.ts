import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'case-cryo-armor',
    name: 'MINIMA Shell I: Cryo-Armor',
    tagline: 'Crystallite backplate with CNC-milled titanium aerospace borders.',
    description: 'An architectural smartphone framework combining crystal-clear shatterproof back shielding with a shock-absorption frame crafted in Grade 5 Aerospace Titanium. Absolute safety in extreme thinness.',
    price: 95,
    category: 'cases',
    series: 'titanium',
    inStock: 14,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    features: [
      'CNC machined outer aerospace Grade 5 titanium bumper',
      'Optical-grade high-purity crystallite backplate',
      'MagSafe Core featuring 18 gold-plated Neodymium magnets',
      'Anti-reflective, scratch-resistant surface treatment (9H Hardness)'
    ],
    specs: [
      { label: 'Weight', value: '28.4 grams' },
      { label: 'Thickness', value: '1.25 mm profile' },
      { label: 'Magnetic Pull', value: '1.4 kg holding strength' },
      { label: 'Impact Rating', value: '12 ft (3.6m) military drop test certified' }
    ],
    layers: [
      { id: 'case-l1', name: 'Inner Crystallite Armour', material: 'Pure Polycarbonate Compound', description: 'Protects the absolute glass back of your phone with zero yellowing properties and optical clarity.', highlightColor: 'border-cyan-400 text-cyan-400 bg-cyan-950/20' },
      { id: 'case-l2', name: 'MagSafe Neodymium Ring', material: '18x N52 Neodymium Magnets', description: 'Gold-plated magnets arranged in a high-density circle for rapid 15W wireless alignment and firm lock.', highlightColor: 'border-yellow-500 text-yellow-500 bg-yellow-950/20' },
      { id: 'case-l3', name: 'Chamber Cushion Corners', material: 'Gel Elastomer Polymer', description: 'Micro-cellular cushioning absorbs 98.4% of impact force at critical drop-angles.', highlightColor: 'border-emerald-400 text-emerald-400 bg-emerald-950/20' },
      { id: 'case-l4', name: 'Outer CNC Aerospace Bumper', material: 'Grade 5 Titanium Alloy', description: 'A protective external skeleton machined down to 0.05mm tolerances, securing all corners with high rigidity.', highlightColor: 'border-amber-500 text-amber-500 bg-amber-950/20' }
    ],
    environmental: {
      carbonScore: 1.8,
      recycledPercentage: 84,
      biodegradable: false,
      durabilityRating: 'Grade A+++ (Lifetime warranty)'
    }
  },
  {
    id: 'charger-gan-prism',
    name: 'MINIMA Prism Charge: 120W GaN',
    tagline: 'Visible internal hardware architecture housed in sapphire-acrylic.',
    description: 'Witness high-efficiency power delivery in real-time. This transparent charging block showcases gold-milled nodes, dual custom copper transformers, and safety-fused silicon circuitry.',
    price: 135,
    category: 'chargers',
    series: 'transparency',
    inStock: 8,
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    features: [
      'Polished high-density acrylic shell with pure glass optical clarity',
      '120W total output powered by advanced Gallium Nitride (GaN v5)',
      'Dual Smart USB-C channels plus custom gold-plated USB-A gate',
      'Integrated active thermal monitoring checking 120 times per minute'
    ],
    specs: [
      { label: 'Output Gate', value: '2x USB-C (100W Max), 1x USB-A (30W Max)' },
      { label: 'Efficiency Class', value: '95.6% Conversion Ratio' },
      { label: 'Materials', value: 'Crystalline Acrylic, Copper Coils, Gold Connectors' },
      { label: 'Weight', value: '112 grams' }
    ],
    layers: [
      { id: 'chg-l1', name: 'Thermal Dissipation Pads', material: 'Alumina Nano-Ceramic Compound', description: 'Channels heat uniformly out of the circuit structures to maintain a cool external housing temperature.', highlightColor: 'border-blue-400 text-blue-400 bg-blue-950/20' },
      { id: 'chg-l2', name: 'GaN Dual-Power Transformer', material: 'Gallium Nitride & Gold Connectors', description: 'Converts high-voltage power with 40% less space and 85% less micro-energy losses.', highlightColor: 'border-orange-500 text-orange-500 bg-orange-950/20' },
      { id: 'chg-l3', name: 'Smart Security Chipset', material: 'Arm-based Power Integration MCU', description: 'Protects connected mobile targets from electrical static, spikes, and overheating.', highlightColor: 'border-purple-400 text-purple-400 bg-purple-950/20' },
      { id: 'chg-l4', name: 'Prism Outer Acrylic Cage', material: '98% Crystalline Cast Acrylic', description: 'Flame-retardant, high-transmissions armor, scratch-buffed and completely clear.', highlightColor: 'border-cyan-400 text-cyan-400 bg-cyan-950/20' }
    ],
    environmental: {
      carbonScore: 3.2,
      recycledPercentage: 62,
      biodegradable: false,
      durabilityRating: 'Grade A+ (100,000 Cycle Tested)'
    }
  },
  {
    id: 'stand-carbon-air',
    name: 'MINIMA Air-Stand: Carbon Desk',
    tagline: 'Floating high-density magnetic link with an open titanium neck.',
    description: 'An gravity-defying desktop stand manufactured out of carbon fiber and CNC-turned metal. Holds your devices securely in horizontal or vertical positions with high magnetic force.',
    price: 160,
    category: 'stands',
    series: 'carbon',
    inStock: 5,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    features: [
      'Woven 12K high-density twill carbon fiber stability disk base',
      'Brushed aerospace Grade 5 Titanium mechanical joint assembly',
      'Dual-orientation 15W Qi2 wireless MagSafe charging pad',
      'Counterweight design stays perfectly immobile during touch operation'
    ],
    specs: [
      { label: 'Aesthetic Texture', value: 'Matte Weave Carbon and Sandblasted Grey' },
      { label: 'Qi2 Protocol', value: 'True 15W Fast Charge compatible' },
      { label: 'Swivel Mobility', value: '360° rotation with 45° vertical tilt adjustment' },
      { label: 'Weight Base', value: '440g anti-slip steel weighted inner base' }
    ],
    layers: [
      { id: 'st-l1', name: 'Woven Carbon Fiber Base', material: '12K Carbon Twill Resin Composite', description: 'High tensile strength platform that resists scratches and provides low center of gravity.', highlightColor: 'border-neutral-400 text-neutral-400 bg-neutral-950/20' },
      { id: 'st-l2', name: 'Satin-Finish Aluminum Core', material: 'Anodized AL6061-T6 Matrix', description: 'Houses the electronics and serves as the mounting structure for the mechanical pivot.', highlightColor: 'border-slate-300 text-slate-300 bg-slate-950/20' },
      { id: 'st-l3', name: 'Grade 5 Titanium Connector Line', material: 'Solid Brushed Titanium Column', description: 'Strong column connecting base to charger, machined internally to pass-through clean cabling.', highlightColor: 'border-amber-500 text-amber-500 bg-amber-950/20' },
      { id: 'st-l4', name: 'Soft-Contact Suede Charging Face', material: 'Premium Recycled Vegan Suede', description: 'Prevents standard micro-scratches from accumulating on shiny glass phone bodies.', highlightColor: 'border-yellow-400 text-yellow-400 bg-yellow-950/20' }
    ],
    environmental: {
      carbonScore: 4.1,
      recycledPercentage: 75,
      biodegradable: false,
      durabilityRating: 'Grade A++ (Heirloom quality)'
    }
  },
  {
    id: 'cable-stainless-overdrive',
    name: 'MINIMA Overdrive: Stainless Braid',
    tagline: 'Armor braided metal charging cord with live blue status glass.',
    description: 'The final cable you will ever specify. Wrapped in high-flex stainless steel armored mesh sleeve with CNC sandblasted titanium plugs and clear sapphire current meters.',
    price: 65,
    category: 'cables',
    series: 'titanium',
    inStock: 25,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1619140131109-77a83fa595e0?auto=format&fit=crop&w=800&q=80',
    features: [
      'Flexible SUS-304 Stainless Steel protective outer mesh braid',
      'High-speed 40Gbps Thunderbolt 4 core transfers',
      '240W Power Delivery (E-Marker integrated circuit smart safe)',
      'Polished titanium housings and sapphire-crystal smart LED glow'
    ],
    specs: [
      { label: 'Length', value: '1.5 Meters (5 Feet)' },
      { label: 'Throughput Speed', value: '40 Gbps Data Sync (4K Display Out Support)' },
      { label: 'Power Limit', value: 'USB-PD EPR v2.1 (Up to 48V / 5A, 240W)' },
      { label: 'Tension Resistance', value: 'Up to 150 kg pull strength test approved' }
    ],
    layers: [
      { id: 'cb-l1', name: 'Copper Power Coils', material: 'Silver-Plated Oxygen-Free Copper', description: 'Conducts electricity with absolute efficiency and minimal resistance/heat accumulation.', highlightColor: 'border-orange-500 text-orange-500 bg-orange-950/20' },
      { id: 'cb-l2', name: 'E-Marker Control Shield', material: 'Custom Mini Controller Chip', description: 'Communicates safe capabilities with host power boxes up to 240W PD specification.', highlightColor: 'border-purple-400 text-purple-400 bg-purple-950/20' },
      { id: 'cb-l3', name: 'Armored Secondary Shell', material: 'Hexagonal Carbon fiber Core', description: 'Double braid insulation that prevents inner strain and maintains precise flex cycles.', highlightColor: 'border-slate-400 text-slate-400 bg-slate-950/20' },
      { id: 'cb-l4', name: 'Flexible Steel Over-Braid', material: 'SUS-304 Medical Stainless Steel', description: 'Flexible helical ring mesh protecting the system from sharp cuts and compression crushes.', highlightColor: 'border-amber-400 text-amber-400 bg-amber-950/20' }
    ],
    environmental: {
      carbonScore: 0.9,
      recycledPercentage: 92,
      biodegradable: true,
      durabilityRating: 'Grade A+++ (Lifetime Warranty)'
    }
  },
  {
    id: 'wallet-titanium-slip',
    name: 'MINIMA Slip: Titanium RFID Wallet',
    tagline: 'RFID protected card slip crafted in sandblasted alloy.',
    description: 'An ultra-slim magnetic cardholder. Machined directly out of aerospace titanium, designed as a companion accessory that locks directly to the back of any MINIMA case.',
    price: 80,
    category: 'wallets',
    series: 'titanium',
    inStock: 12,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1627224324471-a491bc0dc070?auto=format&fit=crop&w=800&q=80',
    features: [
      'Milled plates in anodized Grade 5 Space Titanium',
      'Sized precisely for up to 5 cards and crisp banknotes',
      'Powerful internal alignment plate locks to MagSafe devices',
      'Full spectrum high-frequency RFID electromagnetic interference barrier'
    ],
    specs: [
      { label: 'Capacity', value: 'Holds up to 5 cards and custom bills' },
      { label: 'Magnetics Ratio', value: '1.2 kg heavy shear detachment threshold' },
      { label: 'Dimensions', value: '88 mm x 58 mm x 4.8 mm ultra-thin profile' },
      { label: 'Surface Profile', value: 'Beaded sandblast satin metallic texture' }
    ],
    layers: [
      { id: 'wl-l1', name: 'Elastic Webbing bands', material: 'Nylon Lycra Elastic Double Weave', description: 'Expands smoothly on demand and returns securely to holding profile when cards are removed.', highlightColor: 'border-[#10b981] text-[#10b981] bg-emerald-950/20' },
      { id: 'wl-l2', name: 'Carbon Fiber Back Shield', material: 'T300 Carbon Fiber Plate composite', description: 'Serves as an interior stiffener and provides backing rigidity to prevent card bend.', highlightColor: 'border-neutral-400 text-neutral-400 bg-neutral-950/20' },
      { id: 'wl-l3', name: 'Integrated MagSafe Coils', material: 'Sintered Neodymium Magnetic Disc', description: 'Holds fast to the phone. Sintered with anti-pinch technology, shielding cards from magnetism.', highlightColor: 'border-orange-400 text-orange-400 bg-orange-950/20' },
      { id: 'wl-l4', name: 'Satin Titanium Outer Covers', material: 'Grade 5 Aerospace-Alloy Sheets', description: 'Sandblasted cover frames that endure extreme scrapes with absolute aesthetic beauty.', highlightColor: 'border-amber-500 text-amber-500 bg-amber-950/20' }
    ],
    environmental: {
      carbonScore: 1.1,
      recycledPercentage: 90,
      biodegradable: false,
      durabilityRating: 'Grade A+++ (Lifetime warranty)'
    }
  }
];

export const LAB_MATERIALS = [
  {
    id: 'g5-titanium',
    name: 'Grade 5 Aerospace Titanium',
    category: 'Alloys',
    density: '4.43 g/cm³',
    hardness: '349 HV',
    thermalConductivity: '6.7 W/m·K',
    carbonFootprint: 'Low (1.1 kg CO2e/pc)',
    color: '#8a8b8c',
    metrics: { strength: 98, conduct: 25, eco: 88, weight: 65 }
  },
  {
    id: 'crystal-acrylic',
    name: 'Cast Opto-Acrylic',
    category: 'Polymers',
    density: '1.18 g/cm³',
    hardness: '22 HV',
    thermalConductivity: '0.21 W/m·K',
    carbonFootprint: 'Med-Low (1.6 kg CO2e/pc)',
    color: '#06b6d4',
    metrics: { strength: 40, conduct: 12, eco: 65, weight: 95 }
  },
  {
    id: 'carbon-twill',
    name: '12K Pre-preg Carbon Fiber',
    category: 'Composites',
    density: '1.76 g/cm³',
    hardness: '140 HV',
    thermalConductivity: '2.5 W/m·K',
    carbonFootprint: 'Med (2.4 kg CO2e/pc)',
    color: '#262626',
    metrics: { strength: 95, conduct: 45, eco: 50, weight: 88 }
  },
  {
    id: 'ofc-copper',
    name: 'Oxygen-Free Solid Copper',
    category: 'Conductive Metals',
    density: '8.94 g/cm³',
    hardness: '80 HV',
    thermalConductivity: '401 W/m·K',
    carbonFootprint: 'High (3.8 kg CO2e/pc)',
    color: '#b45309',
    metrics: { strength: 52, conduct: 99, eco: 40, weight: 30 }
  }
];
