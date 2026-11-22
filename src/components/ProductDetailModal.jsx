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
  Truck 
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
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="absolute inset-0" 
        onClick={() => setSelectedProductForModal(null)} 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media */}
        <div className="w-full md:w-1/2 bg-neutral-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-neutral-200 text-black">
              {product.badge}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700">
              <Star className="w-3.5 h-3.5 fill-black text-black" />
              <span>{product.rating}</span>
            </div>
          </div>

          <div className="my-6 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-52 w-auto object-cover rounded-xl"
            />
          </div>

          <div className="space-y-1.5 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              <span>1-Year Official Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-black" />
              <span>Fast Tracked Delivery</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-xl font-black text-black mt-0.5">
              {product.name}
            </h2>

            <div className="mt-2 text-2xl font-black text-black font-mono">
              {formatPrice(product.price)}
            </div>

            <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Specs */}
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <h4 className="text-[11px] font-bold text-black uppercase tracking-wider mb-2">
                Specifications
              </h4>
              <div className="divide-y divide-neutral-100 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="py-1.5 flex justify-between gap-2">
                    <span className="text-neutral-500">{key}</span>
                    <span className="font-semibold text-black text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-5 pt-3 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border border-neutral-300 bg-neutral-50 p-0.5">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold font-mono text-black">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  added ? "bg-emerald-600 text-white" : "bg-black hover:bg-neutral-800 text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart ({formatPrice(product.price * qty)})</span>
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
