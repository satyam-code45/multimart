import type { SearchParams } from "nuqs/server";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ProductListView from "@/modules/products/ui/views/product-list-view";
import { loadProductFilters } from "@/modules/products/search-params";
import { DEFAULT_LIMIT } from "@/contants";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<SearchParams>;
}
export const dynamic = "force-dynamic";

const Page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams);

  console.log(JSON.stringify(filters), "THis from RSC");

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category: subcategory,
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subcategory} />
    </HydrationBoundary>
  );
};

export default Page;
