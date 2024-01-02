import { StarIcon as EmptyStarIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function RatingStars({ value }: { value: number }) {
  const filledStars = Math.floor(value);
  const remainder = value - filledStars;

  return (
    <div className="flex">
      {Array.from({ length: filledStars }, (_, i) => i).map((i) => (
        <StarIcon className="h-6 w-6 text-yellow-500" key={i} />
      ))}

      {remainder !== 0 && (
        <div className="relative h-6 w-6">
          <div
            style={{
              width: `${remainder * 100}%`,
            }}
            className="absolute h-6 overflow-hidden"
          >
            <StarIcon className="h-6 w-6 text-yellow-500" />
          </div>

          <EmptyStarIcon className="h-6 w-6 text-yellow-500" />
        </div>
      )}

      {Array.from(
        { length: 5 - filledStars - (remainder !== 0 ? 1 : 0) },
        (_, i) => i,
      ).map((i) => (
        <EmptyStarIcon className="h-6 w-6 text-yellow-500" key={i} />
      ))}
    </div>
  );
}
