import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon as SolidShoppingBagIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();

  return (
    <Link to="/products" className="flex items-center gap-2">
      <span className="hidden sm:inline">Products</span>
      {location.pathname === "/products" ? (
        <SolidShoppingBagIcon className="h-8 w-8 sm:h-6 sm:w-6" />
      ) : (
        <ShoppingBagIcon className="h-8 w-8 sm:h-6 sm:w-6" />
      )}
    </Link>
  );
};

export default Products;
