import { Link } from "react-router-dom";
import { Product } from "../lib/definition";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="mx-auto w-[290px]">
      <Link to={`/product/${product.id}`} className="block">
        {!isImageLoaded && (
          <Skeleton height={280} className="w-full" borderRadius={0} />
        )}

        <img
          src={product.image}
          className={`mx-auto h-[280px] w-full bg-white object-contain p-8 text-center ${
            isImageLoaded ? "visible" : "invisible absolute h-0 w-0"
          }`}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />

        <div className="w-full bg-foreground p-2 dark:bg-dark-foreground">
          <p className="">{product.price}$</p>
          <p className="truncate text-lg" title={product.title}>
            {product.title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="mx-auto w-[290px]">
      {/* image */}
      <Skeleton height={280} className="w-full bg-white" borderRadius={0} />

      <div className="w-full bg-foreground p-2 dark:bg-dark-foreground">
        {/* price */}
        <Skeleton width={60} height={15} />
        {/* title */}
        <Skeleton width={170} height={18} />
      </div>
    </div>
  );
};

export default ProductCard;
