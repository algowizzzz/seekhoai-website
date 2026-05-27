"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CheckoutMode = "paid" | "free";

interface CheckoutState {
  isOpen: boolean;
  mode: CheckoutMode;
  open: (mode?: CheckoutMode) => void;
  close: () => void;
}

const CheckoutCtx = createContext<CheckoutState | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CheckoutMode>("paid");
  const open = useCallback((m: CheckoutMode = "paid") => {
    setMode(m);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ isOpen, mode, open, close }),
    [isOpen, mode, open, close],
  );
  return <CheckoutCtx.Provider value={value}>{children}</CheckoutCtx.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutCtx);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
