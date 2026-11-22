import React from "react";
import { useCart } from "../context/CartContext";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles,
  Tag
} from "lucide-react";

export default function CartDrawer() {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
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
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-black text-neutral-950">Your Cart</h2>
                <p className="text-xs text-neutral-500">
                  {cart.length} item{cart.length === 1 ? "" : "s"} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Your cart is empty</h3>
                <p className="mt-1 text-xs text-neutral-500 max-w-xs">
                  Explore our signature 4 products on the 3D desk or catalog to start shopping.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-6 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-neutral-50 border border-neutral-200"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-neutral-950 leading-tight">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500">{product.khmerName}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded-lg border border-neutral-300 bg-neutral-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-neutral-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-neutral-700"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-neutral-950">
                          {formatPrice(product.price * quantity)}
                        </span>
                        {quantity > 1 && (
                          <span className="block text-[10px] text-neutral-400 font-mono">
                            {formatPrice(product.price)} ea
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Totals & Proceed */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50/50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-neutral-950">
                    {formatPrice(subtotal)}
                  </span>
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
                    {effectiveShippingCost === 0 ? "FREE" : formatPrice(effectiveShippingCost)}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-black text-neutral-950">
                  <span>Grand Total</span>
                  <span className="font-mono text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleOpenFullCart}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100 transition-colors"
                >
                  Full Cart Page
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
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
