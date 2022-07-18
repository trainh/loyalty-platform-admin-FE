import { Navigate, useRoutes } from 'react-router-dom';
// layouts

import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Membership from './pages/Membership';
import Rule from './pages/condition/condition-rule/Rule';
import NewProgram from './pages/program/NewProgram';
import NewRule from './pages/condition/condition-rule/NewRule';
import Voucher from './pages/voucher/Voucher';
import Tier from './pages/tier/Tier';
import Program from './pages/program/Program';
import NewVoucher from './pages/voucher/NewVoucher';
import Condition from './pages/condition/Condition';
import NewConditionGroup from './pages/condition/condition-group/NewConditionGroup';
import Reward from './pages/reward/Reward';
import NewReward from './pages/reward/NewReward';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import NewCondition from './pages/condition/NewCondition';
import ConditionGroups from './pages/condition/condition-group/condition-groups';

// ----------------------------------------------------------------------

export default function Router() {
 

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'membership', element: <Membership /> },
        { path: 'tier', element: <Tier /> },
        { path: 'program', element: <Program /> },
        { path: 'condition', element: <Condition /> },
        { path: 'rule', element: <Rule /> },

        { path: 'voucher', element: <Voucher /> },
        { path: 'reward', element: <Reward /> },
      ],
    },
    {
      path: '/program',
      element: <DashboardLayout />,
      children: [{ path: 'new-program', element: <NewProgram /> }],
    },
    {
      path: '/condition',
      element: <DashboardLayout />,
      children: [
        { path: 'new-condition-group', element: <NewConditionGroup /> },
        { path: 'new-condition-rule', element: <NewRule /> },
        { path: 'new-condition', element: <NewCondition /> },
        { path: 'condition-groups', element: <ConditionGroups /> },
        {path: 'conditions', element: <Condition/>}
      ],
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
