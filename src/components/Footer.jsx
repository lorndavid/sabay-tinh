import React from "react";
import { useCart } from "../context/CartContext";
import { 
  Database, 
  Truck, 
  CreditCard, 
  Mail, 
  Phone 
} from "lucide-react";

export default function Footer() {
  const { setActiveView, setIsErdModalOpen } = useCart();

  return (
    <footer className="w-full bg-white text-black border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-black text-white font-black text-xs flex items-center justify-center">
                ST
              </div>
              <span className="text-base font-black tracking-tight text-black">
                SabayTinh
              </span>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              Classic monochrome 3D hardware store. Curated workspace essentials built with React and Three.js.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li>
                <button
                  onClick={() => {
                    setActiveView("landing");
                    setTimeout(() => {
                      document.getElementById("interactive-desk")?.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                  className="hover:text-black transition-colors"
                >
                  3D Workspace Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView("landing");
                    setTimeout(() => {
                      document.getElementById("products-catalog")?.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                  className="hover:text-black transition-colors"
                >
                  Products Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView("cart")}
                  className="hover:text-black transition-colors"
                >
                  Shopping Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView("checkout")}
                  className="hover:text-black transition-colors"
                >
                  Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsErdModalOpen(true)}
                  className="hover:text-black transition-colors inline-flex items-center gap-1"
                >
                  <Database className="w-3 h-3" />
                  <span>Database ERD Schema</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
              Products
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li>SabayBook Pro Laptop ($650)</li>
              <li>SabayView 4K Ultra Monitor ($120)</li>
              <li>SabayKeys Mechanical Keyboard ($25)</li>
              <li>SabayGrip Precision Mouse ($15)</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
              Contact
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>support@sabaytinh.com</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="pt-1 text-[11px] text-neutral-400">
                Mon - Fri, 9am - 6pm EST
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div>
            © 2026 SabayTinh. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Privacy</span>
            <span>•</span>
            <span>Terms</span>
            <span>•</span>
            <span>Classic Edition</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
