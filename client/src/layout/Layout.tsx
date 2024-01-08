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
    <div className="flex min-h-screen flex-col bg-background text-copy dark:text-dark-copy">
      <Header />
      <main className="relative z-10 flex-1 pt-2">
        <div id="circle" className="bg-circle bg-dark-background"></div>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
