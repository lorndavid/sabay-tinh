import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { 
  Laptop, 
  Monitor, 
  Keyboard, 
  Mouse, 
  Check, 
  ShoppingBag, 
  ShieldCheck, 
  Zap, 
  Sparkles 
} from "lucide-react";

export default function SpecsComparison() {
  const { addToCart, formatPrice, setSelectedProductForModal } = useCart();
  const [activeTab, setActiveTab] = useState("prod-laptop");

  const currentProd = PRODUCTS.find((p) => p.id === activeTab) || PRODUCTS[0];

  return (
    <section id="specs-section" className="py-16 bg-neutral-50/50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-neutral-800 border border-neutral-300 shadow-xs uppercase tracking-wide mb-3">
            <Zap className="w-3.5 h-3.5 text-neutral-900" />
            Detailed Hardware Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">
            Engineered for Precision & Comfort
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Compare comprehensive specs, physical dimensions, and connectivity across all 4 products.
          </p>
        </div>

        {/* Product Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {PRODUCTS.map((prod) => {
            const isSelected = prod.id === activeTab;
            const Icon = prod.id === "prod-laptop" ? Laptop : prod.id === "prod-monitor" ? Monitor : prod.id === "prod-keyboard" ? Keyboard : Mouse;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveTab(prod.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-neutral-950 text-white shadow-md scale-102"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{prod.name}</span>
                <span className="font-mono text-[11px] opacity-80">({formatPrice(prod.price)})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Product Interactive Spec Card */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Product Visual */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-full max-w-sm h-64 rounded-2xl bg-neutral-50 border border-neutral-100 p-6 flex items-center justify-center overflow-hidden">
              <img
                src={currentProd.image}
                alt={currentProd.name}
                className="max-h-full max-w-full object-cover rounded-xl shadow-xs hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-black font-mono text-neutral-950">
                {formatPrice(currentProd.price)}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                In Stock ({currentProd.stockCount} units)
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500 font-medium">
              Physical Dimensions: {currentProd.dimensions}
            </p>
          </div>

          {/* Right: Technical Specs Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {currentProd.category}
              </span>
              <h3 className="text-2xl font-black text-neutral-950 mt-0.5">
                {currentProd.name}
              </h3>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                {currentProd.khmerName}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {currentProd.description}
              </p>
            </div>

            {/* Specs Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(currentProd.specs).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="font-bold text-neutral-400 block text-[10px] uppercase tracking-wider">
                    {key}
                  </span>
                  <span className="font-medium text-neutral-900 block mt-0.5">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => addToCart(currentProd, 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-950 text-white font-bold text-xs hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart ({formatPrice(currentProd.price)})</span>
              </button>

              <button
                onClick={() => setSelectedProductForModal(currentProd)}
                className="px-5 py-3 rounded-xl bg-neutral-100 text-neutral-800 font-bold text-xs hover:bg-neutral-200 transition-colors"
              >
                Inspect 3D Modal View
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
