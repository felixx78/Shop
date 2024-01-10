import { Link } from "react-router-dom";
import MyAccount from "./Menu/MyAccount";
import ChangeThemeMode from "./Menu/ChangeThemeMode";
import Cart from "./Menu/Cart";
import Products from "./Menu/Products";

function Header() {
  return (
    <header className="relative z-20 hidden h-[65px] items-center justify-between bg-primary px-12 py-2 font-bold text-dark-copy sm:flex">
      <Link to="/">Shop</Link>

      <div className="flex items-center gap-4 text-sm">
        <Cart />
        <Products />
        <MyAccount />
        <ChangeThemeMode />
      </div>
    </header>
  );
}
export default Header;
