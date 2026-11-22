import React from "react";
import { useCart } from "../context/CartContext";
import { 
  ShoppingBag, 
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const {
    totalItemCount,
    grandTotal,
    setIsCartDrawerOpen,
    activeView,
    setActiveView,
    formatPrice
  } = useCart();

  const handleNavClick = (view, anchorId = null) => {
    setActiveView(view);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand Name */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => handleNavClick("landing")}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-black text-sm tracking-tight">
                ST
              </div>
              <span className="text-lg font-black tracking-tight text-black">
                SabayTinh
              </span>
            </button>

            {/* Clean Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-600">
              <button
                onClick={() => handleNavClick("landing", "interactive-desk")}
                className="hover:text-black transition-colors"
              >
                3D Desk
              </button>

              <button
                onClick={() => handleNavClick("landing", "products-catalog")}
                className="hover:text-black transition-colors"
              >
                Products
              </button>
            </nav>
          </div>

          {/* Right Controls: Cart & Checkout */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all text-xs font-bold"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart</span>

              <span className="flex items-center justify-center min-w-[18px] h-4 px-1 rounded-full bg-white text-black text-[10px] font-black">
                {totalItemCount}
              </span>

              <span className="hidden sm:inline font-mono font-medium pl-1 border-l border-neutral-700 text-neutral-300">
                {formatPrice(grandTotal)}
              </span>
            </button>

            {totalItemCount > 0 && (
              <button
                onClick={() => setActiveView("checkout")}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${activeView === "checkout"
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-black border-neutral-300 hover:bg-neutral-50"
                  }`}
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
