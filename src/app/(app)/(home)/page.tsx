import type { SearchParams } from "nuqs/server";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ProductListView from "@/modules/products/ui/views/product-list-view";
import { loadProductFilters } from "@/modules/products/search-params";
import { DEFAULT_LIMIT } from "@/contants";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);

  console.log(JSON.stringify(filters), "THis from RSC");

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
};

export default Page;
