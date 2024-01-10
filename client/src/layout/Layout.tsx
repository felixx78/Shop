import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useLayoutEffect } from "react";
import AllowCookie from "../components/AllowCookie";
import { ToastContainer } from "react-toastify";
import MobileMenu from "../components/MobileMenu";

function Layout() {
  useLayoutEffect(() => {
    if (localStorage.getItem("color-theme") === "light") {
      document.getElementById("circle")?.classList.add("active");
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-copy dark:text-dark-copy">
      <AllowCookie />
      <ToastContainer hideProgressBar autoClose={1500} />
      <Header />
      <main className="relative z-10 flex-1 pb-[50px] pt-[20px] sm:pb-0 sm:pt-2">
        <div id="circle" className="bg-circle bg-dark-background"></div>
        <Outlet />
      </main>
      <MobileMenu />
    </div>
  );
}
export default Layout;
