import { HomeIcon } from "@heroicons/react/24/outline";
import { HomeIcon as SolidHomeIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import Products from "./Menu/Products";
import MyAccount from "./Menu/MyAccount";
import ChangeThemeMode from "./Menu/ChangeThemeMode";
import Cart from "./Menu/Cart";

function MobileMenu() {
  return (
    <div className="fixed bottom-0 z-10 flex h-[55px] w-full items-center justify-center gap-8 bg-secondary px-4 text-dark-copy sm:hidden">
      <Home />
      <Cart />
      <Products />
      <MyAccount />
      <ChangeThemeMode />
    </div>
  );
}
const Home = () => {
  const location = useLocation();

  return (
    <Link to="/">
      {location.pathname === "/" ? (
        <SolidHomeIcon className="h-8 w-8" />
      ) : (
        <HomeIcon className="h-8 w-8" />
      )}
    </Link>
  );
};
export default MobileMenu;
