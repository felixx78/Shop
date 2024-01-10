import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/definition";
import { themeActions } from "../../reducer/themeReducer";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";

const ChangeThemeMode = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <button
      className="flex items-center justify-center gap-2 py-2 text-xl"
      onClick={() => {
        dispatch(themeActions.toggleTheme());
      }}
    >
      {theme === "dark" ? (
        <MoonIcon className="h-8 w-8" />
      ) : (
        <SunIcon className="h-8 w-8" />
      )}
    </button>
  );
};
export default ChangeThemeMode;
