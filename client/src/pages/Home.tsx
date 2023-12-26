import { useDispatch } from "react-redux";
import { themeActions } from "../reducer/themeReducer";

function Home() {
  const dispatch = useDispatch();
  return (
    <div className="ml-12 flex gap-4">
      <button onClick={() => dispatch(themeActions.toggleTheme())}>
        theme
      </button>
    </div>
  );
}
export default Home;
