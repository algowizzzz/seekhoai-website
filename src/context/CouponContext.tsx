"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface CouponState {
  applied: boolean;
  code: string | null;
  discountPct: number; // 0..1
  apply: (code: string, discountPct: number) => void;
  clear: () => void;
}

const STORAGE_KEY = "seekhoai_coupon";

const CouponCtx = createContext<CouponState | null>(null);

export function CouponProvider({ children }: { children: ReactNode }) {
  const [applied, setApplied] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [discountPct, setDiscountPct] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { code: string; discountPct: number };
        if (parsed.code && typeof parsed.discountPct === "number") {
          setApplied(true);
          setCode(parsed.code);
          setDiscountPct(parsed.discountPct);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const apply = useCallback((newCode: string, newDiscountPct: number) => {
    setApplied(true);
    setCode(newCode);
    setDiscountPct(newDiscountPct);
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ code: newCode, discountPct: newDiscountPct }),
      );
    } catch {
      /* ignore */
    }
  }, []);

  const clear = useCallback(() => {
    setApplied(false);
    setCode(null);
    setDiscountPct(0);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ applied, code, discountPct, apply, clear }),
    [applied, code, discountPct, apply, clear],
  );

  return <CouponCtx.Provider value={value}>{children}</CouponCtx.Provider>;
}

export function useCoupon() {
  const ctx = useContext(CouponCtx);
  if (!ctx) throw new Error("useCoupon must be used within CouponProvider");
  return ctx;
}

/**
 * Apply the (possibly-active) coupon to the base price and return both raw
 * and formatted strings. Currency is PKR — the 4999 → 999 sale price IS the
 * discount; the coupon path is a no-op (kept for back-compat with consumers).
 */
export function priceWithCoupon(basePrice: number, discountPct: number) {
  const final = Math.max(0, Math.round(basePrice * (1 - discountPct)));
  return {
    final,
    formatted: `${final.toLocaleString("en-PK")} PKR`,
  };
}
