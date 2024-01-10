import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../lib/definition";

const MyAccount = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuth = !!user?.email;

  return (
    <Link
      to="/account"
      className="flex items-center justify-center gap-2 py-0 text-sm"
    >
      <span className="hidden sm:inline">
        {isAuth ? "My account" : "Login"}
      </span>

      <UserCircleIcon className={`h-8 w-8 ${isAuth ? "" : "sm:hidden"}`} />
    </Link>
  );
};

export default MyAccount;
