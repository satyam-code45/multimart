import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  authorUserName: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

const ProductCard = ({
  authorUserName,
  id,
  name,
  price,
  reviewCount,
  reviewRating,
  authorImageUrl,
  imageUrl,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl || "/background.png"}
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          {/* redirect to user shop */}
          <div className="flex items-center gap-2" onClick={() => {}}>
            {authorImageUrl && (
              <Image
                alt={authorUserName}
                src={authorImageUrl}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{authorUserName}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-amber-400" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-2 py-1 border bg-pink-500 w-fit">
            <p className="text-sm font-medium">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
              }).format(Number(price))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;


export const ProductCardSkeleton = () => {
    return(
        <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse">

        </div>
    )
}