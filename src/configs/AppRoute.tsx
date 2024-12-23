import { Navigate, Outlet, Route, Routes } from 'react-router';
import ContentOnlyLayout from '../layouts/ContentOnlyLayout';
import LoginPage from '../pages/Login';

const GuestOnlyRoute = ({ isLoggedIn = false, redirect = '/' }) => {
  return isLoggedIn ? <Outlet /> : <Navigate replace to={redirect} />;
};

const AppRoute = () => {
  const isLoggedIn = true; // TODO: edit later

  return (
    <Routes>
      <Route element={<GuestOnlyRoute isLoggedIn={isLoggedIn} redirect='/' />}>
        <Route element={<ContentOnlyLayout />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;
