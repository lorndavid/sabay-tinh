import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { SHIPPING_METHODS } from "../data/products";
import { 
  ArrowLeft, 
  Lock, 
  AlertCircle, 
  ShieldCheck 
} from "lucide-react";

export default function CheckoutView() {
  const { 
    cart, 
    subtotal, 
    discountAmount, 
    effectiveShippingCost, 
    grandTotal, 
    formatPrice, 
    shippingMethod, 
    setShippingMethod, 
    placeOrder, 
    setActiveView 
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "Divyansh",
    lastName: "Agarwal",
    email: "divyansh@example.com",
    phoneNumber: "+1 234 567 8900",
    address: "452 Industrial Parkway, Suite 10",
    city: "San Francisco",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleClearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      notes: ""
    });
    setErrors({});
  };

  const handleAutofill = () => {
    setFormData({
      firstName: "Divyansh",
      lastName: "Agarwal",
      email: "divyansh@example.com",
      phoneNumber: "+1 234 567 8900",
      address: "452 Industrial Parkway, Suite 10",
      city: "San Francisco",
      notes: "Leave at front desk"
    });
    setErrors({});
  };

  // Validate Required Fields (Requirement 6)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const el = document.getElementById(firstError);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      placeOrder(formData, shippingMethod, paymentMethod);
    }, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-2xl border border-neutral-200">
          <h2 className="text-lg font-bold text-black">Your cart is empty</h2>
          <button
            onClick={() => setActiveView("landing")}
            className="mt-4 px-5 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-neutral-800"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <button
            onClick={() => setActiveView("cart")}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </button>

          <span className="text-xs font-mono text-neutral-400">
            Checkout
          </span>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Fields Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Customer Contact */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <h2 className="text-base font-bold text-black">
                    Shipping Address
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAutofill}
                      className="text-[11px] font-semibold text-neutral-600 hover:text-black underline"
                    >
                      Autofill Demo
                    </button>
                    <span className="text-neutral-300">•</span>
                    <button
                      type="button"
                      onClick={handleClearForm}
                      className="text-[11px] font-semibold text-neutral-400 hover:text-rose-600"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className={`w-full px-3 py-2 rounded-lg text-xs border transition-all ${
                        errors.firstName
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-neutral-300 focus:border-black focus:ring-1 focus:ring-black"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-[10px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className={`w-full px-3 py-2 rounded-lg text-xs border transition-all ${
                        errors.lastName
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-neutral-300 focus:border-black focus:ring-1 focus:ring-black"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-[10px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-3 py-2 rounded-lg text-xs border transition-all ${
                        errors.email
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-neutral-300 focus:border-black focus:ring-1 focus:ring-black"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[10px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-3 py-2 rounded-lg text-xs border transition-all ${
                        errors.phoneNumber
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-neutral-300 focus:border-black focus:ring-1 focus:ring-black"
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-[10px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                      Street Address *
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, suite, or apartment"
                      className={`w-full px-3 py-2 rounded-lg text-xs border transition-all ${
                        errors.address
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-neutral-300 focus:border-black focus:ring-1 focus:ring-black"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-[10px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full px-3 py-2 rounded-lg text-xs border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                      Delivery Note
                    </label>
                    <input
                      name="notes"
                      type="text"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Optional instructions"
                      className="w-full px-3 py-2 rounded-lg text-xs border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3">
                <h3 className="text-sm font-bold text-black pb-2 border-b border-neutral-100">
                  Shipping Method
                </h3>

                <div className="space-y-2">
                  {SHIPPING_METHODS.map((method) => {
                    const isSelected = shippingMethod.id === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setShippingMethod(method)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-black bg-neutral-50"
                            : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-black bg-black" : "border-neutral-300"
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-black block">{method.name}</span>
                            <span className="text-[11px] text-neutral-500">{method.duration}</span>
                          </div>
                        </div>

                        <span className="text-xs font-mono font-bold text-black">
                          {method.cost === 0 ? "Free" : formatPrice(method.cost)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3">
                <h3 className="text-sm font-bold text-black pb-2 border-b border-neutral-100">
                  Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Credit Card", "Apple Pay / Google Pay", "Cash on Delivery"].map((pm) => {
                    const isSelected = paymentMethod === pm;
                    return (
                      <div
                        key={pm}
                        onClick={() => setPaymentMethod(pm)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          isSelected
                            ? "border-black bg-neutral-50 font-bold"
                            : "border-neutral-200 hover:border-neutral-400 text-neutral-600"
                        }`}
                      >
                        <span className="text-xs text-black">{pm}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Order Summary & Place Order */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-5 sticky top-24">
                <h3 className="text-sm font-bold text-black pb-3 border-b border-neutral-200">
                  Order Summary
                </h3>

                {/* Items */}
                <div className="divide-y divide-neutral-200 max-h-56 overflow-y-auto pr-1">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="py-2.5 flex items-center justify-between gap-3 first:pt-0">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-white border border-neutral-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-black truncate max-w-[140px]">
                            {product.name}
                          </h4>
                          <span className="text-[11px] text-neutral-500 font-mono">
                            {quantity} × {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-black">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-black">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="font-mono">
                      {effectiveShippingCost === 0 ? "Free" : formatPrice(effectiveShippingCost)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-neutral-300 flex justify-between items-baseline">
                    <span className="text-sm font-black text-black">Total</span>
                    <span className="text-xl font-black font-mono text-black">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-black text-white font-bold text-xs hover:bg-neutral-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Place Order ({formatPrice(grandTotal)})</span>
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] text-neutral-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-neutral-500" />
                  <span>Encrypted 256-Bit SSL Checkout</span>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
