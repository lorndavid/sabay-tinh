import React from "react";
import {
  ArrowRight,
  MousePointerClick
} from "lucide-react";

export default function Hero() {
  const scrollToDesk = () => {
    const el = document.getElementById("interactive-desk");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("products-catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full pt-20 pb-16 bg-white text-black border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200 mb-6 uppercase tracking-wider">
            <span>Classic Hardware Collection</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-black leading-tight">
            Workspace Essentials. <br />
            <span className="text-neutral-500 font-normal">Engineered for Focus.</span>
          </h1>

          {/* Clean modern description */}
          <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
            Minimalist design. High-performance computing. Explore our 4 hardware essentials in real-time 3D.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={scrollToDesk}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-all shadow-sm"
            >
              <MousePointerClick className="w-3.5 h-3.5 text-neutral-300" />
              <span>Explore 3D Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={scrollToCatalog}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-neutral-100 text-black font-medium text-xs hover:bg-neutral-200 border border-neutral-200 transition-all"
            >
              <span>View Products</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
