import React from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  MousePointerClick,
  Monitor,
  Laptop,
  Keyboard,
  Mouse
} from "lucide-react";

export default function Hero() {
  const { setActiveView, setIsCartDrawerOpen, formatPrice } = useCart();

  const scrollToDesk = () => {
    const el = document.getElementById("interactive-desk");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("products-catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full pt-16 pb-12 bg-white text-neutral-950 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Pill */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-300 shadow-xs mb-6">
            <span className="flex h-2 w-2 rounded-full bg-neutral-900 animate-pulse" />
            <span>Classic Monochrome Edition • Built with React & Three.js</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-neutral-950 leading-[1.08]">
            Next-Gen Workspace Essentials. <br className="hidden sm:inline" />
            <span className="underline decoration-neutral-300 underline-offset-8">
              Crafted for Flow.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
            Welcome to <strong>SabayTinh (សប្បាយទិញ)</strong>. Immerse yourself in an interactive 3D computer setup featuring the 4 flagship hardware essentials: Laptop ($650), Monitor ($120), Keyboard ($25), and Mouse ($15).
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={scrollToDesk}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-neutral-950 text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md group"
            >
              <MousePointerClick className="w-4 h-4 text-neutral-300 group-hover:scale-110 transition-transform" />
              <span>Launch 3D Desk Simulator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToCatalog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-100 text-neutral-900 font-semibold text-sm hover:bg-neutral-200 border border-neutral-300 transition-all"
            >
              <span>Explore All 4 Products</span>
            </button>
          </div>

          {/* Hardware Quick Summary Bar */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3">
            {PRODUCTS.map((prod) => {
              const Icon = prod.id === "prod-laptop" ? Laptop : prod.id === "prod-monitor" ? Monitor : prod.id === "prod-keyboard" ? Keyboard : Mouse;
              return (
                <div
                  key={prod.id}
                  onClick={scrollToDesk}
                  className="group p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition-all text-left cursor-pointer hover:border-neutral-400"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      {formatPrice(prod.price)}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 truncate">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {prod.khmerName}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Trust Guarantees */}
          <div className="mt-10 pt-6 border-t border-neutral-200/80 w-full flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-neutral-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-900" />
              <span>Fast Nationwide Courier (Phnom Penh & Provinces)</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-neutral-900" />
              <span>Instant Bakong KHQR QR-Code Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-900" />
              <span>1-Year Official Warranty & In-store Support</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
