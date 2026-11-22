import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { 
    totalItemCount, 
    activeView, 
    setActiveView 
  } = useCart();

  // Track active tab to match the exact image (HOME, 3D DESK, PRODUCTS, CART, CHECKOUT)
  const [activeTab, setActiveTab] = useState("HOME");

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);

    if (tabKey === "HOME") {
      setActiveView("landing");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tabKey === "3D DESK") {
      setActiveView("landing");
      setTimeout(() => {
        document.getElementById("interactive-desk")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else if (tabKey === "PRODUCTS") {
      setActiveView("landing");
      setTimeout(() => {
        document.getElementById("products-catalog")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else if (tabKey === "CART") {
      setActiveView("cart");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tabKey === "CHECKOUT") {
      setActiveView("checkout");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = [
    { key: "HOME", label: "HOME" },
    { key: "3D DESK", label: "3D DESK" },
    { key: "PRODUCTS", label: "PRODUCTS" },
    { key: "CART", label: `CART (${totalItemCount})` },
    { key: "CHECKOUT", label: "CHECKOUT" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 py-3">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleTabClick("HOME")}
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-black text-xs tracking-tight">
            ST
          </div>
          <span className="text-base font-black tracking-tight text-black">
            SabayTinh
          </span>
        </button>

        {/* Center Pill Capsule Navigation Bar (Exact Replica of User's Image) */}
        <nav aria-label="Main Navigation">
          <div className="inline-flex items-center p-1 rounded-full border border-black bg-white shadow-xs">
            {navItems.map((item) => {
              const isSelected = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleTabClick(item.key)}
                  className={`relative px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 select-none ${
                    isSelected
                      ? "bg-black text-white rounded-full shadow-xs"
                      : "text-black hover:text-neutral-500 rounded-full"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right side cart indicator */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => handleTabClick("CART")}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
              {totalItemCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
