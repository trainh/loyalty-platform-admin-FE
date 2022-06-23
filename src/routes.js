import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import Promotion from './pages/promotion/Promotion';
import NewPromotion from './pages/promotion/NewPromotion';
import Voucher from './pages/voucher/Voucher';
import Condition from './pages/condition/Condition';
import Gift from './pages/gift/Gift';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'promotion', element: <Promotion /> },
        { path: 'voucher', element: <Voucher /> },
        { path: 'condition', element: <Condition /> },
        { path: 'gift', element: <Gift /> },
      ],
    },
    // {
    //   path: '/promotion',
    //   element: <DashboardLayout />,
    //   children: [{ path: 'new-promotion', element: <NewPromotion /> }],
    // },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: 'new-promotion', element: <NewPromotion /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
