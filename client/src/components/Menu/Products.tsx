import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <Link to="/products" className="flex items-center gap-2">
      <span className="hidden sm:inline">Products</span>
      <ShoppingBagIcon className="h-8 w-8 sm:h-6 sm:w-6" />
    </Link>
  );
};

export default Products;
