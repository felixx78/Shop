import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { Product } from "../lib/definition";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="mx-auto max-w-[300px] bg-foreground pt-4 dark:bg-dark-foreground">
      <Link to={`/product/${product.id}`} className="mb-4 block px-4">
        <img src={product.image} className="mb-2 text-center" alt="" />

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

export default ProductCard;
