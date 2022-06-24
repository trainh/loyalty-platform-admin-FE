import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Membership from './pages/Membership';
import Rule from './pages/rule/Rule';
import NewRule from './pages/rule/NewRule';
import Voucher from './pages/voucher/Voucher';
import NewVoucher from './pages/voucher/NewVoucher';
import Condition from './pages/condition/Condition';
import NewCondition from './pages/condition/NewCondition';
import Gift from './pages/gift/Gift';
import NewGift from './pages/gift/NewGift';
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
        { path: 'membership', element: <Membership /> },
        { path: 'condition', element: <Condition /> },
        { path: 'rule', element: <Rule /> },
        { path: 'voucher', element: <Voucher /> },
        { path: 'gift', element: <Gift /> },
      ],
    },
    {
      path: '/condition',
      element: <DashboardLayout />,
      children: [{ path: 'new-condition', element: <NewCondition /> }],
    },
    {
      path: '/rule',
      element: <DashboardLayout />,
      children: [{ path: 'new-rule', element: <NewRule /> }],
    },
    {
      path: '/voucher',
      element: <DashboardLayout />,
      children: [{ path: 'new-voucher', element: <NewVoucher /> }],
    },
    {
      path: '/gift',
      element: <DashboardLayout />,
      children: [{ path: 'new-gift', element: <NewGift /> }],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
