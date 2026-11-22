import React from "react";
import { useCart } from "../context/CartContext";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag 
} from "lucide-react";

export default function CartDrawer() {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    effectiveShippingCost, 
    discountAmount, 
    grandTotal, 
    formatPrice, 
    setActiveView 
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setActiveView("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenFullCart = () => {
    setIsCartDrawerOpen(false);
    setActiveView("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-150">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-black" />
              <h2 className="text-sm font-bold text-black uppercase tracking-wider">
                Cart ({cart.length})
              </h2>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-8 h-8 text-neutral-300 mb-2" />
                <h3 className="text-sm font-bold text-black">Your cart is empty</h3>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-black text-white hover:bg-neutral-800"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 flex gap-3 first:pt-0 last:pb-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-neutral-50 border border-neutral-200"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-black leading-tight">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-neutral-400 hover:text-black transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded-lg border border-neutral-300 bg-neutral-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-black">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-black">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/60 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-black">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="font-mono">
                    {effectiveShippingCost === 0 ? "Free" : formatPrice(effectiveShippingCost)}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-black text-black">
                  <span>Total</span>
                  <span className="font-mono">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleOpenFullCart}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-white text-black border border-neutral-300 hover:bg-neutral-100"
                >
                  View Cart
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-black text-white hover:bg-neutral-800 flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
