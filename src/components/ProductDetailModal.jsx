import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { 
  X, 
  ShoppingBag, 
  Star, 
  Check, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  RotateCcw 
} from "lucide-react";

export default function ProductDetailModal() {
  const { selectedProductForModal, setSelectedProductForModal, addToCart, formatPrice } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!selectedProductForModal) return null;
  const product = selectedProductForModal;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedProductForModal(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={() => setSelectedProductForModal(null)} 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Media Column */}
        <div className="w-full md:w-1/2 bg-neutral-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-800">
              {product.badge}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="my-6 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-60 w-auto object-cover rounded-2xl shadow-sm"
            />
          </div>

          <div className="space-y-2 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span>12 Months Official Warranty in Cambodia</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-700" />
              <span>Free Express Delivery for Phnom Penh</span>
            </div>
          </div>
        </div>

        {/* Product Info & Specs Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {product.category}
            </div>
            <h2 className="text-2xl font-black text-neutral-950 mt-1">
              {product.name}
            </h2>
            <div className="text-xs text-neutral-500 font-medium">
              {product.khmerName}
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-neutral-950 font-mono">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Available in stock ({product.stockCount} units)
              </span>
            </div>

            <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Tech Specs Table */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                Technical Specifications
              </h4>
              <div className="divide-y divide-neutral-100 text-xs border-y border-neutral-100">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="py-1.5 flex justify-between gap-4">
                    <span className="font-medium text-neutral-500">{key}</span>
                    <span className="font-semibold text-neutral-900 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="mt-6 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-neutral-300 bg-neutral-50 p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-neutral-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold font-mono text-neutral-900">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-neutral-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-sm ${
                  added ? "bg-emerald-600 text-white" : "bg-neutral-950 hover:bg-neutral-800 text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {qty} to Cart ({formatPrice(product.price * qty)})</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
