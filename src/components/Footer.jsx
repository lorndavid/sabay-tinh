import React from "react";
import { useCart } from "../context/CartContext";
import { 
  Sparkles, 
  Database, 
  ShoppingBag, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Heart,
  Mail,
  Phone,
  Globe
} from "lucide-react";

export default function Footer() {
  const { setActiveView, setIsErdModalOpen } = useCart();

  return (
    <footer className="w-full bg-white text-neutral-900 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-neutral-950 text-white font-black text-lg flex items-center justify-center">
                ST
              </div>
              <span className="text-xl font-black tracking-tight text-neutral-950">
                SabayTinh <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-300">សប្បាយទិញ</span>
              </span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              SabayTinh is a classic monochrome, high-performance 3D e-commerce platform built with React.js and Three.js. Showcasing 4 signature workspace hardware essentials with instant Bakong KHQR payments and nationwide Cambodian courier delivery.
            </p>

            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-neutral-800" /> Phnom Penh & Provinces
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-neutral-800" /> Bakong KHQR
              </span>
            </div>
          </div>

          {/* Practical Exercises Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 mb-3">
              Practical Exercises
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button
                  onClick={() => {
                    setActiveView("landing");
                    setTimeout(() => {
                      document.getElementById("products-catalog")?.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Ex 1: 4 Products & Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView("cart")}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Ex 1: Shopping Cart Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView("checkout")}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Ex 2: Checkout Form & Validation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsErdModalOpen(true)}
                  className="hover:text-neutral-950 font-bold text-neutral-900 flex items-center gap-1 transition-colors"
                >
                  <Database className="w-3.5 h-3.5" />
                  Ex 4: Database ERD Schema
                </button>
              </li>
            </ul>
          </div>

          {/* 4 Flagship Hardware */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 mb-3">
              Hardware Products
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>SabayBook Pro Laptop ($650)</li>
              <li>SabayView 4K Ultra Monitor ($120)</li>
              <li>SabayKeys Mechanical Keyboard ($25)</li>
              <li>SabayGrip Precision Mouse ($15)</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>+855 23 888 999</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>support@sabaytinh.com</span>
              </li>
              <li className="pt-1 text-[11px] text-neutral-400">
                Mon - Sun: 8:00 AM - 9:00 PM
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 SabayTinh (សប្បាយទិញ). Classic White & Black Style. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>KHQR E-Commerce Cambodia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
