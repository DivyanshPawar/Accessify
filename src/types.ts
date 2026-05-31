export interface ProductLayer {
  id: string;
  name: string;
  material: string;
  description: string;
  highlightColor: string;
}

export interface SpecDetail {
  label: string;
  value: string;
}

export interface EnvironmentalRating {
  carbonScore: number; // kg CO2e
  recycledPercentage: number;
  biodegradable: boolean;
  durabilityRating: string; // e.g. "Grade A+"
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'cases' | 'stands' | 'chargers' | 'cables' | 'wallets';
  series: 'transparency' | 'titanium' | 'carbon';
  inStock: number;
  rating: number;
  features: string[];
  specs: SpecDetail[];
  layers: ProductLayer[];
  environmental: EnvironmentalRating;
  imageUrl: string; // fallback banner image
  svgBlueprint?: string; // CSS-driven vector presentation key
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type ActiveTab = 'store' | 'lab' | 'tracker';

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: 'express' | 'priority' | 'white-glove';
}

export interface OrderState {
  orderId: string;
  shipping: ShippingDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  status: 'processing' | 'milling' | 'quality_check' | 'en_route' | 'delivered';
  currentStep: number;
  createdAt: string;
}

export interface LabMaterial {
  id: string;
  name: string;
  category: string;
  density: string;
  hardness: string;
  thermalConductivity: string;
  carbonFootprint: string;
  color: string;
  metrics: {
    strength: number; // 0-100
    conduct: number; // 0-100
    eco: number; // 0-100
    weight: number; // 0-100
  };
}
