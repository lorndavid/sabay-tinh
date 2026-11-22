import React from "react";
import { CartProvider, useCart } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ThreeDeskScene from "./components/ThreeDeskScene";
import ProductCatalog from "./components/ProductCatalog";
import SpecsComparison from "./components/SpecsComparison";
import CartView from "./components/CartView";
import CheckoutView from "./components/CheckoutView";
import CartDrawer from "./components/CartDrawer";
import ProductDetailModal from "./components/ProductDetailModal";
import OrderConfirmationModal from "./components/OrderConfirmationModal";
import DatabaseERDModal from "./components/DatabaseERDModal";
import ToastNotification from "./components/ToastNotification";
import Footer from "./components/Footer";

function MainContent() {
  const { activeView } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <Navbar />

      <main className="flex-1">
        {activeView === "landing" && (
          <>
            <Hero />
            <ThreeDeskScene />
            <ProductCatalog />
            <SpecsComparison />
          </>
        )}

        {activeView === "cart" && <CartView />}

        {activeView === "checkout" && <CheckoutView />}
      </main>

      <Footer />

      {/* Global Modals & Slide-overs */}
      <CartDrawer />
      <ProductDetailModal />
      <OrderConfirmationModal />
      <DatabaseERDModal />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
