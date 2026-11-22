import React from "react";
import { useCart } from "../context/CartContext";
import { 
  ShoppingBag, 
  Layers, 
  Database, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  CreditCard,
  Laptop,
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const { 
    totalItemCount, 
    grandTotal, 
    setIsCartDrawerOpen, 
    activeView, 
    setActiveView, 
    setIsErdModalOpen,
    currency,
    setCurrency,
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
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => handleNavClick("landing")}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center text-white font-black text-lg tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                ST
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-neutral-950 flex items-center gap-1">
                  SabayTinh
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-300">
                    សប្បាយទិញ
                  </span>
                </span>
                <span className="block text-[10px] text-neutral-500 font-medium tracking-wider uppercase">
                  Classic 3D Hardware Store
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <button
                onClick={() => handleNavClick("landing", "interactive-desk")}
                className="text-neutral-600 hover:text-neutral-950 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                3D Desk
              </button>

              <button
                onClick={() => handleNavClick("landing", "products-catalog")}
                className="text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                Products (4 Items)
              </button>

              <button
                onClick={() => handleNavClick("landing", "specs-section")}
                className="text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                Specifications
              </button>

              {/* Database ERD Link for Exercise 4 */}
              <button
                onClick={() => setIsErdModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-300 transition-colors"
                title="View E-Commerce Order Database ERD (Exercise 4)"
              >
                <Database className="w-3.5 h-3.5 text-neutral-800" />
                Database ERD
              </button>
            </nav>
          </div>

          {/* Right Controls: Currency Switcher, Cart Button, Checkout shortcut */}
          <div className="flex items-center gap-3">
            
            {/* Currency Selector */}
            <div className="flex items-center rounded-lg bg-neutral-100 p-0.5 border border-neutral-200 text-xs font-semibold">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2 py-1 rounded-md transition-all ${
                  currency === "USD"
                    ? "bg-white text-neutral-950 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("KHR")}
                className={`px-2 py-1 rounded-md transition-all ${
                  currency === "KHR"
                    ? "bg-white text-neutral-950 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                KHR (៛)
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 transition-all shadow-xs"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              
              {/* Badge with item count */}
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white text-neutral-950 text-[11px] font-black">
                {totalItemCount}
              </span>

              <span className="hidden md:inline text-xs font-mono font-medium pl-1 border-l border-neutral-700 text-neutral-300">
                {formatPrice(grandTotal)}
              </span>
            </button>

            {/* Direct Checkout Button if items exist */}
            {totalItemCount > 0 && (
              <button
                onClick={() => setActiveView("checkout")}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeView === "checkout"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-neutral-900 border-neutral-300 hover:bg-neutral-50"
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
