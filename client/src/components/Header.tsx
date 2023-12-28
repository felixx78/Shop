import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../reducer/themeReducer";
import { RootState } from "../lib/definition";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Header() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <header className="flex items-center justify-between bg-primary px-12 py-2 text-dark-copy">
      <Link to="/" className="font-bold">
        Shop
      </Link>
      <div className="flex items-center gap-4">
        {user?.email ? (
          <Link to="/">My account</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <button
          className="h-8 w-8"
          onClick={() => dispatch(themeActions.toggleTheme())}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
export default Header;
