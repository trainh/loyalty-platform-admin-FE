// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'tier',
    path: '/dashboard/tier',
    icon: getIcon('fa6-solid:ranking-star'),
  },
  {
    title: 'condition',
    path: '/condition/conditions',
    icon: getIcon('mdi:clipboard-text'),
  },
  {
    title: 'rule',
    path: '/condition/condition-rules',
    icon: getIcon('clarity:note-solid'),
  },
  {
    title: 'condition group',
    path: '/condition/condition-groups',
    icon: getIcon('mdi:note-alert'),
  },
  {
    title: 'voucher',
    path: '/dashboard/voucher',
    icon: getIcon('mdi:tag'),
  },
];

export default navConfig;
