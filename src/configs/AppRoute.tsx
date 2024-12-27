import { Navigate, Outlet, Route, Routes } from 'react-router';
import ContentOnlyLayout from '../layouts/ContentOnlyLayout';
import LoginPage from '../pages/Login';
import NavAndSidebarLayout from '../layouts/NavAndSidebarLayout';
import HomePage from '../pages/Home';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import Products from '../pages/Products'

const GuestOnlyRoute = ({ isLoggedIn = false, redirect = '/' }) => {
  return !isLoggedIn ? <Outlet /> : <Navigate replace to={redirect} />;
};

const ProtectedRoute = ({ isLoggedIn = false, redirect = '/login' }) => {
  return isLoggedIn ? <Outlet /> : <Navigate replace to={redirect} />;
};

const AppRoute = () => {
  const user = useSelector((state: IRootState) => state.auth.user);

  return (
    <Routes>
      <Route element={<ProtectedRoute isLoggedIn={!!user} redirect='/login' />}>
        <Route element={<NavAndSidebarLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/products' element={<Products />} />
        </Route>
      </Route>
      <Route element={<GuestOnlyRoute isLoggedIn={!!user} redirect='/' />}>
        <Route element={<ContentOnlyLayout />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;
