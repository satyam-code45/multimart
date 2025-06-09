import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store/user-cart-store";

export const useCart = (tenantslug: string) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);

  const productIds = useCartStore(
    useShallow((state) => state.tenantCarts[tenantslug]?.productIds || [])
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantslug, productId);
      } else {
        addProduct(tenantslug, productId);
      }
    },
    [removeProduct, addProduct, productIds, tenantslug]
  );

  const isProductInCart = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );

  const clearTenantCart = useCallback(() => {
    clearCart(tenantslug);
  }, [tenantslug, clearCart]);

  const handleAddProduct = useCallback(
    (productId: string) => {
      addProduct(tenantslug, productId);
    },
    [addProduct, tenantslug]
  );

  const handleRemoveProduct = useCallback(
    (productId: string) => {
      removeProduct(tenantslug, productId);
    },
    [removeProduct, tenantslug]
  );

  return {
    productIds,
    addProduct: handleAddProduct,
    removeProduct: handleRemoveProduct,
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
