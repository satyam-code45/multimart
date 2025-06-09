import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CheckoutItemProps {
  isLast?: boolean;
  imageUrl?: string | null;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  name: string;
  onRemove: () => void;
}

const CheckoutItem = ({
  onRemove,
  price,
  productUrl,
  tenantName,
  tenantUrl,
  imageUrl,
  isLast,
  name,
}: CheckoutItemProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 border-b-2 border-gray-600 pr-4",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r-2 border-gray-600">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/background.png"}
            alt={name}
            fill
            className="object-cover p-1 rounded-lg"
          />
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <div>
          <Link href={productUrl}>
            <h4 className="font-bold underline">{name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-medium underline">{tenantName}</p>
          </Link>
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium">{formatCurrency(price)}</p>
        <button className="underline font-medium cursor-pointer" onClick={onRemove} type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
