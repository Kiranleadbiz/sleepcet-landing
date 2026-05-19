import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ShopifyProduct } from "@/lib/shopify";
import { storefrontApiRequest } from "@/lib/shopify";
import {
  createShopifyCart, addLineToShopifyCart, updateShopifyCartLine,
  removeLineFromShopifyCart, CART_QUERY,
} from "@/lib/cart-api";

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  addItem: (item: Omit<CartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [], cartId: null, checkoutUrl: null,
      isLoading: false, isSyncing: false, isOpen: false,
      setOpen: (v) => set({ isOpen: v }),

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existing = items.find(i => i.variantId === item.variantId);
        set({ isLoading: true });
        try {
          if (!cartId) {
            const r = await createShopifyCart({ ...item, lineId: null });
            if (r) set({ cartId: r.cartId, checkoutUrl: r.checkoutUrl, items: [{ ...item, lineId: r.lineId }] });
          } else if (existing) {
            const newQty = existing.quantity + item.quantity;
            if (!existing.lineId) return;
            const r = await updateShopifyCartLine(cartId, existing.lineId, newQty);
            if (r.success) {
              set({ items: get().items.map(i => i.variantId === item.variantId ? { ...i, quantity: newQty } : i) });
            } else if (r.cartNotFound) clearCart();
          } else {
            const r = await addLineToShopifyCart(cartId, { ...item, lineId: null });
            if (r.success) {
              set({ items: [...get().items, { ...item, lineId: r.lineId ?? null }] });
            } else if (r.cartNotFound) clearCart();
          }
        } finally { set({ isLoading: false }); }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) return get().removeItem(variantId);
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const r = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (r.success) set({ items: get().items.map(i => i.variantId === variantId ? { ...i, quantity } : i) });
          else if (r.cartNotFound) clearCart();
        } finally { set({ isLoading: false }); }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const r = await removeLineFromShopifyCart(cartId, item.lineId);
          if (r.success) {
            const newItems = get().items.filter(i => i.variantId !== variantId);
            newItems.length === 0 ? clearCart() : set({ items: newItems });
          } else if (r.cartNotFound) clearCart();
        } finally { set({ isLoading: false }); }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
        } finally { set({ isSyncing: false }); }
      },
    }),
    {
      name: "shopify-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, cartId: s.cartId, checkoutUrl: s.checkoutUrl }),
    }
  )
);
