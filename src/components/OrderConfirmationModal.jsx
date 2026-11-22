import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle,
  FileText
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
  const [simulatedPaid, setSimulatedPaid] = useState(false);

  if (!isOrderConfirmedModalOpen || !activeOrder) return null;

  const order = activeOrder;
  const currentStatus = simulatedPaid ? "Paid & Processing" : order.orderStatus; // "Pending" as per PDF

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Dialog Body */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 bg-neutral-950 text-white text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          {/* Message: Order Placed Successfully! (PDF Requirement) */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Practical Exercise 3 • Order Confirmation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            អរគុណសម្រាប់ការបញ្ជាទិញនៅ SabayTinh! ការបញ្ជាទិញរបស់អ្នកត្រូវបានកត់ត្រាដោយជោគជ័យ។
          </p>

          {/* Order ID Pill (PDF Requirement: ORD-0001) */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono">
            <span className="text-neutral-400">Order ID:</span>
            <span className="font-bold text-white text-sm">{order.orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="text-neutral-400 hover:text-white transition-colors"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key metadata grid: Customer Name, Order Date, Status, Total */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-400 font-medium block">Customer Name</span>
              <span className="font-bold text-neutral-950 truncate block mt-0.5">
                {order.customerName}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 font-medium block">Order Date</span>
              <span className="font-bold text-neutral-950 block mt-0.5">
                {order.orderDate}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 font-medium block">Total Amount</span>
              <span className="font-black text-neutral-950 font-mono block mt-0.5 text-sm">
                {formatPrice(order.totalAmount)}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 font-medium block">Order Status</span>
              <span className={`inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded font-bold ${
                simulatedPaid 
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                  : "bg-amber-100 text-amber-800 border border-amber-200"
              }`}>
                <Clock className="w-3 h-3" />
                {currentStatus}
              </span>
            </div>
          </div>

          {/* Progress Tracker Bar */}
          <div className="py-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
              <span className={!simulatedPaid ? "text-amber-700 font-bold" : "text-neutral-400"}>
                1. Order Pending
              </span>
              <span className={simulatedPaid ? "text-emerald-700 font-bold" : "text-neutral-400"}>
                2. Processing
              </span>
              <span className="text-neutral-400">3. Shipped</span>
              <span className="text-neutral-400">4. Delivered</span>
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden flex">
              <div 
                className={`h-full transition-all duration-500 ${simulatedPaid ? "w-1/2 bg-emerald-600" : "w-1/4 bg-amber-500"}`} 
              />
            </div>
          </div>

          {/* Ordered Products Table (PDF Requirement) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Ordered Products (ទំនិញដែលបានបញ្ជាទិញ)
            </h4>
            <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100 text-xs">
              {order.orderedProducts.map(({ product, quantity }) => (
                <div key={product.id} className="p-3.5 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg bg-neutral-50 border border-neutral-200"
                    />
                    <div>
                      <h5 className="font-bold text-neutral-950">{product.name}</h5>
                      <span className="text-neutral-500 text-[11px]">
                        Qty: <strong className="font-mono">{quantity}</strong> × {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-neutral-950">
                    {formatPrice(product.price * quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KHQR Bakong Payment Simulation (Cambodian National QR) */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 font-black text-xs">
                KHQR
              </div>
              <div>
                <h5 className="text-xs font-bold text-rose-950">
                  Bakong KHQR Official Payment
                </h5>
                <p className="text-[11px] text-rose-700">
                  Scan with ABA Mobile, ACLEDA, Canadia, or any Bakong app to pay <strong>{formatPrice(order.totalAmount)}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!simulatedPaid ? (
                <button
                  onClick={() => setSimulatedPaid(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
                >
                  Simulate QR Scan (Pay)
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-xs">
                  <Check className="w-3.5 h-3.5" />
                  Paid via KHQR
                </span>
              )}
            </div>
          </div>

          {/* Customer delivery details summary */}
          <div className="p-3.5 rounded-xl bg-neutral-50 text-[11px] text-neutral-600 flex justify-between">
            <div>
              <span className="font-bold text-neutral-900">Delivery Address:</span> {order.customer.address}, {order.customer.city}
            </div>
            <div>
              <span className="font-bold text-neutral-900">Phone:</span> {order.customer.phoneNumber}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrintReceipt}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-100 transition-colors"
          >
            <Printer className="w-4 h-4 text-neutral-600" />
            <span>Print Official Receipt</span>
          </button>

          <button
            onClick={handleDone}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black bg-neutral-950 text-white hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
