import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  Copy, 
  Check, 
  Clock 
} from "lucide-react";

export default function OrderConfirmationModal() {
  const { 
    activeOrder, 
    isOrderConfirmedModalOpen, 
    setIsOrderConfirmedModalOpen, 
    setActiveView,
    formatPrice 
  } = useCart();

  const [copied, setCopied] = useState(false);

  if (!isOrderConfirmedModalOpen || !activeOrder) return null;

  const order = activeOrder;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDone = () => {
    setIsOrderConfirmedModalOpen(false);
    setActiveView("landing");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6 animate-in zoom-in-95 duration-150">
        
        {/* Banner */}
        <div className="p-6 bg-black text-white text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-2 text-white">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Thank you for shopping at SabayTinh. Your order has been registered.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono">
            <span className="text-neutral-400">Order ID:</span>
            <span className="font-bold text-white">{order.orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="text-neutral-400 hover:text-white transition-colors"
              title="Copy"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">Customer</span>
              <span className="font-bold text-black truncate block mt-0.5">
                {order.customerName}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">Date</span>
              <span className="font-bold text-black block mt-0.5">
                {order.orderDate}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">Total</span>
              <span className="font-black text-black font-mono block mt-0.5">
                {formatPrice(order.totalAmount)}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">Status</span>
              <span className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded font-bold bg-neutral-200 text-black text-[11px]">
                <Clock className="w-3 h-3" />
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Ordered Products
            </h4>
            <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
              {order.orderedProducts.map(({ product, quantity }) => (
                <div key={product.id} className="p-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-9 h-9 object-cover rounded-lg bg-neutral-50 border border-neutral-200"
                    />
                    <div>
                      <h5 className="font-bold text-black">{product.name}</h5>
                      <span className="text-neutral-500 text-[11px]">
                        Qty: {quantity} × {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-black">
                    {formatPrice(product.price * quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 text-[11px] text-neutral-600 flex justify-between">
            <div>
              <span className="font-bold text-black">Address:</span> {order.customer.address}, {order.customer.city}
            </div>
            <div>
              <span className="font-bold text-black">Phone:</span> {order.customer.phoneNumber}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrintReceipt}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-black border border-neutral-300 hover:bg-neutral-100 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={handleDone}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
