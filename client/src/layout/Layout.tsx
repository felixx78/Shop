import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="bg-background dark:bg-dark-background text-copy dark:text-dark-copy min-h-screen">
      <Outlet />
    </div>
  );
}
export default Layout;
