import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { 
  ShoppingBag, 
  Eye, 
  Star, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Laptop, 
  Monitor, 
  Keyboard, 
  Mouse 
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
    }, 1500);
  };

  return (
    <section id="products-catalog" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-300 mb-2 uppercase tracking-wide">
              Practical Exercise 1
            </div>
            <h2 className="text-3xl font-black tracking-tight text-neutral-950">
              Signature Hardware Collection
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              បង្ហាញផលិតផលទាំង ៤ ជាមួយតម្លៃផ្លូវការ និងប៊ូតុង Add to Cart
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-xs text-neutral-500 font-mono">
            4 Products Available • In Stock
          </div>
        </div>

        {/* 4 Products Grid (Classic Minimalist White & Black Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => {
            const isAdded = addedIds[product.id];
            const currentQty = quantities[product.id] || 1;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-neutral-200 hover:border-neutral-950 transition-all duration-300 hover:shadow-xl overflow-hidden p-5"
              >
                {/* Top Badge & Rating */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200">
                      {product.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-neutral-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Product Image Container */}
                  <div 
                    onClick={() => setSelectedProductForModal(product)}
                    className="relative w-full h-48 rounded-2xl bg-neutral-50 overflow-hidden flex items-center justify-center p-4 cursor-pointer group-hover:bg-neutral-100/70 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Hover Quick View Overlay Pill */}
                    <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-neutral-950 shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                        Quick View Specs
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                      {product.category}
                    </div>
                    <h3 className="mt-0.5 text-base font-bold text-neutral-950 group-hover:text-black line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      {product.khmerName}
                    </p>
                    <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                {/* Price and Cart Action */}
                <div className="mt-5 pt-4 border-t border-neutral-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xs text-neutral-400 block font-medium">Price</span>
                      <span className="text-2xl font-black text-neutral-950 font-mono tracking-tight">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {product.stockCount} in stock
                    </span>
                  </div>

                  {/* Quantity selector & Add to cart button (Exercise 1 requirement) */}
                  <div className="flex items-center gap-2">
                    
                    {/* Stepper */}
                    <div className="flex items-center rounded-xl border border-neutral-300 bg-neutral-50 p-1">
                      <button
                        onClick={() => handleQtyChange(product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-neutral-700 transition-colors"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-neutral-900 font-mono">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-neutral-700 transition-colors"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-xs ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-neutral-950 hover:bg-neutral-800 text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
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
