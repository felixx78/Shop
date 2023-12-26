import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../reducer/themeReducer";
import { RootState } from "../lib/definition";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Header() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <header className="bg-primary text-dark-copy flex items-center justify-between px-12 py-2">
      <Link to="/" className="font-bold">
        Anime Shop
      </Link>
      <button
        className="h-8 w-8"
        onClick={() => dispatch(themeActions.toggleTheme())}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
export default Header;
