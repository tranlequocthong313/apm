import { Navigate, Outlet, Route, Routes } from "react-router";
import ContentOnlyLayout from "../layouts/ContentOnlyLayout";
import LoginPage from "../pages/Login";
import NavAndSidebarLayout from "../layouts/NavAndSidebarLayout";
import Dashboard from "../pages/Dashboard";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import HomePage from "../pages/Home";
import SignUpPage from "../pages/SignUp";
import ProductDetail from "../pages/ProductDetail";
import NavAndFooterLayout from "../layouts/NavAndFooterLayout";

const GuestOnlyRoute = ({ isLoggedIn = false, redirect = "/" }) => {
  return !isLoggedIn ? <Outlet /> : <Navigate replace to={redirect} />;
};

const ProtectedRoute = ({ isLoggedIn = false, redirect = "/login" }) => {
  return isLoggedIn ? <Outlet /> : <Navigate replace to={redirect} />;
};

const AdminRoute = ({ isAdmin = false, redirect = "/login" }) => {
  return isAdmin ? <Outlet /> : <Navigate replace to={redirect} />;
};

const AppRoute = () => {
  const user = useSelector((state: IRootState) => state.auth.user);

  const isAdmin = () => {
    return user?.role === "ADMIN";
  };

  return (
    <Routes>
      <Route element={<NavAndFooterLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:urlName" element={<ProductDetail />} />
      </Route>

      <Route element={<ProtectedRoute isLoggedIn={!!user} redirect="/" />}>
        <Route element={<AdminRoute isAdmin={isAdmin()} redirect="/" />}>
          <Route path="/admin" element={<NavAndSidebarLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Route>
      </Route>

      <Route element={<GuestOnlyRoute isLoggedIn={!!user} redirect="/" />}>
        <Route element={<ContentOnlyLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;
