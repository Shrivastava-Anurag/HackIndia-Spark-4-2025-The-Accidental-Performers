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
    title: 'Applications',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Documents',
    path: '/dashboard/application',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'Documents',
  //   path: '/404',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Issue Documents',
    path: '/dashboard/issuer',
    icon: getIcon('eva:file-text-fill'),
  },
{
    title: 'Templates',
    path: '/dashboard/template',
    icon: getIcon('eva:layout-fill'),
  },{
    title: 'Verify Documents',
    path: '/dashboard/verifydoc',
    icon: getIcon('eva:checkmark-circle-2-fill'),
  },{
    title: 'Generate Doclink',
    path: '/dashboard/Generatelink',
    icon: getIcon('eva:link-fill'),
  },







  {
    title: 'SignIn',
    path: '/login',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Signup',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
