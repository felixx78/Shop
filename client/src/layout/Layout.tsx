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
      <main
        style={{ minHeight: "calc(100vh - 65px)" }}
        className="relative z-10 pb-4 pt-2"
      >
        <div id="circle" className="bg-circle bg-dark-background"></div>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
