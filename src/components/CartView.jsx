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
  Check, 
  ShieldCheck, 
  Truck,
  Heart
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
    setPromoCode,
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActiveView("landing")}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>

          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Practical Exercise 1 • Shopping Cart
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            គ្រប់គ្រងបរិមាណទំនិញ បន្ថយ ឬបង្កើនចំនួន និងពិនិត្យការគណនាតម្លៃសរុប
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-neutral-200 bg-neutral-50/50">
            <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-neutral-500 max-w-sm mx-auto">
              Add any of the 4 hardware essentials (Laptop $650, Monitor $120, Keyboard $25, Mouse $15) to continue.
            </p>
            <button
              onClick={() => setActiveView("landing")}
              className="mt-6 px-6 py-3 rounded-2xl bg-neutral-950 text-white font-bold text-xs hover:bg-neutral-800 transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items Table/List (Page 2 screenshot style) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Cart Items ({cart.length})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-rose-600 font-medium transition-colors"
                >
                  Clear all items
                </button>
              </div>

              <div className="divide-y divide-neutral-100">
                {cart.map(({ product, quantity }) => (
                  <div 
                    key={product.id} 
                    className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Thumbnail & Title */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-50 border border-neutral-200 p-2 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {product.category}
                        </span>
                        <h3 className="text-base font-bold text-neutral-950">
                          {product.name}
                        </h3>
                        <p className="text-xs text-neutral-500 font-medium">
                          {product.khmerName}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
                          <span>Unit Price: <strong className="text-neutral-900 font-mono">{formatPrice(product.price)}</strong></span>
                          <span>•</span>
                          <span className="text-emerald-600 font-medium">In Stock</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Line Total */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-2 sm:pt-0">
                      
                      {/* Stepper (Update QTY / Remove QTY) */}
                      <div className="flex items-center rounded-xl border border-neutral-300 bg-neutral-50 p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-neutral-700 transition-colors"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val)) updateQuantity(product.id, val);
                          }}
                          className="w-10 text-center text-xs font-mono font-bold text-neutral-900 bg-transparent focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-neutral-700 transition-colors"
                          title="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-sm font-black font-mono text-neutral-950 block">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>

                      {/* Action icons (Heart / Delete) */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-2 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees */}
              <div className="pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <Truck className="w-4 h-4 text-neutral-800" />
                  <span>Free Ground Delivery on all qualifying orders</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <ShieldCheck className="w-4 h-4 text-neutral-800" />
                  <span>Official Manufacturer Warranty Included</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (Page 2 & 3 style) */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-sm space-y-6">
                
                <h2 className="text-lg font-black text-neutral-950 pb-3 border-b border-neutral-200">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-neutral-950">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery</span>
                    <span className="font-mono font-semibold">
                      {effectiveShippingCost === 0 ? "FREE" : formatPrice(effectiveShippingCost)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount ({appliedPromo?.label || "Promo"})</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline">
                    <span className="text-base font-black text-neutral-950">Total</span>
                    <span className="text-2xl font-black font-mono text-neutral-950">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Toggle & Form */}
                <div className="pt-2">
                  {!appliedPromo ? (
                    <div>
                      {!showPromoInput ? (
                        <button
                          onClick={() => setShowPromoInput(true)}
                          className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 flex items-center gap-1.5 transition-colors"
                        >
                          <Tag className="w-3.5 h-3.5" />
                          <span>Use a promo code</span>
                        </button>
                      ) : (
                        <form onSubmit={handleApplyPromo} className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={inputCode}
                              onChange={(e) => setInputCode(e.target.value)}
                              placeholder="e.g. SABAY10 or KHQR"
                              className="flex-1 px-3 py-2 rounded-xl text-xs uppercase font-mono border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                            />
                            <button
                              type="submit"
                              className="px-3 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                            >
                              Apply
                            </button>
                          </div>
                          {promoError && (
                            <p className="text-[11px] text-rose-600">{promoError}</p>
                          )}
                          <p className="text-[10px] text-neutral-400">
                            Available codes: <strong>SABAY10</strong> (10% off), <strong>KHQR</strong> ($5 off)
                          </p>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{appliedPromo.code} Applied</span>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-neutral-500 hover:text-rose-600 text-[11px] font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* BTN Proceed to Checkout (PDF Page 1 Requirement #3) */}
                <button
                  onClick={() => {
                    setActiveView("checkout");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-4 px-6 rounded-2xl bg-neutral-950 text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[11px] text-neutral-400">
                  Taxes calculated during checkout • 100% Secure Checkout
                </p>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
