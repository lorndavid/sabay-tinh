import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { 
  Laptop, 
  Monitor, 
  Keyboard, 
  Mouse, 
  ShoppingBag 
} from "lucide-react";

export default function SpecsComparison() {
  const { addToCart, formatPrice, setSelectedProductForModal } = useCart();
  const [activeTab, setActiveTab] = useState("prod-laptop");

  const currentProd = PRODUCTS.find((p) => p.id === activeTab) || PRODUCTS[0];

  return (
    <section id="specs-section" className="py-14 bg-neutral-50/50 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
            Hardware Specifications
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500">
            Compare materials, performance metrics, and connectivity.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
          {PRODUCTS.map((prod) => {
            const isSelected = prod.id === activeTab;
            const Icon = prod.id === "prod-laptop" ? Laptop : prod.id === "prod-monitor" ? Monitor : prod.id === "prod-keyboard" ? Keyboard : Mouse;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveTab(prod.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-black text-white shadow-xs"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{prod.name}</span>
                <span className="font-mono text-[11px] opacity-70">({formatPrice(prod.price)})</span>
              </button>
            );
          })}
        </div>

        {/* Spec Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="w-full max-w-xs h-52 rounded-xl bg-neutral-50 border border-neutral-100 p-4 flex items-center justify-center">
              <img
                src={currentProd.image}
                alt={currentProd.name}
                className="max-h-full max-w-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-3 text-xl font-black font-mono text-black">
              {formatPrice(currentProd.price)}
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Dimensions: {currentProd.dimensions}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {currentProd.category}
              </span>
              <h3 className="text-xl font-black text-black mt-0.5">
                {currentProd.name}
              </h3>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                {currentProd.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(currentProd.specs).map(([key, val]) => (
                <div key={key} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                  <span className="font-bold text-neutral-400 block text-[9px] uppercase tracking-wider">
                    {key}
                  </span>
                  <span className="font-semibold text-black block mt-0.5">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => addToCart(currentProd, 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart ({formatPrice(currentProd.price)})</span>
              </button>

              <button
                onClick={() => setSelectedProductForModal(currentProd)}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
              >
                Inspect
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
