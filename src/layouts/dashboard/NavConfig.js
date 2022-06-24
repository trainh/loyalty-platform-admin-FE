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
    title: 'membership',
    path: '/dashboard/membership',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'tier',
    path: '/dashboard/tier',
    icon: getIcon('fa6-solid:ranking-star'),
  },
  {
    title: 'condition',
    path: '/dashboard/condition',
    icon: getIcon('mdi:clipboard-text'),
  },
  {
    title: 'rule',
    path: '/dashboard/rule',
    icon: getIcon('clarity:note-solid'),
  },
  {
    title: 'voucher',
    path: '/dashboard/voucher',
    icon: getIcon('mdi:tag'),
  },
  {
    title: 'gift',
    path: '/dashboard/gift',
    icon: getIcon('eva:gift-fill'),
  },
  {
    title: 'promotion',
    path: '/dashboard/promotion',
    icon: getIcon('eva:percent-fill'),
  },
];

export default navConfig;
