import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/product";
import RatingStars from "../components/RatingStars";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/definition";
import { CheckIcon } from "@heroicons/react/24/outline";
import { cartActions } from "../reducer/cartReducer";

function ProductPage() {
  const { id } = useParams();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProductById,
  });

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(
    !!cartItems.find((i) => i.productId === Number(id)),
  );

  const addToCart = () => {
    if (isAdded) return;

    dispatch(cartActions.addItem(Number(id)));
    setIsAdded(true);
  };

  if (isError) {
    return <div className="pt-12 text-center text-2xl">Product not found</div>;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex max-w-[1000px] flex-col items-center gap-8 pb-8 sm:flex-row sm:items-start sm:pt-6">
        {/* image */}
        <div className="h-[300px] w-full max-w-[300px] sm:h-[400px] sm:max-w-[400px]">
          <Skeleton className="h-full w-full" borderRadius={0} />
        </div>

        <div className="w-full sm:w-1/2">
          {/* title */}
          <Skeleton width={200} height={30} className="mb-1" />
          {/* category */}
          <Skeleton width={150} height={20} className="mb-2" />
          <div className="mb-2 flex gap-2">
            {/* stars */}
            <Skeleton width={150} height={20} />
            {/* reviews */}
            <Skeleton width={100} height={20} />
          </div>
          {/* desciption */}
          <Skeleton count={4} height={15} className="w-full" />
          <div className="mb-4"></div>
          {/* button  */}
          <Skeleton height={40} className="w-full" />
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="container mx-auto flex max-w-[1000px] flex-col items-center gap-8 pb-8 sm:flex-row sm:items-start sm:pt-6">
        {!isImageLoaded && (
          <div className="h-[300px] w-full max-w-[300px] sm:h-[400px] sm:max-w-[400px]">
            <Skeleton className="h-full w-full" borderRadius={0} />
          </div>
        )}
        <img
          src={data.image}
          loading="lazy"
          className={`h-[300px] w-full max-w-[300px] bg-white object-contain p-6 sm:h-[400px] sm:max-w-[400px] ${
            isImageLoaded ? "visible" : "invisible absolute"
          }`}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="w-full sm:w-1/2">
          <h1 className="mb-1 text-2xl font-bold">{data.title}</h1>
          <p className="mb-2 text-copy-lighter dark:text-dark-copy-lighter">
            {data.category}
          </p>
          <p className="mb-2 text-lg">{data.price}$</p>
          <div className="mb-2 flex gap-2">
            <RatingStars value={data.rating.rate} />
            <p>{data.rating.count} reviews</p>
          </div>
          <p className="mb-6 text-copy-light dark:text-dark-copy-light">
            {data.description}
          </p>
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
      </div>
    );
  }
}
export default ProductPage;
