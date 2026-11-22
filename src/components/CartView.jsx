import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Check 
} from "lucide-react";

export default function CartView() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    effectiveShippingCost, 
    discountAmount, 
    grandTotal, 
    formatPrice, 
    setActiveView,
    promoCode,
    appliedPromo,
    promoError,
    applyPromo,
    removePromo
  } = useCart();

  const [inputCode, setInputCode] = useState(promoCode);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromo(inputCode);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <button
            onClick={() => setActiveView("landing")}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <span className="text-xs font-mono text-neutral-400">
            Shopping Cart
          </span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-black mb-8">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-neutral-200 bg-neutral-50">
            <ShoppingBag className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-black">Your cart is currently empty</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Select any of the 4 hardware products to get started.
            </p>
            <button
              onClick={() => setActiveView("landing")}
              className="mt-5 px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-colors"
            >
              Back to Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Products List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Items ({cart.length})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-black transition-colors"
                >
                  Clear all
                </button>
              </div>

              <div className="divide-y divide-neutral-100">
                {cart.map(({ product, quantity }) => (
                  <div 
                    key={product.id} 
                    className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-xl bg-neutral-50 border border-neutral-200 p-2 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-bold text-black">
                          {product.name}
                        </h3>
                        <div className="text-xs text-neutral-500 font-mono mt-0.5">
                          {formatPrice(product.price)} each
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6">
                      {/* Stepper */}
                      <div className="flex items-center rounded-lg border border-neutral-300 bg-neutral-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-black">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <span className="text-sm font-black font-mono text-black">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1.5 text-neutral-400 hover:text-black transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-5">
                <h2 className="text-base font-black text-black pb-3 border-b border-neutral-200">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-black">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery</span>
                    <span className="font-mono font-semibold">
                      {effectiveShippingCost === 0 ? "Free" : formatPrice(effectiveShippingCost)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                    <span className="text-sm font-black text-black">Total</span>
                    <span className="text-xl font-black font-mono text-black">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                <div>
                  {!appliedPromo ? (
                    <div>
                      {!showPromoInput ? (
                        <button
                          onClick={() => setShowPromoInput(true)}
                          className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1.5"
                        >
                          <Tag className="w-3 h-3" />
                          <span>Add promo code</span>
                        </button>
                      ) : (
                        <form onSubmit={handleApplyPromo} className="space-y-1.5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={inputCode}
                              onChange={(e) => setInputCode(e.target.value)}
                              placeholder="SABAY10"
                              className="flex-1 px-3 py-1.5 rounded-lg text-xs uppercase font-mono border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <button
                              type="submit"
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-black text-white hover:bg-neutral-800"
                            >
                              Apply
                            </button>
                          </div>
                          {promoError && (
                            <p className="text-[11px] text-rose-600">{promoError}</p>
                          )}
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-neutral-200 text-xs">
                      <span className="font-semibold text-black">{appliedPromo.code} applied</span>
                      <button
                        onClick={removePromo}
                        className="text-neutral-500 hover:text-black text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* BTN Proceed to Checkout */}
                <button
                  onClick={() => {
                    setActiveView("checkout");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
