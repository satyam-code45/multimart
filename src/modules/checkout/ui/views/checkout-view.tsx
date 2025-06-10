"use client";

import { useTRPC } from "@/trpc/client";
import { useCart } from "../../hooks/use-cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generateTenantURL } from "@/lib/utils";
import CheckoutItem from "../components/checkout-items";
import CheckoutSidebar from "../components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { useRouter } from "next/navigation";

interface Props {
  tenantSlug: string;
}

const CheckoutView = ({ tenantSlug }: Props) => {
  const router = useRouter();
  const [states, setstates] = useCheckoutStates();

  const { productIds, clearCart, removeProduct } = useCart(tenantSlug);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );

  const purchase = useMutation(
    trpc.checkout.purcase.mutationOptions({
      onMutate: () => {
        setstates({ success: false, cancel: false });
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in");
        }

        toast.error(error.message);
      },
      onSuccess: (data) => {
        window.location.href = data.url;
      },
    })
  );

  useEffect(() => {
    if (states.success) {
      setstates({ success: false, cancel: false });
      clearCart();
      queryClient.invalidateQueries(trpc.library.getMany.infiniteQueryFilter());
      router.push("/library");
    }
  }, [
    states.success,
    clearCart,
    router,
    setstates,
    queryClient,
    trpc.library.getMany,
  ]);

  //if tenant deletes the product but it is still in user cart it will remove it

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Invalid Products Found, Cart Cleared!");
    }
  }, [error, clearCart]);

  if (isLoading) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
          <LoaderIcon className="text-muted-foreground animate-spin" />
          <p className="text-base font-medium"></p>
        </div>
      </div>
    );
  }

  if (data?.totalDocs === 0) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
          <InboxIcon />
          <p className="text-base font-medium">No Products Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantURL(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
            isCanceled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
