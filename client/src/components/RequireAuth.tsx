import { useSelector } from "react-redux";
import { RootState } from "../lib/definition";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const user = useSelector((state: RootState) => state.user.user);

  if (user?.email) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
export default RequireAuth;
