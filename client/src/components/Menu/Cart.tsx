import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon as SolidShoppingCartIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../lib/definition";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const location = useLocation();

  return (
    <Link
      to="/cart"
      className="relative mt-1 flex items-center justify-center gap-2 py-0 text-sm sm:mt-0"
    >
      {location.pathname === "/cart" ? (
        <SolidShoppingCartIcon className="h-8 w-8" />
      ) : (
        <ShoppingCartIcon className="h-8 w-8" />
      )}
      {cartItems.length !== 0 && (
        <div className="absolute -right-2 -top-2 rounded-full bg-dark-copy px-2 text-sm text-copy sm:bg-secondary sm:text-dark-copy">
          {cartItems.length}
        </div>
      )}
    </Link>
  );
};

export default Cart;
