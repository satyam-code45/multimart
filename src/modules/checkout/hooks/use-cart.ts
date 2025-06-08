import { useCartStore } from "../store/user-cart-store";

export const useCart = (tenantslug: string) => {
  const {
    getCartByTenant,
    addProduct,
    removeProduct,
    clearCart,
    clearAllCarts,
  } = useCartStore();

  const productIds = getCartByTenant(tenantslug);

  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(tenantslug, productId);
    } else {
      addProduct(tenantslug, productId);
    }
  };

  const isProductInCart = (productId: string) => {
    return productIds.includes(productId);
  };

  const clearTenantCart = () => {
    clearCart(tenantslug);
  };

  return {
    productIds,
    addProduct: (productId: string) => addProduct(tenantslug, productId),
    removeProduct: (productId: string) => removeProduct(tenantslug, productId),
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
