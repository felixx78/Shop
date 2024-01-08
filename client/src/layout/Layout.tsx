import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useLayoutEffect } from "react";

function Layout() {
  useLayoutEffect(() => {
    if (localStorage.getItem("color-theme") === "light") {
      document.getElementById("circle")?.classList.add("active");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-copy dark:text-dark-copy">
      <Header />
      <div id="circle" className="bg-circle bg-dark-background"></div>
      <main className="z-1 relative pb-4 pt-2">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
