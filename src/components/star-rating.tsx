import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const MAX_RATING = 5;
const MIN_RATING = 0;

interface StarRatingProps {
  rating: number;
  classname?: string;
  iconClassName?: string;
  text?: string;
}

const StarRating = ({
  rating,
  classname,
  iconClassName,
  text,
}: StarRatingProps) => {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING));
  return (
    <div className={cn("flex items-center gap-x-1", classname)}>
      {Array.from({ length: MAX_RATING }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "size-4",
            index < safeRating ? "fill-amber-400" : "",
            iconClassName
          )}
        />
      ))}
      {text && <p>{text}</p>}
    </div>
  );
};

export default StarRating;
