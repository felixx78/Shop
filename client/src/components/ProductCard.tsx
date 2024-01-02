import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { Product } from "../lib/definition";
import Skeleton from "react-loading-skeleton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="mx-auto w-[290px] bg-foreground pt-4 dark:bg-dark-foreground">
      <Link to={`/product/${product.id}`} className="mb-4 block px-4">
        <img
          src={product.image}
          className="mb-2 min-h-[200px] text-center"
          alt=""
        />

        <p className="mb-2 truncate text-lg font-bold" title={product.title}>
          {product.title}
        </p>

        <div className="flex items-center justify-between">
          <p>{product.price}$</p>
          <RatingStars value={product.rating.rate} />
        </div>
      </Link>

      <button className="block w-full bg-primary py-2 text-lg text-dark-copy hover:bg-primary-dark">
        Add to cart
      </button>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="mx-auto mb-4 w-[290px] bg-foreground pt-4 dark:bg-dark-foreground">
      <div className="mb-4 px-4">
        {/* image */}
        <Skeleton height={350} className="mb-2 w-full" />

        {/* title */}
        <Skeleton width={140} height={25} className="mb-2" />

        {/* price and stars */}
        <div className="flex items-center justify-between">
          <Skeleton width={80} height={20} />
          <Skeleton width={100} height={20} />
        </div>
      </div>

      {/* button  */}
      <Skeleton height={40} className="w-full" />
    </div>
  );
};

export default ProductCard;
