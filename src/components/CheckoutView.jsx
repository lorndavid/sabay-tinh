import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { SHIPPING_METHODS } from "../data/products";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  QrCode,
  Check
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

  // Customer Form Data (Exercise Checkout: 1. First name, 2. Last name, 3. Email, 4. Phone, 5. Address)
  const [formData, setFormData] = useState({
    firstName: "Divyansh",
    lastName: "Agarwal",
    email: "divyansh@sabaytinh.com",
    phoneNumber: "+855 12 345 678",
    address: "St 2004, Sangkat Teuk Thla, Khan Sen Sok",
    city: "Phnom Penh",
    notes: "Please call 10 minutes before arriving."
  });

  const [paymentMethod, setPaymentMethod] = useState("KHQR Bakong"); // KHQR Bakong, Card, COD
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validate Required Fields (Requirement 6)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required (សូមបញ្ចូលនាមខ្លួន)";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required (សូមបញ្ចូលត្រកូល)";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required (សូមបញ្ចូលអ៊ីមែល)";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required (សូមបញ្ចូលលេខទូរស័ព្ទ)";
    } else if (formData.phoneNumber.trim().length < 8) {
      newErrors.phoneNumber = "Please enter a valid phone number (min 8 digits)";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required (សូមបញ្ចូលអាសយដ្ឋាន)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Place Order Button (Requirement 10)
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // scroll to first error
      const firstError = Object.keys(errors)[0];
      const el = document.getElementById(firstError);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      placeOrder(formData, shippingMethod, paymentMethod);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-3xl border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900">No items to checkout</h2>
          <p className="mt-2 text-sm text-neutral-500">Please add items to your cart first.</p>
          <button
            onClick={() => setActiveView("landing")}
            className="mt-6 px-6 py-2.5 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <button
            onClick={() => setActiveView("cart")}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shopping Cart</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <span className="text-neutral-400">Cart</span>
            <span>&gt;</span>
            <span className="font-bold text-neutral-950">Shipping & Payment</span>
            <span>&gt;</span>
            <span className="text-neutral-400">Confirmation</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: Customer Information & Shipping Method & Payment */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* 1. Customer Information Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 mb-2">
                    Exercise 2: Customer Data
                  </div>
                  <h2 className="text-xl font-black text-neutral-950">
                    Shipping Address & Contact Information
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    ព័ត៌មានអតិថិជន និងអាសយដ្ឋានដឹកជញ្ជូន
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Divyansh or Dara"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                        errors.firstName
                          ? "border-rose-400 bg-rose-50/40 focus:ring-1 focus:ring-rose-500"
                          : "border-neutral-300 bg-neutral-50/50 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Agarwal or Sokha"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                        errors.lastName
                          ? "border-rose-400 bg-rose-50/40 focus:ring-1 focus:ring-rose-500"
                          : "border-neutral-300 bg-neutral-50/50 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. you@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                        errors.email
                          ? "border-rose-400 bg-rose-50/40 focus:ring-1 focus:ring-rose-500"
                          : "border-neutral-300 bg-neutral-50/50 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g. +855 12 345 678"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                        errors.phoneNumber
                          ? "border-rose-400 bg-rose-50/40 focus:ring-1 focus:ring-rose-500"
                          : "border-neutral-300 bg-neutral-50/50 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                      Street Address & Building <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street number, Sangkat, Khan..."
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                        errors.address
                          ? "border-rose-400 bg-rose-50/40 focus:ring-1 focus:ring-rose-500"
                          : "border-neutral-300 bg-neutral-50/50 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                      City / Province
                    </label>
                    <input
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Phnom Penh"
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-neutral-300 bg-neutral-50/50 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                      Delivery Note (Optional)
                    </label>
                    <input
                      name="notes"
                      type="text"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Leave with security guard"
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-neutral-300 bg-neutral-50/50 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Method (Requirement 7) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-neutral-950">
                    Shipping Method
                  </h3>
                  <span className="text-xs text-neutral-500 font-medium">
                    ជ្រើសរើសវិធីសាស្ត្រដឹកជញ្ជូន
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SHIPPING_METHODS.map((method) => {
                    const isSelected = shippingMethod.id === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setShippingMethod(method)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? "border-neutral-950 bg-neutral-50 shadow-xs"
                            : "border-neutral-200 hover:border-neutral-400 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-neutral-950 bg-neutral-950" : "border-neutral-300"
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="text-xs font-bold text-neutral-900">
                              {method.name}
                            </span>
                          </div>
                          <span className="text-xs font-bold font-mono text-neutral-950">
                            {method.cost === 0 ? "FREE" : formatPrice(method.cost)}
                          </span>
                        </div>
                        <p className="mt-2 text-[11px] text-neutral-500">
                          {method.duration} • {method.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Payment Method (Featuring KHQR for Cambodian E-Commerce) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-neutral-950 flex items-center gap-2">
                    <span>Payment Method</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                      KHQR Supported
                    </span>
                  </h3>
                  <span className="text-xs text-neutral-500 font-medium">
                    ជ្រើសរើសវិធីទូទាត់ប្រាក់
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "KHQR Bakong", title: "KHQR (Bakong / ABA)", desc: "Instant Scan & Pay", badge: "Instant" },
                    { id: "Credit Card", title: "Visa / Mastercard", desc: "Credit or Debit Card", badge: "Secure" },
                    { id: "Cash on Delivery", title: "Cash on Delivery", desc: "Pay upon arrival", badge: "COD" }
                  ].map((pm) => {
                    const isSelected = paymentMethod === pm.id;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "border-neutral-950 bg-neutral-50 shadow-xs ring-1 ring-neutral-950"
                            : "border-neutral-200 hover:border-neutral-400 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-neutral-900">{pm.title}</span>
                          <span className="text-[10px] font-bold text-neutral-500 bg-white px-1.5 py-0.5 rounded border border-neutral-200">
                            {pm.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500">{pm.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary & Place Order Button (Requirement 8, 9, 10) */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-sm space-y-6 sticky top-24">
                
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <h3 className="text-lg font-black text-neutral-950">
                    Your Order Summary
                  </h3>
                  <span className="text-xs font-mono font-bold text-neutral-500">
                    {cart.length} items
                  </span>
                </div>

                {/* Ordered Items Mini List */}
                <div className="divide-y divide-neutral-200/80 max-h-60 overflow-y-auto pr-1">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="py-3 flex items-center justify-between gap-3 first:pt-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-white border border-neutral-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-neutral-950 truncate max-w-[160px]">
                            {product.name}
                          </h4>
                          <span className="text-[11px] text-neutral-500">
                            Qty: <strong className="text-neutral-900 font-mono">{quantity}</strong> × {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-neutral-950">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation breakdown (Requirement 9) */}
                <div className="pt-4 border-t border-neutral-200 space-y-2.5 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-neutral-950">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping Method</span>
                    <span className="font-mono font-medium">
                      {effectiveShippingCost === 0 ? "FREE" : formatPrice(effectiveShippingCost)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Voucher Discount</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-neutral-300 flex justify-between items-baseline">
                    <div>
                      <span className="text-base font-black text-neutral-950 block">Grand Total</span>
                      <span className="text-[10px] text-neutral-400">Total payable including taxes</span>
                    </div>
                    <span className="text-2xl font-black font-mono text-neutral-950">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Place Order Button (Requirement 10) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-neutral-950 text-white font-black text-sm hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Order...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-neutral-400" />
                      <span>Place Order ({formatPrice(grandTotal)})</span>
                    </>
                  )}
                </button>

                <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" /> 256-Bit SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Instant Order Confirmation</span>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
