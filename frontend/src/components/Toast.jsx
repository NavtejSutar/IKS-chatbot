import React from "react";
import { Info, CheckCircle2, AlertCircle } from "lucide-react";

export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        const isError = toast.type === "error";
        const isSuccess = toast.type === "success";
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl border shadow-xl flex items-center gap-2.5 text-xs font-medium backdrop-blur-md animate-slideInRight ${
              isError
                ? "bg-rose-950/90 text-rose-200 border-rose-500/40"
                : isSuccess
                ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/40"
                : "bg-[#1a2234]/95 text-slate-100 border-amber-500/30"
            }`}
          >
            {isError ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
