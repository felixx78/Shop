import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon as SolidUserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../lib/definition";

const MyAccount = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuth = !!user?.email;
  const location = useLocation();

  const Icon = ({ className }: { className: string }) => {
    if (
      location.pathname === "/account" ||
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
      return <SolidUserCircleIcon className={className} />;
    }

    return <UserCircleIcon className={className} />;
  };

  return (
    <Link
      to="/account"
      className="flex items-center justify-center gap-2 py-0 text-sm"
    >
      <span className="hidden sm:inline">
        {isAuth ? "My account" : "Login"}
      </span>

      <Icon className={`h-8 w-8 ${isAuth ? "" : "sm:hidden"}`} />
    </Link>
  );
};

export default MyAccount;
