import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/contants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

interface TagsFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

const TagsFilter = ({ onChange, value }: TagsFilterProps) => {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  const onCLick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value?.filter((t) => t !== tag) || []);
    } else {
      onChange([...(value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2Icon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onCLick(tag.name)}
            >
              <p className="font-medium">{tag.name}</p>
              <Checkbox 
                checked={value?.includes(tag.name)} 
                onCheckedChange={() => onCLick(tag.name)} 
               />
            </div>
          ))
        )
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="underline font-medium justify-start text-start disabled:opacity-50 cursor-pointer"
        >
          Load More...
        </button>
      )}
    </div>
  );
};

export default TagsFilter;
