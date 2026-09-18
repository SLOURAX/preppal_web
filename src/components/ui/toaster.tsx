"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

export type ToastKind = "success" | "info" | "warning";
export type ToastInput = { title: string; message?: string; kind?: ToastKind; duration?: number };
type Toast = ToastInput & { id: number };
type ToastContextValue = { showToast: (toast: ToastInput) => void; dismissToast: (id: number) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dismissToast = useCallback((id: number) => setToasts((items) => items.filter((item) => item.id !== id)), []);
  const showToast = useCallback((input: ToastInput) => {
    const id = Date.now() + Math.random();
    setToasts((items) => [...items.slice(-2), { ...input, id, kind: input.kind ?? "info" }]);
    if (input.duration !== 0) window.setTimeout(() => dismissToast(id), input.duration ?? 4500);
  }, [dismissToast]);

  return <ToastContext.Provider value={{ showToast, dismissToast }}>{children}<ToastViewport toasts={toasts} onDismiss={dismissToast} /></ToastContext.Provider>;
}

function ToastViewport({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return <div aria-label="Notifications" className="fixed right-4 bottom-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:bottom-6" role="region">
    {toasts.map((toast) => <article className={`surface-card animate-in slide-in-from-right-4 relative overflow-hidden p-4 ${toast.kind === "success" ? "border-success/40" : toast.kind === "warning" ? "border-amber-400/50" : "border-primary/30"}`} key={toast.id} role="status">
      <div className="flex items-start gap-3"><span className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm font-bold ${toast.kind === "success" ? "bg-success/10 text-success" : toast.kind === "warning" ? "bg-amber-500/10 text-amber-600" : "bg-primary/10 text-primary"}`}>{toast.kind === "success" ? "✓" : toast.kind === "warning" ? "!" : "i"}</span><div className="min-w-0 flex-1"><p className="text-sm font-bold">{toast.title}</p>{toast.message && <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{toast.message}</p>}</div><button aria-label="Dismiss notification" className="text-muted-foreground hover:text-foreground text-lg leading-none" onClick={() => onDismiss(toast.id)} type="button">×</button></div>
      <div className={`absolute right-0 bottom-0 left-0 h-0.5 ${toast.kind === "success" ? "bg-success" : toast.kind === "warning" ? "bg-amber-500" : "bg-primary"}`} />
    </article>)}
  </div>;
}
