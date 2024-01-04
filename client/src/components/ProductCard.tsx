import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { Product, RootState } from "../lib/definition";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../reducer/cartReducer";
import { CheckIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }: { product: Product }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(
    !!cartItems.find((i) => i.productId === product.id),
  );

  const addToCart = () => {
    if (isAdded) return;

    dispatch(cartActions.addItem(product.id));
    setIsAdded(true);
  };

  return (
    <div className="mx-auto w-[290px] bg-foreground pt-4 dark:bg-dark-foreground">
      <Link to={`/product/${product.id}`} className="mb-4 block px-4">
        {!isImageLoaded && <Skeleton height={350} className="mb-2 w-full" />}

        <img
          src={product.image}
          className={`mb-2 text-center ${
            isImageLoaded ? "visible" : "invisible absolute h-0 w-0"
          }`}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />

        <p className="mb-2 truncate text-lg font-bold" title={product.title}>
          {product.title}
        </p>

        <div className="flex items-center justify-between">
          <p>{product.price}$</p>
          <RatingStars value={product.rating.rate} />
        </div>
      </Link>

      <button
        onClick={addToCart}
        className={`flex w-full items-center justify-center gap-2 py-2 text-lg text-dark-copy ${
          isAdded
            ? "cursor-default bg-success"
            : "bg-primary hover:bg-primary-dark"
        }`}
      >
        {isAdded ? (
          <>
            <span>Added</span>
            <CheckIcon className="h-6 w-6" />
          </>
        ) : (
          "Add to cart"
        )}
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
