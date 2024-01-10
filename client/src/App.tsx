import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import MyAccountPage from "./pages/MyAccountPage";
import LogoutPage from "./pages/LogoutPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/logout" element={<LogoutPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/account" element={<MyAccountPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
