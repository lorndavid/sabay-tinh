import React from "react";
import { useCart } from "../context/CartContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastNotification() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-950 text-white shadow-2xl border border-neutral-800 text-xs font-semibold">
        {toast.type === "success" && (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        )}
        {toast.type === "error" && (
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
        )}
        {toast.type === "info" && (
          <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
