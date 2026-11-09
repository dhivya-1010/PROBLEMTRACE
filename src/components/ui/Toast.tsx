"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform translate-y-0 opacity-100 ${
              toast.type === "success"
                ? "bg-slate-900 text-white border-slate-800"
                : toast.type === "error"
                ? "bg-red-900 text-white border-red-800"
                : "bg-teal-900 text-white border-teal-800"
            }`}
          >
            {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === "info" && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 p-1 hover:bg-white/20 rounded-md text-white/70 hover:text-white transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (msg: string) => {
        if (typeof window !== "undefined") {
          console.log("[Toast]", msg);
        }
      }
    };
  }
  return context;
}

