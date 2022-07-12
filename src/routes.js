import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Membership from './pages/Membership';
import Rule from './pages/rule/Rule';
import NewRule from './pages/rule/NewRule';
import Voucher from './pages/voucher/Voucher';
import Tier from './pages/tier/Tier';
import NewTier from './pages/tier/NewTier';
import NewVoucher from './pages/voucher/NewVoucher';
import Condition from './pages/condition/Condition';
import Action from './pages/action/Action';
import NewCondition from './pages/condition/NewCondition';
import Reward from './pages/reward/Reward';
import NewReward from './pages/reward/NewReward';
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
        { path: 'reward', element: <Reward /> },
        { path: 'tier', element: <Tier /> },
        { path: 'action', element: <Action /> },
      ],
    },
    {
      path: '/action',
      element: <DashboardLayout />,
      children: [{ path: 'new-condition', element: <NewCondition /> }],
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
      path: '/reward',
      element: <DashboardLayout />,
      children: [{ path: 'new-reward', element: <NewReward /> }],
    },
    {
      path: '/tier',
      element: <DashboardLayout />,
      children: [{ path: 'new-tier', element: <NewTier /> }],
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
