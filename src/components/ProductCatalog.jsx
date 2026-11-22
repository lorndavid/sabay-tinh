import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { 
  ShoppingBag, 
  Eye, 
  Star, 
  Check, 
  Plus, 
  Minus 
} from "lucide-react";

export default function ProductCatalog() {
  const { addToCart, formatPrice, setSelectedProductForModal } = useCart();
  const [quantities, setQuantities] = useState({
    "prod-laptop": 1,
    "prod-monitor": 1,
    "prod-keyboard": 1,
    "prod-mouse": 1
  });
  const [addedIds, setAddedIds] = useState({});

  const handleQtyChange = (productId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const handleAdd = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="products-catalog" className="py-14 bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple & Classic Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
              Products
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500">
              The 4 core essentials for high performance.
            </p>
          </div>
          <div className="mt-2 sm:mt-0 text-xs font-mono text-neutral-400">
            4 Items Available
          </div>
        </div>

        {/* 4 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product) => {
            const isAdded = addedIds[product.id];
            const currentQty = quantities[product.id] || 1;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-neutral-200 hover:border-black transition-all duration-200 p-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200">
                      {product.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700">
                      <Star className="w-3 h-3 fill-black text-black" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Thumbnail Image */}
                  <div 
                    onClick={() => setSelectedProductForModal(product)}
                    className="relative w-full h-44 rounded-xl bg-neutral-50 overflow-hidden flex items-center justify-center p-3 cursor-pointer group-hover:bg-neutral-100/60 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-black shadow-xs">
                        <Eye className="w-3 h-3" />
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-3">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold text-black truncate mt-0.5">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                {/* Price and Cart */}
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <div className="flex items-baseline justify-between mb-2.5">
                    <span className="text-lg font-black text-black font-mono">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      In Stock
                    </span>
                  </div>

                  {/* Quantity Stepper & Add Button */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center rounded-lg border border-neutral-300 bg-neutral-50 p-0.5">
                      <button
                        onClick={() => handleQtyChange(product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-black">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-black hover:bg-neutral-800 text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
