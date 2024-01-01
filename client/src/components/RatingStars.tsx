import { StarIcon as EmptyStarIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function RatingStars({ value }: { value: number }) {
  const filledStars = Math.floor(value);

  return (
    <div className="flex">
      {Array.from({ length: filledStars }, (_, i) => i).map((i) => (
        <StarIcon className="h-6 w-6 text-yellow-500" key={i} />
      ))}

      {Array.from({ length: 5 - filledStars }, (_, i) => i).map((i) => (
        <EmptyStarIcon className="h-6 w-6 text-yellow-500" key={i} />
      ))}
    </div>
  );
}
