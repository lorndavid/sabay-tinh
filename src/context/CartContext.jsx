import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { PRODUCTS, SHIPPING_METHODS, PROMO_CODES } from "../data/products";

const CartContext = createContext(null);

const STORAGE_KEY_CART = "sabaytinh_cart_v2";
const STORAGE_KEY_ORDER_COUNTER = "sabaytinh_order_counter";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      { product: PRODUCTS[0], quantity: 1 } // Starter: 1 Laptop $650
    ];
  });

  const [shippingMethod, setShippingMethod] = useState(SHIPPING_METHODS[0]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [activeView, setActiveView] = useState("landing"); // 'landing' | 'cart' | 'checkout'
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isErdModalOpen, setIsErdModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isOrderConfirmedModalOpen, setIsOrderConfirmedModalOpen] = useState(false);

  // Notification toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Pricing calculations in USD
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discountAmount = appliedPromo
    ? appliedPromo.discountPercent
      ? (subtotal * appliedPromo.discountPercent) / 100
      : appliedPromo.discountFixed || 0
    : 0;

  const effectiveShippingCost = appliedPromo?.freeShipping ? 0 : shippingMethod.cost;
  const grandTotal = Math.max(0, subtotal + effectiveShippingCost - discountAmount);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Strictly USD formatting
  const formatPrice = (amountUsd) => {
    return `$${Number(amountUsd).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}"`, "info");
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (codeStr) => {
    const trimmed = codeStr.trim().toUpperCase();
    if (PROMO_CODES[trimmed]) {
      setAppliedPromo(PROMO_CODES[trimmed]);
      setPromoError("");
      showToast(`Code "${trimmed}" applied`);
      return true;
    } else {
      setPromoError("Invalid code. Try SABAY10 or SAVE5");
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
    showToast("Promo code removed", "info");
  };

  // Place order logic (Exercise 3: Order Confirmation)
  const placeOrder = (customerData, selectedShipMethod, paymentMethod = "Credit Card") => {
    let orderNum = 1;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ORDER_COUNTER);
      if (stored) {
        orderNum = parseInt(stored, 10) + 1;
      }
      localStorage.setItem(STORAGE_KEY_ORDER_COUNTER, orderNum.toString());
    } catch {
      orderNum = 1;
    }

    const paddedId = String(orderNum).padStart(4, "0");
    const orderId = `ORD-${paddedId}`;

    const newOrder = {
      orderId,
      customer: customerData,
      customerName: `${customerData.firstName} ${customerData.lastName}`,
      orderDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      orderedProducts: [...cart],
      subtotal,
      shippingMethod: selectedShipMethod,
      shippingFee: selectedShipMethod.cost,
      discountAmount,
      totalAmount: grandTotal,
      orderStatus: "Pending", // Required by Exercise 3 & 4
      paymentMethod
    };

    setActiveOrder(newOrder);
    setCart([]);
    setIsOrderConfirmedModalOpen(true);
    setActiveView("landing");

    try {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        subtotal,
        discountAmount,
        effectiveShippingCost,
        grandTotal,
        shippingMethod,
        setShippingMethod,
        promoCode,
        setPromoCode,
        appliedPromo,
        promoError,
        applyPromo,
        removePromo,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        activeView,
        setActiveView,
        selectedProductForModal,
        setSelectedProductForModal,
        isErdModalOpen,
        setIsErdModalOpen,
        activeOrder,
        setActiveOrder,
        isOrderConfirmedModalOpen,
        setIsOrderConfirmedModalOpen,
        placeOrder,
        formatPrice,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
