import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../reducer/themeReducer";
import { RootState } from "../lib/definition";
import {
  Bars3Icon,
  MoonIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const items = [
  {
    title: "Products",
    icon: <ShoppingBagIcon />,
    link: "/products",
  },
];

function Header() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [isOpen, setIsOpen] = useState(false);

  const MyAccount = () => {
    return user?.email ? (
      <Link
        to="/"
        onClick={toggleMenu}
        className="flex items-center justify-center gap-4 py-2 text-xl sm:gap-2 sm:py-0 sm:text-sm"
      >
        My account <UserCircleIcon className="h-8 w-8" />
      </Link>
    ) : (
      <Link to="/login">Login</Link>
    );
  };

  const ChangeThemeMode = () => {
    return (
      <button
        className="flex w-full items-center justify-center gap-2 py-2 text-xl sm:w-min"
        onClick={() => {
          dispatch(themeActions.toggleTheme());
          toggleMenu();
        }}
      >
        <span className="sm:hidden">{theme === "dark" ? "Dark" : "Light"}</span>
        {theme === "dark" ? (
          <MoonIcon className="h-8 w-8" />
        ) : (
          <SunIcon className="h-8 w-8" />
        )}
      </button>
    );
  };

  const Cart = () => {
    return (
      <Link
        to="/cart"
        onClick={toggleMenu}
        className="relative flex items-center justify-center gap-4 py-2 text-xl sm:gap-2 sm:py-0 sm:text-sm"
      >
        <span className="sm:hidden">Cart</span>{" "}
        <ShoppingCartIcon className="h-8 w-8" />
        {cartItems.length !== 0 && (
          <div className="absolute -right-2 -top-2 hidden rounded-full bg-secondary px-1 text-sm text-dark-copy sm:block">
            {cartItems.length}
          </div>
        )}
      </Link>
    );
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.getElementById("root")!.classList.toggle("lock");
  };

  useEffect(() => {
    return document.getElementById("root")!.classList.remove("lock");
  }, []);

  return (
    <header className="flex items-center justify-between bg-primary px-6 py-2 font-bold text-dark-copy sm:px-12">
      <Link to="/">Shop</Link>

      <button className="relative z-50 sm:hidden" onClick={toggleMenu}>
        <Bars3Icon className="h-8 w-8" />
      </button>
      {/* mobile */}
      <div
        className={`${
          isOpen ? "top-0" : "invisible -top-full"
        } fixed left-0 z-40 block h-full w-full bg-secondary pt-16 transition-all duration-500 sm:hidden`}
      >
        <Cart />

        {items.map((item) => (
          <Link
            to={item.link}
            onClick={toggleMenu}
            key={item.title}
            className="flex items-center justify-center gap-4 py-2 text-xl"
          >
            {item.title}
            <div className="h-8 w-8"> {item.icon}</div>
          </Link>
        ))}

        <MyAccount />
        <ChangeThemeMode />
      </div>

      <div className="hidden items-center gap-4 text-sm sm:flex">
        <Cart />

        {items.map((item) => (
          <Link
            to={item.link}
            key={item.title}
            className="flex items-center gap-2"
          >
            {item.title}
            <div className="h-6 w-6">{item.icon}</div>
          </Link>
        ))}

        <MyAccount />
        <ChangeThemeMode />
      </div>
    </header>
  );
}
export default Header;
